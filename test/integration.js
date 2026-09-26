const WebSocket = require('ws');
const assert = require('assert');
const { execSync } = require('child_process');

const W = 'ws://localhost:3000';

function client() {
  const c = { ws: null, queue: [], handlers: {}, connected: false, token: null, me: null, init: null };
  c.ws = new WebSocket(W);
  c.ws.on('message', (raw) => {
    const d = JSON.parse(raw.toString());
    const h = c.handlers[d.type];
    if (h) h(d);
    else c.queue.push(d);
  });
  c.send = (o) => new Promise((res) => { if (c.ws.readyState === 1) { c.ws.send(JSON.stringify(o)); res(); } else c.ws.once('open', () => { c.ws.send(JSON.stringify(o)); res(); }); });
  c.expect = (type, timeout = 4000) => new Promise((res, rej) => {
    const start = Date.now();
    const tick = () => {
      const i = c.queue.findIndex((d) => d.type === type);
      if (i >= 0) { const [d] = c.queue.splice(i, 1); return res(d); }
      if (Date.now() - start > timeout) return rej(new Error('timeout waiting ' + type));
      setTimeout(tick, 30);
    };
    tick();
  });
  return c;
}
function flush(c) { c.queue = []; }

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  // 1) регистрация двух пользователей
  const a = client(); await wait(200);
  const b = client(); await wait(200);

  await a.send({ type: 'register', nick: 'alice', username: 'alice_dev', password: 'pass1234' });
  const regA = await a.expect('auth_ok');
  assert(regA.token, 'alice got token');
  assert.strictEqual(regA.user.nick, 'alice');
  assert.strictEqual(regA.user.username, 'alice_dev');
  a.token = regA.token;
  a.me = regA.user;

  await b.send({ type: 'register', nick: 'bob', username: 'bob_ux', password: 'bobpass1' });
  const regB = await b.expect('auth_ok');
  b.token = regB.token;
  b.me = regB.user;
  console.log('[ok] регистрация обоих с уникальными юзернеймами');

  await a.send({ type: 'hello', token: a.token, room: 'general' });
  const initA = await a.expect('init');
  assert.strictEqual(initA.me.nick, 'alice');
  assert(Array.isArray(initA.rooms) && initA.rooms.length >= 4, 'rooms list');
  assert(initA.contacts.some((c) => c.nick === 'bob'), 'alice sees bob in contacts');
  console.log('[ok] вход alice по токену, комнаты + контакты');

  await b.send({ type: 'hello', token: b.token, room: 'general' });
  await b.expect('init');
  flush(a); flush(b); // сбросим системные сообщения о входе

  // 2) сообщение в комнате
  await a.send({ type: 'message', text: 'привет, комната!' });
  const roomMsg = await b.expect('message');
  assert.strictEqual(roomMsg.message.text, 'привет, комната!');
  assert.strictEqual(roomMsg.message.nick, 'alice');
  console.log('[ok] публичное сообщение в комнате дошло до bob');

  // 3) вход bob по юзернейму + неверным паролем
  await b.send({ type: 'login', nick: 'bob_ux', password: 'bobpass1' });
  const loginB = await b.expect('auth_ok');
  assert(loginB.token, 'relogin works');
  console.log('[ok] повторный вход bob по юзернейму');

  // 3b) обновление профиля: bio + аватар-файл (HTTP upload), проверка в контактах у alice
  const img = Buffer.from('89504e470d0a1a0a0000000d49484452', 'hex'); // мини-png-заголовок
  const up = await fetch(`http://localhost:3000/upload`, { method: 'POST', headers: { 'Content-Type': 'image/png' }, body: img });
  const upj = await up.json();
  assert(upj.url && upj.url.startsWith('/uploads/'), 'upload returned url');
  const got = await fetch(`http://localhost:3000${upj.url}`);
  assert.strictEqual(got.status, 200, 'uploaded file is served');
  const gotBody = Buffer.from(await got.arrayBuffer());
  assert.deepStrictEqual(gotBody, img, 'served bytes match uploaded');

  await a.send({ type: 'update_profile', nick: 'alice', username: 'alice_dev', bio: 'я делаю чаты', avatar: upj.url });
  const profA = await a.expect('profile_ok');
  assert.strictEqual(profA.user.bio, 'я делаю чаты');
  assert.strictEqual(profA.user.avatar, upj.url);
  const contactsB = await b.expect('contacts');
  const aliceIn = contactsB.contacts.find((c) => c.nick === 'alice');
  assert.strictEqual(aliceIn.bio, 'я делаю чаты');
  assert.strictEqual(aliceIn.avatar, upj.url);
  console.log('[ok] HTTP-загрузка файла + био/аватар видны у bob в контактах');

  // 4) ЛС alice -> bob
  await a.send({ type: 'pm', to: b.me.id, text: 'секретное сообщение' });
  const pm = await b.expect('pm');
  assert.strictEqual(pm.message.text, 'секретное сообщение');
  assert.strictEqual(pm.message.from, a.me.id);
  console.log('[ok] личное сообщение alice -> bob');

  const dlgB = await b.expect('dialog_list');
  assert(dlgB.dialogs.some((d) => d.partner.nick === 'alice'), 'bob has alice dialog');
  console.log('[ok] список диалогов bob обновился');

  // 5) bob открывает диалог и видит историю
  await b.send({ type: 'open_dialog', with: a.me.id });
  const openB = await b.expect('open_dialog');
  assert(openB.history.some((m) => m.text === 'секретное сообщение'), 'history has the pm');
  console.log('[ok] bob открыл диалог и видит историю ЛС');

  // 6) ошибка входа неверным паролем
  const c = client(); await wait(200);
  await c.send({ type: 'login', nick: 'alice_dev', password: 'wrong' });
  const fail = await c.expect('auth_fail');
  assert(/логин|пароль|неверн/i.test(fail.error), 'error message');
  console.log('[ok] неверный пароль отклонён:', fail.error);

  // 7) дубль юзернейма
  const d = client(); await wait(200);
  await d.send({ type: 'register', nick: 'alice_clone', username: 'alice_dev', password: 'x12345' });
  const dup = await d.expect('auth_fail');
  assert(/занят/i.test(dup.error), 'duplicate username rejected');
  console.log('[ok] дубль юзернейма отклонён');

  // 8) владелец: юз nekq получает is_owner + фиолетовый цвет
  const e = client(); await wait(200);
  await e.send({ type: 'register', nick: 'Босс', username: 'nekq', password: 'ownerpass1' });
  const ow = await e.expect('auth_ok');
  assert.strictEqual(ow.user.is_owner, true, 'nekq is owner');
  assert.strictEqual(ow.user.color, '#7c5cff', 'owner color is purple');
  console.log('[ok] юз nekq — владелец, цвет фиолетовый');

  // 9) смена юзернейма на занятый -> явная ошибка
  await a.send({ type: 'update_profile', nick: 'alice', username: 'bob_ux', bio: 'био', avatar: '' });
  const profErr = await a.expect('profile_error');
  assert(/занят/i.test(profErr.error), 'taken username rejected on change');
  console.log('[ok] смена юза на занятый отклонена:', profErr.error);

  console.log('\nALL TESTS PASSED');
  process.exit(0);
})().catch((e) => { console.error('TEST FAILED:', e.message); process.exit(1); });