const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');
const { WebSocketServer } = require('ws');
const QRCode = require('qrcode');

const PORT = process.env.PORT || 3000;
const ROOMS = ['general', 'sport', 'games', 'tech'];
const SESSION_DAYS = 30;
const MAX_ROOM_HISTORY = 200;
const MIN_NICK = 2;
const MAX_NICK = 20;
const MIN_PASS = 4;
const MAX_PASS = 64;
const MAX_UPLOAD = 5 * 1024 * 1024 * 1024; // 5 ГБ
const UPLOAD_DIR = process.env.PULSE_UPLOAD_DIR || path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const ACCEPT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']);
const OWNER_USERNAME = 'nekq';
const OWNER_COLOR = '#7c5cff';

// ---------- база данных ----------
const DB_PATH = process.env.PULSE_DB_PATH || path.join(__dirname, 'chat.db');
const db = new DatabaseSync(DB_PATH);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS gifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user INTEGER NOT NULL,
    to_user INTEGER NOT NULL,
gid INTEGER NOT NULL,
    at TEXT NOT NULL,
    text TEXT DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS user_pinned_gifts (
    user_id INTEGER NOT NULL,
    gid INTEGER NOT NULL,
    at TEXT NOT NULL,
    PRIMARY KEY (user_id, gid)
  );
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nick TEXT NOT NULL,
    username TEXT UNIQUE,
    bio TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    status_emoji TEXT DEFAULT '',
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    color TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'online',
    banned INTEGER NOT NULL DEFAULT 0,
    stars INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS channels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    owner_id INTEGER NOT NULL,
    private INTEGER NOT NULL DEFAULT 0,
    invite TEXT DEFAULT '',
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS user_stickers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    chat_key TEXT NOT NULL,
    message_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(user_id, chat_key, message_id)
  );
  CREATE TABLE IF NOT EXISTS calls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    partner_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    duration INTEGER NOT NULL DEFAULT 0,
    at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_key TEXT NOT NULL,
    message_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    emoji TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(chat_key, message_id, user_id, emoji)
  );
  CREATE TABLE IF NOT EXISTS pins (
    chat_key TEXT NOT NULL,
    message_id INTEGER NOT NULL,
    pinned_by INTEGER NOT NULL,
    at TEXT NOT NULL,
    PRIMARY KEY (chat_key, message_id)
  );
  CREATE TABLE IF NOT EXISTS channel_subs (
    channel TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    at TEXT NOT NULL,
    PRIMARY KEY (channel, user_id)
  );
  CREATE TABLE IF NOT EXISTS room_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT NOT NULL,
    kind TEXT NOT NULL,
    nick TEXT,
    color TEXT,
    text TEXT NOT NULL DEFAULT '',
    image TEXT DEFAULT '',
    sticker TEXT DEFAULT '',
    audio TEXT DEFAULT '',
    video TEXT DEFAULT '',
    file TEXT DEFAULT '',
    poll TEXT DEFAULT '',
    views INTEGER NOT NULL DEFAULT 0,
    edited INTEGER NOT NULL DEFAULT 0,
    reply TEXT DEFAULT '',
    forwarded INTEGER NOT NULL DEFAULT 0,
    at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS private_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user INTEGER NOT NULL,
    to_user INTEGER NOT NULL,
    text TEXT NOT NULL DEFAULT '',
    image TEXT DEFAULT '',
    sticker TEXT DEFAULT '',
    audio TEXT DEFAULT '',
    video TEXT DEFAULT '',
    file TEXT DEFAULT '',
    read INTEGER NOT NULL DEFAULT 0,
    edited INTEGER NOT NULL DEFAULT 0,
    reply TEXT DEFAULT '',
    forwarded INTEGER NOT NULL DEFAULT 0,
    at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_room ON room_messages(room);
  CREATE INDEX IF NOT EXISTS idx_pm_pair ON private_messages(from_user, to_user);
  CREATE INDEX IF NOT EXISTS idx_stickers_user ON user_stickers(user_id);
  CREATE INDEX IF NOT EXISTS idx_reactions_msg ON reactions(chat_key, message_id);
`);

// миграция: добавить недостающие колонки в существующие таблицы
{
  const addCols = (table, list) => {
    const cols = db.prepare(`PRAGMA table_info(${table})`).all().map((c) => c.name);
    for (const [name, type] of list) if (!cols.includes(name)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${type}`);
  };
  addCols('users', [['username', 'TEXT'], ['nick', 'TEXT'], ['bio', "TEXT DEFAULT ''"], ['phone', "TEXT DEFAULT ''"], ['avatar', "TEXT DEFAULT ''"], ['banned', 'INTEGER DEFAULT 0'], ['status_emoji', "TEXT DEFAULT ''"], ['stars', 'INTEGER DEFAULT 0']]);
  addCols('room_messages', [['text', "TEXT NOT NULL DEFAULT ''"], ['image', "TEXT DEFAULT ''"], ['sticker', "TEXT DEFAULT ''"], ['audio', "TEXT DEFAULT ''"], ['video', "TEXT DEFAULT ''"], ['file', "TEXT DEFAULT ''"], ['edited', 'INTEGER DEFAULT 0'], ['reply', "TEXT DEFAULT ''"], ['forwarded', 'INTEGER DEFAULT 0'], ['poll', "TEXT DEFAULT ''"], ['views', 'INTEGER DEFAULT 0']]);
  addCols('private_messages', [['text', "TEXT NOT NULL DEFAULT ''"], ['image', "TEXT DEFAULT ''"], ['sticker', "TEXT DEFAULT ''"], ['audio', "TEXT DEFAULT ''"], ['video', "TEXT DEFAULT ''"], ['file', "TEXT DEFAULT ''"], ['read', 'INTEGER DEFAULT 0'], ['edited', 'INTEGER DEFAULT 0'], ['reply', "TEXT DEFAULT ''"], ['forwarded', 'INTEGER DEFAULT 0']]);
  addCols('favorites', [['snap', "TEXT DEFAULT ''"]]);
  addCols('channels', [['private', 'INTEGER DEFAULT 0'], ['invite', "TEXT DEFAULT ''"], ['banner', "TEXT DEFAULT ''"], ['description', "TEXT DEFAULT ''"], ['color', "TEXT DEFAULT ''"], ['admins', "TEXT DEFAULT '[]'"]]);
  addCols('users', [['banner', "TEXT DEFAULT ''"], ['settings', "TEXT DEFAULT '{}'"]]);
  addCols('gifts', [['text', "TEXT DEFAULT ''"]]);
}
db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users(username)`);
db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_channels_name ON channels(name)`);

const PALETTE = ['#7c5cff', '#ff5c8a', '#00b8a9', '#f79d2d', '#2d9cdb', '#9b51e0', '#27ae60', '#eb5757'];
const GIFT_CAT = [
  { gid: 1, name: 'Цветок', emoji: '🌹', price: 5 },
  { gid: 2, name: 'Сердце', emoji: '💛', price: 10 },
  { gid: 3, name: 'Торт', emoji: '🎂', price: 25 },
  { gid: 4, name: 'Ракета', emoji: '🚀', price: 50 },
  { gid: 5, name: 'Изумруд', emoji: '💎', price: 100 },
];
function colorFor(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
const stamp = () => new Date().toISOString();
function pinnedGiftsList(uid) {
  return db.prepare('SELECT gid, at FROM user_pinned_gifts WHERE user_id=? ORDER BY at').all(uid).map((r) => {
    const g = GIFT_CAT.find((x) => x.gid === r.gid) || { name: '?', emoji: '?', price: 0 };
    return { gid: r.gid, name: g.name, emoji: g.emoji, price: g.price };
  });
}

// ---------- пароли (scrypt) ----------
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}
function makeUser(color) {
  return { id: null, nick: '', username: '', bio: '', phone: '', avatar: '', color, status: 'online' };
}

// публичный профиль пользователя (что видно другим)
function publicUser(row) {
  const is_owner = row.username === OWNER_USERNAME;
  let settings = {};
  try { settings = JSON.parse(row.settings || '{}'); } catch {}
  return {
    id: row.id,
    username: row.username || '',
    nick: row.nick,
    bio: row.bio || '',
    phone: row.phone || '',
    avatar: row.avatar || '',
    banner: row.banner || '',
    status_emoji: row.status_emoji || '',
    color: is_owner ? OWNER_COLOR : row.color,
    status: row.status || 'online',
    is_owner,
    banned: !!row.banned,
    stars: row.stars || 0,
    settings,
  };
}
function getUserRow(userId) {
  return db.prepare('SELECT * FROM users WHERE id=?').get(userId) || null;
}
function isValidUsername(u) {
  return typeof u === 'string' && /^[a-zA-Z0-9_.]{3,20}$/.test(u);
}

// ---------- сессии ----------
function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const expires = new Date(now + SESSION_DAYS * 86400e3).toISOString();
  db.prepare('INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)')
    .run(token, userId, new Date(now).toISOString(), expires);
  return token;
}
function getUserByToken(token) {
  const row = db.prepare(
    `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > ?`
  ).get(token, new Date().toISOString());
  return row || null;
}

// ---------- онлайн-присутствие ----------
const byWs = new Map();        // ws -> client state
const userConns = new Map();   // userId -> Set<ws>

// ---------- голосовые комнаты ----------
const voiceRooms = new Map(); // room -> Set<userId>

function voiceState(room) {
  const ids = voiceRooms.get(room) || new Set();
  return [...ids].map((id) => { const s = userSummary(id); return { id, nick: s ? s.nick : '?', color: s ? s.color : '#7c5cff' }; });
}
function broadcastVoice(room) {
  broadcast(room, { type: 'voice_state', room, users: voiceState(room) });
}
function removeFromVoice(userId) {
  for (const [room, set] of voiceRooms) {
    if (set.delete(userId)) { if (set.size === 0) voiceRooms.delete(room); broadcastVoice(room); }
  }
}

function userName(id) { return db.prepare('SELECT nick FROM users WHERE id=?').get(id)?.nick || '?' }
function userColor(id) {
  const u = db.prepare('SELECT color FROM users WHERE id=?').get(id);
  return u ? u.color : '#7c5cff';
}
function userSummary(id) { const r = getUserRow(id); return r ? publicUser(r) : null; }

// ---------- комнаты и каналы ----------
function channelNames() {
  return db.prepare('SELECT name, private, banner, description, color, owner_id FROM channels ORDER BY name').all()
    .map((r) => ({ name: r.name, private: !!r.private, banner: r.banner || '', description: r.description || '', color: r.color || '', owner_id: r.owner_id }));
}
function allRoomNames() { return ROOMS.concat(channelNames().map((c) => c.name)); }
function isImgUrl(u) { return typeof u === 'string' && (/^\/uploads\/[A-Za-z0-9._-]+$/.test(u) || /^https?:\/\/\S+$/i.test(u)); }
function roomExists(name) { if (typeof name !== 'string' || !name) return false; return ROOMS.includes(name) || !!db.prepare('SELECT id FROM channels WHERE name=?').get(name); }
function roomList() {
  return [
    ...ROOMS.map((r) => ({ id: r, custom: false, private: false, banner: '', description: '', color: '', owner_id: 0 })),
    ...channelNames().map((c) => ({ id: c.name, custom: true, private: c.private, banner: c.banner, description: c.description, color: c.color, owner_id: c.owner_id })),
  ].map((r) => ({ id: r.id, custom: r.custom, private: r.private, banner: r.banner, description: r.description, color: r.color, owner_id: r.owner_id, count: roomCount(r.id) }));
}
function roomMembers(room) {
  const set = new Set();
  for (const [ws, st] of byWs) {
    if (st.room === room && ws.readyState === ws.OPEN) set.add(st.userId);
  }
  return set;
}
function broadcast(room, payload, excludeWs) {
  const msg = JSON.stringify(payload);
  for (const [ws, st] of byWs) {
    if (st.room === room && ws !== excludeWs && ws.readyState === ws.OPEN) ws.send(msg);
  }
}
function send(ws, payload) { if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(payload)); }

