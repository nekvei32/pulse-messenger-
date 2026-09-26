const WebSocket = require('ws');
const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

const ROOT = path.join(__dirname, '..');
const PORT = 3100;
const WL = `ws://localhost:${PORT}`;
const HTTP = `http://localhost:${PORT}`;

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
function portOpen() {
  return new Promise((r) => { const s = net.connect({ port: PORT, host: '127.0.0.1' }); s.on('connect', () => { s.destroy(); r(true); }); s.on('error', () => r(false)); });
}
function startServer() {
  const p = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
  return p;
}
async function waitUp(p) {
  for (let i = 0; i < 60; i++) { if (await portOpen()) return p; await wait(200); }
  throw new Error('server did not start');
}
function stopServer(p) { try { p.kill(); } catch {} }

function wsClient() {
  const c = { ws: null, queue: [], token: null };
  c.ws = new WebSocket(WL);
  c.ws.on('message', (r) => c.queue.push(JSON.parse(r.toString())));
  c.send = (o) => new Promise((res, rej) => {
    if (c.ws.readyState === WebSocket.OPEN) { c.ws.send(JSON.stringify(o)); res(); }
    else c.ws.once('open', () => { c.ws.send(JSON.stringify(o)); res(); });
  });
  c.expect = (type, timeout = 5000) => new Promise((res, rej) => {
    const start = Date.now();
    const tick = () => {
      const i = c.queue.findIndex((d) => d.type === type);
      if (i >= 0) { const [d] = c.queue.splice(i, 1); return res(d); }
      if (Date.now() - start > timeout) return rej(new Error('timeout ' + type));
      setTimeout(tick, 40);
    };
    tick();
  });
  return c;
}

(async () => {
  const NICK = 'persist_test';
  const USER = 'persist_test_user';
  const PASS = 'persistpass1';

  // --- Сервер 1: регистрация + сообщение в комнате ---
  let s1 = startServer(); await waitUp(s1);
  let c = wsClient();
  await c.send({ type: 'register', nick: NICK, username: USER, password: PASS });
  const reg = await c.expect('auth_ok');
  assert(reg.token, 'token issued');
  const token = reg.token;
  await c.send({ type: 'hello', token, room: 'general' });
  await c.expect('init');
  await c.send({ type: 'message', text: 'ЭТО ПЕРЕЖИВЁТ ПЕРЕЗАПУСК' });
  await wait(300);
  console.log('[ok] зарегистрирован, токен выдан, сообщение в комнате отправлено');
  c.ws.close();
  stopServer(s1);

  await wait(500);

  // --- Сервер 2 (тот же chat.db): пользователь и сессия должны остаться ---
  let s2 = startServer(); await waitUp(s2);

  const lc = wsClient();
  await lc.send({ type: 'login', nick: USER, password: PASS });
  const login = await lc.expect('auth_ok');
  assert(login.token, 'login after restart works');
  assert.strictEqual(login.user.nick, NICK);
  console.log('[ok] вход по паролю после ПЕРЕЗАПУСКА сервера');

  // авто-вход по старому токену из прошлой сессии
  const tc = wsClient();
  await tc.send({ type: 'hello', token, room: 'general' });
  const init = await tc.expect('init');
  assert.strictEqual(init.me.username, USER);
  assert(init.history.some((m) => m.text === 'ЭТО ПЕРЕЖИВЁТ ПЕРЕЗАПУСК'), 'переписка в комнате сохранилась');
  console.log('[ok] авто-вход по токену И переписка в комнате пережили перезапуск сервера');

  lc.ws.close(); tc.ws.close();
  stopServer(s2);

  console.log('\nPERSISTENCE PASSED');
  process.exit(0);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });