
(() => {
  "use strict";

  // ------------------------------
  // GameVerse - Main application
  // ------------------------------

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const STORAGE = {
    stats: "gameverse_stats_v1",
    language: "gameverse_language_v1",
    best2048: "gameverse_2048_best_v1"
  };

  const defaultStats = {
    played: 0,
    best: 0,
    coins: 0
  };

  let stats = loadJSON(STORAGE.stats, defaultStats);
  let language = localStorage.getItem(STORAGE.language) || "en";
  let currentGame = null;
  let gameCleanup = null;
  let gameTimer = null;

  const translations = {
    en: {
      welcome: "Welcome to GameVerse",
      subtitle: "Choose a game and have fun!",
      played: "Games played",
      best: "Best score",
      coins: "Coins",
      home: "Home",
      profile: "Profile",
      help: "Help",
      profileTitle: "Your profile",
      helpTitle: "How to play",
      helpText: "Choose any game card to start playing. Your progress and coins are saved on this device.",
      puzzle: "Puzzle Zone",
      puzzleDesc: "Train your brain with puzzles",
      tic: "Tic Tac Toe",
      ticDesc: "Challenge yourself",
      aim: "Aim Trainer",
      aimDesc: "Test your reaction",
      car: "Car Dodge",
      carDesc: "Avoid the obstacles",
      jump: "Jump Game",
      jumpDesc: "Jump over the blocks",
      image: "Picture Quiz",
      imageDesc: "Test your visual memory",
      football: "Penalty Kick",
      footballDesc: "Try to score a goal",
      choosePuzzle: "Choose a puzzle",
      match3: "Crystal Match",
      match3Desc: "Match three or more crystals",
      game2048: "2048",
      game2048Desc: "Combine tiles to reach 2048",
      picturePuzzle: "Picture Puzzle",
      picturePuzzleDesc: "Put the picture back together",
      score: "Score",
      moves: "Moves",
      time: "Time",
      restart: "Restart",
      close: "Close",
      youWin: "You win!",
      gameOver: "Game over!",
      yourTurn: "Your turn",
      playerX: "Player X",
      playerO: "Player O",
      draw: "It's a draw!",
      targetHit: "Great shot!",
      tapToStart: "Tap to start",
      tapToJump: "Tap to jump",
      shoot: "Shoot!",
      goal: "GOAL!",
      saved: "Progress saved",
      coinsEarned: "Coins earned",
      stage: "Stage",
      bestScore: "Best score",
      newGame: "New game",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      preview: "Preview",
      congratulations: "Congratulations!",
      tryAgain: "Try again",
      instructions: "Use the controls or your keyboard to play.",
      noMoves: "No more moves! Starting a new board.",
      correct: "Correct!",
      wrong: "Not quite. Try again!",
      start: "Start",
      language: "Language"
    },
    fa: {
      welcome: "به گیم‌ورس خوش آمدی",
      subtitle: "یک بازی انتخاب کن و لذت ببر!",
      played: "بازی‌های انجام‌شده",
      best: "بهترین امتیاز",
      coins: "سکه‌ها",
      home: "خانه",
      profile: "پروفایل",
      help: "راهنما",
      profileTitle: "پروفایل شما",
      helpTitle: "راهنمای بازی",
      helpText: "برای شروع، یکی از کارت‌های بازی را انتخاب کن. پیشرفت و سکه‌ها روی همین دستگاه ذخیره می‌شوند.",
      puzzle: "منطقه پازل",
      puzzleDesc: "با پازل‌ها ذهنت را به چالش بکش",
      tic: "دوز",
      ticDesc: "خودت را به چالش بکش",
      aim: "تمرین نشانه‌گیری",
      aimDesc: "سرعت واکنشت را بسنج",
      car: "فرار با ماشین",
      carDesc: "از موانع دوری کن",
      jump: "بازی پرش",
      jumpDesc: "از روی موانع بپر",
      image: "آزمون تصویر",
      imageDesc: "حافظه تصویری‌ات را امتحان کن",
      football: "ضربه پنالتی",
      footballDesc: "گل بزن!",
      choosePuzzle: "یک پازل انتخاب کن",
      match3: "جورچین کریستالی",
      match3Desc: "سه یا چند کریستال مشابه را کنار هم قرار بده",
      game2048: "۲۰۴۸",
      game2048Desc: "خانه‌ها را ترکیب کن تا به ۲۰۴۸ برسی",
      picturePuzzle: "پازل تصویری",
      picturePuzzleDesc: "تصویر را دوباره مرتب کن",
      score: "امتیاز",
      moves: "حرکت‌ها",
      time: "زمان",
      restart: "شروع دوباره",
      close: "بستن",
      youWin: "برنده شدی!",
      gameOver: "بازی تمام شد!",
      yourTurn: "نوبت شما",
      playerX: "بازیکن X",
      playerO: "بازیکن O",
      draw: "مساوی شد!",
      targetHit: "آفرین!",
      tapToStart: "برای شروع لمس کن",
      tapToJump: "برای پرش لمس کن",
      shoot: "شوت کن!",
      goal: "گل!",
      saved: "پیشرفت ذخیره شد",
      coinsEarned: "سکه دریافت کردی",
      stage: "مرحله",
      bestScore: "بهترین امتیاز",
      newGame: "بازی جدید",
      easy: "آسان",
      medium: "متوسط",
      hard: "سخت",
      preview: "نمایش تصویر",
      congratulations: "تبریک!",
      tryAgain: "دوباره تلاش کن",
      instructions: "برای بازی از کنترل‌ها یا صفحه‌کلید استفاده کن.",
      noMoves: "حرکت دیگری وجود ندارد؛ صفحه جدید ساخته شد.",
      correct: "درست است!",
      wrong: "این بار درست نبود؛ دوباره تلاش کن!",
      start: "شروع",
      language: "زبان"
    },
    ar: {
      welcome: "مرحباً بك في GameVerse",
      subtitle: "اختر لعبة واستمتع!",
      played: "الألعاب التي لعبتها",
      best: "أفضل نتيجة",
      coins: "العملات",
      home: "الرئيسية",
      profile: "الملف الشخصي",
      help: "المساعدة",
      profileTitle: "ملفك الشخصي",
      helpTitle: "كيفية اللعب",
      helpText: "اختر أي لعبة للبدء. يتم حفظ تقدمك وعملاتك على هذا الجهاز.",
      puzzle: "منطقة الألغاز",
      puzzleDesc: "درّب عقلك بالألغاز",
      tic: "إكس أو",
      ticDesc: "تحدَّ نفسك",
      aim: "اختبار التصويب",
      aimDesc: "اختبر سرعة رد فعلك",
      car: "تجنب السيارات",
      carDesc: "تجنب العقبات",
      jump: "لعبة القفز",
      jumpDesc: "اقفز فوق الحواجز",
      image: "اختبار الصور",
      imageDesc: "اختبر ذاكرتك البصرية",
      football: "ركلة جزاء",
      footballDesc: "حاول تسجيل هدف",
      choosePuzzle: "اختر لغزاً",
      match3: "مطابقة الكريستال",
      match3Desc: "طابق ثلاثة بلورات أو أكثر",
      game2048: "2048",
      game2048Desc: "ادمج المربعات للوصول إلى 2048",
      picturePuzzle: "لغز الصورة",
      picturePuzzleDesc: "رتب الصورة من جديد",
      score: "النقاط",
      moves: "الحركات",
      time: "الوقت",
      restart: "إعادة",
      close: "إغلاق",
      youWin: "لقد فزت!",
      gameOver: "انتهت اللعبة!",
      yourTurn: "دورك",
      playerX: "اللاعب X",
      playerO: "اللاعب O",
      draw: "تعادل!",
      targetHit: "رائع!",
      tapToStart: "المس للبدء",
      tapToJump: "المس للقفز",
      shoot: "سدد!",
      goal: "هدف!",
      saved: "تم حفظ التقدم",
      coinsEarned: "عملات مكتسبة",
      stage: "المرحلة",
      bestScore: "أفضل نتيجة",
      newGame: "لعبة جديدة",
      easy: "سهل",
      medium: "متوسط",
      hard: "صعب",
      preview: "معاينة",
      congratulations: "تهانينا!",
      tryAgain: "حاول مرة أخرى",
      instructions: "استخدم الأزرار أو لوحة المفاتيح للعب.",
      noMoves: "لا توجد حركات أخرى. تم إنشاء لوحة جديدة.",
      correct: "صحيح!",
      wrong: "ليس تماماً. حاول مرة أخرى!",
      start: "ابدأ",
      language: "اللغة"
    },
    tr: {
      welcome: "GameVerse'e hoş geldin",
      subtitle: "Bir oyun seç ve eğlen!",
      played: "Oynanan oyunlar",
      best: "En iyi skor",
      coins: "Jetonlar",
      home: "Ana sayfa",
      profile: "Profil",
      help: "Yardım",
      profileTitle: "Profilin",
      helpTitle: "Nasıl oynanır?",
      helpText: "Başlamak için bir oyun kartı seç. İlerlemen ve jetonların bu cihazda saklanır.",
      puzzle: "Bulmaca Bölgesi",
      puzzleDesc: "Bulmacalarla beynini çalıştır",
      tic: "XOX",
      ticDesc: "Kendine meydan oku",
      aim: "Hedef Antrenmanı",
      aimDesc: "Tepki hızını test et",
      car: "Araba Kaçışı",
      carDesc: "Engellerden kaç",
      jump: "Zıplama Oyunu",
      jumpDesc: "Engellerin üzerinden atla",
      image: "Resim Testi",
      imageDesc: "Görsel hafızanı test et",
      football: "Penaltı",
      footballDesc: "Gol atmaya çalış",
      choosePuzzle: "Bir bulmaca seç",
      match3: "Kristal Eşleştirme",
      match3Desc: "Üç veya daha fazla kristali eşleştir",
      game2048: "2048",
      game2048Desc: "2048'e ulaşmak için taşları birleştir",
      picturePuzzle: "Resim Bulmacası",
      picturePuzzleDesc: "Resmi yeniden düzenle",
      score: "Skor",
      moves: "Hamle",
      time: "Süre",
      restart: "Yeniden başlat",
      close: "Kapat",
      youWin: "Kazandın!",
      gameOver: "Oyun bitti!",
      yourTurn: "Sıra sende",
      playerX: "Oyuncu X",
      playerO: "Oyuncu O",
      draw: "Berabere!",
      targetHit: "Harika!",
      tapToStart: "Başlamak için dokun",
      tapToJump: "Zıplamak için dokun",
      shoot: "Şut çek!",
      goal: "GOL!",
      saved: "İlerleme kaydedildi",
      coinsEarned: "Kazanılan jetonlar",
      stage: "Seviye",
      bestScore: "En iyi skor",
      newGame: "Yeni oyun",
      easy: "Kolay",
      medium: "Orta",
      hard: "Zor",
      preview: "Önizleme",
      congratulations: "Tebrikler!",
      tryAgain: "Tekrar dene",
      instructions: "Oynamak için kontrolleri veya klavyeni kullan.",
      noMoves: "Hamle kalmadı! Yeni tahta oluşturuldu.",
      correct: "Doğru!",
      wrong: "Tam değil. Tekrar dene!",
      start: "Başla",
      language: "Dil"
    },
    es: {
      welcome: "Bienvenido a GameVerse",
      subtitle: "¡Elige un juego y diviértete!",
      played: "Partidas jugadas",
      best: "Mejor puntuación",
      coins: "Monedas",
      home: "Inicio",
      profile: "Perfil",
      help: "Ayuda",
      profileTitle: "Tu perfil",
      helpTitle: "Cómo jugar",
      helpText: "Elige una tarjeta para empezar. Tu progreso y tus monedas se guardan en este dispositivo.",
      puzzle: "Zona de puzzles",
      puzzleDesc: "Entrena tu mente con puzzles",
      tic: "Tres en raya",
      ticDesc: "Ponte a prueba",
      aim: "Entrenamiento de puntería",
      aimDesc: "Prueba tus reflejos",
      car: "Esquiva coches",
      carDesc: "Evita los obstáculos",
      jump: "Juego de saltos",
      jumpDesc: "Salta sobre los bloques",
      image: "Quiz de imágenes",
      imageDesc: "Pon a prueba tu memoria visual",
      football: "Penalti",
      footballDesc: "Intenta marcar un gol",
      choosePuzzle: "Elige un puzzle",
      match3: "Cristales",
      match3Desc: "Combina tres o más cristales",
      game2048: "2048",
      game2048Desc: "Combina fichas para llegar a 2048",
      picturePuzzle: "Puzzle de imagen",
      picturePuzzleDesc: "Reconstruye la imagen",
      score: "Puntuación",
      moves: "Movimientos",
      time: "Tiempo",
      restart: "Reiniciar",
      close: "Cerrar",
      youWin: "¡Has ganado!",
      gameOver: "¡Fin del juego!",
      yourTurn: "Tu turno",
      playerX: "Jugador X",
      playerO: "Jugador O",
      draw: "¡Empate!",
      targetHit: "¡Buen tiro!",
      tapToStart: "Toca para empezar",
      tapToJump: "Toca para saltar",
      shoot: "¡Dispara!",
      goal: "¡GOL!",
      saved: "Progreso guardado",
      coinsEarned: "Monedas ganadas",
      stage: "Nivel",
      bestScore: "Mejor puntuación",
      newGame: "Nuevo juego",
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
      preview: "Vista previa",
      congratulations: "¡Felicidades!",
      tryAgain: "Inténtalo de nuevo",
      instructions: "Usa los controles o el teclado para jugar.",
      noMoves: "No quedan movimientos. Se creó un nuevo tablero.",
      correct: "¡Correcto!",
      wrong: "No exactamente. ¡Inténtalo otra vez!",
      start: "Empezar",
      language: "Idioma"
    }
  };

  function loadJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? value : { ...fallback };
    } catch {
      return { ...fallback };
    }
  }

  function saveStats() {
    localStorage.setItem(STORAGE.stats, JSON.stringify(stats));
    updateStats();
  }

  function updateStats() {
    const played = $("#played");
    const best = $("#best");
    const coins = $("#coins");

    if (played) played.textContent = stats.played;
    if (best) best.textContent = stats.best;
    if (coins) coins.textContent = stats.coins;
  }

  function t(key) {
    return translations[language]?.[key] || translations.en[key] || key;
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" || language === "ar" ? "rtl" : "ltr";

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key) element.textContent = t(key);
    });

    const selector = $("#language");
    if (selector) selector.value = language;

    updateStats();
  }

  function awardCoins(amount) {
    stats.coins += amount;
    saveStats();
  }

  function recordGame(score = 0) {
    stats.played += 1;
    stats.best = Math.max(Number(stats.best) || 0, Number(score) || 0);
    saveStats();
  }

  function stopGame() {
    if (gameTimer) {
      clearInterval(gameTimer);
      gameTimer = null;
    }

    if (typeof gameCleanup === "function") {
      gameCleanup();
    }

    gameCleanup = null;
    currentGame = null;
  }

  function showModal(title) {
    const modal = $("#modal");
    const titleElement = $("#gameTitle");

    if (titleElement) titleElement.textContent = title;
    if (modal) modal.classList.remove("hidden");
  }

  function closeModal() {
    stopGame();
    const modal = $("#modal");
    if (modal) modal.classList.add("hidden");
  }

  function setGameContent(html) {
    const area = $("#gameArea");
    if (area) area.innerHTML = html;
  }

  function showPage(page) {
    const home = $("#homeView");
    const profile = $("#profileView");
    const help = $("#helpView");

    [home, profile, help].forEach((view) => {
      if (view) view.classList.add("hidden");
    });

    const selected = page === "profile" ? profile : page === "help" ? help : home;
    if (selected) selected.classList.remove("hidden");

    $$(".nav-item").forEach((item) => item.classList.remove("active"));
    const activeTab = page === "profile" ? $("#profileTab") :
      page === "help" ? $("#helpTab") : $("#homeTab");

    if (activeTab) activeTab.classList.add("active");
  }

  // ------------------------------
  // Navigation and initialization
  // ------------------------------

  function init() {
    applyLanguage();
    updateStats();

    $("#language")?.addEventListener("change", (event) => {
      language = event.target.value;
      localStorage.setItem(STORAGE.language, language);
      applyLanguage();
    });

    $("#homeTab")?.addEventListener("click", () => showPage("home"));
    $("#profileTab")?.addEventListener("click", () => showPage("profile"));
    $("#helpTab")?.addEventListener("click", () => showPage("help"));
    $("#close")?.addEventListener("click", closeModal);

    $("#modal")?.addEventListener("click", (event) => {
      if (event.target.id === "modal") closeModal();
    });

    $$("[data-game]").forEach((card) => {
      card.addEventListener("click", () => {
        const game = card.dataset.game;
        launchGame(game);
      });
    });

    document.addEventListener("keydown", handleGlobalKeys);

    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      } catch (error) {
        console.warn("Telegram WebApp initialization:", error);
      }
    }
  }

  function handleGlobalKeys(event) {
    if (!currentGame) return;

    if (currentGame === "2048") {
      const keys = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right"
      };

      const direction = keys[event.key];
      if (direction) {
        event.preventDefault();
        move2048(direction);
      }
    }
  }

  // ------------------------------
  // Game launcher
  // ------------------------------

  function launchGame(game) {
    stopGame();

    if (game === "puzzle") {
      openPuzzleZone();
      return;
    }

    switch (game) {
      case "tic":
        startTicTacToe();
        break;
      case "aim":
        startAimTrainer();
        break;
      case "car":
        startCarGame();
        break;
      case "jump":
        startJumpGame();
        break;
      case "image":
        startPictureQuiz();
        break;
      case "football":
        startFootball();
        break;
      default:
        openPuzzleZone();
    }
  }

  // ------------------------------
  // Puzzle Zone
  // ------------------------------

  function openPuzzleZone() {
    currentGame = "puzzle";
    showModal(t("puzzle"));

    setGameContent(`
      <div class="pz-home-grid">
        <button class="pz-card" id="openMatch3">
          <div class="pz-icon">💎</div>
          <h3>${t("match3")}</h3>
          <p>${t("match3Desc")}</p>
        </button>
        <button class="pz-card" id="open2048">
          <div class="pz-icon">🔢</div>
          <h3>${t("game2048")}</h3>
          <p>${t("game2048Desc")}</p>
        </button>
        <button class="pz-card" id="openPicturePuzzle">
          <div class="pz-icon">🧩</div>
          <h3>${t("picturePuzzle")}</h3>
          <p>${t("picturePuzzleDesc")}</p>
        </button>
      </div>
    `);

    $("#openMatch3")?.addEventListener("click", startMatch3);
    $("#open2048")?.addEventListener("click", start2048);
    $("#openPicturePuzzle")?.addEventListener("click", startPicturePuzzle);
  }

  // ------------------------------
  // 2048
  // ------------------------------

  let board2048 = [];
  let score2048 = 0;
  let best2048 = Number(localStorage.getItem(STORAGE.best2048)) || 0;
  let won2048 = false;
  let touchStart2048 = null;

  function start2048() {
    currentGame = "2048";
    score2048 = 0;
    won2048 = false;
    board2048 = Array.from({ length: 4 }, () => Array(4).fill(0));

    add2048Tile();
    add2048Tile();
    render2048();
  }

  function add2048Tile() {
    const empty = [];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board2048[r][c] === 0) empty.push([r, c]);
      }
    }

    if (!empty.length) return;

    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    board2048[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  function render2048() {
    if (currentGame !== "2048") return;

    const bestText = best2048;
    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong id="score2048">${score2048}</strong></div>
        <div class="score-box">${t("bestScore")}: <strong>${bestText}</strong></div>
        <button class="game-button" id="restart2048">${t("restart")}</button>
      </div>
      <div class="board2048" id="board2048" aria-label="2048 game board">
        ${board2048.flat().map((value) => `
          <div class="tile2048 tile-${value || 0}">${value || ""}</div>
        `).join("")}
      </div>
      <p class="game-hint">${t("instructions")}</p>
      <p class="game-hint">Swipe, use arrow keys, or use WASD.</p>
    `);

    $("#restart2048")?.addEventListener("click", start2048);

    const board = $("#board2048");
    if (board) {
      board.addEventListener("touchstart", (event) => {
        const touch = event.changedTouches[0];
        touchStart2048 = { x: touch.clientX, y: touch.clientY };
      }, { passive: true });

      board.addEventListener("touchend", (event) => {
        if (!touchStart2048) return;

        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStart2048.x;
        const dy = touch.clientY - touchStart2048.y;
        touchStart2048 = null;

        if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;

        if (Math.abs(dx) > Math.abs(dy)) {
          move2048(dx > 0 ? "right" : "left");
        } else {
          move2048(dy > 0 ? "down" : "up");
        }
      }, { passive: true });
    }
  }

  function move2048(direction) {
    if (currentGame !== "2048") return;

    const before = JSON.stringify(board2048);
    let gained = 0;

    for (let index = 0; index < 4; index++) {
      let line = [];

      for (let j = 0; j < 4; j++) {
        const r = direction === "up" ? j :
          direction === "down" ? 3 - j : index;
        const c = direction === "left" ? j :
          direction === "right" ? 3 - j : index;

        line.push(board2048[r][c]);
      }

      line = line.filter((value) => value !== 0);

      for (let j = 0; j < line.length - 1; j++) {
        if (line[j] === line[j + 1]) {
          line[j] *= 2;
          gained += line[j];
          line.splice(j + 1, 1);
        }
      }

      while (line.length < 4) line.push(0);

      for (let j = 0; j < 4; j++) {
        const r = direction === "up" ? j :
          direction === "down" ? 3 - j : index;
        const c = direction === "left" ? j :
          direction === "right" ? 3 - j : index;

        board2048[r][c] = line[j];
      }
    }

    if (before === JSON.stringify(board2048)) return;

    score2048 += gained;

    if (score2048 > best2048) {
      best2048 = score2048;
      localStorage.setItem(STORAGE.best2048, String(best2048));
    }

    add2048Tile();
    render2048();

    if (!won2048 && board2048.some((row) => row.includes(2048))) {
      won2048 = true;
      awardCoins(20);
      show2048Message(t("youWin") + " +20 🪙");
    }

    if (is2048GameOver()) {
      recordGame(score2048);
      awardCoins(5);
      show2048Message(t("gameOver") + " +5 🪙");
    }
  }

  function is2048GameOver() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board2048[r][c] === 0) return false;
        if (r < 3 && board2048[r][c] === board2048[r + 1][c]) return false;
        if (c < 3 && board2048[r][c] === board2048[r][c + 1]) return false;
      }
    }
    return true;
  }

  function show2048Message(message) {
    const area = $("#gameArea");
    if (!area) return;

    const notice = document.createElement("div");
    notice.className = "notice";
    notice.textContent = message;
    area.appendChild(notice);
  }

  // ------------------------------
  // Match 3 Crystal Game
  // ------------------------------

  const crystalColors = ["💎", "🔷", "🔶", "🟣", "🟢", "🔴"];
  let matchBoard = [];
  let matchScore = 0;
  let matchMoves = 25;
  let matchStage = 1;
  let selectedGem = null;
  let matchBusy = false;

  function createMatchBoard() {
    matchBoard = Array.from({ length: 8 }, () => Array(8).fill(0));

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let color;
        let attempts = 0;

        do {
          color = Math.floor(Math.random() * crystalColors.length);
          attempts++;
        } while (
          attempts < 20 &&
          (
            (c >= 2 && matchBoard[r][c - 1] === color && matchBoard[r][c - 2] === color) ||
            (r >= 2 && matchBoard[r - 1][c] === color && matchBoard[r - 2][c] === color)
          )
        );

        matchBoard[r][c] = color;
      }
    }
  }

  function startMatch3() {
    currentGame = "match3";
    matchScore = 0;
    matchMoves = 25;
    selectedGem = null;
    matchBusy = false;
    createMatchBoard();
    renderMatch3();
  }

  function renderMatch3() {
    if (currentGame !== "match3") return;

    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong>${matchScore}</strong></div>
        <div class="score-box">${t("moves")}: <strong>${matchMoves}</strong></div>
        <div class="score-box">${t("stage")}: <strong>${matchStage}</strong></div>
      </div>
      <div class="match-board">
        ${matchBoard.flatMap((row, r) =>
          row.map((color, c) => `
            <button class="gem ${selectedGem?.r === r && selectedGem?.c === c ? "selected" : ""}"
              data-r="${r}" data-c="${c}" aria-label="Crystal">
              ${crystalColors[color]}
            </button>
          `)
        ).join("")}
      </div>
      <button class="game-button" id="restartMatch">${t("restart")}</button>
      <p class="game-hint">${t("instructions")}</p>
    `);

    $$(".gem").forEach((gem) => {
      gem.addEventListener("click", () => {
        selectGem(Number(gem.dataset.r), Number(gem.dataset.c));
      });
    });

    $("#restartMatch")?.addEventListener("click", startMatch3);
  }

  function selectGem(r, c) {
    if (matchBusy || currentGame !== "match3" || matchMoves <= 0) return;

    if (!selectedGem) {
      selectedGem = { r, c };
      renderMatch3();
      return;
    }

    const first = selectedGem;
    selectedGem = null;

    if (Math.abs(first.r - r) + Math.abs(first.c - c) !== 1) {
      selectedGem = { r, c };
      renderMatch3();
      return;
    }

    const temp = matchBoard[first.r][first.c];
    matchBoard[first.r][first.c] = matchBoard[r][c];
    matchBoard[r][c] = temp;

    const matches = findMatches();

    if (!matches.length) {
      const back = matchBoard[first.r][first.c];
      matchBoard[first.r][first.c] = matchBoard[r][c];
      matchBoard[r][c] = back;
      renderMatch3();
      return;
    }

    matchMoves--;
    matchBusy = true;
    resolveMatches();
  }

  function findMatches() {
    const found = new Set();

    for (let r = 0; r < 8; r++) {
      let count = 1;

      for (let c = 1; c <= 8; c++) {
        if (c < 8 && matchBoard[r][c] === matchBoard[r][c - 1]) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = c - count; k < c; k++) found.add(`${r},${k}`);
          }
          count = 1;
        }
      }
    }

    for (let c = 0; c < 8; c++) {
      let count = 1;

      for (let r = 1; r <= 8; r++) {
        if (r < 8 && matchBoard[r][c] === matchBoard[r - 1][c]) {
          count++;
        } else {
          if (count >= 3) {
            for (let k = r - count; k < r; k++) found.add(`${k},${c}`);
          }
          count = 1;
        }
      }
    }

    return [...found].map((value) => value.split(",").map(Number));
  }

  function resolveMatches() {
    let chain = 0;

    function step() {
      const matches = findMatches();

      if (!matches.length) {
        matchBusy = false;
        renderMatch3();

        if (matchMoves <= 0) {
          recordGame(matchScore);
          awardCoins(Math.max(2, Math.floor(matchScore / 100)));
          showMatchMessage(t("gameOver"));
        }
        return;
      }

      chain++;
      matchScore += matches.length * 10 * chain;

      matches.forEach(([r, c]) => {
        matchBoard[r][c] = -1;
      });

      for (let c = 0; c < 8; c++) {
        const remaining = [];

        for (let r = 7; r >= 0; r--) {
          if (matchBoard[r][c] !== -1) remaining.push(matchBoard[r][c]);
        }

        while (remaining.length < 8) {
          remaining.push(Math.floor(Math.random() * crystalColors.length));
        }

        for (let r = 7; r >= 0; r--) {
          matchBoard[r][c] = remaining[7 - r];
        }
      }

      renderMatch3();
      gameTimer = setTimeout(step, 120);
    }

    step();
  }

  function showMatchMessage(message) {
    const area = $("#gameArea");
    if (!area) return;

    const notice = document.createElement("div");
    notice.className = "notice";
    notice.textContent = message;
    area.appendChild(notice);
  }

  // ------------------------------
  // Picture Puzzle
  // ------------------------------

  let pictureOrder = [];
  let pictureMoves = 0;
  let pictureSeconds = 0;
  let pictureSize = 3;

  function startPicturePuzzle() {
    currentGame = "picturePuzzle";
    pictureMoves = 0;
    pictureSeconds = 0;
    pictureSize = 3;
    createPicturePuzzle();
  }

  function createPicturePuzzle() {
    const count = pictureSize * pictureSize;
    pictureOrder = Array.from({ length: count }, (_, i) => i);
    shuffleArray(pictureOrder);

    if (isPictureSolved()) {
      pictureOrder.reverse();
    }

    renderPicturePuzzle();

    gameTimer = setInterval(() => {
      pictureSeconds++;
      const time = $("#pictureTime");
      if (time) time.textContent = formatTime(pictureSeconds);
    }, 1000);
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function renderPicturePuzzle() {
    if (currentGame !== "picturePuzzle") return;

    const count = pictureSize * pictureSize;

    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("moves")}: <strong>${pictureMoves}</strong></div>
        <div class="score-box">${t("time")}: <strong id="pictureTime">${formatTime(pictureSeconds)}</strong></div>
      </div>
      <div class="picture-grid" style="grid-template-columns:repeat(${pictureSize},1fr)">
        ${pictureOrder.map((value, index) => `
          <button class="picture-tile" data-index="${index}"
            style="background:linear-gradient(135deg,
              hsl(${value * 35 + 180},65%,55%),
              hsl(${value * 35 + 220},65%,30%))">
            <span>${value + 1}</span>
          </button>
        `).join("")}
      </div>
      <div class="game-controls">
        <button class="game-button" id="pictureEasy">${t("easy")}</button>
        <button class="game-button" id="pictureMedium">${t("medium")}</button>
        <button class="game-button" id="pictureHard">${t("hard")}</button>
        <button class="game-button" id="pictureRestart">${t("restart")}</button>
      </div>
      <p class="game-hint">${t("instructions")}</p>
    `);

    $$(".picture-tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        const index = Number(tile.dataset.index);
        swapPictureTile(index);
      });
    });

    $("#pictureEasy")?.addEventListener("click", () => changePictureSize(3));
    $("#pictureMedium")?.addEventListener("click", () => changePictureSize(4));
    $("#pictureHard")?.addEventListener("click", () => changePictureSize(5));
    $("#pictureRestart")?.addEventListener("click", () => {
      clearInterval(gameTimer);
      pictureMoves = 0;
      pictureSeconds = 0;
      createPicturePuzzle();
    });
  }

  function changePictureSize(size) {
    clearInterval(gameTimer);
    pictureSize = size;
    pictureMoves = 0;
    pictureSeconds = 0;
    createPicturePuzzle();
  }

  function swapPictureTile(index) {
    if (currentGame !== "picturePuzzle") return;

    const emptyIndex = pictureOrder.indexOf(0);
    if (index === emptyIndex) return;

    const rowA = Math.floor(index / pictureSize);
    const colA = index % pictureSize;
    const rowB = Math.floor(emptyIndex / pictureSize);
    const colB = emptyIndex % pictureSize;

    if (Math.abs(rowA - rowB) + Math.abs(colA - colB) !== 1) return;

    [pictureOrder[index], pictureOrder[emptyIndex]] =
      [pictureOrder[emptyIndex], pictureOrder[index]];

    pictureMoves++;
    renderPicturePuzzle();

    if (isPictureSolved()) {
      clearInterval(gameTimer);
      recordGame(Math.max(1, 1000 - pictureMoves * 5));
      awardCoins(10);
      showPictureMessage(t("youWin") + " +10 🪙");
    }
  }

  function isPictureSolved() {
    return pictureOrder.every((value, index) => value === index);
  }

  function showPictureMessage(message) {
    const area = $("#gameArea");
    if (!area) return;

    const notice = document.createElement("div");
    notice.className = "notice";
    notice.textContent = message;
    area.appendChild(notice);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ------------------------------
  // Tic Tac Toe
  // ------------------------------

  let ticBoard = Array(9).fill("");
  let ticTurn = "X";
  let ticFinished = false;

  function startTicTacToe() {
    currentGame = "tic";
    ticBoard = Array(9).fill("");
    ticTurn = "X";
    ticFinished = false;
    renderTicTacToe();
  }

  function renderTicTacToe() {
    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("yourTurn")}: <strong>${ticTurn}</strong></div>
      </div>
      <div class="tic-board">
        ${ticBoard.map((value, index) => `
          <button class="tic-cell" data-index="${index}">${value}</button>
        `).join("")}
      </div>
      <p id="ticMessage" class="game-hint">${t("instructions")}</p>
      <button class="game-button" id="ticRestart">${t("restart")}</button>
    `);

    $$(".tic-cell").forEach((cell) => {
      cell.addEventListener("click", () => playTic(Number(cell.dataset.index)));
    });

    $("#ticRestart")?.addEventListener("click", startTicTacToe);
  }

  function playTic(index) {
    if (ticFinished || ticBoard[index]) return;

    ticBoard[index] = ticTurn;

    const winner = getTicWinner();

    if (winner) {
      ticFinished = true;
      const message = `${winner} ${t("youWin")}`;
      recordGame(100);
      awardCoins(5);
      renderTicTacToe();
      $("#ticMessage").textContent = message + " +5 🪙";
      return;
    }

    if (ticBoard.every(Boolean)) {
      ticFinished = true;
      renderTicTacToe();
      $("#ticMessage").textContent = t("draw");
      recordGame(10);
      return;
    }

    ticTurn = ticTurn === "X" ? "O" : "X";
    renderTicTacToe();
  }

  function getTicWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (ticBoard[a] && ticBoard[a] === ticBoard[b] && ticBoard[b] === ticBoard[c]) {
        return ticBoard[a];
      }
    }

    return null;
  }

  // ------------------------------
  // Aim Trainer
  // ------------------------------

  let aimScore = 0;
  let aimRemaining = 20;
  let aimActive = false;

  function startAimTrainer() {
    currentGame = "aim";
    aimScore = 0;
    aimRemaining = 20;
    aimActive = true;

    renderAimTrainer();

    gameTimer = setInterval(() => {
      if (!aimActive) return;

      aimRemaining--;

      const timer = $("#aimTime");
      if (timer) timer.textContent = aimRemaining;

      if (aimRemaining <= 0) {
        aimActive = false;
        clearInterval(gameTimer);
        recordGame(aimScore);
        awardCoins(Math.floor(aimScore / 3));
        renderAimEnd();
      }
    }, 1000);
  }

  function renderAimTrainer() {
    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong id="aimScore">0</strong></div>
        <div class="score-box">${t("time")}: <strong id="aimTime">20</strong></div>
      </div>
      <div class="canvas-game" id="aimArea" style="height:300px;position:relative;overflow:hidden">
        <button class="tap-target" id="aimTarget" aria-label="Target"
          style="position:absolute;left:40%;top:40%;width:55px;height:55px;border-radius:50%">
          🎯
        </button>
      </div>
      <p class="game-hint">${t("instructions")}</p>
    `);

    moveAimTarget();

    $("#aimTarget")?.addEventListener("click", () => {
      if (!aimActive) return;

      aimScore++;
      const score = $("#aimScore");
      if (score) score.textContent = aimScore;

      moveAimTarget();
    });
  }

  function moveAimTarget() {
    const area = $("#aimArea");
    const target = $("#aimTarget");
    if (!area || !target) return;

    const maxX = Math.max(0, area.clientWidth - 60);
    const maxY = Math.max(0, area.clientHeight - 60);

    target.style.left = `${Math.random() * maxX}px`;
    target.style.top = `${Math.random() * maxY}px`;
  }

  function renderAimEnd() {
    setGameContent(`
      <div class="game-result">
        <h2>${t("gameOver")}</h2>
        <p>${t("score")}: ${aimScore}</p>
        <button class="game-button" id="aimAgain">${t("restart")}</button>
      </div>
    `);

    $("#aimAgain")?.addEventListener("click", startAimTrainer);
  }

  // ------------------------------
  // Car Dodge
  // ------------------------------

  let carPosition = 1;
  let carScore = 0;
  let carRunning = false;
  let carObstacle = -1;
  let carTick = 0;

  function startCarGame() {
    currentGame = "car";
    carPosition = 1;
    carScore = 0;
    carObstacle = -1;
    carTick = 0;
    carRunning = true;

    renderCarGame();

    gameTimer = setInterval(() => {
      if (!carRunning) return;

      carTick++;
      if (carTick % 3 === 0) {
        carObstacle = Math.floor(Math.random() * 3);
      } else {
        carObstacle = -1;
      }

      if (carObstacle === carPosition) {
        endCarGame();
        return;
      }

      carScore++;
      renderCarBoard();
    }, 650);
  }

  function renderCarGame() {
    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong id="carScore">0</strong></div>
      </div>
      <div class="canvas-game" id="carBoard" style="height:320px;display:flex;justify-content:space-around;align-items:stretch;background:#17243d;padding:12px">
        ${[0, 1, 2].map((lane) => `
          <div class="car-lane" data-lane="${lane}" style="flex:1;border-left:1px dashed #667799;position:relative;text-align:center;font-size:30px">
            ${lane === carPosition ? '<span class="player-car">🚙</span>' : ""}
            ${lane === carObstacle ? '<span class="car-obstacle">🚧</span>' : ""}
          </div>
        `).join("")}
      </div>
      <div class="game-controls">
        <button class="game-button" id="carLeft">◀</button>
        <button class="game-button" id="carRight">▶</button>
      </div>
      <p class="game-hint">Use the buttons or left/right arrow keys.</p>
    `);

    $("#carLeft")?.addEventListener("click", () => moveCar(-1));
    $("#carRight")?.addEventListener("click", () => moveCar(1));
    renderCarBoard();
  }

  function renderCarBoard() {
    const board = $("#carBoard");
    const score = $("#carScore");
    if (score) score.textContent = carScore;
    if (!board) return;

    board.innerHTML = [0, 1, 2].map((lane) => `
      <div class="car-lane" style="flex:1;border-left:1px dashed #667799;position:relative;text-align:center;font-size:30px">
        ${lane === carPosition ? '<span class="player-car">🚙</span>' : ""}
        ${lane === carObstacle ? '<span class="car-obstacle">🚧</span>' : ""}
      </div>
    `).join("");
  }

  function moveCar(direction) {
    if (!carRunning) return;
    carPosition = Math.max(0, Math.min(2, carPosition + direction));
    if (carPosition === carObstacle) {
      endCarGame();
      return;
    }
    renderCarBoard();
  }

  function endCarGame() {
    carRunning = false;
    clearInterval(gameTimer);
    recordGame(carScore);
    awardCoins(Math.floor(carScore / 5));

    setGameContent(`
      <div class="game-result">
        <h2>${t("gameOver")}</h2>
        <p>${t("score")}: ${carScore}</p>
        <button class="game-button" id="carAgain">${t("restart")}</button>
      </div>
    `);

    $("#carAgain")?.addEventListener("click", startCarGame);
  }

  // ------------------------------
  // Jump Game
  // ------------------------------

  let jumpScore = 0;
  let jumpActive = false;
  let jumpPlayerY = 0;
  let jumpObstacleX = 280;
  let jumpVelocity = 0;

  function startJumpGame() {
    currentGame = "jump";
    jumpScore = 0;
    jumpActive = true;
    jumpPlayerY = 0;
    jumpObstacleX = 280;
    jumpVelocity = 0;

    renderJumpGame();

    const area = $("#jumpArea");

    function jump() {
      if (!jumpActive || jumpPlayerY > 0) return;
      jumpVelocity = 13;
    }

    area?.addEventListener("click", jump);

    const keyHandler = (event) => {
      if (event.code === "Space" && currentGame === "jump") {
        event.preventDefault();
        jump();
      }
    };

    document.addEventListener("keydown", keyHandler);

    gameCleanup = () => {
      document.removeEventListener("keydown", keyHandler);
    };

    gameTimer = setInterval(() => {
      if (!jumpActive) return;

      jumpVelocity -= 0.8;
      jumpPlayerY = Math.max(0, jumpPlayerY + jumpVelocity);

      if (jumpPlayerY === 0) jumpVelocity = 0;

      jumpObstacleX -= 7;
      if (jumpObstacleX < -30) {
        jumpObstacleX = 300;
        jumpScore++;
      }

      if (jumpObstacleX < 65 && jumpObstacleX > 20 && jumpPlayerY < 35) {
        endJumpGame();
        return;
      }

      drawJumpGame();
    }, 35);
  }

  function renderJumpGame() {
    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong id="jumpScore">0</strong></div>
      </div>
      <div class="canvas-game" id="jumpArea" style="height:220px;position:relative;overflow:hidden;background:linear-gradient(#6b9ed5,#c4e2ff);border-radius:12px">
        <div id="jumpPlayer" style="position:absolute;bottom:15px;left:35px;font-size:35px">🏃</div>
        <div id="jumpObstacle" style="position:absolute;bottom:15px;left:280px;font-size:30px">🧱</div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:15px;background:#397b43"></div>
      </div>
      <p class="game-hint">${t("tapToJump")}</p>
    `);
  }

  function drawJumpGame() {
    const player = $("#jumpPlayer");
    const obstacle = $("#jumpObstacle");
    const score = $("#jumpScore");

    if (player) player.style.bottom = `${15 + jumpPlayerY}px`;
    if (obstacle) obstacle.style.left = `${jumpObstacleX}px`;
    if (score) score.textContent = jumpScore;
  }

  function endJumpGame() {
    jumpActive = false;
    clearInterval(gameTimer);
    recordGame(jumpScore);
    awardCoins(Math.floor(jumpScore / 3));

    setGameContent(`
      <div class="game-result">
        <h2>${t("gameOver")}</h2>
        <p>${t("score")}: ${jumpScore}</p>
        <button class="game-button" id="jumpAgain">${t("restart")}</button>
      </div>
    `);

    $("#jumpAgain")?.addEventListener("click", startJumpGame);
  }

  // ------------------------------
  // Picture Quiz
  // ------------------------------

  const quizQuestions = [
    { emoji: "🍎", answer: "Apple", options: ["Apple", "Car", "House"] },
    { emoji: "🚗", answer: "Car", options: ["Tree", "Car", "Book"] },
    { emoji: "🐱", answer: "Cat", options: ["Dog", "Bird", "Cat"] },
    { emoji: "🌞", answer: "Sun", options: ["Moon", "Sun", "Star"] },
    { emoji: "⚽", answer: "Ball", options: ["Ball", "Cup", "Hat"] },
    { emoji: "🍕", answer: "Pizza", options: ["Cake", "Pizza", "Bread"] },
    { emoji: "🐟", answer: "Fish", options: ["Fish", "Horse", "Lion"] },
    { emoji: "🌳", answer: "Tree", options: ["Flower", "Tree", "Cloud"] }
  ];

  let quizIndex = 0;
  let quizScore = 0;
  let quizQuestions = [];

  function startPictureQuiz() {
    currentGame = "image";
    quizIndex = 0;
    quizScore = 0;
    quizQuestions = shuffleArray([...quizQuestionsSource()]).slice(0, 8);
    renderPictureQuiz();
  }

  function quizQuestionsSource() {
    return quizQuestions.length ? quizQuestions : window.__unusedQuizQuestions || quizQuestionsData();
  }

  function quizQuestionsData() {
    return [
      { emoji: "🍎", answer: "Apple", options: ["Apple", "Car", "House"] },
      { emoji: "🚗", answer: "Car", options: ["Tree", "Car", "Book"] },
      { emoji: "🐱", answer: "Cat", options: ["Dog", "Bird", "Cat"] },
      { emoji: "🌞", answer: "Sun", options: ["Moon", "Sun", "Star"] },
      { emoji: "⚽", answer: "Ball", options: ["Ball", "Cup", "Hat"] },
      { emoji: "🍕", answer: "Pizza", options: ["Cake", "Pizza", "Bread"] },
      { emoji: "🐟", answer: "Fish", options: ["Fish", "Horse", "Lion"] },
      { emoji: "🌳", answer: "Tree", options: ["Flower", "Tree", "Cloud"] }
    ];
  }

  function renderPictureQuiz() {
    if (quizIndex >= quizQuestions.length) {
      endPictureQuiz();
      return;
    }

    const question = quizQuestions[quizIndex];

    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong>${quizScore}</strong></div>
        <div class="score-box">${quizIndex + 1}/${quizQuestions.length}</div>
      </div>
      <div class="quiz-art" style="font-size:90px;text-align:center;padding:25px">
        ${question.emoji}
      </div>
      <div class="game-controls" id="quizOptions">
        ${shuffleArray([...question.options]).map((option) => `
          <button class="game-button quiz-option" data-answer="${option}">${option}</button>
        `).join("")}
      </div>
      <p class="game-hint">${t("instructions")}</p>
    `);

    $$(".quiz-option").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;

        $$(".quiz-option").forEach((item) => item.disabled = true);

        if (button.dataset.answer === question.answer) {
          quizScore += 10;
          button.classList.add("correct");
        } else {
          button.classList.add("wrong");
        }

        setTimeout(() => {
          quizIndex++;
          renderPictureQuiz();
        }, 650);
      });
    });
  }

  function endPictureQuiz() {
    recordGame(quizScore);
    awardCoins(Math.floor(quizScore / 10));

    setGameContent(`
      <div class="game-result">
        <h2>${t("congratulations")}</h2>
        <p>${t("score")}: ${quizScore}</p>
        <button class="game-button" id="quizAgain">${t("restart")}</button>
      </div>
    `);

    $("#quizAgain")?.addEventListener("click", startPictureQuiz);
  }

  // ------------------------------
  // Football Penalty
  // ------------------------------

  let footballScore = 0;
  let footballShots = 0;
  let footballFinished = false;

  function startFootball() {
    currentGame = "football";
    footballScore = 0;
    footballShots = 0;
    footballFinished = false;
    renderFootball();
  }

  function renderFootball() {
    setGameContent(`
      <div class="game-toolbar">
        <div class="score-box">${t("score")}: <strong id="footballScore">${footballScore}</strong></div>
        <div class="score-box">${t("moves")}: <strong id="footballShots">${footballShots}/5</strong></div>
      </div>
      <div class="canvas-game" style="height:260px;background:linear-gradient(#4c9b54,#27723d);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <div style="font-size:65px">🥅</div>
        <div style="font-size:45px;margin-top:10px" id="footballBall">⚽</div>
      </div>
      <div class="game-controls">
        <button class="game-button" data-shot="left">◀</button>
        <button class="game-button" data-shot="center">⬆</button>
        <button class="game-button" data-shot="right">▶</button>
      </div>
      <p class="game-hint">${t("shoot")}</p>
    `);

    $$("[data-shot]").forEach((button) => {
      button.addEventListener("click", () => shootFootball(button.dataset.shot));
    });
  }

  function shootFootball(direction) {
    if (footballFinished || footballShots >= 5) return;

    footballShots++;

    const goalkeeper = ["left", "center", "right"][Math.floor(Math.random() * 3)];
    const scored = direction !== goalkeeper;

    if (scored) footballScore++;

    const ball = $("#footballBall");
    if (ball) ball.textContent = scored ? "⚽" : "🧤";

    const score = $("#footballScore");
    const shots = $("#footballShots");

    if (score) score.textContent = footballScore;
    if (shots) shots.textContent = `${footballShots}/5`;

    if (footballShots >= 5) {
      footballFinished = true;
      recordGame(footballScore * 20);
      awardCoins(footballScore * 2);

      const area = $("#gameArea");
      const result = document.createElement("div");
      result.className = "notice";
      result.textContent = `${t("gameOver")} ${footballScore}/5`;
      area?.appendChild(result);

      const restart = document.createElement("button");
      restart.className = "game-button";
      restart.textContent = t("restart");
      restart.addEventListener("click", startFootball);
      area?.appendChild(restart);
    }
  }

  // ------------------------------
  // Start the app
  // ------------------------------

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