function addRoomMessage(room, kind, nick, color, text = '', image = '', sticker = '', audio = '', video = '', file = '', reply = '', poll = '') {
  const m = { kind, nick, color, text, image, sticker, audio, video, file, reply, poll, at: stamp() };
  const info = db.prepare('INSERT INTO room_messages (room, kind, nick, color, text, image, sticker, audio, video, file, reply, poll, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(room, kind, nick || null, color || null, text, image, sticker, audio, video, file, reply, poll, m.at);
  m.id = Number(info.lastInsertRowid);
  if (!image && !sticker && !audio && !video && !file && !text && !poll) { db.prepare('DELETE FROM room_messages WHERE id=?').run(m.id); return m; }
  // подчистим хвост, чтобы история не разрасталась бесконечно
  const over = db.prepare(
    'SELECT id FROM room_messages WHERE room=? ORDER BY id DESC LIMIT -1 OFFSET ?'
  ).all(room, MAX_ROOM_HISTORY);
  if (over.length) db.prepare('DELETE FROM room_messages WHERE room=? AND id < ?').run(room, over[over.length - 1].id);
  broadcast(room, { type: 'message', message: m });
  broadcastMembers(room);
  return m;
}
function roomHistory(room) {
  return db.prepare('SELECT * FROM room_messages WHERE room=? ORDER BY id ASC').all(room);
}
function roomCount(room) { return roomMembers(room).size; }
function broadcastMembers(room) {
  broadcast(room, { type: 'members', count: roomCount(room) });
}
function broadcastRooms() {
  const list = roomList();
  for (const [ws] of byWs) if (ws.readyState === ws.OPEN) send(ws, { type: 'rooms', rooms: list });
}

// ---------- приватные сообщения ----------
function partnerIds(userId) {
  const rows = db.prepare(
    `SELECT DISTINCT CASE WHEN from_user=? THEN to_user ELSE from_user END AS pid
     FROM private_messages WHERE from_user=? OR to_user=?`
  ).all(userId, userId, userId);
  return rows.map((r) => r.pid);
}
function dialogPreview(userId, pid) {
  const last = db.prepare(
    `SELECT from_user, to_user, text, at FROM private_messages
     WHERE (from_user=? AND to_user=?) OR (from_user=? AND to_user=?)
     ORDER BY id DESC LIMIT 1`
  ).get(userId, pid, pid, userId);
  const unread = db.prepare(
    'SELECT COUNT(*) c FROM private_messages WHERE from_user=? AND to_user=? AND read=0'
  ).get(pid, userId).c;
  return {
    partner: { ...userSummary(pid), online: (userConns.get(pid)?.size || 0) > 0 || isBot(pid) },
    last: last ? { fromMe: last.from_user === userId, text: last.text, at: last.at } : null,
    unread,
  };
}
function userDialogs(userId) {
  return partnerIds(userId).map((pid) => dialogPreview(userId, pid));
}
function privateHistory(userId, pid) {
  const rows = db.prepare(
    `SELECT * FROM private_messages
     WHERE (from_user=? AND to_user=?) OR (from_user=? AND to_user=?)
     ORDER BY id DESC LIMIT 50`
  ).all(userId, pid, pid, userId).reverse();
  const wReactions = attachReactions('p:' + pid, rows, userId);
  return wReactions.map((row) => {
    const s = userSummary(row.from_user) || {};
    return { ...row, from: row.from_user, fromUsername: s.username, fromNick: s.nick || '', fromColor: s.color, fromAvatar: s.avatar };
  });
}
function sendPm(fromId, toId, content) {
  if (isBlocked(toId, fromId)) return null; // получатель заблокировал отправителя
  const { text = '', image = '', sticker = '', audio = '', video = '', file = '', reply = '', forwarded = 0 } = content || {};
  const at = stamp();
  const info = db.prepare('INSERT INTO private_messages (from_user, to_user, text, image, sticker, audio, video, file, reply, forwarded, read, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(fromId, toId, text, image, sticker, audio, video, file, reply, forwarded ? 1 : 0, 0, at);
  const from = userSummary(fromId);
  const msg = {
    id: Number(info.lastInsertRowid),
    from: fromId, fromUsername: from.username, fromNick: from.nick,
    fromColor: from.color, fromAvatar: from.avatar,
    to: toId, text, image, sticker, audio, video, file, reply, forwarded: forwarded ? 1 : 0, read: 0, at,
  };
  // если получатель сейчас смотрит этот диалог — считать прочитанным сразу
  let recipientViewing = false;
  const conns = userConns.get(toId) || new Set();
  for (const w of conns) { const ws = w; const st = byWs.get(ws); if (st && st.userId === toId && st.dm === fromId) recipientViewing = true; }
  if (recipientViewing) { db.prepare('UPDATE private_messages SET read=1 WHERE id=?').run(msg.id); msg.read = 1; }
  pushPmToUser(toId, msg);   // получателю
  pushPmToUser(fromId, msg); // отправителю (чтобы диалог обновился)
  return msg;
}
function pushPmToUser(userId, msg) {
  const conns = userConns.get(userId) || new Set();
  for (const ws of conns) {
    if (ws.readyState === ws.OPEN) {
      send(ws, { type: 'pm', message: msg });
      send(ws, { type: 'dialog_list', dialogs: userDialogs(userId) });
    }
  }
}
function markDialogRead(userId, pid) {
  const changed = db.prepare('UPDATE private_messages SET read=1 WHERE from_user=? AND to_user=? AND read=0').run(pid, userId).changes;
  if (changed > 0) {
    // уведомить отправителя, только если получатель включил «дья-реквизиты»
    const rec = db.prepare('SELECT settings FROM users WHERE id=?').get(userId);
    let s = {}; try { s = JSON.parse(rec ? rec.settings : '{}'); } catch {}
    if (s.readReceipts !== false) {
      const senders = userConns.get(pid) || new Set();
      for (const sw of senders) if (sw.readyState === sw.OPEN) send(sw, { type: 'pm_read', with: userId, count: changed });
    }
  }
}

// ---------- реакции ----------
function reactionsFor(chatKey, messageId, userId) {
  const groups = db.prepare('SELECT emoji, COUNT(*) c FROM reactions WHERE chat_key=? AND message_id=? GROUP BY emoji').all(chatKey, messageId);
  return groups.map((g) => ({
    emoji: g.emoji, count: g.c,
    me: !!db.prepare('SELECT id FROM reactions WHERE chat_key=? AND message_id=? AND user_id=? AND emoji=?').get(chatKey, messageId, userId, g.emoji),
    users: db.prepare('SELECT u.nick FROM reactions r JOIN users u ON u.id=r.user_id WHERE r.chat_key=? AND r.message_id=? AND r.emoji=?').all(chatKey, messageId, g.emoji).map((x) => x.nick),
  }));
}
function pinnedFor(chatKey) {
  const rows = db.prepare('SELECT message_id FROM pins WHERE chat_key=? ORDER BY at DESC').all(chatKey);
  if (!rows.length) return [];
  const table = chatKey.startsWith('r:') ? 'room_messages' : 'private_messages';
  const ids = rows.map((r) => r.message_id);
  const ph = ids.map(() => '?').join(',');
  return db.prepare(`SELECT * FROM ${table} WHERE id IN (${ph})`).all(...ids);
}
function attachReactions(chatKey, list, userId) {
  return list.map((m) => ({ ...m, reactions: reactionsFor(chatKey, m.id, userId) }));
}
function deliverReaction(chatKey, userId, payload) {
  if (chatKey.startsWith('p:')) {
    const partner = Number(chatKey.slice(2));
    for (const id of new Set([userId, partner])) {
      const conns = userConns.get(id) || new Set();
      for (const w of conns) if (w.readyState === w.OPEN) send(w, payload);
    }
  } else {
    const room = chatKey.slice(2);
    for (const [w, s] of byWs) if (s && s.room === room && w.readyState === w.OPEN) send(w, payload);
  }
}
// ---------- личные стикеры/гифки ----------
function myStickers(userId) {
  return db.prepare('SELECT id, type, url FROM user_stickers WHERE user_id=? ORDER BY id DESC').all(userId);
}

function roomHistory(room, userId = 0) {
  const rows = db.prepare('SELECT * FROM room_messages WHERE room=? AND kind!=\'system\' ORDER BY id DESC LIMIT 50').all(room).reverse();
  if (rows.length) {
    db.prepare('UPDATE room_messages SET views=views+1 WHERE id IN (' + rows.map(() => '?').join(',') + ')').run(...rows.map((r) => r.id));
    rows.forEach((r) => r.views = (r.views || 0) + 1);
  }
  return attachReactions('r:' + room, rows, userId);
}

// ---------- контакты ----------
function userSettings(id) { const r = db.prepare('SELECT settings FROM users WHERE id=?').get(id); try { return JSON.parse(r ? r.settings : '{}'); } catch { return {}; } }
function isBot(id) { const r = db.prepare('SELECT username FROM users WHERE id=?').get(id); return !!(r && r.username === 'autobot'); }
function channelRoleOf(name, userId) {
  const ch = db.prepare('SELECT owner_id, admins FROM channels WHERE name=?').get(name);
  if (!ch) return null;
  if (ch.owner_id === userId) return 'owner';
  let ad = []; try { ad = JSON.parse(ch.admins || '[]'); } catch {}
  return ad.includes(userId) ? 'admin' : 'member';
}
function isBlocked(a, b) { const s = userSettings(a); return Array.isArray(s.blocked) && s.blocked.includes(b); }
function fetchMsg(chatKey, msgId) {
  if (chatKey.startsWith('r:')) return db.prepare('SELECT * FROM room_messages WHERE id=? AND room=?').get(msgId, chatKey.slice(2));
  return db.prepare('SELECT * FROM private_messages WHERE id=?').get(msgId);
}

function allUsers(excludeId) {
  const rows = db.prepare('SELECT * FROM users ORDER BY nick').all();
  return rows
    .filter((u) => u.id !== excludeId)
    .map((u) => {
      const pub = publicUser(u);
      let s = userSettings(u.id);
      if (s.showPhone === false) pub.phone = '';
      let online = (userConns.get(u.id)?.size || 0) > 0 || isBot(u.id);
      if (Array.isArray(s.hiddenUsers) && s.hiddenUsers.includes(excludeId)) { online = false; pub.phone = ''; }
      pub.online = online;
      return pub;
    });
}

// ---------- HTTP-сервер: статика + загрузка файлов ----------
const APP_VERSION = require('./package.json').version || '1.0.0';
const EXT_BY_MIME = {
  'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/bmp': '.bmp', 'image/avif': '.avif',
  'audio/webm': '.webm', 'audio/ogg': '.ogg', 'audio/mpeg': '.mp3', 'audio/mp4': '.m4a', 'audio/wav': '.wav',
  'video/webm': '.webm', 'video/mp4': '.mp4', 'video/quicktime': '.mov',
  'application/pdf': '.pdf', 'application/zip': '.zip', 'text/plain': '.txt', 'text/csv': '.csv', 'application/msword': '.doc', 'application/json': '.json',
};
function sniffExt(buf) {
  if (!buf || buf.length < 12) return '';
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return '.jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return '.png';
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return '.gif';
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf.slice(8, 12).toString('ascii') === 'WEBP') return '.webp';
  if (buf.slice(0, 4).toString('ascii') === 'OggS') return '.ogg';
  if (buf[0] === 0x1A && buf[1] === 0x45 && buf[2] === 0xDF && buf[3] === 0xA3) return '.webm';
  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) return '.mp4';
  if (buf.toString('ascii', 0, 4) === '%PDF') return '.pdf';
  if (buf[0] === 0x50 && buf[1] === 0x4B && buf[2] === 0x03 && buf[3] === 0x04) return '.zip';
  if (buf.toString('ascii', 0, 3) === 'ID3' || (buf[0] === 0xFF && (buf[1] & 0xE0) === 0xE0)) return '.mp3';
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf.slice(8, 12).toString('ascii') === 'WAVE') return '.wav';
  return '';
}
const server = http.createServer((req, res) => {
  const pathOnly = req.url.split('?')[0];
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }); res.end(); return; }
  if (pathOnly === '/version' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ version: APP_VERSION, latest: process.env.PULSE_LATEST || APP_VERSION, updateUrl: process.env.PULSE_UPDATE_URL || '' }));
    return;
  }
  if (req.method === 'POST' && pathOnly === '/upload') {
    const ct = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
    const chunks = []; let size = 0; let overflow = false;
    req.on('data', (c) => { size += c.length; if (size > MAX_UPLOAD) overflow = true; else chunks.push(c); });
    req.on('end', () => {
      if (overflow) { res.writeHead(413, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Файл слишком большой' })); return; }
const buf = Buffer.concat(chunks);
let ext = EXT_BY_MIME[ct] || sniffExt(buf);
if (!ext) {
  const q = new URL(req.url, 'http://x').searchParams;
  const fn = String(q.get('name') || '');
  const i = fn.lastIndexOf('.');
  const fromName = i > 0 ? fn.slice(i).toLowerCase() : '';
  if (/^\.[a-z0-9]{1,10}$/.test(fromName)) ext = fromName;
}
if (!ext) ext = '.bin';
const name = crypto.randomBytes(16).toString('hex') + ext;
fs.writeFile(path.join(UPLOAD_DIR, name), buf, (err) => {
if (err) { res.writeHead(500).end('Write error'); return; }
res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
res.end(JSON.stringify({ url: '/uploads/' + name, name, size: buf.length }));
});
    });
    req.on('error', () => { try { res.writeHead(400).end('Bad request'); } catch {} });
    return;
  }
  let urlPath = pathOnly;
  if (urlPath === '/') urlPath = '/index.html';
  const isUpload = urlPath.startsWith('/uploads/');
  const isDownload = /[?&]download=1/.test(req.url);
  const baseDir = isUpload ? UPLOAD_DIR : path.join(__dirname, 'public');
  const filePath = path.join(baseDir, path.normalize(urlPath.replace(/^\/uploads\//, '')));
  if (!filePath.startsWith(baseDir)) { res.writeHead(403).end('Forbidden'); return; }
  const mimeMap = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.webp': 'image/webp', '.gif': 'image/gif', '.bmp': 'image/bmp', '.avif': 'image/avif',
    '.webm': 'audio/webm', '.ogg': 'audio/ogg', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.wav': 'audio/wav',
    '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.mkv': 'video/x-matroska',
    '.pdf': 'application/pdf', '.zip': 'application/zip', '.doc': 'application/msword', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel', '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.txt': 'text/plain', '.csv': 'text/csv', '.json': 'application/json',
  };
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404).end('Not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const mediaSet = ['.jpg','.jpeg','.png','.webp','.gif','.bmp','.avif','.webm','.ogg','.mp3','.m4a','.wav','.mp4','.mov'];
    let mime = mimeMap[ext] || 'application/octet-stream';
    if (isUpload && !mediaSet.includes(ext)) mime = 'application/octet-stream';
    const headers = {
      'Content-Type': mime,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': isUpload ? 'public, max-age=31536000, immutable' : 'no-store',
    };
    if (isUpload && isDownload) headers['Content-Disposition'] = `attachment; filename="${path.basename(filePath)}"`;
    res.writeHead(200, headers);
    res.end(data);
  });
});

