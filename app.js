/* ==========================================================================
   Daily Success Dashboard — app.js
   Vanilla JS, no framework, no build step. Data lives in localStorage.
   ========================================================================== */
(function () {
  'use strict';

  /* ======================= constants ======================= */

  var STORAGE_KEY = 'dsd_state_v1';

  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z"/>',
    home: '<path d="M3 11.5L12 4l9 7.5"/><path d="M5.5 10v9.5a1 1 0 0 0 1 1H9.5v-6h5v6H17.5a1 1 0 0 0 1-1V10"/>',
    heartHandshake: '<path d="M11.5 6.5L9.8 4.8a2.6 2.6 0 1 0-3.6 3.6l5.8 5.8 2.3-2.3"/><path d="M13 9l2.6-2.6a2.6 2.6 0 1 1 3.6 3.6L13 16.3 9.6 14.8"/>',
    briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5v-2a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2"/><line x1="3" y1="13" x2="21" y2="13"/>',
    activity: '<polyline points="3,12 7,12 9.5,5 14,19 16.5,12 21,12"/>',
    moreHorizontal: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    check: '<polyline points="20,6 9,17 4,12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    sunrise: '<line x1="12" y1="2" x2="12" y2="9"/><line x1="5.5" y1="9.5" x2="7.3" y2="11.3"/><line x1="18.5" y1="9.5" x2="16.7" y2="11.3"/><line x1="2" y1="18" x2="22" y2="18"/><path d="M6 14a6 6 0 0 1 12 0"/>',
    dumbbell: '<rect x="2" y="9.5" width="3" height="5" rx="1"/><rect x="19" y="9.5" width="3" height="5" rx="1"/><line x1="6.5" y1="12" x2="17.5" y2="12"/><rect x="5" y="8" width="2" height="8" rx="0.6"/><rect x="17" y="8" width="2" height="8" rx="0.6"/>',
    smartphone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"/>',
    bed: '<path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6"/><path d="M2 18v2M22 18v2"/><path d="M2 13V8a1 1 0 0 1 1-1h7v5"/><circle cx="6.5" cy="9.5" r="1.3"/>',
    utensils: '<path d="M6 2v8a2 2 0 0 0 4 0V2"/><line x1="8" y1="2" x2="8" y2="22"/><path d="M17 2c-1.7 0-3 2-3 5s1.3 5 3 5v10"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M16 14.3c2.5.5 4.5 2.7 4.5 5.7"/>',
    trendingUp: '<polyline points="3,17 9.5,10.5 13.5,14.5 21,6"/><polyline points="15,6 21,6 21,12"/>',
    listChecks: '<polyline points="3,6 4.5,7.5 7,5"/><line x1="10" y1="6" x2="21" y2="6"/><polyline points="3,13 4.5,14.5 7,12"/><line x1="10" y1="13" x2="21" y2="13"/><polyline points="3,20 4.5,21.5 7,19"/><line x1="10" y1="20" x2="21" y2="20"/>',
    heart: '<path d="M12 20.5S3.5 14.8 3.5 8.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 1.8c0 6-8.5 11.7-8.5 11.7z"/>',
    bookOpen: '<path d="M12 6.5c-1.8-1.4-4.4-2-7.5-2v13c3.1 0 5.7.6 7.5 2 1.8-1.4 4.4-2 7.5-2v-13c-3.1 0-5.7.6-7.5 2z"/><line x1="12" y1="6.5" x2="12" y2="19.5"/>',
    clipboardList: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="3" rx="1"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="13" y2="18"/>',
    quote: '<path d="M7.8 8.5a3.5 3.5 0 0 0-3.5 3.5v3.5h5V12H6.3a2 2 0 0 1 2-2V8.5z"/><path d="M16.8 8.5a3.5 3.5 0 0 0-3.5 3.5v3.5h5V12h-1.5a2 2 0 0 1 2-2V8.5z"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><polyline points="8,12.5 11,15.5 16,9"/>',
    circle: '<circle cx="12" cy="12" r="9"/>',
    flame: '<path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 4 4 4 7a6 6 0 0 1-12 0c0-5 3-7 6-12z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 16,14"/>',
    chevronDown: '<polyline points="6,9 12,15 18,9"/>',
    stethoscope: '<path d="M5 3v6a4 4 0 0 0 8 0V3"/><path d="M9 13v2a5 5 0 0 0 10 0v-2.5"/><circle cx="19" cy="9.5" r="1.6"/>',
    banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>',
    calendarCheck: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/><polyline points="8,15 10.5,17.5 16,12.5"/>',
    alertCircle: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="7.5" x2="12" y2="13"/><circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none"/>',
    userPlus: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><line x1="18.5" y1="8" x2="18.5" y2="14"/><line x1="15.5" y1="11" x2="21.5" y2="11"/>',
    phone: '<path d="M5 3.5h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5V18a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z"/>',
    cigarette: '<rect x="2" y="11" width="14" height="3.5" rx="0.6"/><rect x="16" y="11" width="5" height="3.5" rx="0.6"/><path d="M4 8.5c0-1 1-1 1-2s-1-1-1-2M8 8.5c0-1 1-1 1-2s-1-1-1-2"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    gauge: '<path d="M4 14.5a8 8 0 1 1 16 0"/><line x1="12" y1="14.5" x2="15.5" y2="10"/><line x1="4" y1="14.5" x2="2" y2="14.5"/><line x1="20" y1="14.5" x2="22" y2="14.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-2-3.4-2.3.9a7.5 7.5 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.5a7.5 7.5 0 0 0-2.6 1.5l-2.3-.9-2 3.4 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5 2 3.4 2.3-.9a7.5 7.5 0 0 0 2.6 1.5l.5 2.6h4l.5-2.6a7.5 7.5 0 0 0 2.6-1.5l2.3.9 2-3.4z"/>',
    bell: '<path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z"/><path d="M9.5 18.5a2.5 2.5 0 0 0 5 0"/>',
    alarmClock: '<circle cx="12" cy="13" r="7.5"/><line x1="12" y1="13" x2="12" y2="9.5"/><line x1="12" y1="13" x2="14.5" y2="14.5"/><line x1="5" y1="3" x2="3" y2="5"/><line x1="19" y1="3" x2="21" y2="5"/>',
    printer: '<polyline points="6,9 6,3 18,3 18,9"/><rect x="4" y="9" width="16" height="8" rx="1.5"/><rect x="7" y="14" width="10" height="6.5"/>',
    rotateCcw: '<path d="M3 11A9 9 0 1 1 6 17.5"/><polyline points="3,5 3,11 9,11"/>',
    download: '<line x1="12" y1="3" x2="12" y2="15"/><polyline points="7,10 12,15 17,10"/><line x1="4" y1="20" x2="20" y2="20"/>',
    upload: '<line x1="12" y1="15" x2="12" y2="3"/><polyline points="7,8 12,3 17,8"/><line x1="4" y1="20" x2="20" y2="20"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    sparkles: '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'
  };

  function icon(name, size, cls) {
    size = size || 18;
    var inner = ICONS[name] || '';
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="' + (cls || '') + '">' + inner + '</svg>';
  }

  var QUOTES = [
    "Discipline today is the freedom you'll thank yourself for tomorrow.",
    "Small consistent actions compound into the life you're building.",
    "Every child you help today is a future you're helping create.",
    "Your habits are the quiet co-founders of your success.",
    "Show up before the world wakes up — that's where the edge is.",
    "Service to others is the most durable form of ambition.",
    "A disciplined morning writes the story of a powerful evening.",
    "Lead your business the way you'd want to be led.",
    "Progress, not perfection, is the metric that matters today.",
    "The team that trusts you is built by the promises you keep.",
    "Health is the infrastructure your ambitions run on.",
    "One more rep, one more call, one more act of kindness — compound it.",
    "Your calendar is a mirror of your priorities. Choose wisely.",
    "The best fundraising pitch is a track record of real impact.",
    "Rest is not the opposite of discipline — it's part of it.",
    "Every system you build today saves you a hundred decisions tomorrow.",
    "Quiet consistency beats loud intensity, every single time.",
    "You don't need more hours. You need a clearer first hour.",
    "Numbers tell a story — let today's numbers tell a good one.",
    "The smallest good habit, repeated, outperforms the biggest plan.",
    "Founders who protect their sleep protect their judgment.",
    "Generosity scales when it's backed by good systems.",
    "What you track, you improve. What you ignore, you repeat.",
    "Today's discipline is tomorrow's competitive advantage.",
    "A calm leader makes calmer decisions — and better ones.",
    "Your NGO's impact starts with your own daily integrity.",
    "Done with intention beats busy without direction.",
    "The strongest businesses are built by founders who show up daily.",
    "Choose the harder right over the easier wrong, every time.",
    "Success is just discipline, repeated until it looks effortless."
  ];

  var ROUTINE_ITEMS = [
    { id: 'r1', time: '6:30 AM', label: 'Wake Up', icon: 'sunrise', period: 'Morning' },
    { id: 'r2', time: '7:00 AM', label: 'Exercise', icon: 'dumbbell', period: 'Morning' },
    { id: 'r3', time: '8:15 AM', label: 'Breakfast', icon: 'utensils', period: 'Morning' },
    { id: 'r4', time: '9:00 AM', label: 'NGO Work', icon: 'heartHandshake', period: 'Morning' },
    { id: 'r5', time: '10:00 AM', label: 'Office Review', icon: 'briefcase', period: 'Morning' },
    { id: 'r6', time: '1:00 PM', label: 'Lunch', icon: 'utensils', period: 'Afternoon' },
    { id: 'r7', time: '2:00 PM', label: 'Meetings', icon: 'users', period: 'Afternoon' },
    { id: 'r8', time: '3:30 PM', label: 'Social Media Review', icon: 'smartphone', period: 'Afternoon' },
    { id: 'r9', time: '4:00 PM', label: 'Office Round', icon: 'briefcase', period: 'Afternoon' },
    { id: 'r10', time: '5:00 PM', label: 'Growth Hour', icon: 'trendingUp', period: 'Afternoon' },
    { id: 'r11', time: '6:30 PM', label: 'Day Review', icon: 'listChecks', period: 'Evening' },
    { id: 'r12', time: '7:30 PM', label: 'Family Time', icon: 'heart', period: 'Evening' },
    { id: 'r13', time: '8:30 PM', label: 'Learning', icon: 'bookOpen', period: 'Evening' },
    { id: 'r14', time: '9:30 PM', label: 'Planning', icon: 'clipboardList', period: 'Evening' },
    { id: 'r15', time: '10:30 PM', label: 'Sleep', icon: 'bed', period: 'Evening' }
  ];

  var NAV_ITEMS = [
    { id: 'today', label: 'Today', icon: 'home' },
    { id: 'ngo', label: 'NGO', icon: 'heartHandshake' },
    { id: 'office', label: 'Office', icon: 'briefcase' },
    { id: 'health', label: 'Health', icon: 'activity' },
    { id: 'more', label: 'More', icon: 'moreHorizontal' }
  ];

  var NOTIF_LABELS = {
    wakeUp: "Time to wake up and start strong",
    exercise: "Exercise time — 30 to 45 minutes",
    planning: "Planning time — set tomorrow's top 3 priorities",
    sleep: "Wind down — sleep before 11 PM"
  };

  var DEFAULT_NGO_METRICS = {
    patients: { current: 0, goal: 50 },
    funds: { current: 0, goal: 500000 },
    csr: { current: 0, goal: 4 },
    food: { current: 0, goal: 4 },
    pending: 0
  };
  var DEFAULT_OFFICE_GOALS = { collectionGoal: 50000, newDonorsGoal: 20 };

  function defaultSettings() {
    return {
      theme: 'light',
      founderName: 'Gaurav',
      ngoName: 'Youth Helping Trust',
      businessName: 'Gaurnam Outsourcing',
      waterGoal: 8,
      sleepGoal: 7.5,
      notifications: {
        wakeUp: { enabled: true, time: '06:30' },
        exercise: { enabled: true, time: '07:00' },
        planning: { enabled: true, time: '21:30' },
        sleep: { enabled: true, time: '22:30' }
      }
    };
  }

  function defaultState() {
    return {
      ui: { tab: 'today', openPeriods: { Morning: true, Afternoon: true, Evening: true } },
      settings: defaultSettings(),
      dailyEntries: {},
      ngoData: { monthly: {} },
      officeData: { entries: {}, goals: {} },
      healthData: { entries: {} },
      smokingTracker: { baseline: null, startDate: null },
      journalEntries: {}
    };
  }

  /* ======================= date helpers ======================= */

  function pad(n) { return String(n).length < 2 ? '0' + n : String(n); }
  function fmtDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmtMonth(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1); }
  function addDays(d, n) { var r = new Date(d); r.setDate(r.getDate() + n); return r; }
  function dayLabel(d) { return d.toLocaleDateString('en-US', { weekday: 'short' }); }
  function prettyDate(d) { return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }
  function dayOfYear(d) { var start = new Date(d.getFullYear(), 0, 0); return Math.floor((d - start) / 86400000); }
  function formatINR(n) { var v = Number(n); if (isNaN(v)) v = 0; return '₹' + v.toLocaleString('en-IN'); }
  function todayKey() { return fmtDate(new Date()); }
  function monthKeyNow() { return fmtMonth(new Date()); }
  function bodyFontStack() { return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"; }

  /* ======================= escaping ======================= */

  function escapeHTML(str) {
    if (str === null || str === undefined) str = '';
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeAttr(str) { return escapeHTML(str); }
  function fieldId(path) { return 'f-' + path.replace(/\./g, '-').replace(/[^a-zA-Z0-9_-]/g, ''); }

  /* ======================= state load / save ======================= */

  function mergeDefaults(parsed) {
    var d = defaultState();
    parsed = parsed && typeof parsed === 'object' ? parsed : {};
    var s = parsed.settings || {};
    return {
      ui: Object.assign(d.ui, parsed.ui || {}),
      settings: Object.assign({}, d.settings, s, {
        notifications: Object.assign({}, d.settings.notifications, s.notifications || {})
      }),
      dailyEntries: parsed.dailyEntries || {},
      ngoData: parsed.ngoData && parsed.ngoData.monthly ? parsed.ngoData : d.ngoData,
      officeData: parsed.officeData || d.officeData,
      healthData: parsed.healthData || d.healthData,
      smokingTracker: parsed.smokingTracker || d.smokingTracker,
      journalEntries: parsed.journalEntries || {}
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return mergeDefaults(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load saved data', e);
      return defaultState();
    }
  }

  var state = loadState();
  var saveTimer = null;

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save data', e);
      showToast('Could not save — your browser storage may be full.');
    }
  }
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(persist, 400); }

  // Flush any pending save the instant the tab is backgrounded/closed, so a
  // toggle made right before switching apps is never lost to the debounce delay.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { clearTimeout(saveTimer); persist(); }
  });
  window.addEventListener('pagehide', function () { clearTimeout(saveTimer); persist(); });

  function getPath(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function setPath(obj, path, value) {
    var keys = path.split('.');
    var o = obj;
    for (var i = 0; i < keys.length - 1; i++) {
      var k = keys[i];
      if (o[k] == null || typeof o[k] !== 'object') o[k] = {};
      o = o[k];
    }
    o[keys[keys.length - 1]] = value;
  }

  /* ======================= derived getters ======================= */

  function getDaily(key) {
    return Object.assign({ wakeUp: false, exercise: false, noReels: false, sleep: false, routine: {} }, state.dailyEntries[key] || {});
  }
  function getNgoMonthly() {
    var m = state.ngoData.monthly[monthKeyNow()] || {};
    return {
      patients: Object.assign({}, DEFAULT_NGO_METRICS.patients, m.patients || {}),
      funds: Object.assign({}, DEFAULT_NGO_METRICS.funds, m.funds || {}),
      csr: Object.assign({}, DEFAULT_NGO_METRICS.csr, m.csr || {}),
      food: Object.assign({}, DEFAULT_NGO_METRICS.food, m.food || {}),
      pending: m.pending != null ? m.pending : 0
    };
  }
  function getOfficeToday() {
    return Object.assign({ collection: 0, team: 0, verification: 0, newDonors: 0, pendingFollowups: 0 }, state.officeData.entries[todayKey()] || {});
  }
  function getOfficeGoals() { return Object.assign({}, DEFAULT_OFFICE_GOALS, state.officeData.goals || {}); }
  function getHealthToday() {
    return Object.assign({ weight: '', water: 0, smoking: 0, sleepHours: 0 }, state.healthData.entries[todayKey()] || {});
  }
  function getJournalToday() {
    return Object.assign({ wins: '', problems: '', priorities: ['', '', ''] }, state.journalEntries[todayKey()] || {});
  }
  function last7Dates() { var t = new Date(); var out = []; for (var i = 0; i < 7; i++) out.push(addDays(t, -6 + i)); return out; }
  function healthSeries() {
    return last7Dates().map(function (d) {
      var k = fmtDate(d);
      var e = state.healthData.entries[k] || {};
      return {
        date: dayLabel(d),
        sleep: Number(e.sleepHours) || 0,
        water: Number(e.water) || 0,
        smoking: Number(e.smoking) || 0,
        weight: (e.weight === '' || e.weight == null) ? null : Number(e.weight)
      };
    });
  }
  function exerciseDaysThisWeek() {
    return last7Dates().filter(function (d) {
      var e = state.dailyEntries[fmtDate(d)];
      return e && e.exercise;
    }).length;
  }
  function weekAvgSmoking(weekIndex) {
    if (!state.smokingTracker.startDate) return null;
    var start = addDays(new Date(state.smokingTracker.startDate), weekIndex * 7);
    var sum = 0, count = 0;
    for (var i = 0; i < 7; i++) {
      var k = fmtDate(addDays(start, i));
      var e = state.healthData.entries[k];
      if (e && e.smoking !== undefined && e.smoking !== '') { sum += Number(e.smoking); count++; }
    }
    return count ? sum / count : null;
  }
  function computeStreak() {
    var count = 0;
    var cursor = new Date();
    var t = getDaily(fmtDate(cursor));
    var tScore = [t.wakeUp, t.exercise, t.noReels, t.sleep].filter(Boolean).length;
    if (tScore < 3) cursor = addDays(cursor, -1);
    for (var i = 0; i < 365; i++) {
      var e = getDaily(fmtDate(cursor));
      var s = [e.wakeUp, e.exercise, e.noReels, e.sleep].filter(Boolean).length;
      if (s >= 3) { count++; cursor = addDays(cursor, -1); } else break;
    }
    return count;
  }
  function computeScores() {
    var last7 = last7Dates();
    var dVals = last7.map(function (d) {
      var e = state.dailyEntries[fmtDate(d)];
      if (!e) return null;
      return ([e.wakeUp, e.exercise, e.noReels, e.sleep].filter(Boolean).length / 4) * 100;
    }).filter(function (v) { return v !== null; });
    var disciplineScore = dVals.length ? Math.round(dVals.reduce(function (a, b) { return a + b; }, 0) / dVals.length) : null;

    var hs = healthSeries();
    var avgSleep = hs.reduce(function (a, b) { return a + b.sleep; }, 0) / 7;
    var avgWater = hs.reduce(function (a, b) { return a + b.water; }, 0) / 7;
    var avgSmoking = hs.reduce(function (a, b) { return a + b.smoking; }, 0) / 7;
    var sleepPct = Math.min(100, (avgSleep / state.settings.sleepGoal) * 100);
    var waterPct = Math.min(100, (avgWater / state.settings.waterGoal) * 100);
    var exDays = exerciseDaysThisWeek();
    var exercisePct = (exDays / 7) * 100;
    var baseline = state.smokingTracker.baseline;
    var smokingPct;
    if (baseline) smokingPct = Math.max(0, Math.min(100, ((baseline - avgSmoking) / baseline) * 100));
    else smokingPct = avgSmoking === 0 ? 100 : Math.max(0, 100 - avgSmoking * 10);
    var healthScore = Math.round((sleepPct + waterPct + exercisePct + smokingPct) / 4);

    var nm = getNgoMonthly();
    var ngoSubs = ['patients', 'funds', 'csr', 'food'].map(function (k) {
      return nm[k].goal ? Math.min(100, (Number(nm[k].current) / Number(nm[k].goal)) * 100) : 0;
    });
    var ngoScore = Math.round(ngoSubs.reduce(function (a, b) { return a + b; }, 0) / ngoSubs.length);

    var og = getOfficeGoals();
    var ot = getOfficeToday();
    var collectionWeekSum = last7.reduce(function (s, d) {
      var e = state.officeData.entries[fmtDate(d)] || {};
      return s + (Number(e.collection) || 0);
    }, 0);
    var collectionGoalWeek = (og.collectionGoal || 0) * 7;
    var collectionPct = collectionGoalWeek ? Math.min(100, (collectionWeekSum / collectionGoalWeek) * 100) : 0;
    var followupPct = Math.max(0, 100 - Math.min(100, (Number(ot.pendingFollowups) || 0) * 5));
    var officeScore = Math.round(((Number(ot.team) || 0) + (Number(ot.verification) || 0) + collectionPct + followupPct) / 4);

    var vals = [disciplineScore, healthScore, ngoScore, officeScore].filter(function (v) { return v !== null; });
    var overallScore = vals.length ? Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length) : 0;

    return { disciplineScore: disciplineScore, healthScore: healthScore, ngoScore: ngoScore, officeScore: officeScore, overallScore: overallScore };
  }

  /* ======================= small render helpers ======================= */

  function scoreChipHTML(value) {
    if (value === null || value === undefined) return '<span class="score-chip score-chip--none">No data</span>';
    var v = Math.round(value);
    var cls = v >= 80 ? 'good' : v >= 50 ? 'mid' : 'low';
    return '<span class="score-chip score-chip--' + cls + '">' + v + '%</span>';
  }
  function progressBarHTML(value, max, color) {
    var pct = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
    color = color || 'blue';
    return '<div class="progress-bar"><div class="progress-bar__fill progress-bar__fill--' + color + '" style="width:' + pct + '%;"></div></div>';
  }
  function sectionHeaderHTML(iconName, title, subtitle) {
    return '<div class="section-header"><span class="section-header__icon">' + icon(iconName, 19) + '</span><div><h2 class="section-header__title">' + escapeHTML(title) + '</h2>' +
      (subtitle ? '<p class="section-header__subtitle">' + escapeHTML(subtitle) + '</p>' : '') + '</div></div>';
  }
  function ringSVG(opts) {
    var value = opts.value, max = opts.max, label = opts.label, sublabel = opts.sublabel;
    var size = opts.size || 150, stroke = opts.stroke || 13;
    var pct = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
    var r = (size - stroke) / 2;
    var c = 2 * Math.PI * r;
    var offset = c - (pct / 100) * c;
    var gid = 'ringGrad' + Math.random().toString(36).slice(2, 8);
    return '<div class="ring-wrap"><div style="position:relative;width:' + size + 'px;height:' + size + 'px;">' +
      '<svg width="' + size + '" height="' + size + '" style="transform:rotate(-90deg);">' +
      '<circle cx="' + (size / 2) + '" cy="' + (size / 2) + '" r="' + r + '" stroke="var(--track)" stroke-width="' + stroke + '" fill="none"/>' +
      '<circle cx="' + (size / 2) + '" cy="' + (size / 2) + '" r="' + r + '" stroke="url(#' + gid + ')" stroke-width="' + stroke + '" fill="none" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '" stroke-linecap="round" style="transition:stroke-dashoffset .8s ease;"/>' +
      '<defs><linearGradient id="' + gid + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#C9A227"/><stop offset="100%" stop-color="#1E40AF"/></linearGradient></defs>' +
      '</svg><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
      '<span class="ring-label" style="font-size:' + Math.round(size * 0.24) + 'px;">' + escapeHTML(label) + '</span>' +
      (sublabel ? '<span class="ring-sublabel">' + escapeHTML(sublabel) + '</span>' : '') +
      '</div></div></div>';
  }
  function statFieldHTML(o) {
    var id = fieldId(o.path);
    var v = (o.value === null || o.value === undefined) ? '' : o.value;
    return '<div class="field"><label class="field__label" for="' + id + '">' + escapeHTML(o.label) + '</label>' +
      '<div class="field-row"><input id="' + id + '" class="field__input" type="number" inputmode="decimal" step="' + (o.step || 1) + '" placeholder="0" value="' + escapeAttr(v) + '" data-path="' + o.path + '" data-type="number">' +
      (o.unit ? '<span class="field-unit">' + escapeHTML(o.unit) + '</span>' : '') + '</div></div>';
  }
  function goalCardHTML(o) {
    var c = Number(o.current) || 0, g = Number(o.goal) || 0;
    var pct = g ? Math.min(100, (c / g) * 100) : 0;
    return '<div class="card metric-card"><div class="metric-card__head"><span class="metric-card__icon">' + icon(o.iconName, 15) + '</span><span class="metric-card__title">' + escapeHTML(o.label) + '</span></div>' +
      '<div class="metric-card__grid">' +
      statFieldHTML({ path: o.currentPath, label: 'Current', value: o.current, unit: o.unit }) +
      statFieldHTML({ path: o.goalPath, label: 'Goal', value: o.goal, unit: o.unit }) +
      '</div>' + progressBarHTML(c, g || 1, o.color) +
      '<div class="metric-card__footer"><span class="metric-card__caption">' + (o.currency ? formatINR(c) + ' of ' + formatINR(g) : '') + '</span>' +
      '<span class="metric-card__pct">' + Math.round(pct) + '%</span></div></div>';
  }
  function percentCardHTML(o) {
    var v = Math.max(0, Math.min(100, Number(o.value) || 0));
    var id = fieldId(o.path);
    return '<div class="card metric-card"><div class="metric-card__head"><span class="metric-card__icon">' + icon(o.iconName, 15) + '</span><span class="metric-card__title">' + escapeHTML(o.label) + '</span></div>' +
      '<div class="range-row"><input id="' + id + '" type="range" min="0" max="100" value="' + v + '" data-path="' + o.path + '" data-type="int">' +
      '<span class="range-row__value">' + v + '%</span></div><div class="mt-2">' + progressBarHTML(v, 100, o.color) + '</div></div>';
  }
  function counterCardHTML(o) {
    var v = Number(o.value) || 0;
    var cls = 'value--neutral';
    if (o.invert) cls = v <= 3 ? 'value--ok' : v <= 7 ? 'value--warn' : 'value--bad';
    return '<div class="card counter-card"><div class="counter-card__left"><span class="metric-card__icon">' + icon(o.iconName, 16) + '</span><div><div class="counter-card__label">' + escapeHTML(o.label) + '</div>' +
      (o.hint ? '<div class="counter-card__hint">' + escapeHTML(o.hint) + '</div>' : '') + '</div></div>' +
      '<div class="counter-card__controls"><button class="stepper-btn" data-action="counter-delta" data-path="' + o.path + '" data-delta="-1" data-min="0">' + icon('minus', 13) + '</button>' +
      '<span class="counter-card__value ' + cls + '">' + v + '</span>' +
      '<button class="stepper-btn" data-action="counter-delta" data-path="' + o.path + '" data-delta="1">' + icon('plus', 13) + '</button></div></div>';
  }

  /* ======================= tab renderers ======================= */

  function renderToday() {
    var tk = todayKey();
    var d = getDaily(tk);
    var score = [d.wakeUp, d.exercise, d.noReels, d.sleep].filter(Boolean).length;
    var pct = Math.round((score / 4) * 100);
    var routineDone = ROUTINE_ITEMS.filter(function (it) { return d.routine && d.routine[it.id]; }).length;
    var quote = QUOTES[dayOfYear(new Date()) % QUOTES.length];

    var toggleDefs = [
      { field: 'wakeUp', label: 'Wake Up Before 7:00 AM', iconName: 'sunrise' },
      { field: 'exercise', label: 'Exercise 30–45 Minutes', iconName: 'dumbbell' },
      { field: 'noReels', label: 'No Reels After 10 PM', iconName: 'smartphone' },
      { field: 'sleep', label: 'Sleep Before 11 PM', iconName: 'bed' }
    ];
    var toggles = toggleDefs.map(function (t) {
      var val = !!d[t.field];
      var path = 'dailyEntries.' + tk + '.' + t.field;
      return '<button class="toggle-row' + (val ? ' is-done' : '') + '" data-action="toggle-bool" data-path="' + path + '">' +
        '<span class="toggle-row__left"><span class="toggle-row__icon">' + icon(t.iconName, 17) + '</span><span class="toggle-row__label">' + escapeHTML(t.label) + '</span></span>' +
        '<span class="toggle-row__dot">' + (val ? icon('check', 16) : icon('x', 16)) + '</span></button>';
    }).join('');

    var periods = ['Morning', 'Afternoon', 'Evening'];
    var routineHTML = periods.map(function (p) {
      var open = !!state.ui.openPeriods[p];
      var items = ROUTINE_ITEMS.filter(function (it) { return it.period === p; }).map(function (it) {
        var done = !!(d.routine && d.routine[it.id]);
        var path = 'dailyEntries.' + tk + '.routine.' + it.id;
        return '<button class="routine-item' + (done ? ' is-done' : '') + '" data-action="toggle-bool" data-path="' + path + '">' +
          '<span class="routine-item__check">' + (done ? icon('checkCircle', 20) : icon('circle', 20)) + '</span>' +
          '<span class="routine-item__icon">' + icon(it.icon, 15) + '</span>' +
          '<span class="routine-item__time">' + it.time + '</span>' +
          '<span class="routine-item__label">' + escapeHTML(it.label) + '</span></button>';
      }).join('');
      return '<div class="routine-period' + (open ? ' is-open' : '') + '"><button class="routine-period__head" data-action="toggle-period" data-period="' + p + '"><span>' + p + '</span>' + icon('chevronDown', 16) + '</button>' +
        '<div class="routine-period__body">' + items + '</div></div>';
    }).join('');

    return (
      '<div class="card card--accent quote-card"><span class="quote-card__mark">' + icon('quote', 60) + '</span>' +
      '<p class="quote-card__eyebrow">Today\'s Motivation</p><p class="quote-card__text">"' + escapeHTML(quote) + '"</p></div>' +
      '<div class="card">' + sectionHeaderHTML('gauge', 'Daily Score Card', '4 habits that compound') +
      ringSVG({ value: score, max: 4, label: score + '/4', sublabel: pct + '% complete' }) +
      '<div style="display:flex;flex-direction:column;gap:10px;">' + toggles + '</div></div>' +
      '<div class="card">' + sectionHeaderHTML('clock', 'Daily Routine Timeline', routineDone + '/' + ROUTINE_ITEMS.length + ' tasks done') +
      progressBarHTML(routineDone, ROUTINE_ITEMS.length, 'gold') +
      '<div style="margin-top:14px;display:flex;flex-direction:column;gap:10px;">' + routineHTML + '</div></div>'
    );
  }

  function renderNgo() {
    var nm = getNgoMonthly();
    var monthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    var base = 'ngoData.monthly.' + monthKeyNow();
    return (
      sectionHeaderHTML('heartHandshake', 'NGO Dashboard', state.settings.ngoName + ' · ' + monthLabel) +
      '<div class="grid-2">' +
      goalCardHTML({ iconName: 'stethoscope', label: 'Patients Supported', currentPath: base + '.patients.current', goalPath: base + '.patients.goal', current: nm.patients.current, goal: nm.patients.goal, unit: 'patients', color: 'blue' }) +
      goalCardHTML({ iconName: 'banknote', label: 'Funds Raised', currentPath: base + '.funds.current', goalPath: base + '.funds.goal', current: nm.funds.current, goal: nm.funds.goal, unit: '₹', color: 'gold', currency: true }) +
      goalCardHTML({ iconName: 'calendarCheck', label: 'CSR Meetings', currentPath: base + '.csr.current', goalPath: base + '.csr.goal', current: nm.csr.current, goal: nm.csr.goal, unit: 'mtgs', color: 'blue' }) +
      goalCardHTML({ iconName: 'utensils', label: 'Food Distribution Events', currentPath: base + '.food.current', goalPath: base + '.food.goal', current: nm.food.current, goal: nm.food.goal, unit: 'events', color: 'green' }) +
      '</div>' +
      counterCardHTML({ iconName: 'alertCircle', label: 'Pending Cases', path: base + '.pending', value: nm.pending, hint: 'Cases awaiting resolution or funding', invert: true })
    );
  }

  function renderOffice() {
    var ot = getOfficeToday();
    var og = getOfficeGoals();
    var tk = todayKey();
    var todayShort = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return (
      sectionHeaderHTML('briefcase', 'Office Dashboard', state.settings.businessName + ' · Today, ' + todayShort) +
      goalCardHTML({ iconName: 'banknote', label: 'Daily Collection', currentPath: 'officeData.entries.' + tk + '.collection', goalPath: 'officeData.goals.collectionGoal', current: ot.collection, goal: og.collectionGoal, unit: '₹', color: 'gold', currency: true }) +
      '<div class="grid-2">' +
      percentCardHTML({ iconName: 'trendingUp', label: 'Team Performance', path: 'officeData.entries.' + tk + '.team', value: ot.team, color: 'blue' }) +
      percentCardHTML({ iconName: 'checkCircle', label: 'Verification Performance', path: 'officeData.entries.' + tk + '.verification', value: ot.verification, color: 'green' }) +
      '</div>' +
      goalCardHTML({ iconName: 'userPlus', label: 'New Donors (this month)', currentPath: 'officeData.entries.' + tk + '.newDonors', goalPath: 'officeData.goals.newDonorsGoal', current: ot.newDonors, goal: og.newDonorsGoal, unit: 'donors', color: 'blue' }) +
      counterCardHTML({ iconName: 'phone', label: 'Pending Follow-ups', path: 'officeData.entries.' + tk + '.pendingFollowups', value: ot.pendingFollowups, hint: 'Calls awaiting a response', invert: true })
    );
  }

  function renderSmokingTracker() {
    var st = state.smokingTracker;
    var body;
    if (!st.baseline) {
      body =
        '<div style="background:var(--card-bg-soft);padding:14px;border-radius:14px;">' +
        '<p class="helper-text" style="margin-bottom:10px;">Set your starting point to begin tracking your 4-week program.</p>' +
        '<div class="metric-card__grid">' +
        '<div class="field"><label class="field__label" for="smoking-baseline-input">Baseline (cigs/day)</label><input id="smoking-baseline-input" class="field__input" type="number" placeholder="0"></div>' +
        '<div class="field"><label class="field__label" for="smoking-start-input">Start Date</label><input id="smoking-start-input" class="field__date" type="date" value="' + todayKey() + '"></div>' +
        '</div><button class="btn btn--primary mt-2" data-action="smoking-start">Start Program</button></div>';
    } else {
      var weeks = [
        { idx: 0, title: 'Week 1', target: '25% Reduction', targetPct: 25, qualitative: false },
        { idx: 1, title: 'Week 2', target: '50% Reduction', targetPct: 50, qualitative: false },
        { idx: 2, title: 'Week 3', target: 'Only After Meals', targetPct: null, qualitative: true },
        { idx: 3, title: 'Week 4', target: 'Smoke-Free Weekdays', targetPct: null, qualitative: true }
      ];
      var weekCards = weeks.map(function (w) {
        var avg = weekAvgSmoking(w.idx);
        var achieved = avg === null ? null : Math.round(((st.baseline - avg) / st.baseline) * 100);
        var clamped = achieved === null ? null : Math.max(0, achieved);
        var body2;
        if (!w.qualitative) {
          var onTrack = clamped !== null && clamped >= w.targetPct;
          body2 = progressBarHTML(clamped === null ? 0 : clamped, w.targetPct, onTrack ? 'green' : 'gold') +
            '<p class="smoking-week__note">' + (avg === null ? 'No data logged for this week yet.' : 'Averaging ' + avg.toFixed(1) + ' cigs/day this week (target ≤ ' + (st.baseline * (1 - w.targetPct / 100)).toFixed(1) + ').') + '</p>';
        } else {
          body2 = '<p class="smoking-week__note">' + (avg === null ? 'No data logged for this week yet.' : 'Averaging ' + avg.toFixed(1) + ' cigs/day this week. Keep logging daily to track this qualitative goal.') + '</p>';
        }
        return '<div class="smoking-week"><div class="smoking-week__head"><span class="smoking-week__title">' + icon('target', 14) + ' ' + w.title + ': ' + w.target + '</span>' +
          (!w.qualitative ? scoreChipHTML(clamped) : '') + '</div>' + body2 + '</div>';
      }).join('');
      body =
        '<div class="kv-grid" style="margin-bottom:12px;"><div class="kv-cell"><div class="kv-cell__label">Baseline</div><div class="kv-cell__value">' + st.baseline + '/day</div></div>' +
        '<div class="kv-cell"><div class="kv-cell__label">Started</div><div class="kv-cell__value" style="font-size:13px;">' + st.startDate + '</div></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' + weekCards + '</div>' +
        '<button class="btn btn--outline mt-2" data-action="smoking-restart">Restart program</button>';
    }
    return '<div class="card">' + sectionHeaderHTML('cigarette', 'Smoking Reduction Tracker', 'A focused 4-week program') + body + '</div>';
  }

  function renderHealth() {
    var tk = todayKey();
    var ht = getHealthToday();
    var exDays = exerciseDaysThisWeek();
    var base = 'healthData.entries.' + tk;
    var quickFields =
      '<div class="metric-card__grid">' +
      statFieldHTML({ path: base + '.weight', label: 'Weight', value: ht.weight, unit: 'kg', step: 0.1 }) +
      statFieldHTML({ path: base + '.water', label: 'Water Intake', value: ht.water, unit: 'glasses / ' + state.settings.waterGoal }) +
      statFieldHTML({ path: base + '.sleepHours', label: 'Sleep Hours', value: ht.sleepHours, unit: 'hrs', step: 0.5 }) +
      statFieldHTML({ path: base + '.smoking', label: 'Cigarettes Today', value: ht.smoking, unit: 'count' }) +
      '</div>';

    return (
      sectionHeaderHTML('activity', 'Health Dashboard', 'Update once a day — takes 20 seconds') +
      '<div class="card">' + quickFields +
      '<div class="card-row mt-2"><span class="counter-card__hint" style="display:flex;align-items:center;gap:6px;">' + icon('dumbbell', 13) + ' Exercise days this week</span>' +
      '<span class="score-chip score-chip--good">' + exDays + '/7</span></div></div>' +
      '<div class="grid-2">' +
      '<div class="card chart-card"><p class="chart-card__title">Sleep Hours (7 days)</p><canvas data-chart="line" data-key="sleep" data-color="#1E40AF" data-unit="h" height="140"></canvas></div>' +
      '<div class="card chart-card"><p class="chart-card__title">Water Intake (7 days)</p><canvas data-chart="bar" data-key="water" data-color="#0EA5E9" data-unit=" gl" height="140"></canvas></div>' +
      '<div class="card chart-card"><p class="chart-card__title">Smoking Count (7 days)</p><canvas data-chart="bar" data-key="smoking" data-color="#DC2626" data-unit="" height="140"></canvas></div>' +
      '<div class="card chart-card"><p class="chart-card__title">Weight Trend (7 days)</p><canvas data-chart="line" data-key="weight" data-color="#C9A227" data-unit=" kg" height="140"></canvas></div>' +
      '</div>' + renderSmokingTracker()
    );
  }

  function renderJournalCard() {
    var tk = todayKey();
    var j = getJournalToday();
    var base = 'journalEntries.' + tk;
    var priorityInputs = [0, 1, 2].map(function (i) {
      var p = base + '.priorities.' + i;
      return '<input id="' + fieldId(p) + '" class="field__input priority-input" type="text" placeholder="Priority ' + (i + 1) + '" value="' + escapeAttr(j.priorities[i] || '') + '" data-path="' + p + '">';
    }).join('');
    return '<div class="card">' + sectionHeaderHTML('bookOpen', 'Daily Journal', 'Two minutes of reflection') +
      '<div class="field" style="margin-bottom:14px;"><label class="journal-label journal-label--wins" for="' + fieldId(base + '.wins') + '">Today\'s Wins</label>' +
      '<textarea id="' + fieldId(base + '.wins') + '" class="field__textarea" rows="2" placeholder="What went well today?" data-path="' + base + '.wins">' + escapeHTML(j.wins) + '</textarea></div>' +
      '<div class="field" style="margin-bottom:14px;"><label class="journal-label journal-label--problems" for="' + fieldId(base + '.problems') + '">Problems Faced</label>' +
      '<textarea id="' + fieldId(base + '.problems') + '" class="field__textarea" rows="2" placeholder="What got in the way?" data-path="' + base + '.problems">' + escapeHTML(j.problems) + '</textarea></div>' +
      '<div class="field"><label class="journal-label journal-label--priorities">Tomorrow\'s Top 3 Priorities</label>' + priorityInputs + '</div></div>';
  }

  function renderWeeklyReportCard() {
    var sc = computeScores();
    var items = [
      { name: 'Discipline', value: sc.disciplineScore || 0, color: '#1E40AF' },
      { name: 'Health', value: sc.healthScore || 0, color: '#0EA5E9' },
      { name: 'NGO', value: sc.ngoScore || 0, color: '#C9A227' },
      { name: 'Office', value: sc.officeScore || 0, color: '#16A34A' }
    ];
    var kv = [
      { label: 'Discipline Score', value: sc.disciplineScore },
      { label: 'Health Score', value: sc.healthScore },
      { label: 'NGO Score', value: sc.ngoScore },
      { label: 'Office Score', value: sc.officeScore }
    ].map(function (s) { return '<div class="kv-cell"><div class="kv-cell__label">' + s.label + '</div>' + scoreChipHTML(s.value) + '</div>'; }).join('');

    return '<div class="card">' + sectionHeaderHTML('gauge', 'Weekly Report', 'Estimated from the last 7 days you logged') +
      ringSVG({ value: sc.overallScore || 0, max: 100, label: String(sc.overallScore || 0), sublabel: 'Overall Productivity' }) +
      '<div class="kv-grid" style="margin-bottom:14px;">' + kv + '</div>' +
      '<div class="chart-card"><canvas data-chart="multibar" data-items=\'' + JSON.stringify(items) + '\' height="160"></canvas></div></div>';
  }

  function renderSettingsCard() {
    var s = state.settings;
    var notifRows = ['wakeUp', 'exercise', 'planning', 'sleep'].map(function (k) {
      var n = s.notifications[k];
      return '<div class="notif-row"><span class="notif-row__left">' + icon('alarmClock', 16) + '<span class="notif-row__label">' + escapeHTML(NOTIF_LABELS[k]) + '</span></span>' +
        '<span class="notif-row__right"><input type="time" value="' + n.time + '" data-path="settings.notifications.' + k + '.time" id="' + fieldId('settings.notifications.' + k + '.time') + '">' +
        '<button class="switch' + (n.enabled ? ' is-on' : '') + '" data-action="toggle-bool" data-path="settings.notifications.' + k + '.enabled"><span class="switch__knob"></span></button></span></div>';
    }).join('');

    var installSection = '';
    if (deferredPrompt && !isStandalone()) {
      installSection = '<div class="install-banner mt-2"><p>Install this dashboard as an app on your device.</p><button class="btn btn--gold" data-action="install-app" style="width:auto;padding:8px 14px;">' + icon('download', 14) + ' Install</button></div>';
    } else if (isIOS() && !isStandalone()) {
      installSection = '<p class="helper-text mt-2">On iPhone/iPad: tap the Share icon in Safari, then "Add to Home Screen" to install.</p>';
    }

    return '<div class="card" style="display:flex;flex-direction:column;gap:18px;">' + sectionHeaderHTML('settings', 'Notifications & Settings', '') +
      '<div style="display:flex;flex-direction:column;gap:10px;">' + notifRows +
      '<button class="btn btn--outline" data-action="enable-notifications">' + icon('bell', 14) + ' ' + (notifPermission === 'granted' ? 'Browser notifications enabled' : 'Enable browser notifications') + '</button>' +
      '<p class="helper-text">Reminders show as in-app banners while this dashboard is open, and as system notifications if you enable them and keep the tab open. This app has no backend, so background push when fully closed isn\'t possible — for guaranteed alerts, also set these times in your phone\'s own Reminders or Alarm app.</p>' +
      installSection + '</div>' +
      '<div style="height:1px;background:var(--card-border);"></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
      '<p style="font-weight:800;text-transform:uppercase;font-size:11px;color:var(--text-muted);">Profile</p>' +
      '<input class="field__input" type="text" placeholder="Your name" value="' + escapeAttr(s.founderName) + '" data-path="settings.founderName" id="' + fieldId('settings.founderName') + '">' +
      '<input class="field__input" type="text" placeholder="NGO name" value="' + escapeAttr(s.ngoName) + '" data-path="settings.ngoName" id="' + fieldId('settings.ngoName') + '">' +
      '<input class="field__input" type="text" placeholder="Business name" value="' + escapeAttr(s.businessName) + '" data-path="settings.businessName" id="' + fieldId('settings.businessName') + '">' +
      '</div>' +
      '<div style="height:1px;background:var(--card-border);"></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
      '<button class="btn btn--primary" data-action="export-backup">' + icon('download', 16) + ' Export Backup (JSON)</button>' +
      '<button class="btn btn--outline" data-action="import-backup">' + icon('upload', 16) + ' Import Backup (JSON)</button>' +
      '<button class="btn btn--primary" style="background:var(--blue-700);" data-action="print-report">' + icon('printer', 16) + ' Export Weekly Report (PDF)</button>' +
      '<button class="btn btn--danger-outline" data-action="reset-data">' + icon('rotateCcw', 16) + ' Reset All Data</button>' +
      '<p class="helper-text text-center">All changes save automatically and privately on this device, in your browser\'s local storage.</p>' +
      '</div></div>';
  }

  function renderMore() { return renderJournalCard() + renderWeeklyReportCard() + renderSettingsCard(); }

  function tabHTML() {
    switch (state.ui.tab) {
      case 'today': return renderToday();
      case 'ngo': return renderNgo();
      case 'office': return renderOffice();
      case 'health': return renderHealth();
      case 'more': return renderMore();
      default: return renderToday();
    }
  }

  /* ======================= chrome renderers ======================= */

  function renderHeader() {
    var el = document.getElementById('app-header');
    var now = new Date();
    var hour = now.getHours();
    var greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    var streak = computeStreak();
    el.innerHTML =
      '<div style="min-width:0;"><div class="app-header__title-row">' +
      '<h1 class="app-header__greeting truncate">' + escapeHTML(greeting) + ', ' + escapeHTML(state.settings.founderName) + '</h1>' +
      (streak > 0 ? '<span class="streak-chip">' + icon('flame', 12) + ' ' + streak + '</span>' : '') +
      '</div><p class="app-header__date truncate">' + prettyDate(now) + '</p></div>' +
      '<button class="icon-btn" data-action="toggle-theme">' + (state.settings.theme === 'dark' ? icon('sun', 18) : icon('moon', 18)) + '</button>';
  }
  function renderSidenav() {
    var el = document.getElementById('sidenav');
    var links = NAV_ITEMS.map(function (it) {
      return '<button class="sidenav__link' + (state.ui.tab === it.id ? ' is-active' : '') + '" data-action="set-tab" data-tab="' + it.id + '">' + icon(it.icon, 18) + '<span>' + it.label + '</span></button>';
    }).join('');
    el.innerHTML = '<div class="sidenav__brand">' + icon('sparkles', 20) + '<div><div class="sidenav__brand-title">Daily Success</div><div class="sidenav__brand-sub">DASHBOARD</div></div></div>' +
      '<nav class="sidenav__nav">' + links + '</nav>' +
      '<div class="sidenav__footer">' + escapeHTML(state.settings.founderName) + ' · ' + escapeHTML(state.settings.ngoName) + '</div>';
  }
  function renderBottomnav() {
    var el = document.getElementById('bottomnav');
    el.innerHTML = NAV_ITEMS.map(function (it) {
      return '<button class="bottomnav__link' + (state.ui.tab === it.id ? ' is-active' : '') + '" data-action="set-tab" data-tab="' + it.id + '">' + icon(it.icon, 21) + '<span class="bottomnav__label">' + it.label + '</span></button>';
    }).join('');
  }
  function renderPrintReport() {
    var el = document.getElementById('print-report');
    var s = state.settings, tk = todayKey(), d = getDaily(tk), sc = computeScores(), nm = getNgoMonthly(), ot = getOfficeToday();
    var score = [d.wakeUp, d.exercise, d.noReels, d.sleep].filter(Boolean).length;
    el.innerHTML =
      '<h1 style="font-size:22px;font-weight:800;margin-bottom:2px;">Daily Success Dashboard — Weekly Report</h1>' +
      '<p style="font-size:12px;color:#475569;margin-bottom:16px;">' + escapeHTML(s.founderName) + ' · ' + escapeHTML(s.ngoName) + ' · ' + prettyDate(new Date()) + '</p>' +
      '<h2 style="font-size:14px;font-weight:700;margin-top:16px;">Overall Productivity: ' + sc.overallScore + '%</h2>' +
      '<ul style="font-size:12px;line-height:1.8;">' +
      '<li>Discipline Score: ' + (sc.disciplineScore === null ? 'No data' : sc.disciplineScore + '%') + '</li>' +
      '<li>Health Score: ' + (sc.healthScore === null ? 'No data' : sc.healthScore + '%') + '</li>' +
      '<li>NGO Score: ' + (sc.ngoScore === null ? 'No data' : sc.ngoScore + '%') + '</li>' +
      '<li>Office Score: ' + (sc.officeScore === null ? 'No data' : sc.officeScore + '%') + '</li></ul>' +
      '<h2 style="font-size:14px;font-weight:700;margin-top:16px;">Today\'s Score Card: ' + score + '/4</h2>' +
      '<ul style="font-size:12px;line-height:1.8;">' +
      '<li>Wake Up Before 7:00 AM — ' + (d.wakeUp ? 'Done' : 'Missed') + '</li>' +
      '<li>Exercise 30–45 Minutes — ' + (d.exercise ? 'Done' : 'Missed') + '</li>' +
      '<li>No Reels After 10 PM — ' + (d.noReels ? 'Done' : 'Missed') + '</li>' +
      '<li>Sleep Before 11 PM — ' + (d.sleep ? 'Done' : 'Missed') + '</li></ul>' +
      '<h2 style="font-size:14px;font-weight:700;margin-top:16px;">NGO Snapshot (this month)</h2>' +
      '<ul style="font-size:12px;line-height:1.8;">' +
      '<li>Patients Supported: ' + nm.patients.current + ' / ' + nm.patients.goal + '</li>' +
      '<li>Funds Raised: ' + formatINR(nm.funds.current) + ' / ' + formatINR(nm.funds.goal) + '</li>' +
      '<li>CSR Meetings: ' + nm.csr.current + ' / ' + nm.csr.goal + '</li>' +
      '<li>Food Distribution Events: ' + nm.food.current + ' / ' + nm.food.goal + '</li>' +
      '<li>Pending Cases: ' + nm.pending + '</li></ul>' +
      '<h2 style="font-size:14px;font-weight:700;margin-top:16px;">Office Snapshot (today)</h2>' +
      '<ul style="font-size:12px;line-height:1.8;">' +
      '<li>Daily Collection: ' + formatINR(ot.collection) + '</li>' +
      '<li>Team Performance: ' + ot.team + '%</li>' +
      '<li>Verification Performance: ' + ot.verification + '%</li>' +
      '<li>New Donors: ' + ot.newDonors + '</li>' +
      '<li>Pending Follow-ups: ' + ot.pendingFollowups + '</li></ul>';
  }

  /* ======================= canvas charts ======================= */

  function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || (canvas.parentElement ? canvas.parentElement.clientWidth : 300) || 280;
    var h = parseInt(canvas.getAttribute('height'), 10) || 140;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }
  function chartTextColor() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
    return v ? v.trim() : '#64748B';
  }
  function chartGridColor() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--track');
    return v ? v.trim() : '#E2E8F0';
  }
  function roundRectTop(ctx, x, y, w, h, r) {
    var rr = Math.max(0, Math.min(r, w / 2, h));
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + rr);
    ctx.arcTo(x, y, x + rr, y, rr);
    ctx.lineTo(x + w - rr, y);
    ctx.arcTo(x + w, y, x + w, y + rr, rr);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
  }
  function drawLineChart(canvas, data, key, color, unit) {
    var setup = setupCanvas(canvas), ctx = setup.ctx, w = setup.w, h = setup.h;
    ctx.clearRect(0, 0, w, h);
    var padL = 26, padR = 8, padT = 10, padB = 20;
    var plotW = w - padL - padR, plotH = h - padT - padB;
    var values = data.map(function (p) { return p[key] == null ? 0 : p[key]; });
    var maxV = Math.max(1, Math.max.apply(null, values));
    ctx.strokeStyle = chartGridColor(); ctx.lineWidth = 1;
    for (var i = 0; i <= 2; i++) { var gy = padT + plotH * (i / 2); ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke(); }
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath();
    data.forEach(function (p, idx) {
      var x = padL + plotW * (idx / (data.length - 1 || 1));
      var v = p[key] == null ? 0 : p[key];
      var y = padT + plotH - (v / maxV) * plotH;
      if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = color;
    data.forEach(function (p, idx) {
      if (p[key] == null) return;
      var x = padL + plotW * (idx / (data.length - 1 || 1));
      var y = padT + plotH - (p[key] / maxV) * plotH;
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = chartTextColor(); ctx.font = '10px ' + bodyFontStack(); ctx.textAlign = 'center';
    data.forEach(function (p, idx) { var x = padL + plotW * (idx / (data.length - 1 || 1)); ctx.fillText(p.date, x, h - 5); });
  }
  function drawBarChart(canvas, data, key, color) {
    var setup = setupCanvas(canvas), ctx = setup.ctx, w = setup.w, h = setup.h;
    ctx.clearRect(0, 0, w, h);
    var padL = 26, padR = 8, padT = 10, padB = 20;
    var plotW = w - padL - padR, plotH = h - padT - padB;
    var values = data.map(function (p) { return p[key] || 0; });
    var maxV = Math.max(1, Math.max.apply(null, values));
    ctx.strokeStyle = chartGridColor(); ctx.lineWidth = 1;
    for (var i = 0; i <= 2; i++) { var gy = padT + plotH * (i / 2); ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke(); }
    var n = data.length, slot = plotW / n, barW = Math.min(26, slot * 0.55);
    ctx.fillStyle = color;
    data.forEach(function (p, idx) {
      var v = p[key] || 0;
      var bh = (v / maxV) * plotH;
      var x = padL + slot * idx + slot / 2 - barW / 2;
      var y = padT + plotH - bh;
      roundRectTop(ctx, x, y, barW, bh, 4); ctx.fill();
    });
    ctx.fillStyle = chartTextColor(); ctx.font = '10px ' + bodyFontStack(); ctx.textAlign = 'center';
    data.forEach(function (p, idx) { var x = padL + slot * idx + slot / 2; ctx.fillText(p.date, x, h - 5); });
  }
  function drawMultiBarChart(canvas, items) {
    var setup = setupCanvas(canvas), ctx = setup.ctx, w = setup.w, h = setup.h;
    ctx.clearRect(0, 0, w, h);
    var padL = 26, padR = 8, padT = 10, padB = 22;
    var plotW = w - padL - padR, plotH = h - padT - padB;
    var maxV = 100;
    ctx.strokeStyle = chartGridColor(); ctx.lineWidth = 1;
    for (var i = 0; i <= 2; i++) { var gy = padT + plotH * (i / 2); ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke(); }
    var n = items.length, slot = plotW / n, barW = Math.min(40, slot * 0.5);
    ctx.textAlign = 'center'; ctx.font = '10px ' + bodyFontStack();
    items.forEach(function (it, idx) {
      var v = Math.max(0, Math.min(100, it.value));
      var bh = (v / maxV) * plotH;
      var x = padL + slot * idx + slot / 2 - barW / 2;
      var y = padT + plotH - bh;
      ctx.fillStyle = it.color;
      roundRectTop(ctx, x, y, barW, bh, 5); ctx.fill();
      ctx.fillStyle = chartTextColor();
      ctx.fillText(it.name, padL + slot * idx + slot / 2, h - 6);
    });
  }
  function drawCharts() {
    var canvases = document.querySelectorAll('canvas[data-chart]');
    canvases.forEach(function (canvas) {
      var type = canvas.dataset.chart;
      if (type === 'line' || type === 'bar') {
        var data = healthSeries();
        if (type === 'line') drawLineChart(canvas, data, canvas.dataset.key, canvas.dataset.color);
        else drawBarChart(canvas, data, canvas.dataset.key, canvas.dataset.color);
      } else if (type === 'multibar') {
        try { drawMultiBarChart(canvas, JSON.parse(canvas.dataset.items)); } catch (e) { /* ignore */ }
      }
    });
  }

  /* ======================= main render orchestration ======================= */

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.settings.theme === 'dark' ? 'dark' : 'light');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.settings.theme === 'dark' ? '#050B16' : '#0B2545');
  }
  function renderMain() {
    var el = document.getElementById('app-main');
    el.innerHTML = '<div class="tab-panel">' + tabHTML() + '</div>';
    drawCharts();
  }
  function renderAll() {
    applyTheme();
    renderHeader();
    renderSidenav();
    renderBottomnav();
    renderMain();
    renderPrintReport();
  }
  function renderWithFocusPreserved() {
    var active = document.activeElement;
    var activeId = null, selStart = null, selEnd = null;
    if (active && active.id) {
      activeId = active.id;
      if ('selectionStart' in active) { try { selStart = active.selectionStart; selEnd = active.selectionEnd; } catch (e) { /* ignore */ } }
    }
    renderHeader();
    renderMain();
    renderPrintReport();
    if (activeId) {
      var el = document.getElementById(activeId);
      if (el) {
        el.focus();
        if (selStart != null && el.setSelectionRange) { try { el.setSelectionRange(selStart, selEnd); } catch (e) { /* ignore, e.g. range/date inputs */ } }
      }
    }
  }

  /* ======================= event delegation ======================= */

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-action]');
    if (!t) return;
    var action = t.dataset.action;
    if (action === 'set-tab') {
      state.ui.tab = t.dataset.tab; scheduleSave(); renderSidenav(); renderBottomnav(); renderMain();
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    } else if (action === 'toggle-theme') {
      state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark'; scheduleSave(); renderAll();
    } else if (action === 'toggle-bool') {
      setPath(state, t.dataset.path, !getPath(state, t.dataset.path)); scheduleSave(); renderWithFocusPreserved();
    } else if (action === 'toggle-period') {
      var p = t.dataset.period; state.ui.openPeriods[p] = !state.ui.openPeriods[p]; renderWithFocusPreserved();
    } else if (action === 'counter-delta') {
      var cur = Number(getPath(state, t.dataset.path)) || 0;
      var delta = Number(t.dataset.delta);
      var min = t.dataset.min != null ? Number(t.dataset.min) : -Infinity;
      setPath(state, t.dataset.path, Math.max(min, cur + delta));
      scheduleSave(); renderWithFocusPreserved();
    } else if (action === 'enable-notifications') {
      enableBrowserNotifications();
    } else if (action === 'smoking-start') {
      var baseEl = document.getElementById('smoking-baseline-input');
      var startEl = document.getElementById('smoking-start-input');
      var baseline = baseEl ? Number(baseEl.value) : 0;
      var start = startEl ? startEl.value : '';
      if (baseline > 0 && start) { state.smokingTracker = { baseline: baseline, startDate: start }; scheduleSave(); renderWithFocusPreserved(); }
    } else if (action === 'smoking-restart') {
      state.smokingTracker = { baseline: null, startDate: null }; scheduleSave(); renderWithFocusPreserved();
    } else if (action === 'export-backup') {
      exportBackup();
    } else if (action === 'import-backup') {
      var fileInput = document.getElementById('import-file-input');
      if (fileInput) fileInput.click();
    } else if (action === 'reset-data') {
      resetAllData();
    } else if (action === 'print-report') {
      window.print();
    } else if (action === 'close-banner') {
      hideBanner();
    } else if (action === 'install-app') {
      triggerInstall();
    }
  });

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!t.dataset || !t.dataset.path) return;
    var val = t.value;
    if (t.dataset.type === 'number') val = t.value === '' ? '' : parseFloat(t.value);
    else if (t.dataset.type === 'int') val = t.value === '' ? 0 : parseInt(t.value, 10);
    setPath(state, t.dataset.path, val);
    scheduleSave();
    renderWithFocusPreserved();
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.id === 'import-file-input') {
      handleImportFile(t.files && t.files[0]);
      t.value = '';
    }
  });

  /* ======================= export / import / reset ======================= */

  function exportBackup() {
    try {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'daily-success-dashboard-backup-' + todayKey() + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      showToast('Backup downloaded.');
    } catch (e) {
      console.error(e);
      showToast('Could not export a backup on this device.');
    }
  }
  function handleImportFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var parsed;
      try { parsed = JSON.parse(reader.result); } catch (e) { alert('This file does not look like a valid Daily Success Dashboard backup.'); return; }
      if (!parsed || typeof parsed !== 'object') { alert('This file does not look like a valid Daily Success Dashboard backup.'); return; }
      if (!window.confirm('Import this backup? It will replace all current data on this device.')) return;
      state = mergeDefaults(parsed);
      persist();
      renderAll();
      showToast('Backup imported successfully.');
    };
    reader.onerror = function () { alert('Could not read that file.'); };
    reader.readAsText(file);
  }
  function resetAllData() {
    if (!window.confirm('This will permanently delete all dashboard data on this device. This cannot be undone. Continue?')) return;
    state = defaultState();
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    persist();
    renderAll();
    showToast('All data has been reset.');
  }

  /* ======================= notifications ======================= */

  var notifPermission = (typeof Notification !== 'undefined') ? Notification.permission : 'unsupported';
  var firedToday = {};
  function enableBrowserNotifications() {
    if (typeof Notification === 'undefined') { showToast('Notifications are not supported in this browser.'); return; }
    try {
      Notification.requestPermission().then(function (p) { notifPermission = p; renderWithFocusPreserved(); });
    } catch (e) { /* ignore */ }
  }
  function checkReminders() {
    var n = new Date();
    var hhmm = pad(n.getHours()) + ':' + pad(n.getMinutes());
    var dKey = fmtDate(n);
    Object.keys(state.settings.notifications).forEach(function (key) {
      var r = state.settings.notifications[key];
      if (r.enabled && r.time === hhmm) {
        var fireKey = dKey + '-' + key;
        if (!firedToday[fireKey]) {
          firedToday[fireKey] = true;
          showBanner(NOTIF_LABELS[key]);
          try {
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
              new Notification('Daily Success Dashboard', { body: NOTIF_LABELS[key], icon: 'icons/icon-192.png' });
            }
          } catch (e) { /* ignore */ }
        }
      }
    });
  }
  setInterval(checkReminders, 20000);

  /* ======================= banner / toast ======================= */

  var bannerTimer = null;
  function showBanner(text) {
    var el = document.getElementById('reminder-banner');
    el.innerHTML = '<div class="reminder-banner__inner"><span class="reminder-banner__icon">' + icon('bell', 15) + '</span>' +
      '<div style="flex:1;min-width:0;"><div class="reminder-banner__title">Reminder</div><div class="reminder-banner__text">' + escapeHTML(text) + '</div></div>' +
      '<button class="reminder-banner__close" data-action="close-banner">' + icon('x', 15) + '</button></div>';
    el.hidden = false;
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(hideBanner, 10000);
  }
  function hideBanner() { var el = document.getElementById('reminder-banner'); el.hidden = true; el.innerHTML = ''; }
  var toastTimer = null;
  function showToast(text) {
    var el = document.getElementById('toast');
    el.textContent = text;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 3200);
  }

  /* ======================= PWA install ======================= */

  var deferredPrompt = null;
  function isStandalone() { return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true; }
  function isIOS() { return /iphone|ipad|ipod/i.test(window.navigator.userAgent || ''); }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (state.ui.tab === 'more') renderWithFocusPreserved();
  });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    if (state.ui.tab === 'more') renderWithFocusPreserved();
  });
  function triggerInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () { deferredPrompt = null; renderWithFocusPreserved(); });
  }

  /* ======================= resize ======================= */

  var resizeTimer = null;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawCharts, 150); });

  /* ======================= boot ======================= */

  function boot() {
    try {
      renderAll();
    } catch (e) {
      console.error('Dashboard failed to start', e);
      var main = document.getElementById('app-main');
      if (main) main.innerHTML = '<div class="card"><p>Something went wrong loading the dashboard. Try reloading the page. If the problem continues, use Reset All Data from Settings.</p></div>';
    }
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('./service-worker.js').catch(function () { /* offline support unavailable, app still works */ });
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
