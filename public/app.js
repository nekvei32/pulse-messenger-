(() => {
  const $ = (id) => document.getElementById(id);

  const el = {
    authScreen: $('authScreen'), bootScreen: $('bootScreen'), app: $('app'),
    tabLogin: $('tabLogin'), tabRegister: $('tabRegister'),
    loginForm: $('loginForm'), registerForm: $('registerForm'),
    loginNick: $('loginNick'), loginPass: $('loginPass'),
    regUsername: $('regUsername'), regNick: $('regNick'), regPass: $('regPass'), regPass2: $('regPass2'), regUserHint: $('regUserHint'),
    authError: $('authError'),
    meCard: $('meCard'), meAvatar: $('meAvatar'), meNick: $('meNick'), meStatus: $('meStatus'),
    logoutBtn: $('logoutBtn'), profileBtn: $('profileBtn'),
    navTabs: document.querySelectorAll('.nav-tab'),
    viewRooms: $('viewRooms'), viewPm: $('viewPm'), viewContacts: $('viewContacts'),
    pmUnreadBadge: $('pmUnreadBadge'),
    peopleSearch: $('peopleSearch'), searchResults: $('searchResults'),
    newChannelBtn: $('newChannelBtn'), channelModal: $('channelModal'), channelName: $('channelName'),
    channelPrivate: $('channelPrivate'), channelMsg: $('channelMsg'), channelSave: $('channelSave'), channelClose: $('channelClose'),
    roomList: $('roomList'), dialogList: $('dialogList'), contactsList: $('contactsList'),
    chatTitle: $('chatTitle'), chatSub: $('chatSub'), typingHint: $('typingHint'),
    storiesStrip: $('storiesStrip'), storyAddBtn: $('storyAddBtn'), storyViewer: $('storyViewer'), storyImg: $('storyImg'), storyNick: $('storyNick'), storyFile: $('storyFile'),
    channelInfoBtn: $('channelInfoBtn'), voiceJoinBtn: $('voiceJoinBtn'), callPartnerBtn: $('callPartnerBtn'),
    msgSearchBtn: $('msgSearchBtn'), msgSearch: $('msgSearch'),
    voiceBar: $('voiceBar'), voiceUsers: $('voiceUsers'), voiceMicBtn: $('voiceMicBtn'), voiceEndBtn: $('voiceEndBtn'),
    pinnedBar: $('pinnedBar'), pinnedText: $('pinnedText'), pinnedClose: $('pinnedClose'),
    messages: $('messages'), messageForm: $('messageForm'), messageInput: $('messageInput'),
    replyBar: $('replyBar'), replyLabel: $('replyLabel'), replyCancel: $('replyCancel'),
    photoBtn: $('photoBtn'), photoInput: $('photoInput'), recordBtn: $('recordBtn'), pickerBtn: $('pickerBtn'), pollBtn: $('pollBtn'), gifBtn: $('gifBtn'), gifPanel: $('gifPanel'), gifSearch: $('gifSearch'), gifSearchGo: $('gifSearchGo'), gifClose: $('gifClose'), gifGrid: $('gifGrid'), mentionPop: $('mentionPop'), recBar: $('recBar'), recTime: $('recTime'), recStop: $('recStop'), recCancel: $('recCancel'), dropBar: $('dropBar'), dropName: $('dropName'), dropSize: $('dropSize'), dropSend: $('dropSend'), dropCancel: $('dropCancel'),
    pollModal: $('pollModal'), pollQ: $('pollQ'), pollOpts: $('pollOpts'), pollAdd: $('pollAdd'), pollCreate: $('pollCreate'), pollClose: $('pollClose'),
    pickPanel: $('pickPanel'), emojiGrid: $('emojiGrid'),
    stickerGrid: $('stickerGrid'), stickerItems: $('stickerItems'), addStickerBtn: $('addStickerBtn'), stickerFile: $('stickerFile'),
    gifGrid: $('gifGrid'), gifItems: $('gifItems'), addGifBtn: $('addGifBtn'), gifFile: $('gifFile'),
    channelProfileModal: $('channelProfileModal'), cpBanner: $('cpBanner'), cpName: $('cpName'), cpDesc: $('cpDesc'),
    cpMembers: $('cpMembers'), cpOwner: $('cpOwner'), cpEdit: $('cpEdit'), cpDescInput: $('cpDescInput'),
    cpColors: $('cpColors'), cpBannerUp: $('cpBannerUp'), cpBannerClear: $('cpBannerClear'), cpBannerFile: $('cpBannerFile'),
    cpSave: $('cpSave'), cpInvite: $('cpInvite'), cpSubscribe: $('cpSubscribe'), cpClose: $('cpClose'),
    qrModal: $('qrModal'), qrImg: $('qrImg'), qrLink: $('qrLink'), qrCopy: $('qrCopy'), qrClose: $('qrClose'),
    viewProfileModal: $('viewProfileModal'), vpBanner: $('vpBanner'), vpAvatar: $('vpAvatar'), vpNick: $('vpNick'), vpUser: $('vpUser'),
    vpBio: $('vpBio'), vpPhone: $('vpPhone'), vpWrite: $('vpWrite'), vpCall: $('vpCall'), vpClose: $('vpClose'), vpBlock: $('vpBlock'), vpExtra: $('vpExtra'), vpGift: $('vpGift'), vpReceived: $('vpReceived'), vpStats: $('vpStats'), vpPinned: $('vpPinned'),
    giftModal: $('giftModal'), giftList: $('giftList'), giftBal: $('giftBal'), giftClose: $('giftClose'), giftNote: $('giftNote'), giftSendBtn: $('giftSendBtn'),
    favBtn: $('favBtn'), favModal: $('favModal'), favList: $('favList'), favClose: $('favClose'),
    profileModal: $('profileModal'), profileAvatar: $('profileAvatar'),
    avatarUploadBtn: $('avatarUploadBtn'), avatarClearBtn: $('avatarClearBtn'), avatarFile: $('avatarFile'),
    profileUsername: $('profileUsername'), profileNick: $('profileNick'), profileBio: $('profileBio'),
    profilePhone: $('profilePhone'), profileStatusEmoji: $('profileStatusEmoji'),
    profileBanner: $('profileBanner'), bannerUploadBtn: $('bannerUploadBtn'), bannerClearBtn: $('bannerClearBtn'), bannerFile: $('bannerFile'),
    setShowPhone: $('setShowPhone'), setReadReceipts: $('setReadReceipts'), soundToggle: $('soundToggle'),
    themeDarkBtn: $('themeDarkBtn'), themeLightBtn: $('themeLightBtn'), accentRow: $('accentRow'),
    oldPass: $('oldPass'), newPass: $('newPass'), changePassBtn: $('changePassBtn'), pwMsg: $('pwMsg'),
    profileMsg: $('profileMsg'), profileSave: $('profileSave'), profileClose: $('profileClose'), openSettingsBtn: $('openSettingsBtn'),
    avFrameRow: $('avFrameRow'), avFxRow: $('avFxRow'), compactMode: $('compactMode'),
    settingsModal: $('settingsModal'), settingsClose: $('settingsClose'), setProfileOpen: $('setProfileOpen'), privacySave: $('privacySave'), srvAddr: $('srvAddr'), srvSave: $('srvSave'), srvMsg: $('srvMsg'),
    settingsBtn: $('settingsBtn'), setShowOnline: $('setShowOnline'), callSoundToggle: $('callSoundToggle'),
    themeAutoBtn: $('themeAutoBtn'), vspeedSel: $('vspeedSel'), exportChatBtn: $('exportChatBtn'),
    updBtn: $('updBtn'), updMsg: $('updMsg'), updVersion: $('updVersion'),
    myId: $('myId'), myUser: $('myUser'), resetThemeBtn: $('resetThemeBtn'),
    callOverlay: $('callOverlay'), callAvatar: $('callAvatar'), callNick: $('callNick'), callStatus: $('callStatus'),
    callVideoWrap: $('callVideoWrap'), remoteVideo: $('remoteVideo'), callActions: $('callActions'),
    screenModal: $('screenModal'), sourceList: $('sourceList'), fpsSel: $('fpsSel'), screenClose: $('screenClose'),
  };

  const TOKEN_KEY = 'pulse_token';
  const ROOM_ICONS = { general: '💬', sport: '⚽', games: '🕹️', tech: '🚀' };
  const EMOJIS = ['😀','😁','😂','🤣','😊','😇','😍','🤩','😘','😜','🤪','😎','🤓','🥳','😏','😢','😭','😤','😡','🤯','😴','🤤','😷','🤔','🙃','😉','🫡','👍','👎','👏','🙏','💪','🤝','👋','🖐️','❤️','🧡','💛','💚','💙','💜','🖤','✨','🔥','⚡','🌈','⭐','🎉','🎂','🎁','🍕','🍔','🍟','🍩','☕','🍺','⚽','🏀','🎮','🎧','🎤','🎸','🚀','✈️','🌍','🌸','💯','❗','❓','✅','❌'];
  const STICKERS = ['😀','😂','😍','😎','🥳','😭','😤','🤯','🤔','😴','🔥','❤️','👍','👏','🙏','💪','🚀','🎉','⚡','🌚','💩','👻','🤡','🦄','🍕'];
  const GIFLIB = ['🎉','🎊','💥','✨','🎈','💫','🎆','❤️‍🔥','👏','💃','🕺','🏆','🌋','🔥','⚡','🌈','💯','🎂','🪅','💐','🐶','🐱','🦖','🛸','👻','🤖','🎃','🍀'];
  const ACCENTS = ['#7c5cff', '#2d9cdb', '#27ae60', '#ff5c8a', '#f79d2d', '#eb5757', '#00b8a9', '#9b51e0'];
  const PALETTES = {
    violet: { c: '#7c5cff', a1: '#7c5cff', a2: '#b07cff' },
    ocean: { c: '#2d9cdb', a1: '#2d9cdb', a2: '#62ccf0' },
    forest: { c: '#27ae60', a1: '#27ae60', a2: '#52d68f' },
    sunset: { c: '#ff7a59', a1: '#ff7a59', a2: '#ff9d6b' },
    rose: { c: '#ff5c8a', a1: '#ff5c8a', a2: '#ff8ab0' },
    gold: { c: '#e6a23c', a1: '#e6a23c', a2: '#f6c453' },
  };
  const REACTS = ['👍','❤️','🔥','😂','😮','😢'];
  const ICO = {
    mic: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    micOff: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 4a3 3 0 0 1 6 0v6m0 2a3 3 0 0 1-6 0V9M5 11a7 7 0 0 0 12 4M12 18v3M3 3l18 18"/></svg>',
    scr: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M9 9l3 3 3-3"/></svg>',
    end: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2zM4 4l16 16"/></svg>',
    call: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>',
  };
  const RTC = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  const THEME_KEY = 'pulse_theme';
  const SOUND_KEY = 'pulse_sound';
  const PRIV_KEY = 'pulse_priv_joined';

  // состояние
  const sessionStore = {
    isElectron: typeof window !== 'undefined' && !!window.pulseSession,
async get() {
      try {
        if (this.isElectron) {
          const tok = await Promise.race([window.pulseSession.get(), new Promise((r) => setTimeout(() => r('__timeout'), 600))]);
          if (tok === '__timeout') return localStorage.getItem(TOKEN_KEY) || '';
          return tok || '';
        }
        return localStorage.getItem(TOKEN_KEY) || '';
      } catch {
        try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
      }
    },
    set(t) { try { if (this.isElectron) { try { window.pulseSession.set(t).catch(() => {}); } catch {} } else localStorage.setItem(TOKEN_KEY, t); } catch {} },
    clear() { try { if (this.isElectron) { try { window.pulseSession.clear().catch(() => {}); } catch {} } else localStorage.removeItem(TOKEN_KEY); } catch {} },
  };

  let ws = null, me = null, token = '';
  let rooms = [], dialogs = [], contacts = [], target = { type: 'room', id: 'general' }, view = 'rooms';
  let newAvatar = null, newBanner = null, pendingImage = null, replyTarget = null;
  let myStickers = [], pinsCache = [], lastDay = '', KNOWN = new Set(), typingTimers = {}, typingSentAt = 0, bulk = false, hasMore = true, loadingMore = false, pinnedBottom = true, lastAuth = { key: null, who: null, at: 0 }, serverReplied = false;
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } }
  function lsSet(k, a) { localStorage.setItem(k, JSON.stringify(a)); }
  let pinnedChats = lsGet('pulse_pinned'), archivedChats = lsGet('pulse_archived'), mutedChats = lsGet('pulse_muted');
  const toggleArr = (a, v) => { const i = a.indexOf(v); if (i >= 0) a.splice(i, 1); else a.push(v); return i < 0; };
  const isMuted = (k) => mutedChats.includes(k);
  let theme = { mode: 'dark', palette: 'violet' }, soundOn = true, callSoundOn = true;
  let mediaRec = null, recChunks = [], recActive = false, recTimer = null, recStart = 0, recCancelled = false;
function showRecBar() { if (!el.recBar) return; el.recBar.classList.remove('hidden'); recStart = Date.now(); recCancelled = false; recTimer = setInterval(() => { const s = Math.max(0, Math.floor((Date.now() - recStart) / 1000)); const mm = Math.floor(s / 60), ss = s % 60; if (el.recTime) el.recTime.textContent = mm + ':' + String(ss).padStart(2, '0'); }, 250); if (el.recStop) el.recStop.onclick = stopRec; if (el.recCancel) el.recCancel.onclick = () => { recCancelled = true; stopRec(); }; }
function hideRecBar() { if (recTimer) clearInterval(recTimer); recTimer = null; if (el.recBar) el.recBar.classList.add('hidden'); }
  let pc = null, screenPc = null, localAudio = null, screenTrack = null, callPeer = null, callRole = null, callActive = false, micMuted = false, callMeta = null, ringTimer = null;
  let voiceRoom = null, voiceMicStream = null, voiceMuted = false; const voicePcs = new Map(), voiceAudioEls = new Map();
  let ctxMenu = null, cpRoom = null, cpNewBanner = null;

  loadTheme(); applyTheme();
  soundOn = localStorage.getItem(SOUND_KEY) !== '0';

  function loadTheme() { try { theme = JSON.parse(localStorage.getItem(THEME_KEY)) || { mode: 'dark', palette: 'violet' }; } catch {} }
  function applyTheme() {
    const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = theme.mode === 'dark' || (theme.mode === 'auto' && sysDark);
    const p = PALETTES[theme.palette] || PALETTES.violet;
    const base = dark
      ? { '--bg': '#0e0f15', '--bg-2': '#141623', '--panel': '#171a29', '--panel-2': '#1e2236', '--panel-3': '#262b44', '--border': '#262c49', '--text': '#eceef8', '--muted': '#8d93b0' }
      : { '--bg': '#eef1f7', '--bg-2': '#e6eaf3', '--panel': '#ffffff', '--panel-2': '#eef0f6', '--panel-3': '#dfe4ef', '--border': '#d4dae6', '--text': '#1a1d29', '--muted': '#6b7085' };
    const root = document.documentElement.style;
    for (const k in base) root.setProperty(k, base[k]);
    root.setProperty('--accent', p.a1); root.setProperty('--accent-2', p.a2);
  }
  function saveTheme() { localStorage.setItem(THEME_KEY, JSON.stringify(theme)); applyTheme(); renderThemeUI(); }

