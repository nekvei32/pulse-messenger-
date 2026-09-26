const path = require('path');
const fs = require('fs');
const net = require('net');
const { app, BrowserWindow, shell, ipcMain, session, desktopCapturer } = require('electron');

// режим фонового бота (запуск: electron . --bot)
const isBot = process.argv.includes('--bot');
if (isBot) app.setPath('userData', path.join(app.getPath('userData'), '-bot'));

// отключаем дисковый кэш и кэш GPU (убирает «Отказано в доступе» при нескольких экземплярах)
app.commandLine.appendSwitch('disk-cache-size', '0');
app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-gpu-cache');

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;
// настраиваем пути БД и загрузок в папку данных приложения (пишется на машине пользователя)
process.env.PULSE_DB_PATH = path.join(app.getPath('userData'), 'chat.db');
process.env.PULSE_UPLOAD_DIR = path.join(app.getPath('userData'), 'uploads');
const SESSION_FILE = () => path.join(app.getPath('userData'), 'session.json');

let server = null; // модуль server.js (внутренний сервер)

// --- надёжное хранение токена в файле ---
ipcMain.handle('pulse:token:get', () => {
  try { return JSON.parse(fs.readFileSync(SESSION_FILE(), 'utf8')).token || null; } catch { return null; }
});
ipcMain.handle('pulse:token:set', (e, token) => {
  try { fs.writeFileSync(SESSION_FILE(), JSON.stringify({ token: token || '' })); } catch {}
  return true;
});
ipcMain.handle('pulse:token:clear', () => {
  try { fs.writeFileSync(SESSION_FILE(), JSON.stringify({ token: '' })); } catch {}
  return true;
});
ipcMain.handle('screen:list', async () => {
  try {
    const s = await desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: { width: 260, height: 150 } });
    return s.map((x) => ({ id: x.id, name: x.name, thumb: x.thumbnail.isEmpty() ? '' : x.thumbnail.toDataURL() }));
  } catch { return []; }
});

function portOpen(port) {
  return new Promise((resolve) => {
    const s = net.connect({ port, host: '127.0.0.1' });
    s.on('connect', () => { s.destroy(); resolve(true); });
    s.on('error', () => { s.destroy(); resolve(false); });
  });
}

async function startServerIfNeeded() {
  if (await portOpen(PORT)) return; // уже запущен (например, dev-server)
  server = require('./server.js'); // запускает встроенный сервер внутри Electron
  server.start(() => {
    console.log(`[Pulse] server started in-process on :${PORT}`);
  });
  for (let i = 0; i < 40; i++) {
    if (await portOpen(PORT)) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('Pulse server did not start');
}

function createWindow(bot) {
  const url = bot ? `${URL}/?autologin=autobot&password=botpass1` : URL;
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 720, minHeight: 520,
    backgroundColor: '#0f1117', title: bot ? 'Pulse Bot' : 'Pulse Messenger',
    autoHideMenuBar: true, show: !bot,
    webPreferences: { contextIsolation: true, nodeIntegration: false, backgroundThrottling: !bot, preload: path.join(__dirname, 'preload.js') },
  });
  win.removeMenu();
  win.loadURL(url);
  win.webContents.setWindowOpenHandler(({ url: u }) => { if (/^https?:/i.test(u)) shell.openExternal(u); return { action: 'deny' }; });
  return win;
}

app.whenReady().then(async () => {
  if (isBot) {
    // скрытому боту разрешаем микрофон без диалога
    session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => cb(permission.startsWith('media')));
  }
  try {
    if (!isBot) await startServerIfNeeded();
    createWindow(isBot);
  } catch (e) {
    console.error('[Pulse]', e.message);
    app.quit();
    return;
  }
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(isBot); });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
  if (server && server.db) { try { server.db.close(); } catch {} }
});