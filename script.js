/* ==========================================================================
   JAWI RUSH — FRONTEND LOGIC WITH COUNTDOWN & CLOUD SYNC
   ========================================================================== */

const CONFIG = {
    GAS_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbyBFQ_pzJU56JLsKyqtdgABH2mb8Wq41llr4EwvVPsh4SDk8zjwx36vOtJU-hqjTVq8Rw/exec",
    AUDIO_ENABLED: true,
    MAX_CHALLENGE_TIME: 120
};

const ACHIEVEMENTS = [
    { id: "ach_10", reqWords: 10, title: "Pingat Kayu 🪵", desc: "Membuka 10 perkataan (Langkah Pertama)", icon: "🪵" },
    { id: "ach_20", reqWords: 20, title: "Pingat Batu 🪨", desc: "Membuka 20 perkataan (Penjelajah Jawi)", icon: "🪨" },
    { id: "ach_30", reqWords: 30, title: "Pingat Gangsa 🥉", desc: "Membuka 30 perkataan (Pengumpul Kata)", icon: "🥉" },
    { id: "ach_40", reqWords: 40, title: "Pingat Perak 🥈", desc: "Membuka 40 perkataan (Pakar Ejaan)", icon: "🥈" },
    { id: "ach_50", reqWords: 50, title: "Pingat Emas 🥇", desc: "Membuka 50 perkataan (Jaguh Jawi)", icon: "🥇" },
    { id: "ach_60", reqWords: 60, title: "Pingat Platinum 💿", desc: "Membuka 60 perkataan (Master Jawi)", icon: "💿" },
    { id: "ach_70", reqWords: 70, title: "Pingat Berlian 💎", desc: "Membuka 70 perkataan (Pena Emas)", icon: "💎" },
    { id: "ach_80", reqWords: 80, title: "Pingat Rubi 🔴", desc: "Membuka 80 perkataan (Mahaguru Jawi)", icon: "🔴" },
    { id: "ach_90", reqWords: 90, title: "Pingat Zamrud 🟢", desc: "Membuka 90 perkataan (Legenda Jawi)", icon: "🟢" },
    { id: "ach_100", reqWords: 100, title: "Pingat Safir 👑", desc: "Membuka 100 perkataan (Pahlawan Jawi Terunggul)", icon: "👑" }
];

const WORD_ICONS = {
    w01: "📚", w02: "✏️", w03: "📋", w04: "🪑", w05: "🪑", w06: "📏", w07: "🎒", w08: "📄",
    w09: "🐱", w10: "🐓", w11: "🐦", w12: "🐟", w13: "🐴", w14: "🐯", w15: "🐘", w16: "🐝", w17: "🦁", w18: "🐸",
    w19: "🍚", w20: "🍞", w21: "🍌", w22: "🍎", w23: "🥛", w24: "🎂", w25: "🥩", w26: "🥦", w27: "🍈",
    w28: "👁️", w29: "✋", w30: "🦶", w31: "👂", w32: "💇", w33: "👃", w34: "🦷", w35: "😃",
    w36: "👩", w37: "👨", w38: "👦", w39: "👧", w40: "👶", w41: "👴", w42: "👵",
    w43: "🌸", w44: "🌳", w45: "🌧️", w46: "☁️", w47: "🌙", w48: "⭐", w49: "🏞️", w50: "⛰️",
    w51: "🏠", w52: "🏫", w53: "🏕️", w54: "🏪", w55: "🏬", w56: "📖", w57: "✍️", w58: "🏃", w59: "🚿", w60: "🛌",
    w61: "🚗", w62: "🚌", w63: "🚤", w64: "🚢", w65: "🛺", w66: "👕", w67: "👖", w68: "👟", w69: "🧢", w70: "🧦",
    w71: "🧺", w72: "⏰", w73: "⚽", w74: "🪭", w75: "💡", w76: "🚪", w77: "🪟", w78: "🦆", w79: "🐪", w80: "🐍",
    w81: "🐜", w82: "🦌", w83: "🐢", w84: "🍒", w85: "🥥", w86: "🥒", w87: "🍋", w88: "💧", w89: "☕", w90: "🥤",
    w91: "🔴", w92: "🔵", w93: "🟡", w94: "🟢", w95: "👮", w96: "👨‍🚒", w97: "🧑‍🏫", w98: "🧑‍⚕️", w99: "🍽️", w100: "🥛"
};

const WORD_BANK = [
    { id: "w01", rumi: "BUKU", jawi: "بوكو", letters: ["ب", "و", "ك", "و"], category: "Benda", difficulty: 1 },
    { id: "w02", rumi: "PENSEL", jawi: "ڤينسيل", letters: ["ڤ", "ي", "ن", "س", "ي", "ل"], category: "Benda", difficulty: 1 },
    { id: "w03", rumi: "PAPAN", jawi: "ڤاڤن", letters: ["ڤ", "ا", "ڤ", "ن"], category: "Benda", difficulty: 1 },
    { id: "w04", rumi: "MEJA", jawi: "ميجا", letters: ["م", "ي", "ج", "ا"], category: "Benda", difficulty: 1 },
    { id: "w05", rumi: "KERUSI", jawi: "كروسي", letters: ["ك", "ر", "و", "س", "ي"], category: "Benda", difficulty: 1 },
    { id: "w06", rumi: "PEMBARIS", jawi: "ڤمباريس", letters: ["ڤ", "م", "ب", "ا", "ر", "ي", "س"], category: "Benda", difficulty: 2 },
    { id: "w07", rumi: "BAG", jawi: "بيڬ", letters: ["ب", "ي", "ڬ"], category: "Benda", difficulty: 1 },
    { id: "w08", rumi: "KERTAS", jawi: "كرتس", letters: ["ك", "ر", "ت", "س"], category: "Benda", difficulty: 2 },
    { id: "w09", rumi: "KUCING", jawi: "كوچيڠ", letters: ["ك", "و", "چ", "ي", "ڠ"], category: "Haiwan", difficulty: 1 },
    { id: "w10", rumi: "AYAM", jawi: "ايم", letters: ["ا", "ي", "م"], category: "Haiwan", difficulty: 1 },
    { id: "w11", rumi: "BURUNG", jawi: "بوروڠ", letters: ["ب", "و", "ر", "و", "ڠ"], category: "Haiwan", difficulty: 1 },
    { id: "w12", rumi: "IKAN", jawi: "ايكن", letters: ["ا", "ي", "ك", "ن"], category: "Haiwan", difficulty: 1 },
    { id: "w13", rumi: "KUDA", jawi: "كودا", letters: ["ك", "و", "د", "ا"], category: "Haiwan", difficulty: 1 },
    { id: "w14", rumi: "HARIMAU", jawi: "هاريماو", letters: ["ه", "ا", "ر", "ي", "م", "ا", "و"], category: "Haiwan", difficulty: 2 },
    { id: "w15", rumi: "GAJAH", jawi: "ڬاجه", letters: ["ڬ", "ا", "ج", "ه"], category: "Haiwan", difficulty: 2 },
    { id: "w16", rumi: "LEBAH", jawi: "لبه", letters: ["ل", "ب", "ه"], category: "Haiwan", difficulty: 1 },
    { id: "w17", rumi: "SINGA", jawi: "سيڠا", letters: ["س", "ي", "ڠ", "ا"], category: "Haiwan", difficulty: 1 },
    { id: "w18", rumi: "KATAK", jawi: "كاتق", letters: ["ك", "ا", "ت", "ق"], category: "Haiwan", difficulty: 1 },
    { id: "w19", rumi: "NASI", jawi: "ناسي", letters: ["ن", "ا", "س", "ي"], category: "Makanan", difficulty: 1 },
    { id: "w20", rumi: "ROTI", jawi: "روتي", letters: ["ر", "و", "ت", "ي"], category: "Makanan", difficulty: 1 },
    { id: "w21", rumi: "PISANG", jawi: "ڤيسڠ", letters: ["ڤ", "ي", "س", "ڠ"], category: "Makanan", difficulty: 1 },
    { id: "w22", rumi: "EPAL", jawi: "ايڤل", letters: ["ا", "ي", "ڤ", "ل"], category: "Makanan", difficulty: 1 },
    { id: "w23", rumi: "SUSU", jawi: "سوسو", letters: ["س", "و", "س", "و"], category: "Makanan", difficulty: 1 },
    { id: "w24", rumi: "KEK", jawi: "كيك", letters: ["ك", "ي", "ك"], category: "Makanan", difficulty: 1 },
    { id: "w25", rumi: "DAGING", jawi: "داڬيڠ", letters: ["د", "ا", "ڬ", "ي", "ڠ"], category: "Makanan", difficulty: 2 },
    { id: "w26", rumi: "SAYUR", jawi: "سايور", letters: ["س", "ا", "ي", "و", "ر"], category: "Makanan", difficulty: 1 },
    { id: "w27", rumi: "DURIAN", jawi: "دوريان", letters: ["د", "و", "ر", "ي", "ا", "ن"], category: "Makanan", difficulty: 2 },
    { id: "w28", rumi: "MATA", jawi: "مات", letters: ["م", "ا", "ت"], category: "Anggota Badan", difficulty: 1 },
    { id: "w29", rumi: "TANGAN", jawi: "تاڠن", letters: ["ت", "ا", "ڠ", "ن"], category: "Anggota Badan", difficulty: 1 },
    { id: "w30", rumi: "KAKI", jawi: "كاكي", letters: ["ك", "ا", "ك", "ي"], category: "Anggota Badan", difficulty: 1 },
    { id: "w31", rumi: "TELINGA", jawi: "تليڠا", letters: ["ت", "ل", "ي", "ڠ", "ا"], category: "Anggota Badan", difficulty: 2 },
    { id: "w32", rumi: "RAMBUT", jawi: "رمبوت", letters: ["ر", "م", "ب", "و", "ت"], category: "Anggota Badan", difficulty: 2 },
    { id: "w33", rumi: "HIDUNG", jawi: "هيدوڠ", letters: ["ه", "ي", "د", "و", "ڠ"], category: "Anggota Badan", difficulty: 2 },
    { id: "w34", rumi: "GIGI", jawi: "ڬيڬي", letters: ["ڬ", "ي", "ڬ", "ي"], category: "Anggota Badan", difficulty: 1 },
    { id: "w35", rumi: "MUKA", jawi: "موك", letters: ["م", "و", "ك"], category: "Anggota Badan", difficulty: 1 },
    { id: "w36", rumi: "IBU", jawi: "ايبو", letters: ["ا", "ي", "ب", "و"], category: "Keluarga", difficulty: 1 },
    { id: "w37", rumi: "BAPA", jawi: "باڤ", letters: ["ب", "ا", "ڤ"], category: "Keluarga", difficulty: 1 },
    { id: "w38", rumi: "ABANG", jawi: "ابڠ", letters: ["ا", "ب", "ڠ"], category: "Keluarga", difficulty: 1 },
    { id: "w39", rumi: "KAKAK", jawi: "كاكق", letters: ["ك", "ا", "ك", "ق"], category: "Keluarga", difficulty: 1 },
    { id: "w40", rumi: "ADIK", jawi: "اديق", letters: ["ا", "د", "ي", "ق"], category: "Keluarga", difficulty: 1 },
    { id: "w41", rumi: "DATUK", jawi: "داتوق", letters: ["د", "ا", "ت", "و", "ق"], category: "Keluarga", difficulty: 2 },
    { id: "w42", rumi: "NENEK", jawi: "نينيق", letters: ["ن", "ي", "ن", "ي", "ق"], category: "Keluarga", difficulty: 2 },
    { id: "w43", rumi: "BUNGA", jawi: "بوڠا", letters: ["ب", "و", "ڠ", "ا"], category: "Alam", difficulty: 1 },
    { id: "w44", rumi: "POKOK", jawi: "ڤوكوق", letters: ["ڤ", "و", "ك", "و", "ق"], category: "Alam", difficulty: 1 },
    { id: "w45", rumi: "HUJAN", jawi: "هوجن", letters: ["ه", "و", "ج", "ن"], category: "Alam", difficulty: 1 },
    { id: "w46", rumi: "AWAN", jawi: "اون", letters: ["ا", "و", "ن"], category: "Alam", difficulty: 1 },
    { id: "w47", rumi: "BULAN", jawi: "بولن", letters: ["ب", "و", "ل", "ن"], category: "Alam", difficulty: 1 },
    { id: "w48", rumi: "BINTANG", jawi: "بينتڠ", letters: ["ب", "ي", "ن", "ت", "ڠ"], category: "Alam", difficulty: 2 },
    { id: "w49", rumi: "SUNGAI", jawi: "سوڠاي", letters: ["س", "و", "ڠ", "ا", "ي"], category: "Alam", difficulty: 2 },
    { id: "w50", rumi: "GUNUNG", jawi: "ڬونوڠ", letters: ["ڬ", "و", "ن", "و", "ڠ"], category: "Alam", difficulty: 2 },
    { id: "w51", rumi: "RUMAH", jawi: "رومه", letters: ["ر", "و", "م", "ه"], category: "Tempat", difficulty: 1 },
    { id: "w52", rumi: "SEKOLAH", jawi: "سكوله", letters: ["س", "ك", "و", "ل", "ه"], category: "Tempat", difficulty: 2 },
    { id: "w53", rumi: "PADANG", jawi: "ڤادڠ", letters: ["ڤ", "ا", "د", "ڠ"], category: "Tempat", difficulty: 1 },
    { id: "w54", rumi: "PASAR", jawi: "ڤاسر", letters: ["ڤ", "ا", "س", "ر"], category: "Tempat", difficulty: 1 },
    { id: "w55", rumi: "KEDAI", jawi: "كداي", letters: ["ك", "د", "ا", "ي"], category: "Tempat", difficulty: 1 },
    { id: "w56", rumi: "BACA", jawi: "باچا", letters: ["ب", "ا", "چ", "ا"], category: "Aktiviti", difficulty: 1 },
    { id: "w57", rumi: "TULIS", jawi: "توليس", letters: ["ت", "و", "ل", "ي", "س"], category: "Aktiviti", difficulty: 1 },
    { id: "w58", rumi: "LARI", jawi: "لاري", letters: ["ل", "ا", "ر", "ي"], category: "Aktiviti", difficulty: 1 },
    { id: "w59", rumi: "MANDI", jawi: "منداي", letters: ["م", "ن", "د", "ا", "ي"], category: "Aktiviti", difficulty: 1 },
    { id: "w60", rumi: "TIDUR", jawi: "تيدور", letters: ["ت", "ي", "د", "و", "ر"], category: "Aktiviti", difficulty: 1 },
    { id: "w61", rumi: "KERETA", jawi: "كريتا", letters: ["ك", "ر", "ي", "ت", "ا"], category: "Kenderaan", difficulty: 1 },
    { id: "w62", rumi: "BAS", jawi: "بس", letters: ["ب", "س"], category: "Kenderaan", difficulty: 1 },
    { id: "w63", rumi: "BOT", jawi: "بوت", letters: ["ب", "و", "ت"], category: "Kenderaan", difficulty: 1 },
    { id: "w64", rumi: "KAPAL", jawi: "كاڤل", letters: ["ك", "ا", "ڤ", "ل"], category: "Kenderaan", difficulty: 2 },
    { id: "w65", rumi: "BECA", jawi: "بيچا", letters: ["ب", "ي", "چ", "ا"], category: "Kenderaan", difficulty: 1 },
    { id: "w66", rumi: "BAJU", jawi: "باجو", letters: ["ب", "ا", "ج", "و"], category: "Pakaian", difficulty: 1 },
    { id: "w67", rumi: "SELUAR", jawi: "سلوار", letters: ["س", "ل", "و", "ا", "ر"], category: "Pakaian", difficulty: 2 },
    { id: "w68", rumi: "KASUT", jawi: "كاسوت", letters: ["ك", "ا", "س", "و", "ت"], category: "Pakaian", difficulty: 1 },
    { id: "w69", rumi: "TOPI", jawi: "توڤي", letters: ["ت", "و", "ڤ", "ي"], category: "Pakaian", difficulty: 1 },
    { id: "w70", rumi: "STOKIN", jawi: "ستوكين", letters: ["س", "ت", "و", "ك", "ي", "ن"], category: "Pakaian", difficulty: 2 },
    { id: "w71", rumi: "TIKAR", jawi: "تيكر", letters: ["ت", "ي", "ك", "ر"], category: "Benda", difficulty: 1 },
    { id: "w72", rumi: "JAM", jawi: "جم", letters: ["ج", "م"], category: "Benda", difficulty: 1 },
    { id: "w73", rumi: "BOLA", jawi: "بولا", letters: ["ب", "و", "ل", "ا"], category: "Sukan", difficulty: 1 },
    { id: "w74", rumi: "KIPAS", jawi: "كيڤس", letters: ["ك", "ي", "ڤ", "س"], category: "Benda", difficulty: 1 },
    { id: "w75", rumi: "LAMPU", jawi: "لمڤو", letters: ["ل", "م", "ڤ", "و"], category: "Benda", difficulty: 1 },
    { id: "w76", rumi: "PINTU", jawi: "ڤينتو", letters: ["ڤ", "ي", "ن", "ت", "و"], category: "Rumah", difficulty: 1 },
    { id: "w77", rumi: "TINGKAP", jawi: "تيڠكڤ", letters: ["ت", "ي", "ڠ", "ك", "ڤ"], category: "Rumah", difficulty: 2 },
    { id: "w78", rumi: "ITIK", jawi: "ايتق", letters: ["ا", "ي", "ت", "ق"], category: "Haiwan", difficulty: 1 },
    { id: "w79", rumi: "UNTA", jawi: "اونتا", letters: ["ا", "و", "ن", "ت", "ا"], category: "Haiwan", difficulty: 1 },
    { id: "w80", rumi: "ULAR", jawi: "اولر", letters: ["ا", "و", "ل", "ر"], category: "Haiwan", difficulty: 1 },
    { id: "w81", rumi: "SEMUT", jawi: "سموت", letters: ["س", "م", "و", "ت"], category: "Haiwan", difficulty: 1 },
    { id: "w82", rumi: "RUSA", jawi: "روسا", letters: ["ر", "و", "س", "ا"], category: "Haiwan", difficulty: 1 },
    { id: "w83", rumi: "KURA", jawi: "كورا", letters: ["ك", "و", "ر", "ا"], category: "Haiwan", difficulty: 1 },
    { id: "w84", rumi: "RAMBUTAN", jawi: "رمبوتن", letters: ["ر", "م", "ب", "و", "ت", "ن"], category: "Makanan", difficulty: 2 },
    { id: "w85", rumi: "KELAPA", jawi: "كلاڤ", letters: ["ك", "ل", "ا", "ڤ"], category: "Makanan", difficulty: 1 },
    { id: "w86", rumi: "TIMUN", jawi: "تيمون", letters: ["ت", "ي", "م", "و", "ن"], category: "Makanan", difficulty: 1 },
    { id: "w87", rumi: "LIMAU", jawi: "ليماو", letters: ["ل", "ي", "م", "ا", "و"], category: "Makanan", difficulty: 1 },
    { id: "w88", rumi: "AIR", jawi: "اءير", letters: ["ا", "ء", "ي", "ر"], category: "Makanan", difficulty: 1 },
    { id: "w89", rumi: "TEH", jawi: "تيه", letters: ["ت", "ي", "ه"], category: "Makanan", difficulty: 1 },
    { id: "w90", rumi: "KOPI", jawi: "كوڤي", letters: ["ك", "و", "ڤ", "ي"], category: "Makanan", difficulty: 1 },
    { id: "w91", rumi: "MERAH", jawi: "ميره", letters: ["م", "ي", "ر", "ه"], category: "Warna", difficulty: 1 },
    { id: "w92", rumi: "BIRU", jawi: "بيرو", letters: ["ب", "ي", "ر", "و"], category: "Warna", difficulty: 1 },
    { id: "w93", rumi: "KUNING", jawi: "كونيڠ", letters: ["ك", "و", "ن", "ي", "ڠ"], category: "Warna", difficulty: 1 },
    { id: "w94", rumi: "HIJAU", jawi: "هيجاو", letters: ["ه", "ي", "ج", "ا", "و"], category: "Warna", difficulty: 1 },
    { id: "w95", rumi: "POLIS", jawi: "ڤوليس", letters: ["ڤ", "و", "ل", "ي", "س"], category: "Pekerjaan", difficulty: 2 },
    { id: "w96", rumi: "BOMBA", jawi: "بومبا", letters: ["ب", "و", "م", "ب", "ا"], category: "Pekerjaan", difficulty: 1 },
    { id: "w97", rumi: "GURU", jawi: "ڬورو", letters: ["ڬ", "و", "ر", "و"], category: "Pekerjaan", difficulty: 1 },
    { id: "w98", rumi: "DOKTOR", jawi: "دوكتور", letters: ["د", "و", "ك", "ت", "و", "ر"], category: "Pekerjaan", difficulty: 2 },
    { id: "w99", rumi: "MAKAN", jawi: "ماكن", letters: ["م", "ا", "ك", "ن"], category: "Aktiviti", difficulty: 1 },
    { id: "w100", rumi: "MINUM", jawi: "مينوم", letters: ["م", "ي", "ن", "و", "م"], category: "Aktiviti", difficulty: 1 }
];

const DISTRACTOR_LETTERS = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "و", "ه", "ي", "ء", "ۏ", "ڤ", "ڬ", "ڠ", "چ", "ڽ"];

const state = {
    playerName: "",
    playerYear: "",
    playerClass: "",
    studentKey: "",
    mode: "RELAX",
    questionPool: [],
    currentIndex: 0,
    currentWord: null,
    userSelectedLetters: [],
    score: 0,
    correctCount: 0,
    wrongAttempts: 0,
    comboStreak: 0,
    firstTrySuccessCount: 0,
    hasFailedCurrentWord: false,
    answeredWordsHistory: [],
    timerInterval: null,
    timeRemaining: 60,
    startTimeStamp: 0,
    pausedTimeAccumulated: 0,
    pauseStartTime: 0,
    totalBonusTimeEarned: 0,
    isPaused: false,
    gameActive: false,
    inputBlocked: false,
    hasPlayedWarning: false,
    sessionId: ""
};

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.volume = 0.8;
        this.bgmVolume = 0.22;
        this.bgmTimer = null;
        this.bgmStep = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    playClick() {
        if (!CONFIG.AUDIO_ENABLED) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(this.volume * 0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playTrophySound() {
        if (!CONFIG.AUDIO_ENABLED) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(1046.50, now);
        osc1.frequency.setValueAtTime(2093.00, now + 0.25);
        gain.gain.setValueAtTime(this.volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc1.connect(gain);
        gain.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.6);
    }

    playCorrect() {
        if (!CONFIG.AUDIO_ENABLED) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.12);
        gain.gain.setValueAtTime(this.volume * 0.5, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.25);
    }

    playWrong() {
        if (!CONFIG.AUDIO_ENABLED) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.2);
        gain.gain.setValueAtTime(this.volume * 0.4, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.2);
    }

    startBGM(mode) {
        this.stopBGM();
        this.init();
        if (!CONFIG.AUDIO_ENABLED) return;
        this.bgmStep = 0;
        const notes = mode === "CHALLENGE" ? [329.63, 392.00, 493.88, 587.33] : [261.63, 329.63, 392.00, 523.25];
        this.bgmTimer = setInterval(() => {
            if (!CONFIG.AUDIO_ENABLED || !this.ctx) return;
            const freq = notes[this.bgmStep % notes.length];
            this.playTone(freq, "sine", 0.2, this.bgmVolume * 0.3);
            this.bgmStep++;
        }, mode === "CHALLENGE" ? 200 : 400);
    }

    stopBGM() {
        if (this.bgmTimer) {
            clearInterval(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    playTone(freq, type, duration, vol) {
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(vol * this.volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        } catch(e) {}
    }
}

const sounds = new SoundEngine();

function generateSVGForWord(wordObj) {
    const categoryColors = {
        "Benda": "#3b82f6", "Haiwan": "#10b981", "Makanan": "#f59e0b",
        "Anggota Badan": "#ec4899", "Keluarga": "#8b5cf6", "Alam": "#14b8a6",
        "Tempat": "#6366f1", "Aktiviti": "#f97316", "Kenderaan": "#0284c7",
        "Pakaian": "#d946ef", "Rumah": "#84cc16", "Sukan": "#ea580c"
    };

    const color = categoryColors[wordObj.category] || "#3b82f6";
    const exactIcon = WORD_ICONS[wordObj.id] || "🌟";

    return `
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" rx="25" fill="${color}" />
        <circle cx="100" cy="100" r="70" fill="white" opacity="0.2" />
        <circle cx="100" cy="90" r="50" fill="white" />
        <text x="100" y="98" font-family="'Fredoka', sans-serif" font-size="50" text-anchor="middle" dominant-baseline="middle">
            ${exactIcon}
        </text>
        <rect x="25" y="152" width="150" height="28" rx="14" fill="rgba(255,255,255,0.92)" />
        <text x="100" y="167" font-family="'Fredoka', sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle" dominant-baseline="middle">
            ${wordObj.category.toUpperCase()}
        </text>
    </svg>`;
}

document.addEventListener("DOMContentLoaded", () => {
    setupUIEvents();

    const startAudioOnFirstInteraction = () => {
        sounds.startBGM("MENU");
        document.removeEventListener("pointerdown", startAudioOnFirstInteraction);
        document.removeEventListener("keydown", startAudioOnFirstInteraction);
    };

    document.addEventListener("pointerdown", startAudioOnFirstInteraction);
    document.addEventListener("keydown", startAudioOnFirstInteraction);
});

function setupUIEvents() {
    document.getElementById("btn-mode-relax").addEventListener("click", () => startGame("RELAX"));
    document.getElementById("btn-mode-challenge").addEventListener("click", () => startGame("CHALLENGE"));
    
    document.getElementById("btn-open-achievements").addEventListener("click", () => {
        showModal("modal-achievements");
        renderAchievementsModal();
    });

    document.getElementById("btn-open-gallery").addEventListener("click", () => {
        showModal("modal-gallery");
        renderWordGallery();
    });

    document.getElementById("btn-open-guide").addEventListener("click", () => showModal("modal-guide"));
    document.getElementById("btn-open-leaderboard").addEventListener("click", () => {
        showModal("modal-leaderboard");
        fetchLeaderboard();
    });
    document.getElementById("btn-open-settings").addEventListener("click", () => showModal("modal-settings"));
    
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const modalId = e.target.dataset.modal || e.target.closest(".modal-overlay").id;
            hideModal(modalId);
        });
    });

    document.getElementById("btn-action-delete").addEventListener("click", handleDeleteLetter);
    document.getElementById("btn-action-clear").addEventListener("click", handleClearLetters);
    document.getElementById("btn-action-hint").addEventListener("click", handleGiveHint);
    
    document.getElementById("btn-pause").addEventListener("click", pauseGame);
    document.getElementById("btn-resume-game").addEventListener("click", resumeGame);
    document.getElementById("btn-quit-game").addEventListener("click", quitToMenu);

    document.getElementById("btn-relax-replay").addEventListener("click", () => startGame("RELAX"));
    document.getElementById("btn-relax-menu").addEventListener("click", quitToMenu);
    document.getElementById("btn-chal-retry").addEventListener("click", () => startGame("CHALLENGE"));
    document.getElementById("btn-chal-menu").addEventListener("click", quitToMenu);

    document.getElementById("leaderboard-class-filter").addEventListener("change", (e) => {
        fetchLeaderboard(e.target.value);
    });

    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
        CONFIG.AUDIO_ENABLED = !CONFIG.AUDIO_ENABLED;
        document.getElementById("btn-sound-toggle").innerText = CONFIG.AUDIO_ENABLED ? "🔊" : "🔇";
        if (!CONFIG.AUDIO_ENABLED) {
            sounds.stopBGM();
        } else {
            sounds.startBGM(state.gameActive ? state.mode : "MENU");
        }
    });

    document.getElementById("setting-sound-volume").addEventListener("input", (e) => {
        sounds.volume = parseFloat(e.target.value);
    });

    document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
}

function startGame(selectedMode) {
    const nameInput = document.getElementById("input-student-name").value.trim();
    const yearInput = document.getElementById("select-student-year").value;
    const classInput = document.getElementById("select-student-class").value;

    if (!nameInput) {
        alert("Sila masukkan nama anda terlebih dahulu.");
        return;
    }
    if (!yearInput) {
        alert("Sila pilih Tahun / Umur anda.");
        return;
    }
    if (!classInput) {
        alert("Sila pilih Kelas anda.");
        return;
    }

    sounds.playClick();

    state.playerName = nameInput;
    state.playerYear = yearInput;
    state.playerClass = classInput;
    state.studentKey = `${nameInput.toUpperCase()}_${yearInput}_${classInput}`.replace(/\s+/g, '_');
    state.mode = selectedMode;
    state.score = 0;
    state.correctCount = 0;
    state.wrongAttempts = 0;
    state.comboStreak = 0;
    state.firstTrySuccessCount = 0;
    state.answeredWordsHistory = [];
    state.hasPlayedWarning = false;
    state.sessionId = "S_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

    document.getElementById("display-player-name").innerText = state.playerName;
    document.getElementById("display-player-year").innerText = state.playerYear;
    document.getElementById("display-player-class").innerText = state.playerClass;
    document.getElementById("player-badge").classList.remove("hidden");

    loadCloudProgress(state.studentKey, () => {
        state.questionPool = shuffleArray([...WORD_BANK]);
        state.currentIndex = 0;

        if (state.mode === "RELAX") {
            document.getElementById("hud-mode-name").innerText = "RELAKS";
            document.getElementById("hud-tracker-label").innerText = "SOALAN";
            document.getElementById("hud-tracker-value").innerText = `1/10`;
        } else {
            document.getElementById("hud-mode-name").innerText = "CHALLENGE";
            document.getElementById("hud-tracker-label").innerText = "MASA BAKI";
            document.getElementById("hud-tracker-value").innerText = `60s`;
            state.timeRemaining = 60;
            state.totalBonusTimeEarned = 0;
            state.pausedTimeAccumulated = 0;
        }

        switchScreen("screen-game-arena");
        sounds.startBGM(state.mode);
        loadQuestion();

        startCountdown(() => {
            if (state.mode === "CHALLENGE") {
                state.startTimeStamp = Date.now();
                state.gameActive = true;
                startChallengeTimer();
            } else {
                state.gameActive = true;
            }
        });
    });
}

function startCountdown(callback) {
    const overlay = document.getElementById("countdown-overlay");
    const numElem = document.getElementById("countdown-number");
    if (!overlay || !numElem) {
        if (callback) callback();
        return;
    }

    state.inputBlocked = true;
    overlay.classList.remove("hidden");
    let count = 3;
    numElem.innerText = count;
    sounds.playClick();

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            numElem.innerText = count;
            sounds.playClick();
        } else if (count === 0) {
            numElem.innerText = "MULA!";
            sounds.playCorrect();
        } else {
            clearInterval(interval);
            overlay.classList.add("hidden");
            state.inputBlocked = false;
            if (callback) callback();
        }
    }, 600);
}

function loadCloudProgress(studentKey, callback) {
    if (CONFIG.GAS_WEB_APP_URL.includes("GANTIKAN_DENGAN_URL")) {
        if (callback) callback();
        return;
    }

    const fetchUrl = `${CONFIG.GAS_WEB_APP_URL}?action=loadProgress&studentKey=${encodeURIComponent(studentKey)}`;

    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            const localWords = JSON.parse(localStorage.getItem("JAWI_RUSH_UNLOCKED_WORDS") || "[]");
            const cloudWords = data.unlockedWords || [];
            const mergedWords = Array.from(new Set([...localWords, ...cloudWords]));

            const localAch = JSON.parse(localStorage.getItem("JAWI_RUSH_AWARDED_ACHIEVEMENTS") || "[]");
            const cloudAch = data.awardedAchievements || [];
            const mergedAch = Array.from(new Set([...localAch, ...cloudAch]));

            localStorage.setItem("JAWI_RUSH_UNLOCKED_WORDS", JSON.stringify(mergedWords));
            localStorage.setItem("JAWI_RUSH_AWARDED_ACHIEVEMENTS", JSON.stringify(mergedAch));
        }
    })
    .catch(() => {})
    .finally(() => {
        if (callback) callback();
    });
}

function saveCloudProgress() {
    if (CONFIG.GAS_WEB_APP_URL.includes("GANTIKAN_DENGAN_URL") || !state.studentKey) return;

    const unlockedWords = JSON.parse(localStorage.getItem("JAWI_RUSH_UNLOCKED_WORDS") || "[]");
    const awardedAchievements = JSON.parse(localStorage.getItem("JAWI_RUSH_AWARDED_ACHIEVEMENTS") || "[]");

    const payload = {
        action: "saveProgress",
        studentKey: state.studentKey,
        unlockedWords: unlockedWords,
        awardedAchievements: awardedAchievements
    };

    fetch(CONFIG.GAS_WEB_APP_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
    }).catch(() => {});
}

function loadQuestion() {
    state.userSelectedLetters = [];
    state.hasFailedCurrentWord = false;

    if (state.mode === "RELAX" && state.currentIndex >= 10) {
        endGameRelax();
        return;
    }

    if (state.currentIndex >= state.questionPool.length) {
        state.questionPool = shuffleArray([...WORD_BANK]);
        state.currentIndex = 0;
    }

    state.currentWord = state.questionPool[state.currentIndex];

    document.getElementById("hud-score").innerText = state.score;
    if (state.mode === "RELAX") {
        document.getElementById("hud-tracker-value").innerText = `${state.currentIndex + 1}/10`;
    }

    document.getElementById("question-image-box").innerHTML = generateSVGForWord(state.currentWord);
    document.getElementById("rumi-word-display").innerText = state.currentWord.rumi;

    renderAnswerSlots();
    setupKeyboardLetters();
}

function renderAnswerSlots() {
    const container = document.getElementById("answer-slots-container");
    container.innerHTML = "";

    const targetLength = state.currentWord.letters.length;
    for (let i = 0; i < targetLength; i++) {
        const slot = document.createElement("div");
        slot.className = "answer-slot";
        slot.dataset.index = i;

        if (state.userSelectedLetters[i]) {
            slot.innerText = state.userSelectedLetters[i].letter;
            slot.classList.add("filled");
        }
        container.appendChild(slot);
    }
}

function setupKeyboardLetters() {
    const grid = document.getElementById("letters-grid");
    grid.innerHTML = "";

    const neededLetters = [...state.currentWord.letters];
    const distractorCount = Math.max(3, 8 - neededLetters.length);
    const selectedDistractors = [];

    while (selectedDistractors.length < distractorCount) {
        const randLetter = DISTRACTOR_LETTERS[Math.floor(Math.random() * DISTRACTOR_LETTERS.length)];
        if (!neededLetters.includes(randLetter) && !selectedDistractors.includes(randLetter)) {
            selectedDistractors.push(randLetter);
        }
    }

    const allKeyboardLetters = shuffleArray([...neededLetters, ...selectedDistractors]).map((let, idx) => ({
        id: `key_${idx}_${let}`,
        letter: let
    }));

    allKeyboardLetters.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "letter-btn";
        btn.innerText = item.letter;
        btn.dataset.id = item.id;

        if (state.userSelectedLetters.some(u => u.id === item.id)) {
            btn.classList.add("used");
        }

        btn.addEventListener("click", () => handleSelectLetter(item, btn));
        grid.appendChild(btn);
    });
}

function handleSelectLetter(letterObj, btnElement) {
    if (state.inputBlocked || state.userSelectedLetters.length >= state.currentWord.letters.length) return;

    sounds.playClick();
    state.userSelectedLetters.push(letterObj);
    btnElement.classList.add("used");

    renderAnswerSlots();

    if (state.userSelectedLetters.length === state.currentWord.letters.length) {
        checkAnswer();
    }
}

function handleDeleteLetter() {
    if (state.inputBlocked || state.userSelectedLetters.length === 0) return;
    sounds.playClick();

    const popped = state.userSelectedLetters.pop();
    const btn = document.querySelector(`.letter-btn[data-id="${popped.id}"]`);
    if (btn) btn.classList.remove("used");

    renderAnswerSlots();
}

function handleClearLetters() {
    if (state.inputBlocked || state.userSelectedLetters.length === 0) return;
    sounds.playClick();

    state.userSelectedLetters.forEach(item => {
        const btn = document.querySelector(`.letter-btn[data-id="${item.id}"]`);
        if (btn) btn.classList.remove("used");
    });

    state.userSelectedLetters = [];
    renderAnswerSlots();
}

function handleGiveHint() {
    if (state.inputBlocked) return;
    if (state.score < 10) {
        sounds.playWrong();
        showComboBanner("⚠️ Markah tidak cukup!");
        return;
    }

    const currentIndex = state.userSelectedLetters.length;
    if (currentIndex >= state.currentWord.letters.length) return;

    const correctLetter = state.currentWord.letters[currentIndex];
    const availableBtn = Array.from(document.querySelectorAll(".letter-btn")).find(btn => 
        btn.innerText === correctLetter && !btn.classList.contains("used")
    );

    if (availableBtn) {
        state.score -= 10;
        document.getElementById("hud-score").innerText = state.score;
        sounds.playClick();

        const letterObj = {
            id: availableBtn.dataset.id,
            letter: correctLetter,
            isHint: true
        };
        handleSelectLetter(letterObj, availableBtn);
    }
}

function checkAnswer() {
    const userString = state.userSelectedLetters.map(item => item.letter).join("");
    const targetString = state.currentWord.letters.join("");
    const slots = document.querySelectorAll(".answer-slot");

    if (userString === targetString) {
        sounds.playCorrect();
        
        slots.forEach(slot => {
            slot.classList.remove("filled");
            slot.classList.add("correct");
        });

        state.score += 10;
        state.correctCount++;
        state.comboStreak++;

        if (!state.hasFailedCurrentWord) {
            state.firstTrySuccessCount++;
        }

        state.answeredWordsHistory.push(state.currentWord);
        unlockWordInStorage(state.currentWord.id);

        if (state.mode === "CHALLENGE") {
            addBonusTime(3);
        }

        if (state.comboStreak >= 3) {
            showComboBanner(`🔥 KOMBO ${state.comboStreak} JAWAPAN BETUL!`);
        }

        state.currentIndex++;
        setTimeout(loadQuestion, 600);

    } else {
        sounds.playWrong();
        
        slots.forEach(slot => {
            slot.classList.remove("filled");
            slot.classList.add("wrong");
        });

        state.wrongAttempts++;
        state.comboStreak = 0;
        state.hasFailedCurrentWord = true;

        showComboBanner("❌ Cuba Lagi!");

        setTimeout(() => {
            handleClearLetters();
        }, 700);
    }
}

function showComboBanner(text) {
    const banner = document.getElementById("combo-banner");
    banner.innerText = text;
    banner.classList.remove("hidden");
    setTimeout(() => {
        banner.classList.add("hidden");
    }, 1200);
}

function unlockWordInStorage(wordId) {
    const unlocked = JSON.parse(localStorage.getItem("JAWI_RUSH_UNLOCKED_WORDS") || "[]");
    if (!unlocked.includes(wordId)) {
        unlocked.push(wordId);
        localStorage.setItem("JAWI_RUSH_UNLOCKED_WORDS", JSON.stringify(unlocked));
    }
    
    checkAndAwardAchievements(unlocked.length);
    saveCloudProgress();
}

function checkAndAwardAchievements(unlockedCount) {
    const awardedList = JSON.parse(localStorage.getItem("JAWI_RUSH_AWARDED_ACHIEVEMENTS") || "[]");

    ACHIEVEMENTS.forEach(ach => {
        if (unlockedCount >= ach.reqWords && !awardedList.includes(ach.id)) {
            awardedList.push(ach.id);
            localStorage.setItem("JAWI_RUSH_AWARDED_ACHIEVEMENTS", JSON.stringify(awardedList));
            triggerPS5Toast(ach);
        }
    });
}

function triggerPS5Toast(ach) {
    sounds.playTrophySound();
    document.getElementById("ps5-toast-icon").innerText = ach.icon;
    document.getElementById("ps5-toast-title").innerText = ach.title;
    document.getElementById("ps5-toast-desc").innerText = ach.desc;

    const toast = document.getElementById("ps5-achievement-toast");
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3500);
}

function renderAchievementsModal() {
    const container = document.getElementById("achievements-grid");
    container.innerHTML = "";

    const unlockedWords = JSON.parse(localStorage.getItem("JAWI_RUSH_UNLOCKED_WORDS") || "[]").length;
    const awardedList = JSON.parse(localStorage.getItem("JAWI_RUSH_AWARDED_ACHIEVEMENTS") || "[]");

    document.getElementById("achievements-unlocked-count").innerText = awardedList.length;

    ACHIEVEMENTS.forEach(ach => {
        const isAwarded = awardedList.includes(ach.id);
        const card = document.createElement("div");
        card.className = `achievement-card ${isAwarded ? "unlocked" : "locked"}`;

        card.innerHTML = `
            <div class="ach-icon">${isAwarded ? ach.icon : "🔒"}</div>
            <div class="ach-info">
                <span class="ach-title">${ach.title}</span>
                <span class="ach-desc">${ach.desc}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

function renderWordGallery() {
    const container = document.getElementById("gallery-grid");
    container.innerHTML = "";

    const unlockedList = JSON.parse(localStorage.getItem("JAWI_RUSH_UNLOCKED_WORDS") || "[]");
    document.getElementById("gallery-unlocked-count").innerText = unlockedList.length;

    WORD_BANK.forEach(word => {
        const isUnlocked = unlockedList.includes(word.id);
        const card = document.createElement("div");
        card.className = `gallery-card ${isUnlocked ? "unlocked" : "locked"}`;

        if (isUnlocked) {
            card.innerHTML = `
                <span class="gallery-icon">${WORD_ICONS[word.id] || "🌟"}</span>
                <div class="gallery-rumi">${word.rumi}</div>
                <div class="gallery-jawi">${word.jawi}</div>
            `;
        } else {
            card.innerHTML = `
                <span class="gallery-icon">🔒</span>
                <div class="gallery-rumi">???</div>
                <div class="gallery-jawi">🔒</div>
            `;
        }

        container.appendChild(card);
    });
}

function startChallengeTimer() {
    clearInterval(state.timerInterval);

    state.timerInterval = setInterval(() => {
        if (!state.gameActive || state.isPaused) return;

        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.startTimeStamp - state.pausedTimeAccumulated) / 1000);
        const remaining = 60 + state.totalBonusTimeEarned - elapsedSeconds;

        state.timeRemaining = Math.max(0, Math.min(CONFIG.MAX_CHALLENGE_TIME, remaining));

        const timeElem = document.getElementById("hud-tracker-value");
        timeElem.innerText = `${state.timeRemaining}s`;

        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            endGameChallenge();
        }
    }, 200);
}

function addBonusTime(seconds) {
    state.totalBonusTimeEarned += seconds;
}

function pauseGame() {
    if (state.mode !== "CHALLENGE" || !state.gameActive) return;
    state.isPaused = true;
    state.pauseStartTime = Date.now();
    showModal("modal-pause");
}

function resumeGame() {
    if (state.isPaused) {
        state.pausedTimeAccumulated += (Date.now() - state.pauseStartTime);
        state.isPaused = false;
    }
    hideModal("modal-pause");
}

function endGameRelax() {
    state.gameActive = false;
    sounds.startBGM("MENU");

    document.getElementById("res-relax-name").innerText = state.playerName;
    document.getElementById("res-relax-class").innerText = `${state.playerYear} - ${state.playerClass}`;
    document.getElementById("res-relax-score").innerText = state.score;
    document.getElementById("res-relax-correct").innerText = `${state.correctCount} / 10`;

    const accuracyPct = Math.round((state.firstTrySuccessCount / 10) * 100);
    document.getElementById("res-relax-accuracy").innerText = `${accuracyPct}%`;

    const listElem = document.getElementById("res-relax-words-list");
    listElem.innerHTML = "";
    state.answeredWordsHistory.forEach(item => {
        const row = document.createElement("div");
        row.className = "word-row";
        row.innerHTML = `<span>${item.rumi}</span> <span class="word-jawi">${item.jawi}</span>`;
        listElem.appendChild(row);
    });

    switchScreen("screen-result-relax");
}

function endGameChallenge() {
    state.gameActive = false;
    sounds.startBGM("MENU");
    clearInterval(state.timerInterval);

    document.getElementById("res-chal-name").innerText = state.playerName;
    document.getElementById("res-chal-class").innerText = `${state.playerYear} - ${state.playerClass}`;
    document.getElementById("res-chal-score").innerText = state.score;
    document.getElementById("res-chal-correct").innerText = state.correctCount;
    document.getElementById("res-chal-wrong").innerText = state.wrongAttempts;
    document.getElementById("res-chal-bonus").innerText = `+${state.totalBonusTimeEarned}s`;

    const pbKey = `JAWI_RUSH_PB_${state.playerName}_${state.playerClass}`;
    const previousPB = parseInt(localStorage.getItem(pbKey) || "0", 10);
    if (state.score > previousPB) {
        localStorage.setItem(pbKey, state.score.toString());
        document.getElementById("res-chal-pb").innerText = `${state.score} Markah (REKOD BARU! 🎉)`;
    } else {
        document.getElementById("res-chal-pb").innerText = `${previousPB} Markah`;
    }

    switchScreen("screen-result-challenge");
    submitScoreToGAS();
}

function quitToMenu() {
    clearInterval(state.timerInterval);
    state.gameActive = false;
    sounds.startBGM("MENU");
    hideModal("modal-pause");
    switchScreen("screen-main-menu");
}

function submitScoreToGAS() {
    const syncEnabled = document.getElementById("setting-online-sync").checked;
    const msgBox = document.getElementById("save-status-msg");
    if (msgBox) msgBox.innerText = "Menghantar rekod ke papan pendahulu...";

    if (!syncEnabled || CONFIG.GAS_WEB_APP_URL.includes("GANTIKAN_DENGAN_URL")) {
        if (msgBox) msgBox.innerText = "ℹ️ Rekod disimpan secara tempatan (Mod Luar Talian).";
        saveLocalLeaderboard();
        return;
    }

    const payload = {
        action: "submitScore",
        sessionId: state.sessionId,
        studentName: state.playerName,
        className: `${state.playerYear} - ${state.playerClass}`,
        mode: "CHALLENGE",
        score: state.score,
        correctAnswers: state.correctCount,
        incorrectAttempts: state.wrongAttempts,
        firstTryAccuracy: Math.round(((state.firstTrySuccessCount || 0) / Math.max(1, state.correctCount)) * 100),
        durationSeconds: 60
    };

    fetch(CONFIG.GAS_WEB_APP_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            if (msgBox) msgBox.innerText = "✅ Rekod disimpan di Papan Pendahulu!";
        } else {
            if (msgBox) msgBox.innerText = "⚠️ Ralat menyimpan rekod dalam talian.";
        }
    })
    .catch(() => {
        if (msgBox) msgBox.innerText = "ℹ️ Rekod disimpan secara tempatan.";
        saveLocalLeaderboard();
    });
}

function fetchLeaderboard(classFilter = "ALL") {
    const tbody = document.getElementById("leaderboard-tbody");
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Memuatkan data...</td></tr>`;

    if (CONFIG.GAS_WEB_APP_URL.includes("GANTIKAN_DENGAN_URL")) {
        renderLocalLeaderboard(classFilter);
        return;
    }

    const fetchUrl = `${CONFIG.GAS_WEB_APP_URL}?action=getLeaderboard&mode=CHALLENGE&className=${encodeURIComponent(classFilter)}`;

    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        if (data.status === "success" && data.leaderboard.length > 0) {
            renderLeaderboardTable(data.leaderboard);
        } else {
            renderLocalLeaderboard(classFilter);
        }
    })
    .catch(() => {
        renderLocalLeaderboard(classFilter);
    });
}

function saveLocalLeaderboard() {
    const localData = JSON.parse(localStorage.getItem("JAWI_RUSH_LOCAL_SCORES") || "[]");
    localData.push({
        studentName: state.playerName,
        className: `${state.playerYear} - ${state.playerClass}`,
        score: state.score,
        correctAnswers: state.correctCount,
        timestamp: new Date().toLocaleDateString("ms-MY")
    });
    localStorage.setItem("JAWI_RUSH_LOCAL_SCORES", JSON.stringify(localData));
}

function renderLocalLeaderboard(classFilter) {
    let localData = JSON.parse(localStorage.getItem("JAWI_RUSH_LOCAL_SCORES") || "[]");
    if (classFilter !== "ALL") {
        localData = localData.filter(item => item.className.includes(classFilter));
    }
    localData.sort((a, b) => b.score - a.score || b.correctAnswers - a.correctAnswers);
    renderLeaderboardTable(localData.slice(0, 10));
}

function renderLeaderboardTable(list) {
    const tbody = document.getElementById("leaderboard-tbody");
    tbody.innerHTML = "";

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">Tiada rekod dijumpai.</td></tr>`;
        return;
    }

    list.forEach((item, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${idx + 1}</strong></td>
            <td>${escapeHTML(item.studentName)}</td>
            <td>${escapeHTML(item.className)}</td>
            <td><strong>${item.score}</strong></td>
            <td>${item.correctAnswers}</td>
            <td>${item.timestamp || "Baru sahaja"}</td>
        `;
        tbody.appendChild(tr);
    });
}

function switchScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

function showModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, match => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[match]));
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}
