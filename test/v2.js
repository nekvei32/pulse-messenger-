const WebSocket = require('ws');
const assert = require('assert');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const W = 'ws://localhost:3000';

function client() {
  const c = { ws: null, queue: [], token: null, me: null };
  c.ws = new WebSocket(W);
  c.ws.on('message', (r) => { const d = JSON.parse(r.toString()); if (c.onMsg) { c.onMsg(d); } c.queue.push(d); });
  c.onMsg = null;
  c.send = (o) => new Promise((res) => { if (c.ws.readyState === WebSocket.OPEN) { c.ws.send(JSON.stringify(o)); res(); } else c.ws.once('open', () => { c.ws.send(JSON.stringify(o)); res(); }); });
  c.expect = (t, to = 5000) => new Promise((res, rej) => { const s = Date.now(); const tick = () => { const i = c.queue.findIndex((d) => d.type === t); if (i >= 0) { const [d] = c.queue.splice(i, 1); res(d); } else if (Date.now() - s > to) rej(new Error('timeout ' + t)); else setTimeout(tick, 40); }; tick(); });
  return c;
}

(async () => {
  const a = client(); await wait(150); const b = client(); await wait(150);
  const U = 'v' + Date.now().toString(36);
  await a.send({ type: 'register', nick: 'vokea', username: 'vokea_' + U, password: 'vp12345' });
  const ra = await a.expect('auth_ok'); a.token = ra.token; a.me = ra.user;
  await b.send({ type: 'register', nick: 'vokeb', username: 'vokeb_' + U, password: 'vp12345' });
  const rb = await b.expect('auth_ok'); b.token = rb.token; b.me = rb.user;
  await a.send({ type: 'hello', token: a.token, room: 'general' }); await a.expect('init');
  await b.send({ type: 'hello', token: b.token, room: 'general' }); await b.expect('init');
  a.queue = []; b.queue = [];

  // 1) аудио в ЛС
  await a.send({ type: 'pm', to: b.me.id, text: '', image: '', sticker: '', audio: '/uploads/v.webm' });
  const pm = await b.expect('pm');
  assert.strictEqual(pm.message.audio, '/uploads/v.webm');
  console.log('[ok] голосовое (аудио) в ЛС дошло');

  // 2) личный стикер и гифка
  await a.send({ type: 'create_sticker', kind: 'sticker', url: '/uploads/my-sticker.png' });
  const sc1 = await a.expect('sticker_created'); assert.strictEqual(sc1.sticker.type, 'sticker');
  await a.send({ type: 'create_sticker', kind: 'gif', url: '/uploads/my-gif.gif' });
  const sc2 = await a.expect('sticker_created'); assert.strictEqual(sc2.sticker.type, 'gif');
  await a.send({ type: 'my_stickers' });
  const mine = await a.expect('stickers');
  assert.strictEqual(mine.stickers.length, 2);
  console.log('[ok] личные стикер/гифка созданы и получены');

  // 3) реакции в комнате
  await a.send({ type: 'message', text: 'для реакции' });
  const roomMsg = await b.expect('message');
  await a.send({ type: 'reaction', room: 'general', message_id: roomMsg.message.id, emoji: '🔥' });
  const react = await b.expect('reaction');
  const found = react.reactions.find((r) => r.emoji === '🔥');
  assert(found && found.count === 1, 'реакция появилась у bob');
  await a.send({ type: 'reaction', room: 'general', message_id: roomMsg.message.id, emoji: '🔥' }); // toggle off
  const react2 = await b.expect('reaction');
  assert(react2.reactions.length === 0, 'реакция снята');
  console.log('[ok] реакции: добавление и снятие в комнате');

  // 4) реакции в ЛС
  a.queue = []; b.queue = [];
  await a.send({ type: 'pm', to: b.me.id, text: 'пм для реакции', image: '', sticker: '' });
  const pm2 = await b.expect('pm');
  await b.send({ type: 'reaction', pm: a.me.id, message_id: pm2.message.id, emoji: '❤️' });
  const react3 = await a.expect('reaction');
  assert(react3.reactions.some((r) => r.emoji === '❤️'));
  console.log('[ok] реакция в ЛС дошла отправителю');

  // 5) прочитано/не прочитано: alice шлёт, bob открывает диалог -> alice получает pm_read и read=1
  await a.send({ type: 'pm', to: b.me.id, text: 'будет прочитано' });
  const sentPm = await a.expect('pm'); // эхо отправителю
  assert.strictEqual(sentPm.message.read, 0, 'изначально не прочитано');
  await b.send({ type: 'open_dialog', with: a.me.id });
  await b.expect('open_dialog');
  const readEvt = await a.expect('pm_read');
  assert.strictEqual(readEvt.with, b.me.id);
  console.log('[ok] прочитано: отправитель получил уведомление о прочтении');

  console.log('\nV2 PASSED');
  process.exit(0);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });