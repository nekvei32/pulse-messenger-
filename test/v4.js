const WebSocket = require('ws');
const assert = require('assert');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const W = 'ws://localhost:3000';

function client() {
  const c = { ws: null, queue: [], token: null, me: null };
  c.ws = new WebSocket(W);
  c.ws.on('message', (r) => c.queue.push(JSON.parse(r.toString())));
  c.send = (o) => new Promise((res) => { if (c.ws.readyState === WebSocket.OPEN) { c.ws.send(JSON.stringify(o)); res(); } else c.ws.once('open', () => { c.ws.send(JSON.stringify(o)); res(); }); });
  c.expect = (t, to = 5000) => new Promise((res, rej) => { const s = Date.now(); const tick = () => { const i = c.queue.findIndex((d) => d.type === t); if (i >= 0) { const [d] = c.queue.splice(i, 1); res(d); } else if (Date.now() - s > to) rej(new Error('timeout ' + t)); else setTimeout(tick, 40); }; tick(); });
  return c;
}

(async () => {
  const a = client(); await wait(250); const b = client(); await wait(250);
  const U = 'q' + Date.now().toString(36);
  await a.send({ type: 'register', nick: 'qa', username: 'qa_' + U, password: 'oldpass1' });
  const ra = await a.expect('auth_ok'); a.token = ra.token; a.me = ra.user;
  await b.send({ type: 'register', nick: 'qb', username: 'qb_' + U, password: 'qbpass1' });
  const rb = await b.expect('auth_ok'); b.token = rb.token; b.me = rb.user;
  await a.send({ type: 'hello', token: a.token, room: 'general' }); await a.expect('init');
  await b.send({ type: 'hello', token: b.token, room: 'general' }); await b.expect('init');
  a.queue = []; b.queue = [];

  // 1) смена пароля
  await a.send({ type: 'change_password', old: 'oldpass1', new: 'newpass1' });
  const pw = await a.expect('pw_ok');
  assert(pw, 'password changed');
  await a.send({ type: 'change_password', old: 'oldpass1', new: 'x' });
  const pwf = await a.expect('pw_error');
  assert(pwf.error, 'old password check works');
  const t = client(); await wait(200);
  await t.send({ type: 'login', nick: 'qa_' + U, password: 'newpass1' });
  await t.expect('auth_ok');
  console.log('[ok] смена пароля: новый работает, старый отклоняется');

  // 2) удаление сообщения
  await a.send({ type: 'message', text: 'удаляетСЯ' });
  const m = await b.expect('message');
  await a.send({ type: 'delete_message', room: 'general', message_id: m.message.id });
  const del = await b.expect('message_deleted');
  assert.strictEqual(del.message_id, m.message.id);
  console.log('[ok] удаление сообщения доходит собеседнику');

  // 4) пересылка нескольких сообщений (пока в general)
  await a.send({ type: 'message', text: 'первое для пересылки' });
  const m1 = await b.expect('message');
  await a.send({ type: 'message', text: 'второе для пересылки' });
  const m2 = await b.expect('message');
  await a.send({ type: 'forward', message_ids: [m1.message.id, m2.message.id], sourceRoom: 'general', toPm: b.me.id });
  let got = 0;
  for (let i = 0; i < 10 && got < 2; i++) { const pm = await b.expect('pm'); if (pm.message.forwarded === 1 && /пересылк/i.test(pm.message.text)) got++; }
  assert.strictEqual(got, 2, 'оба сообщения пересланы');
  console.log('[ok] мультипересылка: оба сообщения дошли в ЛС');

  // 3) приватный канал: вход без кода нельзя, с кодом можно
  const chName = 'priv' + U;
  await a.send({ type: 'create_channel', name: chName, private: true });
  const ch = await a.expect('channel_ok');
  const invite = ch.invite;
  assert(ch.private === true && invite, 'private channel created with invite');
  await b.send({ type: 'join', room: chName });
  const jf = await b.expect('channel_error');
  assert(/приват/i.test(jf.error), 'без кода отказано');
  await b.send({ type: 'join', room: chName, code: invite });
  const jh = await b.expect('history');
  assert(jh, 'с кодом вход разрешён');
  console.log('[ok] приватный канал: вход только по коду');

  console.log('\nV4 PASSED');
  process.exit(0);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });