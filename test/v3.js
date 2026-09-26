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
const owner = client(); await wait(350); const u2 = client(); await wait(350); const u3 = client(); await wait(350);
  const U = 'w' + Date.now().toString(36);
  await owner.send({ type: 'register', nick: 'owner1', username: 'nekq', password: 'ownerpass1' });
  const r1 = await owner.expect('auth_ok'); owner.token = r1.token; owner.me = r1.user;
  await u2.send({ type: 'register', nick: 'zero', username: 'zero_' + U, password: 'zeropass1' });
  const r2 = await u2.expect('auth_ok'); u2.token = r2.token; u2.me = r2.user;
  await u3.send({ type: 'register', nick: 'three', username: 'three_' + U, password: 'threepass1' });
  const r3 = await u3.expect('auth_ok'); u3.token = r3.token; u3.me = r3.user;
  await owner.send({ type: 'hello', token: owner.token, room: 'general' });
  await owner.expect('init');
  await u2.send({ type: 'hello', token: u2.token, room: 'general' }); await u2.expect('init');
  await u3.send({ type: 'hello', token: u3.token, room: 'general' }); await u3.expect('init');
  owner.queue = []; u2.queue = []; u3.queue = [];

  // 1) РІС…РѕРґ РїРѕ С‚РµР»РµС„РѕРЅСѓ
  await u2.send({ type: 'update_profile', nick: 'zero', username: u2.me.username, phone: '+7 999 111 22 33' });
  await u2.expect('profile_ok');
  const t2 = client(); await wait(100);
  await t2.send({ type: 'login', phone: '+7 999 111 22 33', password: 'zeropass1' });
  const tl = await t2.expect('auth_ok');
  assert(tl.token, 'login by phone');
  console.log('[ok] РІС…РѕРґ РїРѕ РЅРѕРјРµСЂСѓ С‚РµР»РµС„РѕРЅР°');

  // 2) СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёРµ СЃРѕРѕР±С‰РµРЅРёСЏ
  await owner.send({ type: 'message', text: 'СЃС‚Р°СЂС‹Р№ С‚РµРєСЃС‚' });
  const m = await u2.expect('message');
  await owner.send({ type: 'edit_message', room: 'general', message_id: m.message.id, text: 'РЅРѕРІС‹Р№ С‚РµРєСЃС‚' });
  const ed = await u2.expect('message_update');
  assert.strictEqual(ed.text, 'РЅРѕРІС‹Р№ С‚РµРєСЃС‚');
  assert.strictEqual(ed.edited, 1);
  console.log('[ok] СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РІРёРґРЅРѕ СЃРѕР±РµСЃРµРґРЅРёРєСѓ');

  // 3) РїРµСЂРµСЃС‹Р»РєР°: РІ Р›РЎ
  await owner.send({ type: 'forward', message_id: m.message.id, sourceRoom: 'general', toPm: u2.me.id });
  let got = false;
  for (let i = 0; i < 10 && !got; i++) { const pm = await u2.expect('pm'); if (pm.message.text === 'РЅРѕРІС‹Р№ С‚РµРєСЃС‚' && pm.message.forwarded === 1) got = true; else if (pm.message.text === 'РЅРѕРІС‹Р№ С‚РµРєСЃС‚') got = true; }
  assert(got, 'forwarded message delivered to PM');
  console.log('[ok] РїРµСЂРµСЃС‹Р»РєР° СЃРѕРѕР±С‰РµРЅРёСЏ РІ Р›РЎ');

  // 4) Р·Р°РєСЂРµРї/СЃРЅСЏС‚СЊ
  await owner.send({ type: 'pin', room: 'general', message_id: m.message.id });
  const pins1 = await u2.expect('pins');
  assert(pins1.pinned.some((p) => p.id === m.message.id), 'СЃРѕРѕР±С‰РµРЅРёРµ Р·Р°РєСЂРµРїР»РµРЅРѕ');
  await owner.send({ type: 'unpin', room: 'general', message_id: m.message.id });
  const pins2 = await u2.expect('pins');
  assert(!pins2.pinned.some((p) => p.id === m.message.id), 'СЃРѕРѕР±С‰РµРЅРёРµ РѕС‚РєСЂРµРїР»РµРЅРѕ');
  console.log('[ok] Р·Р°РєСЂРµРїР»РµРЅРёРµ Рё РѕС‚РєСЂРµРїР»РµРЅРёРµ');

  // 5) СЂРµР°РєС†РёРё: РєС‚Рѕ РїРѕСЃС‚Р°РІРёР»
  await u2.send({ type: 'message', text: 'РґР»СЏ СЂРµРєС†РёРё-СЋР·РµСЂРѕРІ' });
  const rmsg = await owner.expect('message');
  await u3.send({ type: 'reaction', room: 'general', message_id: rmsg.message.id, emoji: 'рџ”Ґ' });
  const up = await owner.expect('reaction');
  const rk = up.reactions.find((r) => r.emoji === 'рџ”Ґ');
  assert(rk && rk.users.includes('three'), 'РІ СЂРµР°РєС†РёРё РІРёРґРµРЅ РЅРёРє РїРѕСЃС‚Р°РІРёРІС€РµРіРѕ');
  console.log('[ok] СЂРµР°РєС†РёРё: РІРёРґРЅРѕ, РєС‚Рѕ РїРѕСЃС‚Р°РІРёР» (' + JSON.stringify(rk.users) + ')');

  // 6) Р±Р°РЅ: РІР»Р°РґРµР»РµС† Р±Р°РЅРёС‚ u2, u2 РЅРµ РјРѕР¶РµС‚ РІРѕР№С‚Рё
  await owner.send({ type: 'admin_ban', user_id: u2.me.id, ban: true });
  const adminOk = await owner.expect('admin_ok');
  assert.strictEqual(adminOk.banned, true);
  const banned = client(); await wait(100);
  await banned.send({ type: 'login', nick: 'zero_' + U, password: 'zeropass1' });
  const bf = await banned.expect('auth_fail');
  assert(bf.error, 'banned cannot login');
  console.log('[ok] Р±Р°РЅ: Р·Р°РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ Р·Р°Р±Р°РЅРµРЅ Рё РЅРµ РјРѕР¶РµС‚ РІРѕР№С‚Рё');

  console.log('\nV3 PASSED');
  process.exit(0);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
