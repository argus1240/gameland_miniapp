const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const dictionaries = {
  en:{tagline:"ENTER THE WORLD OF GAMES",level:"Level",xp:"XP",games:"Games",choose:"Choose a game and jump in!",count:"games",tic:"Tic-Tac-Toe",ticDesc:"Play against the computer",puzzle:"Number Puzzle",puzzleDesc:"Put the numbers in order",aim:"Target Rush",aimDesc:"Test your reaction",car:"Lane Dodge",carDesc:"Avoid the obstacles",jump:"Jump Challenge",jumpDesc:"Reach ten jumps",image:"Picture Quiz",imageDesc:"Guess the picture",football:"Penalty Kick",footballDesc:"Can you score?",wins:"Wins",played:"Games played",best:"Best score",home:"Home",profile:"Profile",help:"Help",player:"Player",close:"Close",start:"Start",restart:"Play again",moves:"Moves",score:"Score",time:"Time",seconds:"seconds",tapTarget:"Tap the target as many times as you can in 15 seconds.",correct:"Correct!",wrong:"Not quite. The answer was apple.",appleQuestion:"What is this picture?",apple:"Apple",ball:"Ball",carWord:"Car",chooseDirection:"Choose where to shoot.",left:"Left",center:"Center",right:"Right",goal:"GOAL!",saved:"Saved by the goalkeeper!",playAgain:"Play again",orderNumbers:"Arrange the numbers from 1 to 8.",solved:"Great! Puzzle solved.",newPuzzle:"New puzzle",yourTurn:"Your turn",youWin:"You win!",computerWins:"Computer wins!",draw:"It's a draw!",easy:"Easy",medium:"Medium",hard:"Hard",twoPlayers:"Two players",chooseMode:"Choose a mode",restartGame:"Restart game",profileTitle:"Your profile",coins:"Coins",winsLabel:"Wins",helpText:"Choose a game to play. Coins and progress are saved only in this browser on this device. Online multiplayer and secure accounts require a server.",jumpHint:"Press jump ten times to finish the round.",carHint:"Switch lanes to avoid the incoming obstacle.",leftLane:"◀ Left",rightLane:"Right ▶",hit:"You hit an obstacle. Try again!",completed:"Challenge completed!",again:"Try again",gameOver:"Game over",noMoves:"No moves left",levelUp:"Level"},
  fa:{tagline:"وارد دنیای بازی‌ها شو",level:"سطح",xp:"تجربه",games:"بازی‌ها",choose:"یک بازی انتخاب کن و شروع کن!",count:"بازی",tic:"دوز",ticDesc:"مقابل کامپیوتر بازی کن",puzzle:"پازل اعداد",puzzleDesc:"اعداد را مرتب کن",aim:"هدف‌گیری",aimDesc:"سرعت واکنشت را بسنج",car:"فرار از موانع",carDesc:"از موانع دوری کن",jump:"چالش پرش",jumpDesc:"به ده پرش برس",image:"حدس تصویر",imageDesc:"تصویر را حدس بزن",football:"ضربه پنالتی",footballDesc:"می‌توانی گل بزنی؟",wins:"بردها",played:"بازی‌ها",best:"بهترین امتیاز",home:"خانه",profile:"پروفایل",help:"راهنما",player:"بازیکن",close:"بستن",start:"شروع",restart:"دوباره بازی کن",moves:"حرکت‌ها",score:"امتیاز",time:"زمان",seconds:"ثانیه",tapTarget:"در ۱۵ ثانیه تا می‌توانی هدف را بزن.",correct:"درست گفتی!",wrong:"این بار نه؛ جواب سیب بود.",appleQuestion:"این تصویر چیست؟",apple:"سیب",ball:"توپ",carWord:"ماشین",chooseDirection:"جهت ضربه را انتخاب کن.",left:"چپ",center:"وسط",right:"راست",goal:"گل شد!",saved:"دروازه‌بان گرفت!",playAgain:"دوباره بازی",orderNumbers:"اعداد ۱ تا ۸ را مرتب کن.",solved:"آفرین! پازل حل شد.",newPuzzle:"چیدمان جدید",yourTurn:"نوبت تو",youWin:"تو برنده شدی!",computerWins:"کامپیوتر برنده شد!",draw:"بازی مساوی شد!",easy:"آسان",medium:"متوسط",hard:"سخت",twoPlayers:"دونفره",chooseMode:"حالت بازی را انتخاب کن",restartGame:"شروع دوباره",profileTitle:"پروفایل تو",coins:"سکه‌ها",winsLabel:"بردها",helpText:"یک بازی انتخاب کن. سکه‌ها و پیشرفت فقط در همین مرورگر و دستگاه ذخیره می‌شوند. چندنفره آنلاین و حساب امن به سرور نیاز دارند.",jumpHint:"برای پایان مرحله، ده بار دکمه پرش را بزن.",carHint:"برای دوری از مانع، مسیرت را عوض کن.",leftLane:"◀ چپ",rightLane:"راست ▶",hit:"به مانع برخورد کردی. دوباره تلاش کن!",completed:"چالش کامل شد!",again:"تلاش دوباره",gameOver:"پایان بازی",noMoves:"حرکت دیگری نمانده",levelUp:"سطح"},
  ar:{tagline:"ادخل عالم الألعاب",level:"المستوى",xp:"الخبرة",games:"الألعاب",choose:"اختر لعبة وابدأ!",count:"ألعاب",tic:"إكس-أو",ticDesc:"العب ضد الكمبيوتر",puzzle:"لغز الأرقام",puzzleDesc:"رتّب الأرقام",aim:"تحدي الهدف",aimDesc:"اختبر سرعة رد فعلك",car:"تجنب العوائق",carDesc:"ابتعد عن العوائق",jump:"تحدي القفز",jumpDesc:"أكمل عشر قفزات",image:"اختبار الصور",imageDesc:"خمّن الصورة",football:"ركلة جزاء",footballDesc:"هل تستطيع التسجيل؟",wins:"الانتصارات",played:"الألعاب",best:"أفضل نتيجة",home:"الرئيسية",profile:"الملف",help:"مساعدة",player:"لاعب",close:"إغلاق",start:"ابدأ",restart:"العب مجدداً",moves:"الحركات",score:"النقاط",time:"الوقت",seconds:"ثوانٍ",tapTarget:"اضغط على الهدف قدر الإمكان خلال ١٥ ثانية.",correct:"صحيح!",wrong:"ليس تماماً. الإجابة كانت تفاحة.",appleQuestion:"ما هذه الصورة؟",apple:"تفاحة",ball:"كرة",carWord:"سيارة",chooseDirection:"اختر اتجاه التسديد.",left:"يسار",center:"الوسط",right:"يمين",goal:"هدف!",saved:"صدّها الحارس!",playAgain:"العب مجدداً",orderNumbers:"رتّب الأرقام من ١ إلى ٨.",solved:"أحسنت! تم حل اللغز.",newPuzzle:"خلط جديد",yourTurn:"دورك",youWin:"أنت الفائز!",computerWins:"فاز الكمبيوتر!",draw:"تعادل!",easy:"سهل",medium:"متوسط",hard:"صعب",twoPlayers:"لاعبان",chooseMode:"اختر الوضع",restartGame:"إعادة اللعب",profileTitle:"ملفك الشخصي",coins:"العملات",winsLabel:"الانتصارات",helpText:"اختر لعبة. يتم حفظ العملات والتقدم في هذا المتصفح وعلى هذا الجهاز فقط. اللعب عبر الإنترنت والحسابات الآمنة يتطلبان خادماً.",jumpHint:"اضغط على القفز عشر مرات لإنهاء الجولة.",carHint:"غيّر المسار لتجنب العائق القادم.",leftLane:"◀ يسار",rightLane:"يمين ▶",hit:"اصطدمت بعائق. حاول مجدداً!",completed:"اكتمل التحدي!",again:"حاول مجدداً",gameOver:"انتهت اللعبة",noMoves:"لا توجد حركات أخرى",levelUp:"المستوى"},
  tr:{tagline:"OYUN DÜNYASINA GİR",level:"Seviye",xp:"XP",games:"Oyunlar",choose:"Bir oyun seç ve başla!",count:"oyun",tic:"X-O",ticDesc:"Bilgisayara karşı oyna",puzzle:"Sayı Bulmacası",puzzleDesc:"Sayıları sırala",aim:"Hedef Avı",aimDesc:"Reflekslerini dene",car:"Engelden Kaç",carDesc:"Engellerden kaç",jump:"Zıplama Mücadelesi",jumpDesc:"On zıplamaya ulaş",image:"Resim Testi",imageDesc:"Resmi tahmin et",football:"Penaltı",footballDesc:"Gol atabilir misin?",wins:"Galibiyet",played:"Oyun sayısı",best:"En iyi skor",home:"Ana sayfa",profile:"Profil",help:"Yardım",player:"Oyuncu",close:"Kapat",start:"Başla",restart:"Tekrar oyna",moves:"Hamle",score:"Skor",time:"Süre",seconds:"saniye",tapTarget:"15 saniyede hedefe olabildiğince çok dokun.",correct:"Doğru!",wrong:"Olmadı. Cevap elmaydı.",appleQuestion:"Bu resim nedir?",apple:"Elma",ball:"Top",carWord:"Araba",chooseDirection:"Vuruş yönünü seç.",left:"Sol",center:"Orta",right:"Sağ",goal:"GOL!",saved:"Kaleci kurtardı!",playAgain:"Tekrar oyna",orderNumbers:"1'den 8'e kadar sayıları sırala.",solved:"Harika! Bulmaca çözüldü.",newPuzzle:"Yeniden karıştır",yourTurn:"Sıra sende",youWin:"Kazandın!",computerWins:"Bilgisayar kazandı!",draw:"Berabere!",easy:"Kolay",medium:"Orta",hard:"Zor",twoPlayers:"İki oyuncu",chooseMode:"Mod seç",restartGame:"Yeniden başlat",profileTitle:"Profilin",coins:"Jeton",winsLabel:"Galibiyet",helpText:"Oynamak için bir oyun seç. Jetonlar ve ilerleme yalnızca bu tarayıcıda ve cihazda saklanır. Çevrimiçi çok oyunculu oyun ve güvenli hesaplar için sunucu gerekir.",jumpHint:"Turu bitirmek için on kez zıpla.",carHint:"Gelen engelden kaçmak için şerit değiştir.",leftLane:"◀ Sol",rightLane:"Sağ ▶",hit:"Engele çarptın. Tekrar dene!",completed:"Meydan okuma tamamlandı!",again:"Tekrar dene",gameOver:"Oyun bitti",noMoves:"Hamle kalmadı",levelUp:"Seviye"},
  es:{tagline:"ENTRA EN EL MUNDO DE LOS JUEGOS",level:"Nivel",xp:"XP",games:"Juegos",choose:"¡Elige un juego y empieza!",count:"juegos",tic:"Tres en raya",ticDesc:"Juega contra el ordenador",puzzle:"Rompecabezas",puzzleDesc:"Ordena los números",aim:"Reto de puntería",aimDesc:"Pon a prueba tus reflejos",car:"Esquiva obstáculos",carDesc:"Evita los obstáculos",jump:"Reto de saltos",jumpDesc:"Llega a diez saltos",image:"Adivina la imagen",imageDesc:"Adivina la imagen",football:"Penalti",footballDesc:"¿Puedes marcar?",wins:"Victorias",played:"Partidas",best:"Mejor puntuación",home:"Inicio",profile:"Perfil",help:"Ayuda",player:"Jugador",close:"Cerrar",start:"Empezar",restart:"Jugar otra vez",moves:"Movimientos",score:"Puntos",time:"Tiempo",seconds:"segundos",tapTarget:"Toca el objetivo tantas veces como puedas en 15 segundos.",correct:"¡Correcto!",wrong:"No exactamente. La respuesta era manzana.",appleQuestion:"¿Qué aparece en la imagen?",apple:"Manzana",ball:"Pelota",carWord:"Coche",chooseDirection:"Elige la dirección del disparo.",left:"Izquierda",center:"Centro",right:"Derecha",goal:"¡GOL!",saved:"¡El portero la paró!",playAgain:"Jugar otra vez",orderNumbers:"Ordena los números del 1 al 8.",solved:"¡Muy bien! Rompecabezas resuelto.",newPuzzle:"Mezclar de nuevo",yourTurn:"Tu turno",youWin:"¡Has ganado!",computerWins:"¡Gana el ordenador!",draw:"¡Empate!",easy:"Fácil",medium:"Medio",hard:"Difícil",twoPlayers:"Dos jugadores",chooseMode:"Elige un modo",restartGame:"Reiniciar",profileTitle:"Tu perfil",coins:"Monedas",winsLabel:"Victorias",helpText:"Elige un juego. Las monedas y el progreso se guardan solo en este navegador y dispositivo. El modo multijugador en línea y las cuentas seguras requieren un servidor.",jumpHint:"Pulsa saltar diez veces para terminar la ronda.",carHint:"Cambia de carril para evitar el obstáculo.",leftLane:"◀ Izquierda",rightLane:"Derecha ▶",hit:"Has chocado con un obstáculo. ¡Inténtalo de nuevo!",completed:"¡Reto completado!",again:"Intentar otra vez",gameOver:"Fin del juego",noMoves:"No quedan movimientos",levelUp:"Nivel"}
};