// ---------- WebSocket ----------
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  byWs.set(ws, { userId: null, nick: null, color: null, room: null, dm: null });

  const registerWs = (userId) => {
    const u = db.prepare('SELECT * FROM users WHERE id=?').get(userId);
    const st = byWs.get(ws);
    st.userId = u.id; st.nick = u.nick; st.color = u.color;
    if (!userConns.has(u.id)) userConns.set(u.id, new Set());
    userConns.get(u.id).add(ws);
    return u;
  };

  const unregisterWs = (st) => {
    if (!st || !st.userId) return;
    const set = userConns.get(st.userId);
    if (set) { set.delete(ws); if (set.size === 0) userConns.delete(st.userId); }
    if (st.room) broadcastMembers(st.room);
    broadcastUsers(st.userId);
  };

  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw.toString('utf8')); } catch { return; }
    const st = byWs.get(ws);

    switch (data.type) {
      case 'register': {
        const nick = String(data.nick || '').trim().slice(0, MAX_NICK);
        const username = String(data.username || '').trim().toLowerCase().slice(0, 20);
        const pass = String(data.password || '');
        let error;
        if (nick.length < MIN_NICK) error = `Ник должен быть не короче ${MIN_NICK} символов`;
        else if (!isValidUsername(username)) error = 'Юзернейм: 3-20 символов (латиница, цифры, _ или .)';
        else if (db.prepare('SELECT id FROM users WHERE username=?').get(username)) error = 'Такой юзернейм уже занят';
        else if (pass.length < MIN_PASS) error = `Пароль должен быть не короче ${MIN_PASS} символов`;
        if (error) { send(ws, { type: 'auth_fail', error }); return; }
        const salt = crypto.randomBytes(16).toString('hex');
        db.prepare('INSERT INTO users (nick, username, password_hash, salt, color, created_at) VALUES (?, ?, ?, ?, ?, ?)')
          .run(nick, username, hashPassword(pass, salt), salt, colorFor(username), stamp());
        const id = db.prepare('SELECT id FROM users WHERE username=?').get(username).id;
        const token = createSession(id);
        send(ws, { type: 'auth_ok', token, user: publicUser(getUserRow(id)), message: 'Регистрация прошла успешно' });
        broadcastUsers();
        break;
      }
      case 'login': {
        const ident = String(data.nick || data.username || data.phone || '').trim().slice(0, 20);
        const pass = String(data.password || '');
        const identL = ident.toLowerCase();
        const u = db.prepare('SELECT * FROM users WHERE nick=? OR username=? OR phone=?').get(ident, identL, ident);
        if (!u || u.banned) { send(ws, { type: 'auth_fail', error: 'Неверный логин или пароль' }); return; }
        if (hashPassword(pass, u.salt) !== u.password_hash) { send(ws, { type: 'auth_fail', error: 'Неверный логин или пароль' }); return; }
        const token = createSession(u.id);
        send(ws, { type: 'auth_ok', token, user: publicUser(u), message: 'Вход выполнен' });
        break;
      }
      case 'update_profile': {
        if (!st.userId) return;
        const sets = [];
        const args = [];
        if (typeof data.nick === 'string') {
          const nick = data.nick.trim().slice(0, MAX_NICK);
          if (nick.length >= MIN_NICK) { sets.push('nick=?'); args.push(nick); }
        }
        if (typeof data.username === 'string') {
          const username = data.username.trim().toLowerCase().slice(0, 20);
          if (!isValidUsername(username)) {
            send(ws, { type: 'profile_error', error: 'Юзернейм: 3-20 символов (латиница, цифры, _ или .)' });
            break;
          }
          if (db.prepare('SELECT id FROM users WHERE username=? AND id<>?').get(username, st.userId)) {
            send(ws, { type: 'profile_error', error: 'Этот юзернейм уже занят' });
            break;
          }
          sets.push('username=?'); args.push(username);
        }
        if (typeof data.bio === 'string') {
          const bio = data.bio.trim().slice(0, 200);
          sets.push('bio=?'); args.push(bio);
        }
        if (typeof data.phone === 'string') {
          const phone = data.phone.trim().slice(0, 20).replace(/[^\d+()\s-]/g, '');
          sets.push('phone=?'); args.push(phone);
        }
        if (typeof data.status_emoji === 'string') {
          const se = data.status_emoji.trim().slice(0, 8);
          sets.push('status_emoji=?'); args.push(se);
        }
        if (typeof data.avatar === 'string' && (data.avatar === '' || /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.avatar))) {
          sets.push('avatar=?'); args.push(data.avatar);
        }
        if (typeof data.banner === 'string' && (data.banner === '' || /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.banner))) {
          sets.push('banner=?'); args.push(data.banner);
        }
        if (data.settings && typeof data.settings === 'object') {
          const cur = getUserRow(st.userId); let s = {};
          try { s = JSON.parse(cur.settings || '{}'); } catch {}
          Object.assign(s, data.settings);
          sets.push('settings=?'); args.push(JSON.stringify(s));
        }
        if (!sets.length) { send(ws, { type: 'profile_error', error: 'Нет изменений' }); break; }
        args.push(st.userId);
        db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id=?`).run(...args);
        const me = publicUser(getUserRow(st.userId));
        st.nick = me.nick; st.color = me.color;
        const conns = userConns.get(st.userId);
        for (const w of conns || []) if (w.readyState === w.OPEN) send(w, { type: 'profile_ok', user: me });
        broadcastUsers(st.userId);
        // обновить превью ЛС
        const dial = userDialogs(st.userId);
        for (const [w, s] of byWs) if (s.userId === st.userId && w.readyState === w.OPEN) send(w, { type: 'dialog_list', dialogs: dial });
        break;
      }
      case 'hello': {
        const token = String(data.token || '');
const u = getUserByToken(token);
if (!u || u.banned) { send(ws, { type: 'session_invalid' }); return; }
const room = (typeof data.room === 'string' && data.room && roomExists(data.room)) ? data.room : 'general';
        registerWs(u.id);
        st.room = room;
        const me = publicUser(u);
        send(ws, {
          type: 'init',
          room,
          me,
          rooms: roomList(),
          history: roomHistory(room, u.id),
          pinned: pinnedFor('r:' + room),
          contacts: allUsers(u.id),
          dialogs: userDialogs(u.id),
        });
        broadcastUsers(u.id);
        break;
      }
      case 'message': {
        if (!st.userId) return;
        const text = String(data.text || '').trim().slice(0, 500);
        const image = isImgUrl(data.image) ? data.image : '';
        const stickerRaw = String(data.sticker || '').trim();
        const sticker = stickerRaw.startsWith('/uploads/') ? stickerRaw.slice(0, 80) : stickerRaw.slice(0, 8);
        const audio = typeof data.audio === 'string' && /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.audio) ? data.audio : '';
        const video = typeof data.video === 'string' && /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.video) ? data.video : '';
        let file = '';
        if (data.file && data.file.url && /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.file.url)) file = JSON.stringify({ name: String(data.file.name || 'файл').slice(0, 120), size: Number(data.file.size) || 0, url: data.file.url });
        const reply = String(data.reply || '').slice(0, 200);
        if (!text && !image && !sticker && !audio && !video && !file && !reply) return;
        addRoomMessage(st.room, 'user', st.nick, st.color, text, image, sticker, audio, video, file, reply);
        break;
      }
      case 'join': {
        if (!st.userId) return;
        let next = roomExists(data.room) ? data.room : 'general';
        if (next !== 'general') {
          const ch = db.prepare('SELECT private, invite FROM channels WHERE name=?').get(next);
          if (ch && ch.private && String(data.code || '') !== ch.invite) { send(ws, { type: 'channel_error', error: 'Это приватный канал. Нужен код доступа.' }); break; }
        }
        if (next === st.room) return;
        st.room = next;
        st.dm = null;
        if (db.prepare('SELECT id FROM channels WHERE name=?').get(next)) db.prepare('INSERT OR IGNORE INTO channel_subs (channel, user_id, at) VALUES (?,?,?)').run(next, st.userId, stamp());
        send(ws, { type: 'history', history: roomHistory(next, st.userId), pinned: pinnedFor('r:' + next) });
        broadcastRooms();
        break;
      }
case 'typing': {
        if (!st.userId) return;
        broadcast(st.room, { type: 'typing', nick: st.nick, isTyping: !!data.isTyping }, ws);
        break;
      }
case 'create_channel': {
        if (!st.userId) return;
        const name = String(data.name || '').trim().toLowerCase();
        const isPrivate = !!data.private;
        let error;
        if (!/^[a-z0-9_-]{3,20}$/.test(name)) error = 'Имя канала: 3-20 символов (латиница, цифры, _ или -)';
        else if (ROOMS.includes(name)) error = 'Такая комната уже существует';
        else if (db.prepare('SELECT id FROM channels WHERE name=?').get(name)) error = 'Канал с таким именем уже есть';
        if (error) { send(ws, { type: 'channel_error', error }); return; }
        const invite = isPrivate ? crypto.randomBytes(6).toString('hex') : '';
        db.prepare('INSERT INTO channels (name, owner_id, private, invite, created_at) VALUES (?, ?, ?, ?, ?)').run(name, st.userId, isPrivate ? 1 : 0, invite, stamp());
addRoomMessage(name, 'system', null, null, 'Канал @' + name + ' создан');
        broadcastRooms();
        send(ws, { type: 'channel_ok', name, private: isPrivate, invite });
        break;
      }
case 'create_poll': {
        if (!st.userId) return;
        const room = roomExists(data.room) ? data.room : null;
        if (!room) return;
        const q = String(data.question || '').trim().slice(0, 200);
        const opts = (data.options || []).map((o) => String(o).trim().slice(0, 60)).filter(Boolean);
        if (q.length < 2 || opts.length < 2 || opts.length > 10) { send(ws, { type: 'poll_error', error: 'Нужен вопрос и 2-10 вариантов' }); return; }
        const poll = JSON.stringify({ q, options: opts.map((t) => ({ t, v: 0 })), votes: {} });
        addRoomMessage(room, 'user', st.nick, st.color, '', '', '', '', '', '', '', poll);
        break;
      }
      case 'vote': {
        if (!st.userId) return;
        const ck = String(data.chatKey || '');
        const msgId = Number(data.message_id);
        if (!ck.startsWith('r:')) return;
        const row = db.prepare('SELECT * FROM room_messages WHERE id=? AND room=?').get(msgId, ck.slice(2));
        if (!row || !row.poll) return;
        let poll; try { poll = JSON.parse(row.poll); } catch { return; }
        const opt = Number(data.option);
        if (opt < 0 || opt >= poll.options.length) return;
        poll.votes[st.userId] = opt;
        poll.options.forEach((o, i) => o.v = Object.values(poll.votes).filter((x) => x === i).length);
        db.prepare('UPDATE room_messages SET poll=? WHERE id=?').run(JSON.stringify(poll), msgId);
        broadcast(ck.slice(2), { type: 'poll_update', chatKey: ck, message_id: msgId, poll });
        break;
      }
case 'delete_message': {
        if (!st.userId) return;
        const msgId = Number(data.message_id);
        if (!msgId) return;
        const isRoom = typeof data.room === 'string' && roomExists(data.room);
        const isPm = Number(data.pm) && userSummary(Number(data.pm));
        if (!isRoom && !isPm) return;
        const chatKey = isRoom ? 'r:' + data.room : 'p:' + Number(data.pm);
        let row = isRoom ? db.prepare('SELECT * FROM room_messages WHERE id=? AND room=?').get(msgId, data.room) : db.prepare('SELECT * FROM private_messages WHERE id=? AND (from_user=? OR to_user=?)').get(msgId, st.userId, st.userId);
        if (!row) return;
        let can = isRoom ? (row.nick === st.nick) : (row.from_user === st.userId);
        if (isRoom && !can) { const role = channelRoleOf(data.room, st.userId); if (role === 'owner' || role === 'admin') can = true; }
        if (!can) return;
        if (isRoom) db.prepare('DELETE FROM room_messages WHERE id=?').run(msgId); else db.prepare('DELETE FROM private_messages WHERE id=?').run(msgId);
        db.prepare('DELETE FROM reactions WHERE chat_key=? AND message_id=?').run(chatKey, msgId);
        db.prepare('DELETE FROM pins WHERE chat_key=? AND message_id=?').run(chatKey, msgId);
        deliverReaction(chatKey, st.userId, { type: 'message_deleted', chatKey, message_id: msgId });
        break;
      }
case 'channel_stats': {
        if (!st.userId) break;
        const name = String(data.name || '');
        const ch = db.prepare('SELECT * FROM channels WHERE name=?').get(name);
        if (!ch) break;
        const subs = db.prepare('SELECT COUNT(*) c FROM channel_subs WHERE channel=?').get(name).c;
        const m = db.prepare('SELECT COUNT(*) c, COALESCE(SUM(views),0) v FROM room_messages WHERE room=?').get(name);
        send(ws, { type: 'channel_stats', name, subscribers: subs, messages: m.c, views: m.v, created: ch.created_at, mySubscribed: !!db.prepare('SELECT 1 FROM channel_subs WHERE channel=? AND user_id=?').get(name, st.userId) });
        break;
      }
      case 'channel_sub': {
        if (!st.userId) break;
        const name = String(data.name || '');
        if (!roomExists(name)) break;
        if (data.add) db.prepare('INSERT OR IGNORE INTO channel_subs (channel, user_id, at) VALUES (?,?,?)').run(name, st.userId, stamp());
        else db.prepare('DELETE FROM channel_subs WHERE channel=? AND user_id=?').run(name, st.userId);
        break;
      }
case 'give_stars': {
        if (!st.userId) break;
        const ow = getUserRow(st.userId);
        if (!ow || ow.username !== OWNER_USERNAME) break;
        const to = Number(data.to); const amt = Math.round(Number(data.amount) || 0);
        if (!userSummary(to) || amt <= 0) break;
        db.prepare('UPDATE users SET stars=stars+? WHERE id=?').run(amt, to);
        const ns = db.prepare('SELECT stars FROM users WHERE id=?').get(to).stars;
        send(ws, { type: 'stars_update', user_id: to, stars: ns });
        broadcastUsers();
        break;
      }
      case 'gift_catalog': {
        if (!st.userId) break;
        const me = getUserRow(st.userId);
        send(ws, { type: 'gift_catalog', catalog: GIFT_CAT, stars: me.stars || 0 });
        break;
      }
case 'send_gift': {
        if (!st.userId) break;
        const to = Number(data.to); const gid = Number(data.gid);
        const g = GIFT_CAT.find((x) => x.gid === gid);
        if (!g || !userSummary(to)) break;
        const note = String(data.text || '').trim().slice(0, 200);
        const from = getUserRow(st.userId);
        if ((from.stars || 0) < g.price) { send(ws, { type: 'gift_error', error: 'РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РІР°Р»СЋС‚С‹' }); break; }
        const at = stamp();
        db.prepare('UPDATE users SET stars=stars-? WHERE id=?').run(g.price, st.userId);
        db.prepare('INSERT INTO gifts (from_user, to_user, gid, at, text) VALUES (?,?,?,?,?)').run(st.userId, to, gid, at, note);
        const fs = db.prepare('SELECT stars FROM users WHERE id=?').get(st.userId).stars;
        send(ws, { type: 'stars_update', user_id: st.userId, stars: fs });
        const rs = db.prepare('SELECT stars FROM users WHERE id=?').get(to).stars;
        for (const w of userConns.get(to) || []) if (w.readyState === w.OPEN) send(w, { type: 'stars_update', user_id: to, stars: rs });
        send(ws, { type: 'gift_sent', gid, to, price: g.price });
        for (const w of userConns.get(to) || []) if (w.readyState === w.OPEN) send(w, { type: 'gift_received', to, from: st.userId, gid, at, text: note, name: g.name, emoji: g.emoji, fromNick: userName(st.userId) });
        sendPm(st.userId, to, { text: note, sticker: g.emoji });
        break;
      }
      case 'pinned_gifts': {
        if (!st.userId) break;
        const uid = Number(data.user_id) || st.userId;
        send(ws, { type: 'pinned_gifts', user_id: uid, pinned: pinnedGiftsList(uid) });
        break;
      }
      case 'pin_gift': {
        if (!st.userId) break;
        const g = GIFT_CAT.find((x) => x.gid === Number(data.gid));
        if (!g) break;
        if (db.prepare('SELECT 1 FROM user_pinned_gifts WHERE user_id=? AND gid=?').get(st.userId, g.gid)) break;
        const cnt = db.prepare('SELECT COUNT(*) c FROM user_pinned_gifts WHERE user_id=?').get(st.userId).c;
        if (cnt >= 6) { send(ws, { type: 'pin_gift_err', error: 'Максимум 6 закреплённых подарков' }); break; }
        db.prepare('INSERT INTO user_pinned_gifts (user_id, gid, at) VALUES (?,?,?)').run(st.userId, g.gid, stamp());
        send(ws, { type: 'pinned_gifts', user_id: st.userId, pinned: pinnedGiftsList(st.userId) });
        break;
      }
      case 'unpin_gift': {
        if (!st.userId) break;
        db.prepare('DELETE FROM user_pinned_gifts WHERE user_id=? AND gid=?').run(st.userId, Number(data.gid));
        send(ws, { type: 'pinned_gifts', user_id: st.userId, pinned: pinnedGiftsList(st.userId) });
        break;
      }
      case 'received_gifts': {
        if (!st.userId) break;
        const uid = Number(data.user_id) || st.userId;
        const rows = db.prepare('SELECT * FROM gifts WHERE to_user=? ORDER BY id DESC LIMIT 50').all(uid);
        send(ws, { type: 'received_gifts', gifts: rows.map((r) => { const g = GIFT_CAT.find((x) => x.gid === r.gid) || { name: '?', emoji: '?', price: 0 }; return { ...r, name: g.name, emoji: g.emoji, price: g.price, fromNick: userName(r.from_user) }; }) });
        break;
      }
case 'user_stats': {
        if (!st.userId) break;
        const uid = Number(data.user_id) || st.userId;
        const nickRow = db.prepare('SELECT nick FROM users WHERE id=?').get(uid);
        const mc = nickRow ? db.prepare("SELECT COUNT(*) c FROM room_messages WHERE nick=?").get(nickRow.nick).c : 0;
        const pm = db.prepare('SELECT COUNT(*) c FROM private_messages WHERE from_user=?').get(uid).c;
        const gs = db.prepare('SELECT COUNT(*) c FROM gifts WHERE to_user=?').get(uid).c;
        const online = (userConns.get(uid)?.size || 0) > 0 || isBot(uid);
        send(ws, { type: 'user_stats', user_id: uid, messages: mc + pm, gifts: gs, online });
        break;
      }
case 'post_story': {
        if (!st.userId) break;
        const url = String(data.url || '');
        if (!/^\/uploads\/[A-Za-z0-9._-]+$/.test(url)) break;
        db.prepare('INSERT INTO stories (user_id, url, at) VALUES (?,?,?)').run(st.userId, url, stamp());
        send(ws, { type: 'story_posted' });
        break;
      }
      case 'stories_list': {
        if (!st.userId) break;
        const cutoff = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
        db.prepare('DELETE FROM stories WHERE at<=?').run(cutoff);
        const rows = db.prepare('SELECT s.id, s.user_id, s.url, u.nick, u.color, u.avatar FROM stories s JOIN users u ON u.id=s.user_id WHERE s.at>? ORDER BY s.at DESC').all(cutoff);
        const map = {};
        rows.forEach((r) => { if (!map[r.user_id]) map[r.user_id] = { user: { id: r.user_id, nick: r.nick, color: r.color, avatar: r.avatar }, stories: [] }; map[r.user_id].stories.push({ id: r.id, url: r.url }); });
        send(ws, { type: 'stories_list', users: Object.values(map) });
        break;
      }
      case 'typing': {
        if (!st.userId) return;
        broadcast(st.room, { type: 'typing', nick: st.nick, isTyping: !!data.isTyping }, ws);
        break;
      }
      case 'pm': {
        if (!st.userId) return;
        const toId = Number(data.to);
        const text = String(data.text || '').trim().slice(0, 500);
        const image = isImgUrl(data.image) ? data.image : '';
        const stickerRaw = String(data.sticker || '').trim();
        const sticker = stickerRaw.startsWith('/uploads/') ? stickerRaw.slice(0, 80) : stickerRaw.slice(0, 8);
        const audio = typeof data.audio === 'string' && /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.audio) ? data.audio : '';
        const video = typeof data.video === 'string' && /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.video) ? data.video : '';
        let file = '';
        if (data.file && data.file.url && /^\/uploads\/[A-Za-z0-9._-]+$/.test(data.file.url)) file = JSON.stringify({ name: String(data.file.name || 'файл').slice(0, 120), size: Number(data.file.size) || 0, url: data.file.url });
        const reply = String(data.reply || '').slice(0, 200);
        if ((!text && !image && !sticker && !audio && !video && !file && !reply) || !userSummary(toId)) return;
        if (isBlocked(st.userId, toId)) { send(ws, { type: 'pm_blocked' }); break; }
        sendPm(st.userId, toId, { text, image, sticker, audio, video, file, reply });
        break;
      }
      case 'open_dialog': {
        if (!st.userId) return;
        const pid = Number(data.with);
        if (!userSummary(pid)) return;
        markDialogRead(st.userId, pid);
        st.dm = pid;
        send(ws, { type: 'open_dialog', partner: userSummary(pid), history: privateHistory(st.userId, pid), pinned: pinnedFor('p:' + pid) });
        send(ws, { type: 'dialog_list', dialogs: userDialogs(st.userId) });
        break;
      }
      case 'contacts': {
        if (!st.userId) return;
        send(ws, { type: 'contacts', contacts: allUsers(st.userId) });
        break;
      }
      case 'history_more': {
        if (!st.userId) return;
        const before = Number(data.before);
        if (!before) break;
        if (typeof data.room === 'string' && roomExists(data.room)) {
          const rows = db.prepare('SELECT * FROM room_messages WHERE room=? AND id<? AND kind!=\'system\' ORDER BY id DESC LIMIT 40').all(data.room, before).reverse();
          send(ws, { type: 'history_more', messages: attachReactions('r:' + data.room, rows, st.userId) });
          break;
        }
        const pid = Number(data.pm);
        if (pid && userSummary(pid)) {
          const rows = db.prepare('SELECT * FROM private_messages WHERE ((from_user=? AND to_user=?) OR (from_user=? AND to_user=?)) AND id<? ORDER BY id DESC LIMIT 40').all(st.userId, pid, pid, st.userId, before).reverse();
          const wr = attachReactions('p:' + pid, rows, st.userId).map((row) => { const s = userSummary(row.from_user) || {}; return { ...row, from: row.from_user, fromNick: s.nick || '', fromColor: s.color, fromAvatar: s.avatar }; });
          send(ws, { type: 'history_more', messages: wr });
        }
        break;
      }
      case 'qr': {
        const text = String(data.text || '').slice(0, 500);
        if (!text) break;
        QRCode.toDataURL(text, { width: 280, margin: 1 }).then((url) => send(ws, { type: 'qr', url })).catch(() => {});
        break;
      }
      case 'search_msgs': {
        if (!st.userId) break;
        const q = String(data.q || '').trim().toLowerCase().slice(0, 50);
        if (q.length < 2) { send(ws, { type: 'search_msgs', results: [] }); break; }
        const res = [];
        for (const r of allRoomNames()) {
          const rows = db.prepare("SELECT room,text,nick,id FROM room_messages WHERE room=? AND kind!='system' AND lower(text) LIKE ? ORDER BY id DESC LIMIT 8").all(r, '%' + q + '%');
          rows.forEach((x) => res.push({ chatKey: 'r:' + x.room, id: x.id, txt: String(x.text).slice(0, 140), nick: x.nick || '' }));
        }
        const pms = db.prepare("SELECT * FROM private_messages WHERE (from_user=? OR to_user=?) AND lower(text) LIKE ? ORDER BY id DESC LIMIT 8").all(st.userId, st.userId, '%' + q + '%');
        pms.forEach((x) => { const pid = x.from_user === st.userId ? x.to_user : x.from_user; res.push({ chatKey: 'p:' + pid, id: x.id, txt: String(x.text).slice(0, 140), nick: '' }); });
        send(ws, { type: 'search_msgs', results: res.slice(0, 30) });
        break;
      }
      case 'check_username': {
        const u = String(data.username || '').trim().toLowerCase().slice(0, 20);
        send(ws, { type: 'username_check', username: u, available: !db.prepare('SELECT id FROM users WHERE username=?').get(u) });
        break;
      }
      case 'call_log': {
        if (!st.userId) break;
        const partner = Number(data.partner);
        if (!userSummary(partner)) break;
        const status = String(data.status || 'answered').slice(0, 12);
        const duration = Math.max(0, Math.floor(Number(data.duration) || 0));
        db.prepare('INSERT INTO calls (user_id, partner_id, status, duration, at) VALUES (?,?,?,?,?)').run(st.userId, partner, status, duration, stamp());
        break;
      }
      case 'calls_list': {
        if (!st.userId) break;
        const rows = db.prepare('SELECT * FROM calls WHERE user_id=? ORDER BY id DESC LIMIT 50').all(st.userId);
        send(ws, { type: 'calls_list', calls: rows.map((r) => ({ id: r.id, partner_id: r.partner_id, status: r.status, duration: r.duration, at: r.at, partnerNick: userName(r.partner_id), partnerColor: userColor(r.partner_id) })) });
        break;
      }
      case 'my_stickers': {
        if (!st.userId) return;
        send(ws, { type: 'stickers', stickers: myStickers(st.userId) });
        break;
      }
      case 'create_sticker': {
        if (!st.userId) return;
        const type = data.kind === 'gif' ? 'gif' : 'sticker';
        const url = String(data.url || '');
        if (!/^\/uploads\/[A-Za-z0-9._-]+$/.test(url)) { send(ws, { type: 'sticker_error', error: 'Неверный файл' }); break; }
        const info = db.prepare('INSERT INTO user_stickers (user_id, type, url, created_at) VALUES (?, ?, ?, ?)').run(st.userId, type, url, stamp());
        send(ws, { type: 'sticker_created', sticker: { id: Number(info.lastInsertRowid), type, url } });
        break;
      }
      case 'reaction': {
        if (!st.userId) return;
        const emoji = String(data.emoji || '').trim().slice(0, 4);
        if (!emoji) return;
        const msgId = Number(data.message_id);
        if (!msgId) return;
        let chatKey = null;
        if (typeof data.room === 'string' && roomExists(data.room)) chatKey = 'r:' + data.room;
        else if (Number(data.pm) && userSummary(Number(data.pm))) chatKey = 'p:' + Number(data.pm);
        if (!chatKey) return;
        const existing = db.prepare('SELECT id FROM reactions WHERE chat_key=? AND message_id=? AND user_id=? AND emoji=?').get(chatKey, msgId, st.userId, emoji);
        if (existing) db.prepare('DELETE FROM reactions WHERE id=?').run(existing.id);
        else db.prepare('INSERT INTO reactions (chat_key, message_id, user_id, emoji, created_at) VALUES (?, ?, ?, ?, ?)').run(chatKey, msgId, st.userId, emoji, stamp());
        deliverReaction(chatKey, st.userId, { type: 'reaction', chatKey, message_id: msgId, reactions: reactionsFor(chatKey, msgId, st.userId), act_user: st.userId });
        break;
      }
      case 'edit_message': {
        if (!st.userId) return;
        const msgId = Number(data.message_id);
        const text = String(data.text || '').trim().slice(0, 500);
        if (!msgId || !text) return;
        const isRoom = typeof data.room === 'string' && roomExists(data.room);
        const isPm = Number(data.pm) && userSummary(Number(data.pm));
        if (!isRoom && !isPm) return;
        let row = null;
        if (isRoom) row = db.prepare('SELECT * FROM room_messages WHERE id=? AND room=?').get(msgId, data.room);
        else row = db.prepare('SELECT * FROM private_messages WHERE id=? AND (from_user=? OR to_user=?)').get(msgId, st.userId, st.userId);
        if (!row) return;
        const mineRoom = isRoom ? (row.nick === st.nick) : (row.from_user === st.userId);
        if (!mineRoom) return;
        const at = stamp();
        if (isRoom) db.prepare('UPDATE room_messages SET text=?, edited=1 WHERE id=?').run(text, msgId);
        else db.prepare('UPDATE private_messages SET text=?, edited=1 WHERE id=?').run(text, msgId);
        const chatKey = isRoom ? 'r:' + data.room : 'p:' + Number(data.pm);
        deliverReaction(chatKey, st.userId, { type: 'message_update', chatKey, message_id: msgId, text, edited: 1, at });
        break;
      }
      case 'forward': {
        if (!st.userId) return;
        const ids = Array.isArray(data.message_ids) ? data.message_ids.map(Number).filter(Boolean) : [Number(data.message_id)];
        if (!ids.length) return;
        const srcRoom = typeof data.sourceRoom === 'string' && roomExists(data.sourceRoom) ? data.sourceRoom : null;
        const srcPm = Number(data.sourcePm) && userSummary(Number(data.sourcePm)) ? Number(data.sourcePm) : null;
        if (!srcRoom && !srcPm) return;
        let toRoom = typeof data.toRoom === 'string' && roomExists(data.toRoom) ? data.toRoom : null;
        let toPm = Number(data.toPm) && userSummary(Number(data.toPm)) ? Number(data.toPm) : null;
        if (!toRoom && !toPm) return;
        for (const srcMsgId of ids) {
          let src = srcRoom
            ? db.prepare('SELECT * FROM room_messages WHERE id=? AND room=?').get(srcMsgId, srcRoom)
            : db.prepare('SELECT * FROM private_messages WHERE id=? AND (from_user=? OR to_user=?)').get(srcMsgId, st.userId, st.userId);
          if (!src || src.kind === 'system') continue;
          const content = { text: src.text || '', image: src.image || '', sticker: src.sticker || '', audio: src.audio || '', video: src.video || '', file: src.file || '', forwarded: 1 };
          if (toRoom) addRoomMessage(toRoom, 'user', st.nick, st.color, content.text, content.image, content.sticker, content.audio, content.video, content.file);
          else sendPm(st.userId, toPm, content);
        }
        break;
      }
      case 'pin': {
        if (!st.userId) return;
        const msgId = Number(data.message_id);
        if (!msgId) return;
        const isRoom = typeof data.room === 'string' && roomExists(data.room);
        const isPm = Number(data.pm) && userSummary(Number(data.pm));
        if (!isRoom && !isPm) return;
        const chatKey = isRoom ? 'r:' + data.room : 'p:' + Number(data.pm);
        db.prepare('INSERT OR IGNORE INTO pins (chat_key, message_id, pinned_by, at) VALUES (?, ?, ?, ?)').run(chatKey, msgId, st.userId, stamp());
        deliverReaction(chatKey, st.userId, { type: 'pins', chatKey, pinned: pinnedFor(chatKey) });
        break;
      }
      case 'unpin': {
        if (!st.userId) return;
        const msgId = Number(data.message_id);
        if (!msgId) return;
        const isRoom = typeof data.room === 'string' && roomExists(data.room);
        const isPm = Number(data.pm) && userSummary(Number(data.pm));
        if (!isRoom && !isPm) return;
        const chatKey = isRoom ? 'r:' + data.room : 'p:' + Number(data.pm);
        db.prepare('DELETE FROM pins WHERE chat_key=? AND message_id=?').run(chatKey, msgId);
        deliverReaction(chatKey, st.userId, { type: 'pins', chatKey, pinned: pinnedFor(chatKey) });
        break;
      }
      case 'admin_ban': {
        if (!st.userId) return;
        const ownerRow = getUserRow(st.userId);
        if (!ownerRow || ownerRow.username !== OWNER_USERNAME) return;
        const targetId = Number(data.user_id);
        const ban = !!data.ban;
        if (!targetId || targetId === st.userId) return;
        db.prepare('UPDATE users SET banned=? WHERE id=?').run(ban ? 1 : 0, targetId);
        db.prepare('DELETE FROM sessions WHERE user_id=?').run(targetId);
        send(ws, { type: 'admin_ok', user_id: targetId, banned: ban });
        broadcastUsers();
        break;
      }
      case 'fav_toggle': {
        if (!st.userId) return;
        const chatKey = String(data.chatKey || 'r:general');
        const msgId = Number(data.message_id);
        if (!msgId) break;
        const ex = db.prepare('SELECT id FROM favorites WHERE user_id=? AND chat_key=? AND message_id=?').get(st.userId, chatKey, msgId);
        if (ex) { db.prepare('DELETE FROM favorites WHERE id=?').run(ex.id); send(ws, { type: 'fav_state', message_id: msgId, fav: false }); break; }
        const m = fetchMsg(chatKey, msgId);
        db.prepare('INSERT INTO favorites (user_id, chat_key, message_id, snap) VALUES (?,?,?,?)').run(st.userId, chatKey, msgId, m ? JSON.stringify({ txt: m.text, img: m.image, audio: m.audio, video: m.video, sticker: m.sticker, file: m.file }) : '');
        send(ws, { type: 'fav_state', message_id: msgId, fav: true });
        break;
      }
      case 'fav_list': {
        if (!st.userId) return;
        const rows = db.prepare('SELECT chat_key, message_id, snap FROM favorites WHERE user_id=? ORDER BY id DESC').all(st.userId);
        send(ws, { type: 'fav_list', items: rows.map((r) => ({ chatKey: r.chat_key, message_id: r.message_id, ...(r.snap ? JSON.parse(r.snap) : {}) })) });
        break;
      }
      case 'channel_members': {
        if (!st.userId) return;
        const roomName = String(data.room || '');
        if (!roomExists(roomName)) break;
        const ch = db.prepare('SELECT admins FROM channels WHERE name=?').get(roomName);
        let admins = [];
        try { admins = JSON.parse(ch ? ch.admins : '[]'); } catch {}
        const members = [...roomMembers(roomName)].map((id) => { const s = userSummary(id); return s ? { id, nick: s.nick, color: s.color, role: channelRoleOf(roomName, id) } : null; }).filter(Boolean);
        send(ws, { type: 'channel_members', room: roomName, admins, members, myRole: channelRoleOf(roomName, st.userId) });
        break;
      }
      case 'channel_invite': {
        if (!st.userId) break;
        const ch = db.prepare('SELECT * FROM channels WHERE name=?').get(String(data.name || ''));
        if (!ch || ch.owner_id !== st.userId) break;
        send(ws, { type: 'channel_invite', name: ch.name, invite: ch.invite || '' });
        break;
      }
      case 'channel_admin': {
        if (!st.userId) return;
        const ch = db.prepare('SELECT * FROM channels WHERE name=?').get(String(data.name || ''));
        if (!ch || ch.owner_id !== st.userId) break;
        const uid = Number(data.user_id);
        let admins = []; try { admins = JSON.parse(ch.admins || '[]'); } catch {}
        if (data.add) { if (!admins.includes(uid)) { admins.push(uid); db.prepare('UPDATE channels SET admins=? WHERE id=?').run(JSON.stringify(admins), ch.id); } }
        else { db.prepare('UPDATE channels SET admins=? WHERE id=?').run(JSON.stringify(admins.filter((x) => x !== uid)), ch.id); }
        break;
      }
      // --- звонки / экран: релей сигналинга (WebRTC) ---
      case 'call_signal': {
        if (!st.userId) return;
        const toId = Number(data.to);
        if (!userSummary(toId)) return;
        const payload = { ...data.payload, from: st.userId, fromNick: st.nick };
        for (const w of userConns.get(toId) || []) if (w.readyState === w.OPEN) send(w, { type: 'call_signal', from: st.userId, fromNick: st.nick, payload });
        break;
      }
      case 'voice_join': {
        if (!st.userId) return;
        const room = roomExists(data.room) ? data.room : null;
        if (!room) break;
        if (!voiceRooms.has(room)) voiceRooms.set(room, new Set());
        voiceRooms.get(room).add(st.userId);
        broadcastVoice(room);
        break;
      }
      case 'voice_leave': {
        if (!st.userId) return;
        const room = data.room;
        const set = voiceRooms.get(room);
        if (set && set.delete(st.userId)) { if (set.size === 0) voiceRooms.delete(room); broadcastVoice(room); }
        break;
      }
    }
  });

  ws.on('close', () => {
    const st = byWs.get(ws);
    if (st && st.userId) removeFromVoice(st.userId);
    unregisterWs(st);
    byWs.delete(ws);
  });
  ws.on('error', () => { byWs.delete(ws); });
});

function broadcastUsers() {
  for (const [ws, st] of byWs) {
    if (st.userId && ws.readyState === ws.OPEN) send(ws, { type: 'contacts', contacts: allUsers(st.userId) });
  }
}

// корректное закрытие БД при остановке сервера
function shutdown() {
  try { db.close(); } catch {}
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// при запуске как модуль (Electron) — не слушаем сами, а экспортируем
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Pulse Chat running at http://localhost:${PORT}`);
  });
} else {
  module.exports = { server, db, start(cb) {
    server.listen(PORT, () => {
      try {
        const bdir = path.join(path.dirname(DB_PATH), 'backups');
        if (!fs.existsSync(bdir)) fs.mkdirSync(bdir, { recursive: true });
        fs.copyFileSync(DB_PATH, path.join(bdir, 'chat-' + new Date().toISOString().replace(/[:.]/g, '-') + '.db'));
        const files = fs.readdirSync(bdir).filter((f) => f.endsWith('.db')).sort();
        while (files.length > 20) { fs.unlinkSync(path.join(bdir, files[0])); files.shift(); }
      } catch {}
      if (cb) cb();
    });
  } };
}