// ---------- подключение ----------
let SERVER_HOST = '';
try { SERVER_HOST = localStorage.getItem('pulse_srv') || ''; } catch {}
function srvOrigin() { return SERVER_HOST ? 'http://' + SERVER_HOST : location.origin; }
function absUrl(u) { return (u && u.charAt(0) === '/' && SERVER_HOST) ? 'http://' + SERVER_HOST + u : u; }
function connect(onAuth) {
const proto = location.protocol === 'https:' ? 'wss' : 'ws';
ws = new WebSocket(`${proto}://${SERVER_HOST || location.host}`);
    let connected = false;
    const to = setTimeout(() => { if (!connected) showBoot('Не удаётся подключиться к серверу. Закрой ВСЕ окна Pulse, проверь, что нет другого сервера на порту 3000, и запусти заново.'); }, 6000);
    ws.onopen = () => { connected = true; clearTimeout(to); setTimeout(() => { if (!serverReplied) showBoot('Порт 3000 занят другой программой/старым сервером. Закрой все окна Pulse и другие серверы, перезапусти приложение.', true); }, 6000); if (token) ws.send(JSON.stringify({ type: 'hello', token, room: target.id })); else if (onAuth) onAuth(); };
    ws.onerror = () => { clearTimeout(to); if (!connected) showBoot('Ошибка соединения с сервером. Перезапусти Pulse.'); };
    ws.onclose = () => { if (!connected) return; showBoot('Соединение потеряно'); };
    ws.onmessage = (e) => { let d; try { d = JSON.parse(e.data); } catch { return; } handle(d); };
  }

  function handle(d) {
    serverReplied = true;
    switch (d.type) {
      case 'auth_ok':
        token = d.token; sessionStore.set(token); me = d.user; renderMe(); show('app');
        ws.send(JSON.stringify({ type: 'hello', token, room: target.id })); break;
      case 'auth_fail': showAuthError(d.error); break;
      case 'username_check': applyUserHint(d); break;
      case 'session_invalid': sessionStore.clear(); token = ''; show('auth'); showAuthError('Сессия истекла. Войди снова.'); break;
      case 'init':
        me = d.me; rooms = d.rooms || []; dialogs = d.dialogs || []; contacts = d.contacts || [];
        target = { type: 'room', id: d.room };
        renderMe(); renderRooms(); renderDialogs(); renderContacts(); buildKnown();
        renderHeader(); renderHistory(d.history); setPinned('r:' + d.room, d.pinned || []); updateUnreadBadge(); show('app');
        if (ws) ws.send(JSON.stringify({ type: 'my_stickers' }));
        ws.send(JSON.stringify({ type: 'stories_list' }));
        break;
      case 'history': clearReply(); lastDay = ''; setPinned(target.type === 'room' ? 'r:' + target.id : 'p:' + target.id, d.pinned || []); renderHistory(d.history); break;
      case 'history_more':
        if (!(d.messages && d.messages.length)) { hasMore = false; loadingMore = false; return; }
        prependMore(d.messages); loadingMore = false; break;
      case 'message': if (target.type === 'room') { maybeSound(d.message); renderMsg(d.message); } break;
      case 'members': if (target.type === 'room') setSub(`${d.count} онлайн`); break;
      case 'rooms': rooms = d.rooms; renderRooms(); if (target.type === 'room') renderHeader(); break;
      case 'typing': if (target.type === 'room') handleTyping(d); break;
      case 'pm': handlePm(d.message); break;
      case 'dialog_list': dialogs = d.dialogs; renderDialogs(); updateUnreadBadge(); break;
      case 'open_dialog': clearReply(); lastDay = ''; setPinned('p:' + target.id, d.pinned || []); renderHistory(d.history); break;
      case 'contacts': contacts = d.contacts; renderContacts(); buildKnown(); break;
      case 'user_stats': renderUserStats(d); break;
      case 'received_gifts': renderReceivedGifts(d.gifts || []); break;
      case 'pinned_gifts': if (d.user_id === (vpCurrent && vpCurrent.id)) { vpPinned = d.pinned || []; renderPinnedGifts(); } break;
      case 'pin_gift_err': showToast(d.error || 'Нельзя закрепить'); break;
      case 'stories_list': renderStories(d.users || []); break;
      case 'story_posted': setTimeout(() => ws.send(JSON.stringify({ type: 'stories_list' })), 200); break;
      case 'gift_catalog': renderGiftCatalog(d); break;
      case 'gift_error': break;
      case 'gift_sent': { const m = el.giftModal; selectedGid = null; if (el.giftNote) el.giftNote.value = ''; if (el.giftSendBtn) el.giftSendBtn.classList.add('hidden'); if (m && !m.classList.contains('hidden')) { ws.send(JSON.stringify({ type: 'gift_catalog' })); ws.send(JSON.stringify({ type: 'received_gifts', user_id: vpCurrent && vpCurrent.id })); } break; }
      case 'gift_received': { showToast('🎁 ' + (d.fromNick || 'Кто-то') + ' подарил(а) ' + (d.emoji || '🎁') + ' ' + (d.name || 'подарок') + (d.text ? ' — ' + d.text : '')); if (vpCurrent && vpCurrent.id === d.to) { ws.send(JSON.stringify({ type: 'received_gifts', user_id: d.to })); ws.send(JSON.stringify({ type: 'user_stats', user_id: d.to })); } break; }
      case 'stars_update': if (d.user_id === me.id) { me.stars = d.stars; renderMe(); } break;
      case 'calls_list': if (target.type === 'calls') renderCalls(d.calls || []); break;
      case 'stickers': myStickers = d.stickers || []; renderPick(); break;
      case 'sticker_created': myStickers.push(d.sticker); renderPick(); break;
      case 'reaction': applyReaction(d); break;
      case 'pm_read': handlePmRead(d); break;
      case 'pins': setPinned(d.chatKey, d.pinned); break;
      case 'message_update': applyMsgUpdate(d); break;
      case 'poll_update': { const w = el.messages.querySelector('.msg[data-msgid="' + d.message_id + '"]'); const old = w && w.querySelector('.poll'); if (old && w && w._msg) { w._msg.poll = typeof d.poll === 'string' ? d.poll : JSON.stringify(d.poll); old.outerHTML = pollHtml({ poll: typeof d.poll === 'string' ? d.poll : JSON.stringify(d.poll) }); } break; }
      case 'message_deleted': if (d.chatKey === curKey()) { const w = el.messages.querySelector('.msg[data-msgid="' + d.message_id + '"]'); if (w) w.remove(); } break;
      case 'profile_ok': me = d.user; renderMe(); renderHeader(); ifELHideProfileClosed(); break;
      case 'profile_error': profileMsg(d.error, false); break;
      case 'pw_ok': pwMsgTxt('Пароль изменён', true); break;
      case 'pw_error': pwMsgTxt(d.error, false); break;
      case 'channel_ok': el.channelModal.classList.add('hidden'); openRoom(d.name); if (d.private && d.invite) alert('Приватный канал создан.\nКод доступа: ' + d.invite); break;
      case 'channel_error': channelMsg(d.error, false); break;
      case 'admin_ok': break;
      case 'call_signal': handleCallSig(d); break;
      case 'voice_state': onVoiceState(d); break;
      case 'fav_state':
        if (d.fav === false) { const it = el.favList.querySelector('[data-id="' + d.message_id + '"]'); if (it) it.remove(); } reqFavs();
        break;
      case 'fav_list': if (target.type === 'fav') renderFavChat(d.items || []); else renderFavs(d.items || []); break;
      case 'channel_invite': {
        if (!cpRoom) break;
        const link = location.origin + '/?join=' + encodeURIComponent(d.name || cpRoom.id) + (d.invite ? '&code=' + encodeURIComponent(d.invite) : '');
        el.qrImg.src = ''; el.qrLink.textContent = link;
        el.qrModal.classList.remove('hidden');
        ws.send(JSON.stringify({ type: 'qr', text: link }));
        break;
      }
      case 'qr': if (el.qrImg) el.qrImg.src = d.url; break;
      case 'channel_members': renderChannelMembers(d); break;
      case 'channel_stats': renderChannelStats(d); break;
      case 'pm_blocked': break;
    }
  }

  function curKey() { return target.type === 'room' ? 'r:' + target.id : 'p:' + target.id; }
  function ifELHideProfileClosed() { closeProfile(); }

  // ---------- авторизация ----------
  el.tabLogin.onclick = () => setAuthTab('login');
  el.tabRegister.onclick = () => setAuthTab('register');
  function setAuthTab(t) {
    el.tabLogin.classList.toggle('active', t === 'login'); el.tabRegister.classList.toggle('active', t === 'register');
    el.loginForm.classList.toggle('hidden', t !== 'login'); el.registerForm.classList.toggle('hidden', t !== 'register'); el.authError.textContent = '';
  }
  el.loginForm.onsubmit = (e) => { e.preventDefault(); setAuthError(''); const id = el.loginNick.value.trim(), p = el.loginPass.value; if (!id || !p) return showAuthError('Введи логин и пароль'); ws && ws.send(JSON.stringify({ type: 'login', nick: id, password: p })); };
  let userCheckTimer = null;
  el.regUsername.oninput = () => {
    clearTimeout(userCheckTimer);
    const u = el.regUsername.value.trim();
    el.regUserHint.textContent = ''; el.regUserHint.className = 'reg-hint';
    if (u.length < 3) return;
    userCheckTimer = setTimeout(() => { ws && ws.send(JSON.stringify({ type: 'check_username', username: u })); }, 350);
  };
  function applyUserHint(d) {
    if (!el.regUserHint || d.username !== el.regUsername.value.trim().toLowerCase()) return;
    el.regUserHint.textContent = d.available ? '✓ свободен' : '✗ этот юзернейм занят';
    el.regUserHint.classList.add(d.available ? 'ok' : 'no');
  }
  el.registerForm.onsubmit = (e) => { e.preventDefault(); setAuthError(''); const u = el.regUsername.value.trim(), n = el.regNick.value.trim(), p = el.regPass.value, p2 = el.regPass2.value; if (u.length < 3) return showAuthError('Юзернейм минимум 3 символа'); if (!n) return showAuthError('Укажи имя'); if (p !== p2) return showAuthError('Пароли не совпадают'); if (p.length < 4) return showAuthError('Пароль минимум 4 символа'); ws && ws.send(JSON.stringify({ type: 'register', username: u, nick: n, password: p })); };
  el.logoutBtn.onclick = () => { sessionStore.clear(); token = ''; me = null; if (voiceRoom) leaveVoice(); endCall(); show('auth'); setAuthTab('login'); if (ws) setTimeout(() => { ws.close(); ws = null; }, 0); connectAskAuth(); };
  function showAuthError(m) { el.authError.textContent = m; }
  function setAuthError(m) { el.authError.textContent = m; }
  function connectAskAuth() { connect(() => show('auth')); }

  // ---------- рендер ----------
  function avatarHtml(u, size) {
    const owner = !!(u && u.is_owner);
    const initial = (u && u.nick ? u.nick : '?').charAt(0).toUpperCase();
    const bg = (u && u.color) || '#7c5cff';
    const S = (u && u.settings) || {};
    const fr = S.avatarFrame || 'none'; const fx = S.avatarEffect || 'none';
    const frame = fr === 'gold' ? 'box-shadow:0 0 0 2px #f6c453, 0 0 14px rgba(246,196,83,.6)'
      : fr === 'neon' ? `box-shadow:0 0 0 2px ${bg}, 0 0 16px ${bg}`
      : fr === 'white' ? 'box-shadow:0 0 0 2px #fff, 0 0 8px rgba(255,255,255,.5)'
      : fr === 'grad' ? 'box-shadow:0 0 0 3px linear-gradient(135deg,#7c5cff,#ff5c8a)'.replace('box-shadow:', 'background:linear-gradient(135deg,#7c5cff,#ff5c8a);padding:3px;box-shadow:') : 'none';
    const showFrameBox = fr !== 'grad' ? frame : (PALETTES[theme.palette] ? `box-shadow:0 0 0 3px ${PALETTES[theme.palette].a1}, 0 0 14px ${PALETTES[theme.palette].a2}` : 'box-shadow:0 0 0 3px #7c5cff, 0 0 14px #b07cff');
    const cls = fx !== 'none' ? ' avfx-' + fx : '';
    const pad = fr === 'grad' ? 3 : 0;
    const innerS = size - pad * 2;
    const inner = u && u.avatar
      ? `<img src="${escapeAttr(absUrl(u.avatar))}" alt="" style="width:${innerS}px;height:${innerS}px;border-radius:50%;object-fit:cover">`
      : `<span style="width:${innerS}px;height:${innerS}px;border-radius:50%;background:${bg};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.round(size * .42)}px">${initial}</span>`;
    return `<span class="av-wrap${cls}" style="width:${size}px;height:${size}px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;${fr === 'grad' ? 'background:conic-gradient(#7c5cff,#ff5c8a,#2d9cdb,#7c5cff);padding:3px;' : 'overflow:hidden;'}${showFrameBox}">${inner}</span>`;
  }
  function ownerBadge() { return '<span class="owner-badge">владелец</span>'; }
  function renderMe() { el.meAvatar.innerHTML = avatarHtml(me, 38); el.meNick.innerHTML = `${escapeHtml(me.nick)}${me.is_owner ? ownerBadge() : ''}` + ((me.stars || 0) ? ' <span class="me-stars">' + (me.stars) + ' ⭐</span>' : ''); }

  function renderRooms() {
    el.roomList.innerHTML = '';
    const callsItem = document.createElement('div');
    callsItem.className = 'room-item' + (target.type === 'calls' ? ' active' : '');
    callsItem.innerHTML = `<span class="room-icon" style="background:${tint('звонки')}">📞</span><span class="item-main"><span class="item-title">Звонки</span></span>`;
    callsItem.onclick = openCalls;
    el.roomList.appendChild(callsItem);
    const items = [];
    rooms.forEach((r) => {
      const active = target.type === 'room' && target.id === r.id;
      const it = document.createElement('div'); it.className = 'room-item' + (active ? ' active' : '');
      it.innerHTML = `<span class="room-icon" style="background:${tint(r.id)}">${r.custom ? (r.private ? '🔒' : '📺') : (ROOM_ICONS[r.id] || '💬')}${isMuted('r:' + r.id) ? '<span class="mute-ico">🔇</span>' : ''}</span><span class="item-main"><span class="item-title">${pinnedChats.includes('r:' + r.id) ? '📌 ' : ''}${escapeHtml(r.id)}</span></span><span class="room-badge">${r.count}</span>`;
      it.onclick = () => openRoom(r.id);
      it.oncontextmenu = (e) => { e.preventDefault(); channelCtx(e, r); };
      items.push({ key: 'r:' + r.id, node: it });
    });
    dialogs.forEach((dl) => {
      const p = dl.partner || {};
      const it = document.createElement('div');
      it.className = 'room-item' + (target.type === 'pm' && target.id === p.id ? ' active' : '');
      it.innerHTML = `<span class="room-icon avatar" style="background:${p.color || '#7c5cff'}" data-profile-id="${p.id}">${avatarHtml(p, 34)}</span><span class="item-main"><span class="item-title">${pinnedChats.includes('p:' + p.id) ? '📌 ' : ''}${escapeHtml(p.nick)}${p.is_owner ? ownerBadge() : ''}${isMuted('p:' + p.id) ? ' 🔇' : ''}</span><span class="item-sub">${dl.last ? escapeHtml(String(dl.last.text || '').slice(0, 36)) : 'ЛС'}</span></span><span class="item-right">${dl.unread ? '<span class="badge">' + dl.unread + '</span>' : ''}</span>`;
      it.onclick = () => openPm(p.id);
      it.oncontextmenu = (e) => { e.preventDefault(); dmCtx(e, p); };
      items.push({ key: 'p:' + p.id, node: it });
    });
    const order = [...items.filter((x) => pinnedChats.includes(x.key)), ...items.filter((x) => !pinnedChats.includes(x.key))];
    const shown = order.filter((x) => !archivedChats.includes(x.key));
    const arch = order.filter((x) => archivedChats.includes(x.key));
    shown.forEach((x) => el.roomList.appendChild(x.node));
    if (arch.length) {
      const sep = document.createElement('div'); sep.className = 'nav-label'; sep.textContent = 'Архив (' + arch.length + ')';
      sep.onclick = () => { sep.nextSibling && sep.nextSibling[0] ? null : null; };
      el.roomList.appendChild(sep);
      arch.forEach((x) => el.roomList.appendChild(x.node));
    }
  }
  function dmCtx(e, p) {
    if (ctxMenu) ctxMenu.remove();
    ctxMenu = document.createElement('div'); ctxMenu.className = 'ctx-menu';
    ctxMenu.style.left = Math.min(e.clientX, innerWidth - 200) + 'px'; ctxMenu.style.top = e.clientY + 'px';
    const items = [['💬 Открыть', () => openPm(p.id)], ['👤 Профиль', () => openViewProfile(p)]];
    addPinArchMute(items, 'p:' + p.id);
    items.forEach(([l, fn, cls]) => { const b = document.createElement('button'); b.className = 'ctx-item' + (cls ? ' ' + cls : ''); b.textContent = l; b.onclick = () => { ctxMenu.remove(); ctxMenu = null; fn(); }; ctxMenu.appendChild(b); });
    document.body.appendChild(ctxMenu);
  }
  function renderDialogs() {
    el.dialogList.innerHTML = '';
    if (!dialogs.length) { el.dialogList.innerHTML = '<div class="empty-hint">Пока нет диалогов.</div>'; return; }
    dialogs.forEach((dl) => {
      const p = dl.partner || {};
      const item = document.createElement('div');
      item.className = 'room-item' + (target.type === 'pm' && target.id === p.id ? ' active' : '');
      item.innerHTML = `<span class="room-icon avatar" style="background:${p.color || '#7c5cff'}">${avatarHtml(p, 36)}</span><span class="item-main"><span class="item-title">${escapeHtml(p.nick)}${p.is_owner ? ownerBadge() : ''}</span><span class="item-sub">${dl.last ? (dl.last.fromMe ? 'Вы: ' : '') + escapeHtml(String(dl.last.text || '').slice(0, 40)) : 'Нет сообщений'}</span></span><span class="item-right">${dl.unread ? '<span class="badge">' + dl.unread + '</span>' : ''}${dl.last ? '<span class="time">' + fmtTimeShort(dl.last.at) + '</span>' : ''}</span>`;
      item.onclick = () => openPm(p.id); el.dialogList.appendChild(item);
    });
  }
  function renderContacts() {
    el.contactsList.innerHTML = '';
    if (!contacts.length) { el.contactsList.innerHTML = '<div class="empty-hint">Кроме тебя пока никого нет.</div>'; return; }
    contacts.forEach((c) => {
      const item = document.createElement('div'); item.className = 'room-item';
      item.innerHTML = `<span class="room-icon avatar avatar-zone" style="background:${c.color || '#7c5cff'}" data-profile-id="${c.id}">${avatarHtml(c, 36)}</span><span class="item-main"><span class="item-title">${escapeHtml(c.nick)}${c.is_owner ? ownerBadge() : ''}${c.status_emoji ? ' ' + escapeHtml(c.status_emoji) : ''}</span><span class="item-sub">${c.bio ? escapeHtml(c.bio) : ''}</span></span><button type="button" class="contact-call" data-call="${c.id}" title="Позвонить">📞</button>`;
      item.onclick = (e) => { if (e.target.closest('[data-call]')) { startCall(Number(e.target.dataset.call)); return; } openPm(c.id); setView('pm'); };
      el.contactsList.appendChild(item);
    });
  }
  function setView(v) { view = v; }
  el.navTabs.forEach((t) => { t.onclick = () => { setView(t.dataset.view); updateUnreadBadge(); }; });

  function openRoom(id) {
    if (target.type === 'room' && target.id === id) { setView('rooms'); return; }
    const r = rooms.find((x) => x.id === id);
    target = { type: 'room', id };
    const join = { room: id };
    if (r && r.private && !isPrivJoined(id)) { const code = prompt('Приватный канал. Код доступа:', ''); if (!code) { target = { type: 'room', id: 'general' }; setView('rooms'); return; } join.code = code; markPrivJoined(id); }
    if (ws) ws.send(JSON.stringify({ type: 'join', ...join }));
    clearReply(); lastDay = ''; renderHeader(); renderRooms(); setView('rooms');
  }
  function isPrivJoined(n) { try { return JSON.parse(localStorage.getItem(PRIV_KEY) || '[]').includes(n); } catch { return false; } }
  function markPrivJoined(n) { try { const a = JSON.parse(localStorage.getItem(PRIV_KEY) || '[]'); if (!a.includes(n)) { a.push(n); localStorage.setItem(PRIV_KEY, JSON.stringify(a)); } } catch {} }
  function openPm(id) {
    target = { type: 'pm', id }; if (ws) ws.send(JSON.stringify({ type: 'open_dialog', with: id }));
    clearReply(); lastDay = ''; renderHeader(); renderDialogs(); setView('pm');
  }
  function renderHeader() {
    if (target.type === 'calls') {
      el.chatTitle.textContent = '📞 Звонки'; el.chatTitle.className = '';
      el.chatSub.textContent = 'история звонков';
      el.channelInfoBtn.classList.add('hidden'); el.callPartnerBtn.classList.add('hidden'); el.voiceJoinBtn.classList.add('hidden');
      el.messageForm.style.display = 'none';
      return;
    }
    if (target.type === 'fav') {
      el.chatTitle.textContent = '★ Избранное'; el.chatTitle.className = '';
      el.chatSub.textContent = 'сохранённые сообщения';
      el.channelInfoBtn.classList.add('hidden'); el.callPartnerBtn.classList.add('hidden'); el.voiceJoinBtn.classList.add('hidden');
      el.messageForm.style.display = 'none';
      return;
    }
    el.messageForm.style.display = '';
    if (target.type === 'room') {
      el.chatTitle.textContent = target.id; el.chatTitle.className = '';
      const r = rooms.find((x) => x.id === target.id);
      el.chatSub.textContent = `${r ? r.count : 0} онлайн`;
      el.callPartnerBtn.classList.add('hidden');
      el.voiceJoinBtn.classList.remove('hidden');
      if (r && r.custom) { el.channelInfoBtn.classList.remove('hidden'); el.channelInfoBtn.onclick = () => openChannelProfile(r); } else { el.channelInfoBtn.classList.add('hidden'); }
    } else {
      const p = allUsersFind(target.id);
      el.chatTitle.className = 'dm';
      el.chatTitle.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px;cursor:pointer" onclick="window.__openVPId(${p ? p.id : 0})">${avatarHtml(p, 30)}<span>${escapeHtml((p && p.nick) || '…')}${p && p.is_owner ? ownerBadge() : ''}</span></span>`;
      el.chatSub.textContent = (p && p.online) ? 'в сети' : 'офлайн';
      el.channelInfoBtn.classList.add('hidden');
      el.voiceJoinBtn.classList.add('hidden');
      el.callPartnerBtn.classList.remove('hidden');
      el.callPartnerBtn.onclick = () => startCall(target.id);
    }
  }
  function allUsersFind(id) { const dl = dialogs.find((x) => x.partner && x.partner.id === id); if (dl) return dl.partner; return contacts.find((c) => c.id === id) || null; }
  function setSub(t) { el.chatSub.textContent = t; }

  function renderHistory(msgs) { el.messages.innerHTML = ''; lastDay = ''; lastAuth = { key: null, who: null, at: 0 }; bulk = true; pinnedBottom = true; hasMore = true; loadingMore = false; (msgs || []).forEach((m) => { pushDayDivider(m.at); const node = msgNode(m); if (m.kind !== 'system') { const key = curKey(); const who = m.nick ? m.nick : (m.from !== undefined ? 'p' + m.from : 'x'); const cond = lastAuth.key === key && lastAuth.who === who && (new Date(m.at).getTime() - lastAuth.at) < 5 * 60000; if (cond) node.classList.add('condensed'); lastAuth = { key, who, at: new Date(m.at).getTime() }; } el.messages.appendChild(node); }); bulk = false; el.messages.scrollTop = el.messages.scrollHeight; }

  function senderFor(m) { if (m.from) return { id: m.from, nick: m.nick || m.fromNick, color: m.color || m.fromColor, avatar: m.avatar || m.fromAvatar }; const c = contacts.find((x) => x.nick === m.nick) || (me && m.nick === me.nick ? me : null); return c || { nick: m.nick, color: m.color }; }
  function mineIs(m) { return m.nick ? m.nick === me.nick : (m.from === me.id); }

  function msgNode(m) {
    const wrap = document.createElement('div');
    const mine = mineIs(m);
wrap.className = 'msg ' + (m.kind === 'system' ? 'system' : mine ? 'mine' : 'theirs');
const isGiftMsg = m.sticker && !/^\/uploads\//.test(m.sticker);
if (isGiftMsg) wrap.className += ' gift-msg';
if (m.kind !== 'system') { wrap.dataset.chat = curKey(); wrap.dataset.msgid = m.id; wrap._msg = m; }

    if (m.kind === 'system') { wrap.innerHTML = `<div class="bubble">${escapeHtml(m.text || '')}</div>`; return wrap; }

    const s = senderFor(m);
    const av = mine ? '' : `<span class="msg-avatar" ${s.id && s.id !== me.id ? ('data-profile-id="' + s.id + '"') : ''}>${avatarHtml(s, 28)}</span>`;
    const metaNick = target.type === 'room' && !mine ? `<span class="nick" ${s.id ? ('data-profile-id="' + s.id + '"') : ''} style="color:${s.color || '#7c5cff'};cursor:pointer">${escapeHtml(s.nick || '?')}</span>` : '';
    let body;
    if (m.audio) { body = `<div class="msg-audio"><audio controls preload="metadata" src="${escapeAttr(absUrl(m.audio))}"></audio><button type="button" class="vspeed" data-sp="0">1x</button></div>`; if (m.text) body += `<div class="bubble">${mentionToHtml(m.text)}</div>`; }
    else if (m.video) { body = `<video controls preload="metadata" class="msg-video" src="${escapeAttr(absUrl(m.video))}"></video>`; if (m.text) body += `<div class="bubble">${mentionToHtml(m.text)}</div>`; }
    else if (m.file) { let f = m.file; if (typeof f === 'string') { try { f = JSON.parse(f); } catch {} } body = fileChipHtml(f); if (m.text) body += `<div class="bubble">${mentionToHtml(m.text)}</div>`; }
    else if (m.sticker) { body = /^\/uploads\//.test(m.sticker) ? `<div class="bubble"><img class="sticker-img" src="${escapeAttr(absUrl(m.sticker))}" alt=""></div>` : `<div class="bubble sticker-emoji" style="background:transparent;border:none;line-height:1;padding:0">${escapeHtml(m.sticker)}</div>` + (m.text ? `<div class="gift-note">${escapeHtml(m.text)}</div>` : ''); }
    else if (m.image) { body = `<a href="${escapeAttr(absUrl(m.image))}" target="_blank" rel="noopener"><img class="msg-image" src="${escapeAttr(absUrl(m.image))}" alt=""></a>`; if (m.text) body += `<div class="bubble" style="margin-top:6px">${mentionToHtml(m.text)}</div>`; }
    else { body = `<div class="bubble">${mentionToHtml(m.text || '')}</div>`; }
    const quote = m.reply ? `<span class="quote-line">↩ ${escapeHtml(m.reply)}</span>` : '';
    const fwd = m.forwarded ? '<div class="msg-forwarded">переслано</div>' : '';
    const meta = `${metaNick}<span class="time">${fmtTime(m.at)}</span>${m.edited ? '<span class="msg-edited"> · изменено</span>' : ''}`;
    const seen = (target.type === 'pm' && mine) ? `<div class="seen-mark ${m.read ? 'read' : ''}">${m.read ? '✓✓' : '✓'}</div>` : '';
    const pollPart = m.poll ? pollHtml(m) : '';
    wrap.innerHTML = `
      <span style="display:flex;align-items:flex-end;gap:8px">${av}<span style="display:flex;flex-direction:column;${mine ? 'align-items:flex-end' : 'align-items:flex-start'}"><div class="msg-meta">${meta}</div>${fwd}${quote}${body}${pollPart}${reactionsHtml(m)}${seen}</span></span>
      <button type="button" class="msg-menu" data-menu>⋮</button>
      <div class="reaction-menu">${REACTS.map((r) => `<button type="button" data-r="${r}">${r}</button>`).join('')}</div>`;
    return wrap;
  }
  function renderMsg(m) {
    pushDayDivider(m.at);
    const node = msgNode(m);
    if (m.kind === 'system') { el.messages.appendChild(node); autoScroll(false); return; }
    const key = curKey();
    const who = m.nick ? m.nick : (m.from !== undefined ? 'p' + m.from : 'x');
    const cond = lastAuth.key === key && lastAuth.who === who && (new Date(m.at).getTime() - lastAuth.at) < 5 * 60000;
    if (cond) node.classList.add('condensed');
    lastAuth = { key, who, at: new Date(m.at).getTime() };
    el.messages.appendChild(node);
    wireNode(node);
    autoScroll(mineIs(m));
    if (!bulk) maybeTrim();
  }
  function wireNode(root) {
    root.querySelectorAll && root.querySelectorAll('.msg-image').forEach((el) => { el.onclick = (e) => { e.preventDefault(); openLightbox(el.src, false); }; });
    root.querySelectorAll('.msg-video').forEach((el) => { el.onclick = () => openLightbox(el.src, true); });
    root.querySelectorAll('.vspeed').forEach((b) => { const a = b.parentElement.querySelector('audio'); if (a) a.playbackRate = vDef; b.textContent = vDef + 'x'; b.dataset.sp = String([1, 1.5, 2].indexOf(vDef)); b.onclick = () => { const a2 = b.parentElement.querySelector('audio'); const sp = [1, 1.5, 2][((+(b.dataset.sp || 0)) + 1) % 3]; b.dataset.sp = [1, 1.5, 2].indexOf(sp); b.textContent = sp + 'x'; if (a2) a2.playbackRate = sp; }; });
  }
  function reactionsHtml(m) { if (!m.reactions || !m.reactions.length) return ''; return `<div class="reactions-row">${m.reactions.map((r) => `<button type="button" class="reaction-chip ${r.me ? 'mine' : ''}" data-emoji="${escapeAttr(r.emoji)}" title="${escapeAttr((r.users || []).join(', '))}">${escapeHtml(r.emoji)} <span class="cnt">${r.count}</span></button>`).join('')}</div>`; }
  const LB = { img: () => $('lbImg'), video: () => $('lbVideo') };
  function openLightbox(url, video) {
    const l = $('lightbox'), im = $('lbImg'), vd = $('lbVideo');
    im.hidden = video; vd.hidden = !video;
    if (video) { vd.src = url; } else { im.src = url; }
    l.classList.remove('hidden');
  }
  $('lightbox').onclick = () => { $('lightbox').classList.add('hidden'); $('lbVideo').pause(); $('lbVideo').src = ''; $('lbImg').src = ''; };
  function fileChipHtml(f) {
    const name = f && f.name ? f.name : 'файл';
    const size = f && f.size ? (f.size / 1024 / 1024).toFixed(2) + ' МБ' : '';
const url = f && f.url ? absUrl(f.url) : '';
return `<a class="file-chip" href="${escapeAttr(url + (url.indexOf('?') === -1 ? '?download=1' : '&download=1'))}" target="_blank" rel="noopener"><span class="file-ico">📎</span><span class="file-info"><b>${escapeHtml(name)}</b><span>${escapeHtml(size)} · скачать</span></span></a>`;
  }
  function pmMsg(m) { return { at: m.at, text: m.text, image: m.image, sticker: m.sticker, audio: m.audio, reply: m.reply, edited: m.edited, from: m.from, fromNick: m.fromNick || m.nick, fromColor: m.fromColor, fromAvatar: m.fromAvatar }; }
  function handlePm(m) { maybeSound(m); if (target.type === 'pm' && target.id === (m.from === me.id ? m.to : m.from)) renderMsg(pmMsg(m)); }

  function dayLabel(iso) { const d = new Date(iso), n = new Date(), y = new Date(); y.setDate(n.getDate() - 1); const s = (x) => d.toDateString() === x.toDateString(); if (s(n)) return 'Сегодня'; if (s(y)) return 'Вчера'; return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }); }
  function pushDayDivider(at) { const day = dayLabel(at); if (day === lastDay) return; lastDay = day; const d = document.createElement('div'); d.className = 'day-divider'; d.textContent = day; el.messages.appendChild(d); }
  function buildKnown() { KNOWN = new Set(); [me, ...contacts, ...dialogs.map((x) => x.partner)].forEach((u) => { if (u && u.nick) KNOWN.add(u.nick.toLowerCase()); if (u && u.username) KNOWN.add(u.username.toLowerCase()); }); }
  function mentionToHtml(t) { return escapeHtml(t).replace(/@([a-zA-Z0-9_.]{2,20})/gi, (m, nm) => KNOWN.has(nm.toLowerCase()) ? '<span class="mention" data-user="' + escapeAttr(nm) + '">@' + escapeAttr(nm) + '</span>' : m); }
  function userByNickOrUser(i0) { const i = i0.toLowerCase(); return contacts.find((c) => c.nick.toLowerCase() === i || (c.username || '').toLowerCase() === i) || dialogs.find((d) => d.partner.nick.toLowerCase() === i || (d.partner.username || '').toLowerCase() === i) || null; }

  function handleTyping(d) { if (d.nick === me.nick) return; clearTimeout(typingTimers[d.nick]); if (!d.isTyping) { renderTyping(); return; } typingTimers[d.nick] = setTimeout(renderTyping, 2500); renderTyping(); }
  function renderTyping() { const n = Object.keys(typingTimers); el.typingHint.textContent = n.length ? n.join(', ') + ' печатает…' : ''; }
  function maybeSound(m) { if (!soundOn || !m || mineIs(m) || !document.hidden) return; if (isMuted(curKey())) return; try { const c = window.AudioContext || window.webkitAudioContext; if (!c) return; const a = new c(); const o = a.createOscillator(), g = a.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.0001, a.currentTime); g.gain.exponentialRampToValueAtTime(.2, a.currentTime + .01); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + .18); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + .2); } catch {} }
  function updateUnreadBadge() { const t = dialogs.reduce((s, d) => s + (d.unread || 0), 0); el.pmUnreadBadge.textContent = t; el.pmUnreadBadge.classList.toggle('hidden', !t); }

  function setPinned(key, list) { if (key !== curKey()) return; pinsCache = list || []; el.pinnedBar.classList.toggle('hidden', !pinsCache.length); el.pinnedText.textContent = pinsCache.length ? '📌 ' + (pinsCache[0].text || (pinsCache[0].image ? '[фото]' : '[стикер]')) : ''; }

  // ---------- клики по сообщениям ----------
  el.messages.onclick = (e) => {
    const prof = e.target.closest('[data-profile-id]');
    const menu = e.target.closest('[data-menu]');
    const chip = e.target.closest('.reaction-chip'), rm = e.target.closest('[data-r]'), mn = e.target.closest('.mention');
    const opt = e.target.closest('.poll-opt[data-o]');
    const wrap = e.target.closest('.msg[data-msgid]');
    if (opt && wrap && wrap._msg) { ws.send(JSON.stringify({ type: 'vote', chatKey: wrap.dataset.chat, message_id: Number(wrap.dataset.msgid), option: Number(opt.dataset.o) })); return; }
    if (prof) { const u = allUsersFind(Number(prof.dataset.profileId)); if (u) { openViewProfile(u); e.preventDefault(); } return; }
    if (mn) { const u = userByNickOrUser(mn.dataset.user); if (u) openViewProfile(u); return; }
    if (menu && wrap && wrap._msg) { openCtx(e, wrap._msg); return; }
    if (!wrap || !wrap._msg) return;
    const id = wrap._msg.id, pay = currentPay();
    if (rm) { ws && ws.send(JSON.stringify({ type: 'reaction', message_id: id, emoji: rm.dataset.r, ...pay })); return; }
    if (chip) { ws && ws.send(JSON.stringify({ type: 'reaction', message_id: id, emoji: chip.dataset.emoji, ...pay })); return; }
  };
  function currentPay() { return target.type === 'room' ? { room: target.id } : { pm: target.id }; }

  function openCtx(e, m) {
    if (ctxMenu) ctxMenu.remove();
    ctxMenu = document.createElement('div'); ctxMenu.className = 'ctx-menu';
    ctxMenu.style.left = Math.min(e.clientX, innerWidth - 190) + 'px'; ctxMenu.style.top = e.clientY + 'px';
    const items = [];
    const su = senderFor(m);
    if (!mineIs(m) && su && su.id) items.push(['👤 Профиль', () => { const u = allUsersFind(su.id) || su; openViewProfile(u); }]);
    if (m.text) items.push(['📋 Копировать', () => copyText(m.text)]);
    items.push(['Ответить', () => setReply(m)]);
    if (mineIs(m) && m.kind !== 'system') items.push(['Редактировать', () => startEdit(m)]);
    items.push(['Переслать', () => startForward(m)]);
    if (m.image || m.audio || (/^\/uploads\//.test(m.sticker))) items.push(['Скачать', () => dlAttach(m)]);
    if (mineIs(m) && m.kind !== 'system') items.push(['Удалить', () => delMsg(m), 'danger']);
    if (m.kind !== 'system') items.push([isPinned(m.id) ? 'Открепить' : 'Закрепить', () => togglePin(m)]);
if (m.kind !== 'system') items.push(['★ В избранное / убрать', () => ws.send(JSON.stringify({ type: 'fav_toggle', chatKey: curKey(), message_id: m.id }))]);
    if (me.is_owner && !mineIs(m) && m.nick) items.push(['Забанить', () => doBan(m), 'danger']);
    items.forEach(([l, fn, cls]) => { const b = document.createElement('button'); b.className = 'ctx-item' + (cls ? ' ' + cls : ''); b.textContent = l; b.onclick = () => { ctxMenu.remove(); ctxMenu = null; fn(); }; ctxMenu.appendChild(b); });
    document.body.appendChild(ctxMenu);
  }
  document.addEventListener('click', (e) => { if (ctxMenu && !e.target.closest('.ctx-menu')) { ctxMenu.remove(); ctxMenu = null; } });
  el.messages.addEventListener('contextmenu', (e) => {
    const wrap = e.target.closest('.msg');
    if (!wrap) return;
    if (wrap._fav) { e.preventDefault(); openFavCtx(e, wrap._fav); return; }
    if (wrap._msg) { e.preventDefault(); openCtx(e, wrap._msg); }
  });
  function openFavCtx(e, f) {
    if (ctxMenu) ctxMenu.remove();
    ctxMenu = document.createElement('div'); ctxMenu.className = 'ctx-menu';
    ctxMenu.style.left = Math.min(e.clientX, innerWidth - 200) + 'px'; ctxMenu.style.top = e.clientY + 'px';
    const items = [['Отркрыть в чате', () => { openFavChat(f.chatKey); }], ['📋 Копировать', () => {}], ['★ Убрать из избранного', () => ws.send(JSON.stringify({ type: 'fav_toggle', chatKey: f.chatKey, message_id: f.message_id })), 'danger']];
    items.forEach(([l, fn, cls]) => { const b = document.createElement('button'); b.className = 'ctx-item' + (cls ? ' ' + cls : ''); b.textContent = l; b.onclick = () => { ctxMenu.remove(); ctxMenu = null; fn(); }; ctxMenu.appendChild(b); });
    document.body.appendChild(ctxMenu);
  }
  async function copyText(t) { try { await navigator.clipboard.writeText(t); } catch {} }
  function isPinned(id) { return pinsCache.some((p) => p.id === id); }
  function togglePin(m) { ws && ws.send(JSON.stringify({ type: isPinned(m.id) ? 'unpin' : 'pin', message_id: m.id, ...currentPay() })); }
  function delMsg(m) { ws && ws.send(JSON.stringify({ type: 'delete_message', message_id: m.id, ...currentPay() })); }
  function dlAttach(m) { const u = m.image || m.audio || (/^\/uploads\//.test(m.sticker) ? m.sticker : null); if (u) window.open(absUrl(u) + (absUrl(u).indexOf('?') === -1 ? '?download=1' : '&download=1'), '_blank'); }
  function doBan(m) { const c = contacts.find((x) => x.nick === m.nick) || dialogs.find((x) => x.partner.nick === m.nick); const id = c ? c.id : (c ? c.partner.id : null); if (id && confirm('Забанить пользователя?')) ws.send(JSON.stringify({ type: 'admin_ban', user_id: id, ban: true })); }
  function setReply(m) { replyTarget = m; el.replyLabel.textContent = (m.nick || m.fromNick || '') + ': ' + (m.text || (m.image ? '[фото]' : m.sticker ? '[стикер]' : m.audio ? '[голосовое]' : '')); el.replyBar.classList.remove('hidden'); el.messageInput.focus(); }
  el.replyCancel.onclick = clearReply;
  function clearReply() { replyTarget = null; el.replyBar.classList.add('hidden'); }
  function startEdit(m) { const w = findMsgWrap(m.id); if (!w) return; const bubble = w.querySelector('.bubble'); const inp = document.createElement('input'); inp.className = 'msg-edit-input'; inp.value = m.text || ''; bubble.replaceWith(inp); inp.focus(); inp.onkeydown = (e) => { if (e.key === 'Enter') { ws.send(JSON.stringify({ type: 'edit_message', message_id: m.id, text: inp.value, ...currentPay() })); } else if (e.key === 'Escape') { inp.replaceWith(bubble); } }; }
  function findMsgWrap(id) { return el.messages.querySelector('.msg[data-msgid="' + id + '"]'); }
  function applyMsgUpdate(d) { if (d.chatKey !== curKey()) return; const w = findMsgWrap(d.message_id); if (!w) return; const b = w.querySelector('.bubble'); if (b) { b.textContent = d.text || ''; let ed = w.querySelector('.msg-edited'); if (!ed) { ed = document.createElement('span'); ed.className = 'msg-edited'; ed.textContent = ' · изменено'; w.querySelector('.msg-meta').appendChild(ed); } } }
  function applyReaction(d) { if (d.chatKey !== curKey()) return; const w = findMsgWrap(d.message_id); if (!w || !w._msg) return; const dummy = document.createElement('span'); dummy.innerHTML = reactionsHtml({ reactions: d.reactions }); const old = w.querySelector('.reactions-row'); const nr = dummy.querySelector('.reactions-row'); if (old) old.replaceWith(nr || document.createTextNode('')); else if (nr) w._msg; }

  function startForward(m) {
    const targets = [];
    rooms.filter((r) => r.custom || true).forEach((r) => targets.push(['#' + r.id, { toRoom: r.id }]));
    dialogs.forEach((dl) => targets.push(['ЛС: ' + dl.partner.nick, { toPm: dl.partner.id }]));
    if (!ctxMenu) { ctxMenu = document.createElement('div'); } else ctxMenu.remove(); ctxMenu = document.createElement('div');
    ctxMenu.className = 'ctx-menu'; ctxMenu.style.left = 'auto'; ctxMenu.style.right = '20px'; ctxMenu.style.top = '120px';
    targets.forEach(([l, pay]) => { const b = document.createElement('button'); b.className = 'ctx-item'; b.textContent = l; b.onclick = () => { ctxMenu.remove(); ctxMenu = null; const src = currentPay(); ws.send(JSON.stringify({ type: 'forward', message_id: m.id, sourceRoom: src.room, sourcePm: src.pm, ...pay })); }; ctxMenu.appendChild(b); });
    document.body.appendChild(ctxMenu);
  }

  function curKey2() { return curKey(); }

  function toggleChatPin(k) { toggleArr(pinnedChats, k); lsSet('pulse_pinned', pinnedChats); renderRooms(); }
  function toggleChatArch(k) { toggleArr(archivedChats, k); lsSet('pulse_archived', archivedChats); renderRooms(); }
  function toggleChatMute(k) { toggleArr(mutedChats, k); lsSet('pulse_muted', mutedChats); renderRooms(); }
  function addPinArchMute(items, k) {
    items.push([pinnedChats.includes(k) ? '📌 Открепить' : '📌 Закрепить', () => toggleChatPin(k)]);
    items.push([archivedChats.includes(k) ? '🗂 Вернуть из архива' : '🗂 В архив', () => toggleChatArch(k)]);
    items.push([isMuted(k) ? '🔔 Размутить' : '🔇 Замутить', () => toggleChatMute(k)]);
  }

  // ---------- правый клик по каналу ----------
  function channelCtx(e, r) {
    if (ctxMenu) ctxMenu.remove();
    ctxMenu = document.createElement('div'); ctxMenu.className = 'ctx-menu';
    ctxMenu.style.left = Math.min(e.clientX, innerWidth - 190) + 'px'; ctxMenu.style.top = e.clientY + 'px';
    const items = [];
    items.push(['Войти', () => openRoom(r.id)]);
    if (r.custom) items.push(['ℹ️ Информация', () => { openRoom(r.id); setTimeout(() => openChannelProfile(r), 200); }]);
    if (r.custom && me && me.id === r.owner_id) items.push(['⚙ Настройки канала', () => openChannelProfile(r)]);
    items.push(['🎙 Голосовой канал', () => { openRoom(r.id); setTimeout(() => toggleVoice(r.id), 200); }]);
    addPinArchMute(items, 'r:' + r.id);
    if (r.custom && me && me.id === r.owner_id) items.push(['🗑 Удалить канал', () => { if (confirm('Удалить канал @' + r.id + '?')) ws.send(JSON.stringify({ type: 'delete_channel', name: r.id })); }, 'danger']);
    items.forEach(([l, fn, cls]) => { const b = document.createElement('button'); b.className = 'ctx-item' + (cls ? ' ' + cls : ''); b.textContent = l; b.onclick = () => { ctxMenu.remove(); ctxMenu = null; fn(); }; ctxMenu.appendChild(b); });
    document.body.appendChild(ctxMenu);
  }

  // ---------- профиль ----------
  el.meCard.onclick = (e) => { if (e.target.closest('#profileBtn,#settingsBtn,#logoutBtn')) return; openProfile(); };
  el.profileBtn.onclick = openProfile;
  el.settingsBtn.onclick = openSettings;
  el.openSettingsBtn.onclick = openSettings;
  el.settingsClose.onclick = () => closeSettings();
if (el.srvSave) el.srvSave.onclick = () => { const v = (el.srvAddr.value || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, ''); try { localStorage.setItem('pulse_srv', v); } catch {} SERVER_HOST = v; location.reload(); };
  el.settingsModal.onclick = (e) => { if (e.target === el.settingsModal) closeSettings(); };
  el.setProfileOpen.onclick = () => { closeSettings(); openProfile(); };
  function openSettings() {
    if (!me) return;
    openPrivacyFromMe();
    renderThemeUI();
    el.soundToggle && (el.soundToggle.checked = soundOn);
    el.callSoundToggle && (el.callSoundToggle.checked = callSoundOn);
    el.myId && (el.myId.textContent = '#' + me.id);
    el.myUser && (el.myUser.textContent = '@' + (me.username || ''));
    if (el.srvAddr) el.srvAddr.value = SERVER_HOST;
el.settingsModal.classList.remove('hidden');
  }
  function closeSettings() { el.settingsModal.classList.add('hidden'); }
  document.querySelectorAll('.set-nav').forEach((b) => { b.onclick = () => { document.querySelectorAll('.set-nav').forEach((x) => x.classList.toggle('active', x === b)); document.querySelectorAll('.set-sec').forEach((x) => x.classList.toggle('active', x.dataset.sec === b.dataset.sec)); }; });
  function openPrivacyFromMe() { el.setShowPhone.checked = me.settings ? me.settings.showPhone !== false : true; el.setReadReceipts.checked = me.settings ? me.settings.readReceipts !== false : true; el.setShowOnline.checked = me.settings ? me.settings.showOnline !== false : true; }
  el.privacySave.onclick = () => { if (!ws || !me) return; ws.send(JSON.stringify({ type: 'update_profile', settings: { showPhone: el.setShowPhone.checked, readReceipts: el.setReadReceipts.checked, showOnline: el.setShowOnline.checked } })); };
  el.profileModal.onclick = (e) => { if (e.target === el.profileModal) closeProfile(); };
  el.profileClose.onclick = closeProfile;
  function openProfile() {
    if (!me) return;
    newAvatar = me.avatar || null; newBanner = me.banner || '';
    selFrame = (me.settings && me.settings.avatarFrame) || 'none'; selFx = (me.settings && me.settings.avatarEffect) || 'none';
    renderThemeUI(); renderAvCustom();
    el.profileAvatar.innerHTML = ''; el.profileAvatar.innerHTML = avatarHtml(me, 78);
    el.profileUsername.value = me.username || ''; el.profileNick.value = me.nick || ''; el.profileBio.value = me.bio || '';
    el.profilePhone.value = me.phone || ''; el.profileStatusEmoji.value = me.status_emoji || '';
    el.setShowPhone.checked = me.settings ? me.settings.showPhone !== false : true;
    el.setReadReceipts.checked = me.settings ? me.settings.readReceipts !== false : true;
    el.soundToggle.checked = soundOn;
    el.oldPass.value = ''; el.newPass.value = ''; el.pwMsg.textContent = '';
    renderBannerPreview(); profileMsg('', true);
    el.profileModal.classList.remove('hidden');
  }
  function closeProfile() { el.profileModal.classList.add('hidden'); }
  function renderBannerPreview() { el.profileBanner.innerHTML = newBanner ? `<img src="${escapeAttr(newBanner)}" alt="">` : '<span style="color:var(--muted);display:flex;align-items:center;justify-content:center;height:100%;font-size:12px">Баннер</span>'; }
  function profileMsg(t, ok) { el.profileMsg.textContent = t; el.profileMsg.classList.toggle('ok', !!ok); }
  function pwMsgTxt(t, ok) { el.pwMsg.textContent = t; el.pwMsg.style.color = ok ? 'var(--green)' : ''; }

  el.avatarUploadBtn.onclick = () => el.avatarFile.click();
  el.avatarClearBtn.onclick = () => { newAvatar = null; el.profileAvatar.innerHTML = avatarHtml(me, 78); };
  el.avatarFile.onchange = async () => { const f = el.avatarFile.files[0]; el.avatarFile.value = ''; if (!f || !/^image\//.test(f.type)) return; const r = await fetch(srvOrigin() + '/upload', { method: 'POST', headers: { 'Content-Type': f.type }, body: f }); const d = await r.json(); if (r.ok) { newAvatar = d.url; el.profileAvatar.innerHTML = avatarHtml({ ...me, avatar: d.url }, 78); } };
  el.bannerUploadBtn.onclick = () => el.bannerFile.click();
  el.bannerClearBtn.onclick = () => { newBanner = ''; renderBannerPreview(); };
  el.bannerFile.onchange = async () => { const f = el.bannerFile.files[0]; el.bannerFile.value = ''; if (!f || !/^image\//.test(f.type)) return; const r = await fetch(srvOrigin() + '/upload', { method: 'POST', headers: { 'Content-Type': f.type }, body: f }); const d = await r.json(); if (r.ok) { newBanner = d.url; renderBannerPreview(); } };

  el.profileSave.onclick = () => {
    if (!ws || !me) return;
    const payload = { type: 'update_profile', nick: el.profileNick.value.trim(), username: el.profileUsername.value.trim(), bio: el.profileBio.value.trim() };
    if (el.profilePhone.value !== (me.phone || '')) payload.phone = el.profilePhone.value.trim();
    if (el.profileStatusEmoji.value !== (me.status_emoji || '')) payload.status_emoji = el.profileStatusEmoji.value.trim();
    if (newAvatar !== (me.avatar || null)) payload.avatar = newAvatar || '';
    if (newBanner !== (me.banner || '')) payload.banner = newBanner || '';
    const set = {};
    if (selFrame !== ((me.settings && me.settings.avatarFrame) || 'none')) set.avatarFrame = selFrame;
    if (selFx !== ((me.settings && me.settings.avatarEffect) || 'none')) set.avatarEffect = selFx;
    if (Object.keys(set).length) payload.settings = set;
    ws.send(JSON.stringify(payload));
  };
  el.soundToggle.onchange = () => { soundOn = el.soundToggle.checked; localStorage.setItem(SOUND_KEY, soundOn ? '1' : '0'); };
  callSoundOn = localStorage.getItem('pulse_callsound') !== '0';
  el.callSoundToggle.onchange = () => { callSoundOn = el.callSoundToggle.checked; localStorage.setItem('pulse_callsound', callSoundOn ? '1' : '0'); };
  el.resetThemeBtn.onclick = () => { localStorage.removeItem(THEME_KEY); theme = { mode: 'dark', palette: 'violet' }; applyTheme(); renderThemeUI(); };
  el.changePassBtn.onclick = () => { const o = el.oldPass.value, n = el.newPass.value; if (!o || !n) { el.pwMsg.textContent = 'Введи оба пароля'; return; } ws && ws.send(JSON.stringify({ type: 'change_password', old: o, new: n })); };

  // темы UI
  function renderThemeUI() {
    el.themeDarkBtn.classList.toggle('active', theme.mode === 'dark');
    el.themeLightBtn.classList.toggle('active', theme.mode === 'light');
    el.themeAutoBtn && el.themeAutoBtn.classList.toggle('active', theme.mode === 'auto');
    el.accentRow.innerHTML = Object.keys(PALETTES).map((k) => '<button type="button" class="accent-dot' + (theme.palette === k ? ' active' : '') + '" data-a="' + k + '" style="background:' + PALETTES[k].c + '"></button>').join('');
  }
  el.themeDarkBtn.onclick = () => { theme.mode = 'dark'; saveTheme(); };
  el.themeLightBtn.onclick = () => { theme.mode = 'light'; saveTheme(); };
  el.themeAutoBtn && (el.themeAutoBtn.onclick = () => { theme.mode = 'auto'; applyTheme(); saveTheme(); });
  el.accentRow.onclick = (e) => { const b = e.target.closest('[data-a]'); if (b) { theme.palette = b.dataset.a; saveTheme(); } };

  let fontPx = parseInt(localStorage.getItem('pulse_font') || '14', 10);
  function applyFont() { document.documentElement.style.setProperty('--msg-font', fontPx + 'px'); document.querySelectorAll('.fs-btn').forEach((x) => x.classList.toggle('active', parseInt(x.dataset.fs, 10) === fontPx)); }
  document.querySelectorAll('.fs-btn').forEach((x) => { x.onclick = () => { fontPx = parseInt(x.dataset.fs, 10); localStorage.setItem('pulse_font', fontPx); applyFont(); }; });
applyFont();
  const FRAMES = ['none', 'gold', 'neon', 'white', 'grad'];
  const FXS = ['none', 'pulse', 'glow', 'shine'];
  let selFrame = 'none', selFx = 'none';
  function renderAvCustom() {
    const mk = (row, list, sel, fn) => {
      if (!row) return;
      row.innerHTML = list.map((x) => `<button class="frame-chip${x === sel ? ' active' : ''}" data-v="${x}">${x === 'none' ? 'Нет' : x}</button>`).join('');
      row.querySelectorAll('.frame-chip').forEach((b) => b.onclick = () => { fn(b.dataset.v); renderAvCustom(); });
    };
    mk(el.avFrameRow, FRAMES, selFrame, (v) => selFrame = v);
    mk(el.avFxRow, FXS, selFx, (v) => selFx = v);
  }
  function applyCompact() {
    const on = localStorage.getItem('pulse_compact') === '1';
    document.body.classList.toggle('compact', on);
    if (el.compactMode) el.compactMode.checked = on;
  }
  if (el.compactMode) el.compactMode.onchange = () => { localStorage.setItem('pulse_compact', el.compactMode.checked ? '1' : '0'); applyCompact(); };
  applyCompact();
  let vDef = parseFloat(localStorage.getItem('pulse_vspeed') || '1');
  if (el.vspeedSel) { el.vspeedSel.value = String(vDef); el.vspeedSel.onchange = () => { vDef = parseFloat(el.vspeedSel.value); localStorage.setItem('pulse_vspeed', vDef); }; }
  if (el.exportChatBtn) el.exportChatBtn.onclick = exportChat;
  if (el.updBtn) el.updBtn.onclick = async () => {
    el.updMsg.textContent = 'Проверяю…';
    try {
      const r = await fetch(srvOrigin() + '/version'); const d = await r.json();
      el.updVersion.textContent = d.version || '?';
      const v = (x) => String(x).split('.').map((n) => parseInt(n, 10) || 0);
      const cur = v(d.version), latest = v(d.latest);
      const newer = latest[0] > cur[0] || (latest[0] === cur[0] && (latest[1] > cur[1] || (latest[1] === cur[1] && latest[2] > cur[2])));
      el.updMsg.textContent = newer ? 'Доступна версия ' + d.latest : 'У вас актуальная версия';
    } catch { el.updMsg.textContent = 'Не удалось проверить (нет сервера обновлений)'; }
  };
  function exportChat() {
    const rows = Array.from(el.messages.querySelectorAll('.msg')).map((n) => n.textContent.trim()).filter(Boolean);
    const txt = 'Пульс — экспорт • ' + curKey() + ' • ' + new Date().toLocaleString('ru-RU') + '\n\n' + rows.join('\n');
    const blob = new Blob(['\ufeff' + txt], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'chat-' + Date.now() + '.txt'; a.click();
  }

  // ---------- просмотр профиля ----------
  function openViewProfile(u) { if (!u) return; el.vpBanner && (el.vpBanner.innerHTML = u.banner ? `<img src="${escapeAttr(u.banner)}" alt="">` : ''); el.vpAvatar.innerHTML = avatarHtml(u, 76); el.vpNick.textContent = u.nick; el.vpNick.innerHTML = escapeHtml(u.nick) + (u.is_owner ? ownerBadge() : ''); el.vpUser.textContent = '@' + (u.username || '') + (u.status_emoji ? ' ' + u.status_emoji : ''); el.vpBio.textContent = u.bio || ''; el.vpPhone.textContent = u.phone ? '📞 ' + u.phone : ''; el.vpReceived.innerHTML = ''; el.vpStats.innerHTML = ''; if (el.vpPinned) el.vpPinned.innerHTML = ''; vpPinned = null; el.viewProfileModal.classList.remove('hidden'); el.vpWrite.onclick = () => { el.viewProfileModal.classList.add('hidden'); openPm(u.id); setView('pm'); }; el.vpCall.onclick = () => { el.viewProfileModal.classList.add('hidden'); startCall(u.id); };
  renderVpExtra(u);
  ws && ws.send(JSON.stringify({ type: 'received_gifts', user_id: u.id }));
  ws && ws.send(JSON.stringify({ type: 'user_stats', user_id: u.id }));
  ws && ws.send(JSON.stringify({ type: 'pinned_gifts', user_id: u.id })); }
  el.vpClose.onclick = () => el.viewProfileModal.classList.add('hidden');
  el.viewProfileModal.onclick = (e) => { if (e.target === el.viewProfileModal) el.viewProfileModal.classList.add('hidden'); };

  // ---------- профиль канала ----------
  function openChannelProfile(r) {
    cpRoom = r; cpNewBanner = null;
    el.cpBanner.innerHTML = r.banner ? `<img src="${escapeAttr(r.banner)}" alt="">` : '';
    el.cpName.textContent = (r.private ? '🔒 ' : '') + '@' + r.id;
    el.cpDesc.textContent = r.description || '';
    el.cpMembers.textContent = '👥 ' + r.count + ' участников';
    const isOwner = me && me.id === r.owner_id;
    const op = contacts.find((c) => c.id === r.owner_id) || (isOwner ? me : null);
    el.cpOwner.textContent = r.owner_id ? ('Владелец: ' + (op ? op.nick : '#' + r.owner_id)) : '';
    el.cpEdit.classList.toggle('hidden', !isOwner);
    if (isOwner) { el.cpDescInput.value = r.description || ''; buildCpColors(r.color || '#7c5cff'); }
    ws && ws.send(JSON.stringify({ type: 'channel_members', room: r.id }));
    ws && ws.send(JSON.stringify({ type: 'channel_stats', name: r.id }));
    el.channelProfileModal.classList.remove('hidden');
  }
  function buildCpColors(sel) { el.cpColors.innerHTML = ACCENTS.map((c) => '<button type="button" class="accent-dot' + (c === sel ? ' active' : '') + '" data-a="' + c + '" style="background:' + c + '"></button>').join(''); el.cpColors._sel = sel; }
  el.cpColors.onclick = (e) => { const b = e.target.closest('[data-a]'); if (b) { el.cpColors.querySelectorAll('.accent-dot').forEach((d) => d.classList.toggle('active', d === b)); el.cpColors._sel = b.dataset.a; } };
  el.cpSave.onclick = () => { if (!cpRoom || !me) return; const p = { type: 'update_channel', name: cpRoom.id, description: el.cpDescInput.value, color: el.cpColors._sel || '#7c5cff' }; if (cpNewBanner !== null) p.banner = cpNewBanner; ws.send(JSON.stringify(p)); el.channelProfileModal.classList.add('hidden'); };
  el.cpInvite.onclick = () => { if (!cpRoom || !me) return; ws.send(JSON.stringify({ type: 'channel_invite', name: cpRoom.id })); };
  if (el.qrClose) el.qrClose.onclick = () => el.qrModal.classList.add('hidden');
  if (el.qrModal) el.qrModal.onclick = (e) => { if (e.target === el.qrModal) el.qrModal.classList.add('hidden'); };
  if (el.qrCopy) el.qrCopy.onclick = () => { if (el.qrLink.textContent) { try { navigator.clipboard.writeText(el.qrLink.textContent); } catch {} } };
  let _inviteClick = 0;
  el.cpClose.onclick = () => el.channelProfileModal.classList.add('hidden');
  el.channelProfileModal.onclick = (e) => { if (e.target === el.channelProfileModal) el.channelProfileModal.classList.add('hidden'); };
  el.cpBannerUp.onclick = () => el.cpBannerFile.click();
  el.cpBannerClear.onclick = () => { cpNewBanner = ''; el.cpBanner.innerHTML = ''; };
  el.cpBannerFile.onchange = async () => { const f = el.cpBannerFile.files[0]; el.cpBannerFile.value = ''; if (!f || !/^image\//.test(f.type)) return; const rr = await fetch(srvOrigin() + '/upload', { method: 'POST', headers: { 'Content-Type': f.type }, body: f }); const d = await rr.json(); if (rr.ok) { cpNewBanner = d.url; el.cpBanner.innerHTML = `<img src="${escapeAttr(d.url)}" alt="">`; } };
  el.cpSubscribe.onclick = () => {
    if (!cpRoom) return;
    const add = (el.cpSubscribe.textContent === 'Отписаться') ? false : true;
    ws.send(JSON.stringify({ type: 'channel_sub', name: cpRoom.id, add }));
    setTimeout(() => ws.send(JSON.stringify({ type: 'channel_stats', name: cpRoom.id })), 200);
  };
  function renderChannelStats(d) {
    if (!cpRoom || d.name !== cpRoom.id) return;
    const created = d.created ? new Date(d.created).toLocaleDateString('ru-RU') : '';
    el.cpStats.innerHTML = '<div class="cp-stats-grid"><div><b>' + d.subscribers + '</b>подписчиков</div><div><b>' + d.messages + '</b>сообщений</div><div><b>' + d.views + '</b>просмотров</div><div><b>' + created + '</b>создан</div></div>';
    el.cpSubscribe.textContent = d.mySubscribed ? 'Отписаться' : 'Подписаться';
  }

  // ---------- каналы ----------
  el.newChannelBtn.onclick = () => { el.channelName.value = ''; channelMsg('', true); el.channelModal.classList.remove('hidden'); el.channelName.focus(); };
  el.channelClose.onclick = () => el.channelModal.classList.add('hidden');
  el.channelModal.onclick = (e) => { if (e.target === el.channelModal) el.channelModal.classList.add('hidden'); };
  el.channelSave.onclick = () => { const n = el.channelName.value.trim(); if (!n) return channelMsg('Введи имя', false); ws && ws.send(JSON.stringify({ type: 'create_channel', name: n, private: !!(el.channelPrivate && el.channelPrivate.checked) })); };
  function channelMsg(t, ok) { el.channelMsg.textContent = t; el.channelMsg.classList.toggle('ok', !!ok); }

  // ---------- пикер эмодзи/стикеров/гифок ----------
  function renderPick() {
    el.emojiGrid.innerHTML = EMOJIS.map((e) => '<button type="button" class="pick-item" data-e="' + e + '">' + e + '</button>').join('');
    const st = myStickers.filter((s) => s.type === 'sticker');
    el.stickerItems.innerHTML = st.map((s) => '<button type="button" class="pick-item" data-st="' + escapeAttr(s.url) + '"><img src="' + escapeAttr(s.url) + '" alt=""></button>').join('') + STICKERS.map((s) => '<button type="button" class="pick-item" data-s="' + s + '">' + s + '</button>').join('');
    const gif = myStickers.filter((s) => s.type === 'gif');
    el.gifItems.innerHTML = gif.map((s) => '<button type="button" class="pick-item" data-st="' + escapeAttr(s.url) + '"><img src="' + escapeAttr(s.url) + '" alt=""></button>').join('') + GIFLIB.map((s) => '<button type="button" class="pick-item gif-anim" data-s="' + s + '">' + s + '</button>').join('');
  }
  renderPick();
  el.pickerBtn.onclick = () => el.pickPanel.classList.toggle('hidden');
  el.pickPanel.querySelectorAll('.pick-tab').forEach((t) => { t.onclick = () => { el.pickPanel.querySelectorAll('.pick-tab').forEach((x) => x.classList.toggle('active', x === t)); el.emojiGrid.classList.toggle('hidden', t.dataset.tab !== 'emoji'); el.stickerGrid.classList.toggle('hidden', t.dataset.tab !== 'sticker'); el.gifGrid.classList.toggle('hidden', t.dataset.tab !== 'gif'); }; });
  document.addEventListener('click', (e) => { if (!e.target.closest('#pickPanel') && !e.target.closest('#pickerBtn')) el.pickPanel.classList.add('hidden'); });
  el.emojiGrid.onclick = (e) => { const b = e.target.closest('[data-e]'); if (b) { el.messageInput.value += b.dataset.e; el.messageInput.focus(); } };
  el.stickerGrid.onclick = clickStick; el.gifGrid.onclick = clickStick;
  function clickStick(e) { const b = e.target.closest('[data-st],[data-s]'); if (!b) return; sendContent({ text: '', sticker: b.dataset.st || b.dataset.s }); el.pickPanel.classList.add('hidden'); }
  el.addStickerBtn.onclick = () => el.stickerFile.click();
  el.addGifBtn.onclick = () => el.gifFile.click();
  async function addPersonal(f, kind) { if (!f || !/^image\//.test(f.type)) return; const r = await fetch(srvOrigin() + '/upload', { method: 'POST', headers: { 'Content-Type': f.type }, body: f }); const d = await r.json(); if (r.ok) ws.send(JSON.stringify({ type: 'create_sticker', kind, url: d.url })); }
  el.stickerFile.onchange = () => { addPersonal(el.stickerFile.files[0], 'sticker'); el.stickerFile.value = ''; };
  el.gifFile.onchange = () => { addPersonal(el.gifFile.files[0], 'gif'); el.gifFile.value = ''; };

  // ---------- отправка ----------
  function sendContent(c) { if (!ws || !me) return; if (target.type === 'room') ws.send(JSON.stringify({ type: 'message', ...c })); else ws.send(JSON.stringify({ type: 'pm', to: target.id, ...c })); sendTyping(false); }
  el.messageForm.onsubmit = (e) => { e.preventDefault(); const txt = el.messageInput.value.trim(); const p = {}; if (txt) p.text = txt; if (pendingImage) { p.image = pendingImage; pendingImage = null; } if (replyTarget) { p.reply = (replyTarget.nick || replyTarget.fromNick || '') + ': ' + (replyTarget.text || ''); clearReply(); } if (!Object.keys(p).length) return; sendContent(p); el.messageInput.value = ''; el.messageInput.focus(); };
el.messageInput.oninput = () => { const now = Date.now(); if (now - typingSentAt > 1200 && target.type === 'room') { typingSentAt = now; ws && ws.send(JSON.stringify({ type: 'typing', isTyping: true })); } mentionPopUpdate(); };
el.messageInput.onblur = () => { sendTyping(false); if (el.mentionPop) el.mentionPop.classList.add('hidden'); };
function mentionCandidates(q) {
  const out = []; const seen = new Set(); const push = (u) => { if (!u || !u.nick) return; const low = u.nick.toLowerCase(); if (seen.has(low)) return; seen.add(low); if (!q || low.startsWith(q.toLowerCase()) || (u.username || '').toLowerCase().startsWith(q.toLowerCase())) out.push(u); };
  (me ? [me] : []).forEach(push); (contacts || []).forEach(push); (dialogs || []).map((x) => x.partner).forEach(push);
  return out;
}
function mentionPopUpdate() {
  if (!el.mentionPop) return;
  const v = el.messageInput.value; const caret = el.messageInput.selectionStart || v.length;
  const before = v.slice(0, caret);
  const m = /(^|\s)@([\wа-яА-ЯёЁ_.]*)$/.exec(before);
  if (!m || !m[2]) { el.mentionPop.classList.add('hidden'); return; }
  const cands = mentionCandidates(m[2]).slice(0, 8);
  if (!cands.length) { el.mentionPop.classList.add('hidden'); return; }
  el.mentionPop.innerHTML = cands.map((u) => '<div class="mention-opt" data-nick="' + escapeAttr(u.nick) + '">' + avatarHtml(u, 22) + '<span>' + escapeHtml(u.nick) + '</span><em>@' + escapeHtml(u.username || '') + '</em></div>').join('');
  el.mentionPop.classList.remove('hidden');
  el.mentionPop.querySelectorAll('.mention-opt').forEach((o) => o.onclick = () => {
    const nick = o.dataset.nick; const at = before.lastIndexOf('@');
    const nv = v.slice(0, at) + '@' + nick + ' ' + v.slice(caret);
    el.messageInput.value = nv; el.messageInput.focus(); const pos = at + nick.length + 2;
    try { el.messageInput.setSelectionRange(pos, pos); } catch {}
    el.mentionPop.classList.add('hidden');
  });
}
  function sendTyping(v) { typingSentAt = 0; ws && ws.send(JSON.stringify({ type: 'typing', isTyping: v })); }

  // фото
  el.photoBtn.onclick = () => el.photoInput.click();
  const setPhotoState = (busy) => { el.photoBtn.classList.toggle('busy', busy); el.photoBtn.disabled = busy; };
  el.photoInput.onchange = async () => { const f = el.photoInput.files[0]; el.photoInput.value = ''; if (!f) return; if (f.size > 5 * 1024 ** 3) return alert('>5 ГБ'); setPhotoState(true); try { const r = await fetch(srvOrigin() + '/upload?name=' + encodeURIComponent(f.name), { method: 'POST', headers: { 'Content-Type': f.type || 'application/octet-stream' }, body: f }); const d = await r.json(); if (r.ok) { const body = { text: el.messageInput.value.trim() }; if (f.type.startsWith('image/')) body.image = d.url; else if (f.type.startsWith('video/')) body.video = d.url; else if (f.type.startsWith('audio/')) body.audio = d.url; else body.file = { name: f.name, size: f.size, url: d.url }; if (replyTarget) { body.reply = (replyTarget.nick || '') + ': ' + (replyTarget.text || ''); clearReply(); } sendContent(body); el.messageInput.value = ''; el.messageInput.focus(); } } catch {} finally { setPhotoState(false); } };

  // голосовое
  el.recordBtn.onclick = async () => { if (recActive) { stopRec(); return; } try { const st = await navigator.mediaDevices.getUserMedia({ audio: true }); const supported = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'].find((t) => window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)); mediaRec = new MediaRecorder(st, supported ? { mimeType: supported } : undefined); recChunks = []; mediaRec.ondataavailable = (ev) => { if (ev.data && ev.data.size) recChunks.push(ev.data); }; mediaRec.onstop = async () => { st.getTracks().forEach((t) => t.stop()); hideRecBar(); if (recCancelled) { recCancelled = false; recActive = false; el.recordBtn.classList.remove('recording'); return; } if (!recChunks.length) { recActive = false; el.recordBtn.classList.remove('recording'); return; } const blob = new Blob(recChunks, { type: mediaRec.mimeType || 'audio/webm' }); const ct = (mediaRec.mimeType || 'audio/webm').split(';')[0].trim() || 'audio/webm'; const r = await fetch(srvOrigin() + '/upload', { method: 'POST', headers: { 'Content-Type': ct }, body: blob }); let d = {}; try { d = await r.json(); } catch {} if (r.ok && d.url) sendContent({ text: '', audio: d.url }); }; showRecBar(); mediaRec.start(); recActive = true; el.recordBtn.classList.add('recording'); } catch { alert('Нет микрофона'); } };
  function stopRec() { recActive = false; el.recordBtn.classList.remove('recording'); hideRecBar(); if (mediaRec && mediaRec.state !== 'inactive') mediaRec.stop(); }

// GIF пикер
const gifSearchFn = async (q) => {
  if (!el.gifGrid) return;
  if (!q) q = 'funny';
  el.gifGrid.innerHTML = '<div class="empty-hint">Загрузка…</div>';
  try {
    const r = await fetch('https://api.tenor.com/v1/search?q=' + encodeURIComponent(q) + '&key=LIVDSRZULELA&media_filter=minimal&limit=24');
    const d = await r.json();
    el.gifGrid.innerHTML = (d.results || []).map((it) => {
      const g = (it.media && it.media[0]) || {};
      const u = g.gif || g.tinygif || '';
      return u ? '<img class="gif-thumb" data-gif="' + escapeAttr(u) + '" src="' + escapeAttr(g.nanogif || g.tinygif || u) + '" alt="">' : '';
    }).join('');
    el.gifGrid.querySelectorAll('.gif-thumb').forEach((img) => img.onclick = () => { sendContent({ text: el.messageInput.value.trim(), image: img.dataset.gif }); el.messageInput.value = ''; el.gifGrid.innerHTML = ''; el.gifPanel.classList.add('hidden'); });
  } catch { el.gifGrid.innerHTML = '<div class="empty-hint">Нет связи с сервисом GIF</div>'; }
};
el.gifBtn.onclick = () => { el.gifPanel.classList.toggle('hidden'); if (!el.gifPanel.classList.contains('hidden')) { el.gifSearch.focus(); gifSearchFn(el.gifSearch.value.trim()); } };
el.gifSearchGo.onclick = () => gifSearchFn(el.gifSearch.value.trim());
el.gifSearch.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); gifSearchFn(el.gifSearch.value.trim()); } });
el.gifClose.onclick = () => el.gifPanel.classList.add('hidden');

// Drag & drop файлов
let dropFiles = [];
function fmtSize(b) { if (b < 1024) return b + ' Б'; if (b < 1048576) return (b / 1024).toFixed(1) + ' КБ'; return (b / 1048576).toFixed(1) + ' МБ'; }
function showDropBar(files) {
  dropFiles = Array.from(files);
  if (!dropFiles.length) return;
  const first = dropFiles[0];
  el.dropName.textContent = dropFiles.length > 1 ? (dropFiles.length + ' файлов: ' + first.name + '…') : first.name;
  el.dropSize.textContent = fmtSize(dropFiles.reduce((s, f) => s + (f.size || 0), 0));
  el.dropBar.classList.remove('hidden');
}
function hideDropBar() { dropFiles = []; if (el.dropBar) el.dropBar.classList.add('hidden'); }
async function uploadAndSendFile(f) {
  const r = await fetch(srvOrigin() + '/upload?name=' + encodeURIComponent(f.name), { method: 'POST', headers: { 'Content-Type': f.type || 'application/octet-stream' }, body: f });
  let d = {}; try { d = await r.json(); } catch {}
  if (!r.ok || !d.url) { showToast('Не удалось загрузить файл'); return; }
  const body = { text: '' };
  if (f.type && f.type.startsWith('image/')) body.image = d.url;
  else if (f.type && f.type.startsWith('video/')) body.video = d.url;
  else if (f.type && f.type.startsWith('audio/')) body.audio = d.url;
  else body.file = { name: f.name, size: f.size, url: d.url };
  sendContent(body);
}
el.dropSend.onclick = async () => { const files = dropFiles; el.dropBar.classList.add('hidden'); dropFiles = []; for (const f of files) await uploadAndSendFile(f); };
el.dropCancel.onclick = hideDropBar;
document.addEventListener('dragover', (e) => { e.preventDefault(); });
document.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer && e.dataTransfer.files;
  if (files && files.length) showDropBar(files);
});

  // поиск людей
  el.peopleSearch.oninput = () => {
    const raw = el.peopleSearch.value.trim();
    const q = raw.toLowerCase();
    if (q.startsWith('>')) {
      const query = raw.slice(1).trim();
      if (query.length < 2) { el.searchResults.classList.add('hidden'); return; }
      ws && ws.send(JSON.stringify({ type: 'search_msgs', q: query }));
      el.searchResults.innerHTML = '<div class="empty-hint">Ищу…</div>';
      el.searchResults.classList.remove('hidden');
      return;
    }
    if (!q) { el.searchResults.classList.add('hidden'); return; }
    const seen = new Set();
    const ms = [...contacts.map((c) => ({ ...c, _isowner: c.is_owner })), ...dialogs.map((d) => ({ ...d.partner, _isowner: d.partner.is_owner }))].filter((p) => p && p.id && !seen.has(p.id) && seen.add(p.id) && (String(p.nick || '').toLowerCase().includes(q) || String(p.username || '').toLowerCase().includes(q) || String(p.phone || '').toLowerCase().includes(q)));
    el.searchResults.innerHTML = '';
    if (!ms.length) { el.searchResults.innerHTML = '<div class="empty-hint">Никого</div>'; } else ms.slice(0, 20).forEach((p) => { const it = document.createElement('div'); it.className = 'room-item'; it.innerHTML = `<span class="room-icon avatar" style="background:${p.color || '#7c5cff'}">${avatarHtml(p, 32)}</span><span class="item-main"><span class="item-title">${escapeHtml(p.nick)}${p._isowner ? ownerBadge() : ''}</span><span class="item-sub">@${escapeHtml(p.username)}${p.phone ? ' · ' + escapeHtml(p.phone) : ''}</span></span>`; it.onclick = () => { openPm(p.id); clearPeople(); }; el.searchResults.appendChild(it); });
    el.searchResults.classList.remove('hidden');
  };
  function renderMsgSearch(results) {
    el.searchResults.innerHTML = '';
    if (!results.length) { el.searchResults.innerHTML = '<div class="empty-hint">Ничего не найдено</div>'; el.searchResults.classList.remove('hidden'); return; }
    results.forEach((r) => {
      const it = document.createElement('div'); it.className = 'room-item';
      it.innerHTML = `<span class="room-icon">🔖</span><span class="item-main"><span class="item-title">${escapeHtml(r.chatKey)}${r.nick ? ' · ' + escapeHtml(r.nick) : ''}</span><span class="item-sub">${escapeHtml(r.txt)}</span></span>`;
      it.onclick = () => { openFavChat(r.chatKey); setTimeout(() => el.peopleSearch.value = '' && el.searchResults.classList.add('hidden'), 100); };
      el.searchResults.appendChild(it);
    });
    el.searchResults.classList.remove('hidden');
  }
  function clearPeople() { el.peopleSearch.value = ''; el.searchResults.classList.add('hidden'); }

  // поиск по чату
  el.msgSearchBtn.onclick = () => el.msgSearch.classList.toggle('hidden');
  el.msgSearch.oninput = () => { const q = el.msgSearch.value.trim().toLowerCase(); el.messages.querySelectorAll('.msg').forEach((n) => { n.style.display = (!q || n.textContent.toLowerCase().includes(q)) ? '' : 'none'; }); };

  // ---------- звонки ----------
  function startCall(userId) { if (!userId || callActive) return;
  callPeer = userId; callRole = 'caller'; callActive = true;
  callMeta = { kind: 'pm', partner: userId, start: Date.now(), ans: false, declined: false };
  showCall(allUsersFind(userId)); callNotify('Звонок…', 'ringing'); rtcSend('ring');
  ringTimer = setTimeout(() => { if (callMeta && !callMeta.ans) { endCall(); } }, 30000);
}
  function showCall(p) { el.callAvatar.innerHTML = avatarHtml(p, 110); el.callNick.textContent = (p && p.nick) || '…'; el.callOverlay.classList.remove('hidden'); el.callVideoWrap.classList.add('hidden'); setCallActions(fullCallBtns()); wireCallBtns(); el.callActions.querySelector('#cgMic').onclick = toggleMic; el.callActions.querySelector('#cgScr').onclick = () => { if (callRole === 'caller') shareScreen(); }; el.callActions.querySelector('#cgEnd').onclick = endCall; }
  function setCallActions(html) { el.callActions.innerHTML = html; }
  function callNotify(t, cls) { el.callStatus.textContent = t; el.callStatus.className = 'call-status' + (cls ? ' ' + cls : ''); }
  function rtcSend(kind, extra) { if (!callPeer || !ws) return; ws.send(JSON.stringify({ type: 'call_signal', to: callPeer, payload: { kind, ...extra } })); }
  async function beginAudioLocal(en) { pc = new RTCPeerConnection(RTC); pc.onicecandidate = (e) => { if (e.candidate) rtcSend('ice', { candidate: e.candidate }); }; pc.ontrack = (e) => { el.callVideoWrap.classList.remove('hidden'); }; try { localAudio = await navigator.mediaDevices.getUserMedia({ audio: en }); localAudio.getTracks().forEach((t) => pc.addTrack(t, localAudio)); } catch { localAudio = null; } }
  async function makeOfferToPeer() { await beginAudioLocal(true); if (!pc) return; callNotify('Соединение…', ''); const o = await pc.createOffer(); await pc.setLocalDescription(o); rtcSend('offer', { sdp: pc.localDescription }); }
  async function acceptOfferData(data) { await beginAudioLocal(true); if (!pc) return; await pc.setRemoteDescription(new RTCSessionDescription(data.sdp)); const a = await pc.createAnswer(); await pc.setLocalDescription(a); rtcSend('answer', { sdp: pc.localDescription }); callNotify('Идёт разговор', ''); setCallActions(fullCallBtns()); wireCallBtns(); if (callMeta) callMeta.ans = true; if (ringTimer) clearTimeout(ringTimer); }
  async function answerData(data) { if (pc) { await pc.setRemoteDescription(new RTCSessionDescription(data.sdp)); callNotify('Идёт разговор', ''); setCallActions(fullCallBtns()); wireCallBtns(); if (callMeta) callMeta.ans = true; if (ringTimer) clearTimeout(ringTimer); } }
  async function iceData(data) { if (pc && data.candidate) { try { await pc.addIceCandidate(new RTCIceCandidate(data.candidate)); } catch {} } if (screenPc && data.candidate) { try { await screenPc.addIceCandidate(new RTCIceCandidate(data.candidate)); } catch {} } }
  function fullCallBtns() { return `<button class="call-btn" id="cgMic" title="Микрофон">${ICO.mic}</button><button class="call-btn" id="cgScr" title="Экран">${ICO.scr}</button><button class="call-btn end" id="cgEnd" title="Завершить">${ICO.end}</button>`; }
  function wireCallBtns() { const m = el.callActions.querySelector('#cgMic'); const s = el.callActions.querySelector('#cgScr'); const e = el.callActions.querySelector('#cgEnd'); if (m) m.onclick = toggleMic; if (s) s.onclick = () => { if (callRole === 'caller') shareScreen(); }; if (e) e.onclick = endCall; }
  function toggleMic() {
    micMuted = !micMuted;
    if (localAudio) localAudio.getAudioTracks().forEach((t) => { t.enabled = !micMuted; });
    const b = el.callActions.querySelector('#cgMic');
    if (b) b.innerHTML = micMuted ? ICO.micOff : ICO.mic;
  }
  async function shareScreen() { if (screenPc) return stopScreen(); openScreenPicker(); }
  function openScreenPicker() { if (!el.screenModal) return sShare(null); el.screenModal.classList.remove('hidden'); el.screenClose && (el.screenClose.onclick = () => el.screenModal.classList.add('hidden')); el.screenModal.onclick = (e) => { if (e.target === el.screenModal) el.screenModal.classList.add('hidden'); }; fillSources(); }
  async function fillSources() {
    el.sourceList.innerHTML = '<div class="empty-hint">Загрузка…</div>';
    let list = [];
    if (window.pulseScreen) try { list = await window.pulseScreen.list(); } catch {}
    el.sourceList.innerHTML = '';
    if (!list.length) { el.sourceList.innerHTML = '<div class="empty-hint">Нет источников</div>'; return; }
    list.forEach((s) => { const it = document.createElement('div'); it.className = 'source-item'; it.innerHTML = '<img src="' + escapeAttr(s.thumb) + '" alt=""><span>' + escapeHtml(s.name) + '</span>'; it.onclick = () => sShare(s.id); el.sourceList.appendChild(it); });
  }
  async function sShare(sourceId) {
    el.screenModal.classList.add('hidden');
    const fps = parseInt((el.fpsSel && el.fpsSel.value) || '30', 10);
    try {
const ds = sourceId
? await navigator.mediaDevices.getUserMedia({ audio: false, video: { mandatory: { chromeMediaSource: 'desktop', chromeMediaSourceId: sourceId, minWidth: 640, maxWidth: 1920, minHeight: 360, maxHeight: 1080, maxFrameRate: fps } } })
: await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: fps, width: 1920 }, audio: false });
      screenPc = new RTCPeerConnection(RTC);
      screenPc.onicecandidate = (e) => { if (e.candidate) rtcSend('screen_ice', { candidate: e.candidate }); };
      ds.getTracks().forEach((t) => screenPc.addTrack(t, ds));
      screenTrack = ds.getTracks()[0];
      screenTrack.onended = () => stopScreen();
      const lp = document.getElementById('localScreenPreview');
      if (lp) { lp.srcObject = ds; lp.classList.remove('hidden'); lp.play().catch(() => {}); }
      const o = await screenPc.createOffer(); await screenPc.setLocalDescription(o);
      rtcSend('screen_offer', { sdp: screenPc.localDescription });
      const b = el.callActions.querySelector('#cgScr'); if (b) b.classList.add('off');
    } catch {}
  }
  async function acceptScreenOffer(data) { screenPc = new RTCPeerConnection(RTC); screenPc.onicecandidate = (e) => { if (e.candidate) rtcSend('screen_ice', { candidate: e.candidate }); }; screenPc.ontrack = (e) => { el.remoteVideo.srcObject = e.streams[0]; el.callVideoWrap.classList.remove('hidden'); }; await screenPc.setRemoteDescription(new RTCSessionDescription(data.sdp)); const a = await screenPc.createAnswer(); await screenPc.setLocalDescription(a); rtcSend('screen_answer', { sdp: screenPc.localDescription }); }
  function stopScreen() { if (screenTrack) screenTrack.stop(); if (screenPc) { try { screenPc.close(); } catch {} } screenPc = null; screenTrack = null; const lp = document.getElementById('localScreenPreview'); if (lp) { lp.srcObject = null; lp.classList.add('hidden'); } el.callVideoWrap.classList.add('hidden'); el.remoteVideo.srcObject = null; const b = el.callActions.querySelector('#cgScr'); if (b) b.classList.remove('off'); }
  function endCall() {
    if (ringTimer) clearTimeout(ringTimer);
    try { localAudio && localAudio.getTracks().forEach((t) => t.stop()); } catch {}
    if (pc) { try { pc.close(); } catch {} }
    stopScreen(); pc = null; localAudio = null;
    const meta = callMeta;
    if (callActive) rtcSend('end');
    if (meta) {
      const dur = Math.max(0, Math.round((Date.now() - meta.start) / 1000));
      if (meta.kind === 'pm' && ws && me) {
        const st = meta.declined ? 'declined' : meta.ans ? 'answered' : 'unanswered';
        ws.send(JSON.stringify({ type: 'call_log', partner: meta.partner, status: st, duration: dur }));
      }
      const ds = Math.floor(dur / 60) + ':' + String(dur % 60).padStart(2, '0');
      let text;
      if (meta.declined) text = '📞 Звонок отклонён';
      else if (meta.ans) text = '📞 Звонок состоялся · ' + ds;
      else text = '📞 Звонок без ответа · ' + ds;
      if (meta.kind === 'pm' && ws && me) ws.send(JSON.stringify({ type: 'pm', to: meta.partner, text }));
    }
    callActive = false; callPeer = null; callMeta = null;
    el.callOverlay.classList.add('hidden');
  }
  async function handleCallSig(d) {
    const k = d.payload.kind, p = allUsersFind(d.from);
    if (k === 'ring') {
      callPeer = d.from; callRole = 'callee'; callActive = true;
      el.callAvatar.innerHTML = avatarHtml(p, 110); el.callNick.textContent = (p && p.nick) || '…'; callNotify('', '');
      el.callOverlay.classList.remove('hidden');
      if (me && me.settings && me.settings.autoAnswer) {
        setTimeout(async () => { rtcSend('accept'); setCallActions(fullCallBtns()); wireCallBtns(); callNotify('Идёт разговор', ''); }, 600);
        return;
      }
      setCallActions(`<button class="call-btn call-accept" title="Принять">${ICO.call}</button><button class="call-btn call-decline" title="Отклонить">${ICO.end}</button>`);
      el.callActions.querySelector('.call-accept').onclick = () => { rtcSend('accept'); };
      el.callActions.querySelector('.call-decline').onclick = () => { rtcSend('decline'); endCall(); };
    }
    else if (k === 'accept') { await makeOfferToPeer(); }
    if (k === 'decline') { if (callMeta) callMeta.declined = true; callNotify('Отклонено', ''); setTimeout(endCall, 900); }
    else if (k === 'offer') { await acceptOfferData(d.payload); }
    else if (k === 'answer') { await answerData(d.payload); }
    else if (k === 'ice') { await iceData(d.payload); }
    else if (k === 'screen_offer') { await acceptScreenOffer(d.payload); }
    else if (k === 'screen_answer') { if (screenPc) { try { await screenPc.setRemoteDescription(new RTCSessionDescription(d.payload.sdp)); } catch {} } }
    else if (k === 'screen_ice') { if (screenPc && d.payload.candidate) { try { await screenPc.addIceCandidate(new RTCIceCandidate(d.payload.candidate)); } catch {} } }
    else if (k === 'voice_offer') { await acceptVoiceOffer({ id: d.from }, d.payload); }
    else if (k === 'voice_answer') { const pc2 = voicePcs.get(d.from); if (pc2) { try { await pc2.setRemoteDescription(new RTCSessionDescription(d.payload.sdp)); } catch {} } }
    else if (k === 'voice_ice') { const pc2 = voicePcs.get(d.from); if (pc2 && d.payload.candidate) { try { await pc2.addIceCandidate(new RTCIceCandidate(d.payload.candidate)); } catch {} } }
    else if (k === 'end') { callNotify('Звонок завершён', ''); endCall(); }
  }

  // ---------- голосовые комнаты ----------
  el.voiceJoinBtn.onclick = () => { if (target.type === 'room') toggleVoice(target.id); };
  el.voiceMicBtn.onclick = () => { voiceMuted = !voiceMuted; if (voiceMicStream) voiceMicStream.getAudioTracks().forEach((t) => { t.enabled = !voiceMuted; }); el.voiceMicBtn.innerHTML = voiceMuted ? ICO.micOff : ICO.mic; };
  el.voiceEndBtn.onclick = () => leaveVoice();
  function toggleVoice(room) { if (voiceRoom === room) return leaveVoice(); if (voiceRoom) leaveVoice(); voiceRoom = room; ws && ws.send(JSON.stringify({ type: 'voice_join', room })); el.voiceBar.classList.remove('hidden'); el.voiceBar.querySelector('.voice-title').textContent = '🎙 ' + room; setupMic(); }
  async function setupMic() { try { voiceMicStream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch {} }
  function leaveVoice() { if (voiceRoom) ws && ws.send(JSON.stringify({ type: 'voice_leave', room: voiceRoom })); voiceRoom = null; if (voiceMicStream) { voiceMicStream.getTracks().forEach((t) => t.stop()); voiceMicStream = null; } voicePcs.forEach((p) => { try { p.close(); } catch {} }); voicePcs.clear(); voiceAudioEls.forEach((a) => a.remove()); voiceAudioEls.clear(); el.voiceBar.classList.add('hidden'); }
  function onVoiceState(d) { renderVoiceUsers(d.users || []); if (!voiceRoom) return; (d.users || []).forEach((u) => { if (u.id === me.id || voicePcs.has(u.id)) return; if (me.id < u.id) voiceOffer(u); }); }
  function renderVoiceUsers(users) { el.voiceUsers.innerHTML = users.map((u) => '<span class="vo-user"><i style="background:' + (u.color || '#7c5cff') + '"></i>' + escapeHtml(u.nick) + (u.id === me.id ? ' (вы)' : '') + '</span>').join(''); }
  async function voiceOffer(u) { const p2 = new RTCPeerConnection(RTC); p2.onicecandidate = (e) => { if (e.candidate) rtcSendTo(u.id, 'voice_ice', { candidate: e.candidate }); }; p2.ontrack = (e) => wireVoiceAudio(u.id, e.streams[0]); voicePcs.set(u.id, p2); if (voiceMicStream) voiceMicStream.getTracks().forEach((t) => p2.addTrack(t, voiceMicStream)); const o = await p2.createOffer(); await p2.setLocalDescription(o); rtcSendTo(u.id, 'voice_offer', { sdp: p2.localDescription }); }
  async function acceptVoiceOffer(u, data) { if (voicePcs.has(u.id)) return; const p2 = new RTCPeerConnection(RTC); p2.onicecandidate = (e) => { if (e.candidate) rtcSendTo(u.id, 'voice_ice', { candidate: e.candidate }); }; p2.ontrack = (e) => wireVoiceAudio(u.id, e.streams[0]); voicePcs.set(u.id, p2); if (voiceMicStream) voiceMicStream.getTracks().forEach((t) => p2.addTrack(t, voiceMicStream)); await p2.setRemoteDescription(new RTCSessionDescription(data.sdp)); const a = await p2.createAnswer(); await p2.setLocalDescription(a); rtcSendTo(u.id, 'voice_answer', { sdp: p2.localDescription }); }
  function rtcSendTo(toId, kind, extra) { ws && ws.send(JSON.stringify({ type: 'call_signal', to: toId, payload: { kind, ...extra } })); }
  function wireVoiceAudio(peerId, stream) { let a = voiceAudioEls.get(peerId); if (!a) { a = document.createElement('audio'); a.autoplay = true; document.body.appendChild(a); voiceAudioEls.set(peerId, a); } a.srcObject = stream; }

  function reqFavs() { ws && ws.send(JSON.stringify({ type: 'fav_list' })); }
  el.favBtn.onclick = openFav;
  function openFav() {
    target = { type: 'fav' };
    el.messages.innerHTML = '';
    lastDay = '';
    renderHeader(); renderRooms();
    ws && ws.send(JSON.stringify({ type: 'fav_list' }));
  }
  el.favClose.onclick = () => el.favModal.classList.add('hidden');
  el.favModal.onclick = (e) => { if (e.target === el.favModal) el.favModal.classList.add('hidden'); };
  function renderFavs(items) {
    el.favList.innerHTML = '';
    if (!items.length) { el.favList.innerHTML = '<div class="empty-hint">Пусто</div>'; return; }
    items.forEach((it) => {
      const txt = it.txt || (it.img ? '[фото]' : it.video ? '[видео]' : it.audio ? '[голосовое]' : it.sticker ? '[стикер]' : '[файл]');
      const dd = document.createElement('div'); dd.className = 'room-item';
      dd.innerHTML = '<span class="room-icon">★</span><span class="item-main"><span class="item-title">' + escapeHtml(txt).slice(0, 60) + '</span><span class="item-sub">' + escapeHtml(it.chatKey || '') + '</span></span><button class="contact-call" data-unfav="' + it.message_id + '">−</button>';
      dd.onclick = (e) => { if (e.target.closest('[data-unfav]')) { ws.send(JSON.stringify({ type: 'fav_toggle', chatKey: it.chatKey, message_id: it.message_id })); dd.remove(); } else openFavChat(it.chatKey); };
      el.favList.appendChild(dd);
    });
  }
  function openFavChat(ck) { if (ck.startsWith('r:')) openRoom(ck.slice(2)); else openPm(Number(ck.slice(2))); }
  function openCalls() {
    target = { type: 'calls' };
    el.messages.innerHTML = ''; lastDay = '';
    renderHeader(); renderRooms();
    ws && ws.send(JSON.stringify({ type: 'calls_list' }));
  }
  function renderCalls(calls) {
    el.messages.innerHTML = ''; lastDay = '';
    if (!calls.length) { el.messages.innerHTML = '<div class="empty-hint">Звонков пока нет</div>'; return; }
    calls.forEach((c) => {
      const st = c.status === 'answered' ? 'исходящий' : c.status === 'declined' ? 'отклонён' : 'без ответа';
      const dur = c.status === 'answered' ? (Math.floor(c.duration / 60) + ':' + String(c.duration % 60).padStart(2, '0')) : '';
      const p = document.createElement('div'); p.className = 'room-item';
      p.innerHTML = `<span class="room-icon avatar" style="background:${c.partnerColor || '#7c5cff'}">${avatarHtml({ nick: c.partnerNick, color: c.partnerColor, id: c.partner_id }, 32)}</span><span class="item-main"><span class="item-title">${escapeHtml(c.partnerNick || '?')}</span><span class="item-sub">${st}${dur ? ' · ' + dur : ''} · ${fmtTime(c.at)}</span></span>`;
      p.onclick = () => openPm(c.partner_id);
      el.messages.appendChild(p);
    });
  }
  function renderFavChat(items) {
    el.messages.innerHTML = ''; lastDay = '';
    if (!items.length) { el.messages.innerHTML = '<div class="empty-hint">Тут пусто. Добавляй сообщения правым кликом → «В избранное».</div>'; return; }
    items.forEach((it) => {
      const txt = it.txt || (it.img ? '[фото]' : it.video ? '[видео]' : it.audio ? '[голосовое]' : it.sticker ? '[стикер]' : '[файл]');
      const w = document.createElement('div'); w.className = 'msg theirs';
      w._fav = { chatKey: it.chatKey, message_id: it.message_id };
      w.innerHTML = `<span style="display:flex;align-items:flex-end;gap:8px"><span style="display:flex;flex-direction:column"><div class="msg-meta"><span class="time">${escapeHtml(it.chatKey || '')}</span></div><div class="bubble">${escapeHtml(String(txt).slice(0, 300))}</div></span></span><button type="button" class="msg-menu" data-menu>⋮</button>`;
      el.messages.appendChild(w);
    });
    pinnedBottom = true;
  }
  let vpCurrent = null;
let vpPinned = null;
  function toggleBlock(u) { const a = (me.settings && me.settings.blocked) || []; const i = a.indexOf(u.id); if (i >= 0) a.splice(i, 1); else a.push(u.id); me.settings = me.settings || {}; me.settings.blocked = a; ws && ws.send(JSON.stringify({ type: 'update_profile', settings: { blocked: a } })); renderVpExtra(u); }
  function renderVpExtra(u) {
    vpCurrent = u;
    const b = (me.settings && me.settings.blocked) || [];
    el.vpBlock.textContent = b.includes(u.id) ? 'Разблокировать' : 'Пожаловаться/Блок';
    const h = (me.settings && me.settings.hiddenUsers) || [];
    const hid = h.includes(u.id);
    el.vpExtra.innerHTML = '<button class="ghost-btn small" id="vhHide">' + (hid ? 'Показывать активность' : 'Скрыть активность') + '</button>';
    const hb = el.vpExtra.querySelector('#vhHide');
    hb.onclick = () => { const a = (me.settings && me.settings.hiddenUsers) || []; const j = a.indexOf(u.id); if (j >= 0) a.splice(j, 1); else a.push(u.id); me.settings = me.settings || {}; me.settings.hiddenUsers = a; ws && ws.send(JSON.stringify({ type: 'update_profile', settings: { hiddenUsers: a } })); renderVpExtra(u); };
  }
  el.vpBlock.onclick = () => toggleBlock(vpCurrent);
let giftTarget = null;
let selectedGid = null;
el.vpGift.onclick = () => { if (!vpCurrent) return; giftTarget = vpCurrent; selectedGid = null; if (el.giftNote) el.giftNote.value = ''; el.giftModal.classList.remove('hidden'); ws.send(JSON.stringify({ type: 'gift_catalog' })); };
el.giftSendBtn.onclick = () => { if (!giftTarget || !selectedGid) return; ws.send(JSON.stringify({ type: 'send_gift', to: giftTarget.id, gid: selectedGid, text: el.giftNote ? el.giftNote.value : '' })); };
el.giftClose.onclick = () => el.giftModal.classList.add('hidden');
el.giftModal.onclick = (e) => { if (e.target === el.giftModal) el.giftModal.classList.add('hidden'); };
  function renderGiftCatalog(d) { el.giftBal.textContent = 'Ваш баланс: ' + (d.stars || 0) + ' ⭐'; if (!selectedGid && el.giftNote) el.giftNote.value = ''; el.giftList.innerHTML = (d.catalog || []).map((g) => '<button class="gift-item' + (selectedGid === g.gid ? ' sel' : '') + '" data-gid="' + g.gid + '"><span class="gift-em">' + g.emoji + '</span><span class="gift-nm">' + escapeHtml(g.name) + '</span><b>' + g.price + ' ⭐</b></button>').join(''); el.giftList.querySelectorAll('.gift-item').forEach((b) => b.onclick = () => { selectedGid = Number(b.dataset.gid); el.giftList.querySelectorAll('.gift-item').forEach((x) => x.classList.toggle('sel', x === b)); if (el.giftSendBtn) el.giftSendBtn.classList.remove('hidden'); if (el.giftNote) { el.giftNote.focus(); }}); if (el.giftSendBtn) el.giftSendBtn.classList.toggle('hidden', !selectedGid); }
  function showToast(msg) { let t = document.getElementById('toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); } t.textContent = msg; t.classList.add('show'); clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove('show'), 3500); }
function renderReceivedGifts(list) {
list = list || [];
const own = vpCurrent && me && vpCurrent.id === me.id;
if (!list.length) { el.vpReceived.innerHTML = ''; return; }
el.vpReceived.innerHTML = '<div class="gift-plaque-t">🎁 Подарки</div>' + list.map((g) => {
const t = g.text ? '<div class="gift-plaque-txt">' + escapeHtml(g.text) + '</div>' : '';
const when = g.at ? '<span class="gift-plaque-when">' + new Date(g.at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + '</span>' : '';
const pinned = (vpPinned || []).some((p) => p.gid === g.gid);
const star = own ? '<button class="gift-pin' + (pinned ? ' on' : '') + '" data-gid="' + g.gid + '" title="' + (pinned ? 'Открепить' : 'Закрепить') + '">' + (pinned ? '⭐' : '☆') + '</button>' : '';
return '<div class="gift-plaque"><span class="gift-plaque-em">' + (g.emoji || '🎁') + '</span><div class="gift-plaque-m"><span class="gift-plaque-nm">' + escapeHtml(g.name || 'Подарок') + '</span><span class="gift-plaque-from">от ' + escapeHtml(g.fromNick || '?') + '</span>' + t + '</div>' + when + star + '</div>';
}).join('');
el.vpReceived.querySelectorAll('.gift-pin').forEach((b) => b.onclick = () => { const gid = Number(b.dataset.gid); const pinned = (vpPinned || []).some((p) => p.gid === gid); ws.send(JSON.stringify({ type: pinned ? 'unpin_gift' : 'pin_gift', gid })); ws.send(JSON.stringify({ type: 'received_gifts', user_id: vpCurrent.id })); });
}
function renderPinnedGifts() {
if (!el.vpPinned) return;
const own = vpCurrent && me && vpCurrent.id === me.id;
if (!vpPinned || !vpPinned.length) { el.vpPinned.innerHTML = ''; return; }
el.vpPinned.innerHTML = '<div class="gift-plaque-t">⭐ Закреплённые подарки (' + vpPinned.length + '/6)</div><div class="vp-pinned-row">' + vpPinned.map((g) => '<span class="vp-pin-em" data-gid="' + g.gid + '" title="' + escapeHtml(g.name) + '">' + g.emoji + '</span>').join('') + '</div>';
if (own) el.vpPinned.querySelectorAll('.vp-pin-em').forEach((n) => n.onclick = () => { ws.send(JSON.stringify({ type: 'unpin_gift', gid: Number(n.dataset.gid) })); ws.send(JSON.stringify({ type: 'received_gifts', user_id: vpCurrent.id })); });
}
  function renderUserStats(d) {
    if (!vpCurrent || d.user_id !== vpCurrent.id) return;
    el.vpStats.innerHTML = '📈 Сообщений: ' + d.messages + ' · 🎁 Подарков: ' + d.gifts + ' · ' + (d.online ? '● в сети' : 'офлайн');
  }
  window.__openVPId = (id) => { const u = allUsersFind(id); if (u) openViewProfile(u); };
  document.addEventListener('click', (e) => { const t = e.target.closest('[data-profile-id]'); if (!t) { return; } e.preventDefault(); e.stopImmediatePropagation(); const u = allUsersFind(Number(t.dataset.profileId)); if (u) openViewProfile(u); }, true);
  function renderChannelMembers(d) {
    if (!cpRoom || d.room !== cpRoom.id) return;
    const rn = (r) => r === 'owner' ? 'владелец' : r === 'admin' ? 'админ' : 'участник';
    let html = '<div class="cp-roles">Ваша роль: ' + rn(d.myRole) + '</div>';
    (d.members || []).forEach((m) => {
      let bt = '';
      if (d.myRole === 'owner' && m.role !== 'owner') bt = m.role === 'admin' ? '<button class="rp" data-adm="' + m.id + '" data-rm="1">снять админа</button>' : '<button class="rp" data-adm="' + m.id + '">админ</button>';
      html += '<div class="cp-member"><span class="cm-av">' + avatarHtml({ nick: m.nick, color: m.color }, 26) + '</span><span class="cm-nick">' + escapeHtml(m.nick) + '</span><em class="cm-role">' + rn(m.role) + '</em>' + bt + '</div>';
    });
    el.cpMembers.innerHTML = html;
  }
  el.cpMembers && (el.cpMembers.onclick = (e) => {
    const b = e.target.closest('[data-adm]');
    if (b) { if (confirm('Назначить/изменить роль участнику?')) ws.send(JSON.stringify({ type: 'channel_admin', name: cpRoom.id, user_id: Number(b.dataset.adm), add: !b.dataset.rm })); setTimeout(() => ws.send(JSON.stringify({ type: 'channel_members', room: cpRoom.id })), 200); }
  });
  function userNick(id) { const c = contacts.find((x) => x.id === id); return c ? c.nick : '#' + id; }

  // ---------- утилиты ----------
  function show(key) { const map = { app: 'app', auth: 'authScreen', boot: 'bootScreen' }; const id = map[key] || key; document.querySelectorAll('.app, .join-screen, .boot-screen').forEach((x) => x.classList.add('hidden')); const e = document.getElementById(id); if (e) e.classList.remove('hidden'); }
  function showBoot(t, retry) {
    el.bootScreen.classList.remove('hidden');
    const b = el.bootScreen.querySelector('.boot-text');
    const bt = el.bootScreen.querySelector('#bootRetry');
    b.textContent = t;
    if (retry && !bt) { const r = document.createElement('button'); r.id = 'bootRetry'; r.className = 'ghost-btn'; r.style.marginTop = '14px'; r.textContent = 'Повторить'; r.onclick = () => location.reload(); el.bootScreen.appendChild(r); }
  }
  function scrollDown() { el.messages.scrollTop = el.messages.scrollHeight; }
  function autoScroll(mine) {
    if (bulk) return;
    const sc = el.messages;
    if (mine) { sc.scrollTop = sc.scrollHeight; pinnedBottom = true; return; } // свои отправляемые всегда внизу
    if (!pinnedBottom) return; // читаешь историю — не дёргаем
    sc.scrollTop = sc.scrollHeight;
  }
  function loadMoreMore() {
    if (loadingMore || !hasMore) return;
    const first = el.messages.querySelector('.msg[data-msgid]');
    if (!first) return;
    loadingMore = true;
    ws.send(JSON.stringify({ type: 'history_more', before: Number(first.dataset.msgid), ...currentPay() }));
  }
  function prependMore(list) {
    const sc = el.messages;
    const prevH = sc.scrollHeight;
    const frag = document.createDocumentFragment();
    (list || []).forEach((m) => { const n = msgNode(m); wireNode(n); frag.appendChild(n); });
    sc.insertBefore(frag, sc.firstChild);
    sc.scrollTop += (sc.scrollHeight - prevH);
    maybeTrim();
  }
  function maybeTrim() {
    if (bulk || !el.messages) return;
    const sc = el.messages;
    const kids = Array.from(sc.children);
    const msgs = kids.filter((n) => n.classList && n.classList.contains('msg'));
    if (msgs.length < 340) return;
    const over = msgs.length - 280;
    let removed = 0, removedH = 0;
    for (const n of msgs) {
      if (removed >= over) break;
      if (n.getBoundingClientRect().bottom < 0) { removedH += n.offsetHeight || 0; n.remove(); removed++; }
    }
    if (removed) {
      let sp = sc.querySelector('.virtual-gap');
      const gh = sp ? (parseFloat(sp.style.height || 0) || 0) : 0;
      if (!sp) { sp = document.createElement('div'); sp.className = 'virtual-gap'; sc.insertBefore(sp, sc.firstChild); }
      sp.style.height = (gh + removedH) + 'px';
    }
  }
  function onChatScroll() {
    const sc = el.messages;
    pinnedBottom = sc.scrollHeight - sc.scrollTop - sc.clientHeight < 60;
    el.scrollDownBtn && el.scrollDownBtn.classList.toggle('hidden', pinnedBottom);
    if (!pinnedBottom && sc.scrollTop < 140) loadMoreMore();
  }
  el.messages.addEventListener('scroll', onChatScroll);
  el.scrollDownBtn && (el.scrollDownBtn.onclick = () => { el.messages.scrollTop = el.messages.scrollHeight; pinnedBottom = true; el.scrollDownBtn.classList.add('hidden'); });
  function fmtTime(iso) { const d = new Date(iso); return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); }
  function fmtTimeShort(iso) { const d = new Date(iso), n = new Date(); return d.toDateString() === n.toDateString() ? d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }); }
  function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function escapeAttr(s) { return String(s == null ? '' : s).replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function tint(str) { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 33 + str.charCodeAt(i)) >>> 0; return ACCENTS[h % ACCENTS.length] + '26'; }

  // ---------- старт ----------
  function addPollOpt() { const i = document.createElement('input'); i.className = 'field'; i.placeholder = 'Вариант ' + (el.pollOpts.children.length + 1); el.pollOpts.appendChild(i); }
  function openPollModal() { if (target.type !== 'room') return alert('Опрос только в комнате/канале'); el.pollOpts.innerHTML = ''; addPollOpt(); addPollOpt(); el.pollModal.classList.remove('hidden'); el.pollQ.focus(); }
  el.pollBtn.onclick = openPollModal;
  el.pollClose.onclick = () => el.pollModal.classList.add('hidden');
  el.pollModal.onclick = (e) => { if (e.target === el.pollModal) el.pollModal.classList.add('hidden'); };
  el.pollAdd.onclick = () => addPollOpt();
  el.pollCreate.onclick = () => {
    const q = el.pollQ.value.trim();
    const opts = Array.from(el.pollOpts.querySelectorAll('input')).map((x) => x.value.trim()).filter(Boolean);
    if (!q || opts.length < 2) return alert('Нужен вопрос и минимум 2 варианта');
    ws.send(JSON.stringify({ type: 'create_poll', room: target.id, question: q, options: opts }));
    el.pollModal.classList.add('hidden'); el.pollQ.value = '';
  };
  function pollHtml(m) {
    let p = m.poll; try { p = typeof p === 'string' ? JSON.parse(p) : p; } catch { return ''; }
    if (!p) return '';
    const total = (p.options || []).reduce((s, o) => s + (o.v || 0), 0);
    const mine = p.votes && p.votes[me.id];
    return '<div class="poll">' + (p.options || []).map((o, i) => {
      const pc = total ? Math.round((o.v || 0) / total * 100) : 0;
      const sel = i === mine;
      return '<button type="button" class="poll-opt' + (sel ? ' sel' : '') + '" data-o="' + i + '"><span class="pct" style="width:' + pc + '%"></span><span class="popt">' + escapeHtml(o.t) + ' <b>' + (o.v || 0) + '</b>' + (sel ? ' ✓' : '') + ' · ' + pc + '%</span></button>';
    }).join('') + '</div>';
  }

let storyQ = null, storyI = 0;
  function renderStories(users) {
    let html = '<div class="story-add" id="storyAddBtn" title="Добавить историю"><span>+</span><em>История</em></div>';
    (users || []).forEach((u) => { html += '<div class="story-av" data-sid="' + u.user.id + '" title="' + escapeHtml(u.user.nick) + '">' + avatarHtml({ nick: u.user.nick, color: u.user.color, avatar: u.user.avatar }, 42) + '</div>'; });
    if (el.storiesStrip) { el.storiesStrip.innerHTML = html; el.storiesStrip.querySelectorAll('.story-av').forEach((n) => { n.onclick = () => { const u = (users || []).find((x) => x.user.id === Number(n.dataset.sid)); if (u) openStory(u.user, u.stories); }; }); el.storiesStrip.querySelector('.story-add').onclick = () => el.storyFile.click(); }
  }
  function openStory(user, stories) { storyQ = { user, stories }; storyI = 0; showStory(); el.storyViewer.classList.remove('hidden'); }
  function showStory() { if (!storyQ || storyI >= storyQ.stories.length) return closeStory(); el.storyImg.src = absUrl(storyQ.stories[storyI].url); el.storyNick.textContent = storyQ.user.nick; }
  function closeStory() { storyQ = null; if (el.storyViewer) { el.storyViewer.classList.add('hidden'); el.storyImg.src = ''; } }
  if (el.storyAddBtn) el.storyAddBtn.onclick = () => el.storyFile.click();
  if (el.storyViewer) el.storyViewer.onclick = () => { if (storyQ) { storyI++; showStory(); } else closeStory(); };
  if (el.storyFile) el.storyFile.onchange = async () => { const f = el.storyFile.files[0]; el.storyFile.value = ''; if (!f || !/^image\//.test(f.type)) return; const r = await fetch(srvOrigin() + '/upload', { method: 'POST', headers: { 'Content-Type': f.type }, body: f }); const d = await r.json(); if (r.ok) ws.send(JSON.stringify({ type: 'post_story', url: d.url })); };

async function start() {
    token = await sessionStore.get();
    const qp = new URLSearchParams(location.search);
    const jRoom = qp.get('join'); const jCode = qp.get('code');
    const autoU = qp.get('autologin'); const autoP = qp.get('password');
    if (token) { show('boot'); connect(null); setTimeout(() => { if (jRoom) { openRoom(jRoom); if (jCode) setTimeout(() => ws.send(JSON.stringify({ type: 'join', room: jRoom, code: jCode })), 500); } }, 2500); }
    else if (autoU && autoP) { show('boot'); connect(() => { ws.send(JSON.stringify({ type: 'login', nick: autoU, password: autoP })); }); }
    else { show('auth'); setAuthTab('login'); connectAskAuth(); }
  }
  start();
})();