let lang = localStorage.getItem("gvLanguage") || "en";
if (!dictionaries[lang]) lang = "en";
const t = key => dictionaries[lang][key] || dictionaries.en[key] || key;
function applyLanguage(){
  const rtl = lang === "fa" || lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = rtl ? "rtl" : "ltr";
  $("#language").value = lang;
  $$("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  $("#gameCount").textContent = `7 ${t("count")}`;
  save();
}
$("#language").addEventListener("change", e => {
  lang = dictionaries[e.target.value] ? e.target.value : "en";
  localStorage.setItem("gvLanguage", lang);
  applyLanguage();
});

const fallback = {coins:120,xp:0,wins:0,played:0,best:0};
function readData(){
  try {
    const current = localStorage.getItem("gvData");
    const legacy = localStorage.getItem("glData");
    const parsed = JSON.parse(current || legacy || "null");
    return parsed && typeof parsed === "object" ? {...fallback,...parsed} : {...fallback};
  } catch { return {...fallback}; }
}
let data = readData();
function save(){
  $("#coins").textContent = data.coins;
  $("#xp").textContent = data.xp;
  $("#level").textContent = 1 + Math.floor(data.xp / 100);
  $("#xpbar").style.width = (data.xp % 100) + "%";
  $("#wins").textContent = data.wins;
  $("#played").textContent = data.played;
  $("#best").textContent = data.best;
  try { localStorage.setItem("gvData", JSON.stringify(data)); } catch {}
}
function reward(win=false, score=0){
  data.played += 1;
  data.xp += 10;
  data.coins += win ? 15 : 3;
  if (win) data.wins += 1;
  data.best = Math.max(data.best, Number(score) || 0);
  save();
}

const modal = $("#modal"), area = $("#gameArea");
function open(title, html){
  $("#gameTitle").textContent = title;
  area.innerHTML = html;
  modal.classList.remove("hidden");
}
function close(){ modal.classList.add("hidden"); }
$("#close").addEventListener("click", close);
modal.addEventListener("click", e => { if(e.target === modal) close(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") close(); });

try {
  const tg = window.Telegram?.WebApp;
  tg?.ready();
  tg?.expand();
  const firstName = tg?.initDataUnsafe?.user?.first_name;
  if (firstName) $("#username").textContent = firstName;
} catch {}

function ticGame(){
  open(t("tic"), `<p class="muted" style="text-align:center">${t("chooseMode")}</p>
    <div class="row"><select id="ticMode" class="action"><option value="easy">${t("easy")}</option><option value="two">${t("twoPlayers")}</option></select></div>
    <p id="ticStatus" class="muted" style="text-align:center"></p><div class="board" id="ticBoard"></div>
    <div class="row"><button class="action" id="ticReset">${t("restartGame")}</button></div>`);
  let board = Array(9).fill(""), turn = "X", finished = false, mode = $("#ticMode").value, rewarded = false;
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const winner = p => lines.some(line => line.every(i => board[i] === p));
  function finish(msg, win=false){ finished=true; $("#ticStatus").textContent=msg; if(!rewarded){rewarded=true;reward(win,board.filter(Boolean).length);} draw(); }
  function draw(){
    $("#ticBoard").innerHTML = board.map((v,i)=>`<button class="cell" data-i="${i}" ${v||finished?"disabled":""} style="color:${v==="X"?"#ff9bd5":"#54e4d2"}">${v}</button>`).join("");
    $("#ticStatus").textContent = finished ? $("#ticStatus").textContent : `${t("yourTurn")}: ${turn}`;
    $$("#ticBoard [data-i]").forEach(btn=>btn.addEventListener("click",()=>play(+btn.dataset.i)));
  }
  function play(i){
    if(finished || board[i]) return;
    board[i]=turn;
    if(winner(turn)){draw();finish(turn==="X"?t("youWin"):t("computerWins"),turn==="X");return;}
    if(board.every(Boolean)){finish(t("draw"));return;}
    turn=turn==="X"?"O":"X";draw();
    if(mode==="easy" && turn==="O") setTimeout(aiMove,300);
  }
  function aiMove(){
    if(finished)return;
    let choice = null;
    for(const p of ["O","X"]){
      for(let i=0;i<9;i++) if(!board[i]){board[i]=p;const won=winner(p);board[i]="";if(won){choice=i;break;}}
      if(choice!==null)break;
    }
    if(choice===null){const free=board.map((v,i)=>v?null:i).filter(v=>v!==null);choice=free[Math.floor(Math.random()*free.length)];}
    board[choice]="O";
    if(winner("O")){draw();finish(t("computerWins"),false);return;}
    if(board.every(Boolean)){finish(t("draw"));return;}
    turn="X";draw();
  }
  function reset(){board=Array(9).fill("");turn="X";finished=false;rewarded=false;draw();}
  $("#ticMode").addEventListener("change",e=>{mode=e.target.value;reset();});
  $("#ticReset").addEventListener("click",reset);
  draw();
}

function puzzleGame(){
  open(t("puzzle"),`<p class="muted" style="text-align:center">${t("orderNumbers")}</p><div class="number-grid" id="nums"></div><p id="puzzleMsg" class="muted" style="text-align:center"></p><div class="row"><button class="action" id="mix">${t("newPuzzle")}</button></div>`);
  let tiles=[1,2,3,4,5,6,7,8,0], done=false, moves=0;
  function shuffle(){
    tiles=[1,2,3,4,5,6,7,8,0];done=false;moves=0;
    for(let n=0;n<100;n++){
      const z=tiles.indexOf(0);
      const options=[z-3,z+3,...(z%3?[z-1]:[]),...(z%3<2?[z+1]:[])].filter(i=>i>=0&&i<9&&Math.abs(i%3-z%3)+Math.abs(Math.floor(i/3)-Math.floor(z/3))===1);
      const j=options[Math.floor(Math.random()*options.length)];
      [tiles[z],tiles[j]]=[tiles[j],tiles[z]];
    }
    $("#puzzleMsg").textContent="";draw();
  }
  function draw(){
    $("#nums").innerHTML=tiles.map((v,i)=>`<button class="${v?"":"empty"}" data-i="${i}" ${!v||done?"disabled":""}>${v||""}</button>`).join("");
    $$("#nums button").forEach(btn=>btn.addEventListener("click",()=>{
      if(done)return;
      const i=+btn.dataset.i,z=tiles.indexOf(0);
      if(Math.abs(i%3-z%3)+Math.abs(Math.floor(i/3)-Math.floor(z/3))!==1)return;
      [tiles[i],tiles[z]]=[tiles[z],tiles[i]];moves++;
      if(tiles.join(",")==="1,2,3,4,5,6,7,8,0"){
        done=true;$("#puzzleMsg").textContent=t("solved");reward(true,moves);
      }
      draw();
    }));
  }
  $("#mix").addEventListener("click",shuffle);shuffle();
}

function aimGame(){
  open(t("aim"),`<p class="muted" style="text-align:center">${t("tapTarget")}</p><div id="timer" class="big">15</div><button class="target" id="target" disabled></button><p id="hits" class="scoreline">${t("score")}: 0</p><div class="row"><button class="action" id="start">${t("start")}</button></div>`);
  let timer=null, remaining=15, hits=0, running=false;
  const target=$("#target"), start=$("#start");
  function finish(){
    clearInterval(timer);running=false;target.disabled=true;start.disabled=false;
    $("#hits").textContent=`${t("gameOver")} · ${t("score")}: ${hits}`;
    reward(hits>=9,hits);
  }
  start.addEventListener("click",()=>{
    if(running)return;
    clearInterval(timer);remaining=15;hits=0;running=true;target.disabled=false;start.disabled=true;
    $("#timer").textContent=remaining;$("#hits").textContent=`${t("score")}: 0`;
    timer=setInterval(()=>{remaining--;$("#timer").textContent=remaining;if(remaining<=0)finish();},1000);
  });
  target.addEventListener("click",()=>{
    if(!running)return;
    hits++;$("#hits").textContent=`${t("score")}: ${hits}`;
    target.style.transform=`translate(${Math.random()*24-12}px,${Math.random()*18-9}px)`;
  });
}

function simpleTapGame(kind){
  const isJump=kind==="jump";
  open(isJump?t("jump"):t("car"),isJump?
    `<p class="muted" style="text-align:center">${t("jumpHint")}</p><div class="big" id="tapScore">0 / 10</div><div class="row"><button class="action" id="tapBtn">${t("start")}</button></div><p id="tapMsg" class="muted" style="text-align:center"></p>`:
    `<p class="muted" style="text-align:center">${t("carHint")}</p><div class="lanes"><div class="runner" id="runner">🏎️</div><div class="obstacle" id="obstacle">🚧</div></div><p class="scoreline" id="carScore">${t("score")}: 0</p><div class="row"><button class="action" id="leftLane">${t("leftLane")}</button><button class="action" id="rightLane">${t("rightLane")}</button></div><p id="carMsg" class="muted" style="text-align:center"></p>`);
  if(isJump){
    let n=0,done=false;
    $("#tapBtn").addEventListener("click",()=>{
      if(done)return;n++;$("#tapScore").textContent=`${n} / 10`;
      if(n===10){done=true;$("#tapBtn").disabled=true;$("#tapMsg").textContent=t("completed");reward(true,n);}
    });
  }else{
    let lane=0,score=0,done=false,obstacleLane=Math.random()<.5?0:1;
    const runner=$("#runner"),obstacle=$("#obstacle");
    function position(){
      runner.style.left=lane===0?"calc(25% - 21px)":"calc(75% - 21px)";
      obstacle.style.left=obstacleLane===0?"calc(25% - 21px)":"calc(75% - 21px)";
    }
    function move(next){
      if(done)return;lane=next;
      if(lane===obstacleLane){done=true;$("#carMsg").textContent=t("hit");$("#leftLane").disabled=$("#rightLane").disabled=true;reward(false,score);return;}
      score++;$("#carScore").textContent=`${t("score")}: ${score}`;
      obstacleLane=Math.random()<.5?0:1;position();
      if(score>=10){done=true;$("#carMsg").textContent=t("completed");$("#leftLane").disabled=$("#rightLane").disabled=true;reward(true,score);}
    }
    $("#leftLane").addEventListener("click",()=>move(0));
    $("#rightLane").addEventListener("click",()=>move(1));position();
  }
}

function imageGame(){
  open(t("image"),`<div class="big">🍎</div><p class="muted" style="text-align:center">${t("appleQuestion")}</p><div class="row">${[["apple","🍎"],["ball","⚽"],["carWord","🚗"]].map(([key,emoji])=>`<button class="choice" data-answer="${key}">${emoji} ${t(key)}</button>`).join("")}</div><p id="answerMsg" class="muted" style="text-align:center"></p>`);
  let answered=false;
  $$("[data-answer]",area).forEach(btn=>btn.addEventListener("click",()=>{
    if(answered)return;answered=true;
    const correct=btn.dataset.answer==="apple";
    $("#answerMsg").textContent=correct?t("correct"):t("wrong");
    $$("[data-answer]",area).forEach(b=>b.disabled=true);
    reward(correct,correct?1:0);
  }));
}

function footballGame(){
  open(t("football"),`<div class="big">🥅</div><p class="muted" style="text-align:center">${t("chooseDirection")}</p><div class="row">${[["left","⬅"],["center","⬆"],["right","➡"]].map(([key,icon])=>`<button class="choice" data-dir="${key}">${icon} ${t(key)}</button>`).join("")}</div><p id="goal" class="muted" style="text-align:center"></p>`);
  let kicked=false;
  $$("[data-dir]",area).forEach(btn=>btn.addEventListener("click",()=>{
    if(kicked)return;kicked=true;
    const directions=["left","center","right"],keeper=directions[Math.floor(Math.random()*3)],scored=keeper!==btn.dataset.dir;
    $("#goal").textContent=scored?t("goal"):t("saved");
    $$("[data-dir]",area).forEach(b=>b.disabled=true);
    reward(scored,scored?1:0);
  }));
}

const games={tic:ticGame,puzzle:puzzleGame,aim:aimGame,car:()=>simpleTapGame("car"),jump:()=>simpleTapGame("jump"),image:imageGame,football:footballGame};
$$("[data-game]").forEach(btn=>btn.addEventListener("click",()=>games[btn.dataset.game]?.()));
$("#profileTab").addEventListener("click",()=>open(t("profileTitle"),`<div class="big">👾</div><p>${t("player")}: ${escapeHtml($("#username").textContent)}</p><p>${t("coins")}: ${data.coins}</p><p>${t("winsLabel")}: ${data.wins}</p><p>${t("xp")}: ${data.xp}</p>`));
$("#helpTab").addEventListener("click",()=>open(t("help"),`<p class="muted">${t("helpText")}</p>`));
$("#homeTab").addEventListener("click",close);
function escapeHtml(value){return String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}

applyLanguage();
save();
