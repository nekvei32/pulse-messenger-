const crypto = require('crypto');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

// Сброс пароля пользователя: node reset-password.js <username|nick> <новый_пароль>
const [,, ident, newPass] = process.argv;
const db = new DatabaseSync(path.join(__dirname, 'chat.db'));

if (!ident || !newPass) {
  console.log('Использование: node reset-password.js <username|nick> <новый_пароль>');
  console.log('Пример: node reset-password.js nekq МойНовыйПароль123');
  process.exit(1);
}
if (newPass.length < 4) { console.log('Пароль должен быть минимум 4 символа'); process.exit(1); }

const u = db.prepare('SELECT * FROM users WHERE username=? OR nick=?').get(String(ident).toLowerCase(), String(ident));
if (!u) { console.log(`Пользователь "${ident}" не найден`); process.exit(1); }

const salt = crypto.randomBytes(16).toString('hex');
db.prepare('UPDATE users SET salt=?, password_hash=? WHERE id=?')
  .run(salt, crypto.scryptSync(newPass, salt, 64).toString('hex'), u.id);
// удалим старые сессии, чтобы вход был только по новому паролю
db.prepare('DELETE FROM sessions WHERE user_id=?').run(u.id);

console.log(`Пароль для "${u.username}" (${u.nick}) сброшен.`);
console.log('Теперь войди в приложение с логином ' + u.username + ' и этим паролем.');
db.close();