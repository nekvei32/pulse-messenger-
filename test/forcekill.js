const WebSocket = require('ws');
const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

const ROOT = path.join(__dirname, '..');
setTimeout(() => { console.error('HARD TIMEOUT'); try { process.exit(3); } catch {} }, 30000).unref();
const PORT = 3100;
const WL = `ws://localhost:${PORT}`;
const HTTP = `http://localhost:${PORT}`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const portOpen = () => new Promise((r) => { const s = net.connect({ port: PORT, host: '127.0.0.1' }); s.on('connect', () => { s.destroy(); r(true); }); s.on('error', () => r(false)); });
function startServer() { return spawn(process.execPath, ['server.js'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' }); }
async function waitUp(p) { for (let i = 0; i < 60; i++) { if (await portOpen()) return; await wait(200); } throw new Error('no server'); }
function forceKill(proc) { try { proc.kill('SIGKILL'); } catch {} }
function client() {
  const c = { queue: [], token: null, me: null };
  c.ws = new WebSocket(WL);
  c.ws.on('message', (r) => c.queue.push(JSON.parse(r.toString())));
  c.send = (o) => new Promise((res) => {
    if (c.ws.readyState === WebSocket.OPEN) { c.ws.send(JSON.stringify(o)); res(); }
    else c.ws.once('open', () => { c.ws.send(JSON.stringify(o)); res(); });
  });
  c.expect = (t, to = 5000) => new Promise((res, rej) => { const s = Date.now(); const tick = () => { const i = c.queue.findIndex((d) => d.type === t); if (i >= 0) { const [d] = c.queue.splice(i, 1); return res(d); } if (Date.now() - s > to) return rej(new Error('timeout ' + t)); setTimeout(tick, 40); }; tick(); });
  return c;
}

(async () => {
  // Сервер 1: регистрация + сообщение в комнате
  let s = startServer(); await waitUp(s);
  let a = client();
  await a.send({ type: 'register', nick: 'keep', username: 'keep_user', password: 'keeppass1' });
  const reg = await a.expect('auth_ok');
  a.token = reg.token; a.me = reg.user;
  await a.send({ type: 'hello', token: a.token, room: 'general' });
  await a.expect('init');
  await a.send({ type: 'message', text: 'ЭТО ДОЛЖНО ПЕРЕЖИТЬ ПЕРЕЗАПУСК' });
  await new Promise((r) => setTimeout(r, 300)); // дадим WAL записаться
  a.ws.close();

  // ЖЁСТКОЕ убийство сервера (как при резком закрытии окна)
  forceKill(s);
  await wait(600);
  const alive = await portOpen();
  console.log(alive ? '[FAIL] сервер всё ещё жив' : '[ok] сервер принудительно убит');

  // Сервер 2 (та же база): данные должны сохраниться
  s = startServer(); await waitUp(s);
  const b = client();
  await b.send({ type: 'login', nick: 'keep_user', password: 'keeppass1' });
  const login = await b.expect('auth_ok');
  assert(login.token, 'аккаунт пережил жёсткий kill');
  console.log('[ok] АККАУНТ сохранился после жёсткого kill');

  await b.send({ type: 'hello', token: login.token, room: 'general' });
  const init = await b.expect('init');
  const has = init.history.some((m) => m.text === 'ЭТО ДОЛЖНО ПЕРЕЖИТЬ ПЕРЕЗАПУСК');
  assert(has, 'переписка в комнате сохранилась после kill');
  console.log('[ok] ПЕРЕПИСКА В КОМНАТЕ сохранилась после жёсткого kill');

  b.ws.close(); forceKill(s);
  console.log('\nFORCE-KILL PERSISTENCE PASSED');
  process.exit(0);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });