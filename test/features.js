const WebSocket = require('ws');
const assert = require('assert');
const { execSync } = require('child_process');

const W = 'ws://localhost:3000';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function client() {
  const c = { ws: null, queue: [], token: null, me: null };
  c.ws = new WebSocket(W);
  c.ws.on('message', (r) => c.queue.push(JSON.parse(r.toString())));
  c.send = (o) => new Promise((res) => {
    if (c.ws.readyState === WebSocket.OPEN) { c.ws.send(JSON.stringify(o)); res(); }
    else c.ws.once('open', () => { c.ws.send(JSON.stringify(o)); res(); });
  });
  c.expect = (t, to = 5000) => new Promise((res, rej) => { const s = Date.now(); const tick = () => { const i = c.queue.findIndex((d) => d.type === t); if (i >= 0) { const [d] = c.queue.splice(i, 1); res(d); } else if (Date.now() - s > to) rej(new Error('timeout ' + t)); else setTimeout(tick, 40); }; tick(); });
  return c;
}

(async () => {
  const a = client(); await wait(200); const b = client(); await wait(200);
  const UNIQ = 'f' + Date.now().toString(36);

  await a.send({ type: 'register', nick: 'feata', username: 'feata_' + UNIQ, password: 'featapass' });
  const regA = await a.expect('auth_ok'); a.token = regA.token; a.me = regA.user;
  await b.send({ type: 'register', nick: 'featb', username: 'featb_' + UNIQ, password: 'featbpass' });
  const regB = await b.expect('auth_ok'); b.token = regB.token; b.me = regB.user;
  console.log('[ok] два пользователя зарегистрированы');

  // сталкер: вход + телефон в профиле + виден в контактах
  await a.send({ type: 'hello', token: a.token, room: 'general' });
  const init = await a.expect('init');
  await b.send({ type: 'hello', token: b.token, room: 'general' });
  await b.expect('init');
  a.queue = []; b.queue = []; // сбросим старые системные/контактные сообщения
  await a.send({ type: 'update_profile', nick: 'feata', username: a.me.username, phone: '+7 900 123-45-67', bio: 'к' });
  await a.expect('profile_ok');
  const contactsB = await b.expect('contacts');
  const cat = contactsB.contacts.find((u) => u.nick === 'feata');
  assert.strictEqual(cat.phone, '+7 900 123-45-67');
  console.log('[ok] телефон в профиле виден другому пользователю');

  // создание канала
  const chName = 'ch' + UNIQ;
  await a.send({ type: 'create_channel', name: chName });
  const chok = await a.expect('channel_ok');
  assert.strictEqual(chok.name, chName);
  console.log('[ok] канал создан:', chName);

  const roomsUpd = await a.expect('rooms');
  assert(roomsUpd.rooms.some((r) => r.id === chName), 'канал в списке комнат');
  console.log('[ok] канал появился в списке комнат');

  // вход в канал: оба заходят, alice отправляет текст/фото/стикер
  await a.send({ type: 'join', room: chName });
  await a.expect('history');
  await b.send({ type: 'join', room: chName });
  await b.expect('history');
  b.queue = []; a.queue = [];

  await a.send({ type: 'message', text: 'текст в канале' });
  await a.send({ type: 'message', text: '', image: '/uploads/test.png', sticker: '' });
  await a.send({ type: 'message', text: '', image: '', sticker: '😀' });

  const hasText = await b.expect('message');
  assert.strictEqual(hasText.message.text, 'текст в канале');
  const hasImg = await b.expect('message');
  assert.strictEqual(hasImg.message.image, '/uploads/test.png');
  const hasSticker = await b.expect('message');
  assert.strictEqual(hasSticker.message.sticker, '😀');
  console.log('[ok] фото и стикер в канале дошли до bob');

  // ЛС с фото и стикером
  await a.send({ type: 'pm', to: b.me.id, text: 'пм-текст', image: '/uploads/pm.png', sticker: '' });
  const pm = await b.expect('pm');
  assert.strictEqual(pm.message.image, '/uploads/pm.png');
  console.log('[ok] фото в личке дошло');

  // дубль канала
  await a.send({ type: 'create_channel', name: chName });
  const dup = await a.expect('channel_error');
  assert(/уже|существу/i.test(dup.error));
  console.log('[ok] дубль канала отклонён');

  console.log('\nFEATURES PASSED');
  process.exit(0);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });