const $=s=>document.querySelector(s), modal=$('#modal'), area=$('#gameArea');let data=JSON.parse(localStorage.glData||'{"coins":120,"xp":0,"wins":0,"played":0,"best":0}');function save(){localStorage.glData=JSON.stringify(data);$('#coins').textContent=data.coins;$('#xp').textContent=data.xp;$('#level').textContent=1+Math.floor(data.xp/100);$('#xpbar').style.width=(data.xp%100)+'%';$('#wins').textContent=data.wins;$('#played').textContent=data.played;$('#best').textContent=data.best}save();
try{let u=window.Telegram?.WebApp;u?.ready();if(u?.initDataUnsafe?.user?.first_name)$('#username').textContent=u.initDataUnsafe.user.first_name}catch(e){}
function reward(win=false,score=0){data.played++;data.xp+=10;data.coins+=win?15:3;if(win)data.wins++;data.best=Math.max(data.best,score);save()}
function open(title,html){$('#gameTitle').textContent=title;area.innerHTML=html;modal.classList.remove('hidden')}function close(){modal.classList.add('hidden')}$('#close').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});
document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>games[b.dataset.game]());
const games={

tic(){
  open('⚔️ Ultimate Tic-Tac-Toe',`
    <p class="muted" style="text-align:center">
      ۹ صفحه کوچک؛ هر حرکت مقصد حریف را مشخص می‌کند!
    </p>

    <div class="row">
      <select id="gameMode" class="action">
        <option value="two">👥 دونفره</option>
        <option value="easy">🟢 هوش مصنوعی - آسان</option>
        <option value="medium">🟡 هوش مصنوعی - متوسط</option>
        <option value="hard">🔴 هوش مصنوعی - سخت</option>
      </select>
    </div>

    <div id="ultimateInfo" class="muted"
      style="text-align:center;margin:10px 0">
      نوبت X
    </div>

    <div id="ultimate" class="ultimate-board"></div>

    <p id="ultimateMsg" class="muted"
      style="text-align:center"></p>

    <div class="row">
      <button class="action" id="ultimateAgain">
        شروع دوباره
      </button>
    </div>
  `);

  let boards=Array.from({length:9},()=>Array(9).fill(''));
  let winners=Array(9).fill('');
  let turn='X';
  let forced=null;
  let done=false;
  let mode=$('#gameMode').value;

  const lines=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const resolved=i=>winners[i]||boards[i].every(Boolean);

  function draw(){
    const root=$('#ultimate');

    root.innerHTML=boards.map((board,b)=>{
      const active=!done&&!resolved(b)&&
        (forced===null||forced===b);

      return `
        <div class="mini-board ${active?'active':''} ${winners[b]?'won':''}">
          <div style="text-align:center;font-size:11px;
            margin-bottom:4px;color:#b9a3ff">
            ${winners[b]||'صفحه '+(b+1)}
          </div>

          <div class="mini-grid">
            ${board.map((v,c)=>`
              <button class="mini-cell"
                data-b="${b}" data-c="${c}"
                ${done||resolved(b)||!active||v?'disabled':''}
                style="color:${v==='X'?'#ff9bd5':'#36e0d0'}">
                ${v}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    root.querySelectorAll('[data-b]').forEach(btn=>{
      btn.onclick=()=>move(+btn.dataset.b,+btn.dataset.c);
    });

    $('#ultimateInfo').textContent=
      done?'بازی تمام شد':'نوبت '+turn;

    if(!done){
      $('#ultimateMsg').textContent=
        forced===null
        ?'می‌توانی در هر صفحه بازی کنی.'
        :'باید در صفحه شماره '+(forced+1)+' بازی کنی.';
    }
  }

 function move(b,c,computer=false){
   if(done || (mode!=='two' && turn==='O' && !computer)) return;
    if(resolved(b))return;
    if(forced!==null&&forced!==b)return;
    if(boards[b][c])return;

    boards[b][c]=turn;

    if(check(boards[b],turn)){
      winners[b]=turn;
    }

    if(check(winners,turn)){
      done=true;
      $('#ultimateMsg').textContent=
        '🏆 بازیکن '+turn+' برنده بازی شد!';

      reward(turn==='X');
      draw();
      return;
    }

    if(boards.every((board,i)=>resolved(i))){
      done=true;
      $('#ultimateMsg').textContent='🤝 بازی مساوی شد!';
      reward();
      draw();
      return;
    }

    forced=resolved(c)?null:c;
    turn=turn==='X'?'O':'X';

    draw();

    if(mode!=='two'&&turn==='O'){
      setTimeout(computerMove,500);
    }
  }

  function computerMove(){
    if(done||turn!=='O')return;

    let choices=[];

    boards.forEach((board,b)=>{
      if(resolved(b))return;
      if(forced!==null&&forced!==b)return;

      board.forEach((v,c)=>{
        if(!v)choices.push({b,c});
      });
    });

    if(!choices.length)return;

    // سطح آسان: حرکت تصادفی
    if(mode==='easy'){
      let pick=choices[Math.floor(Math.random()*choices.length)];
     move(pick.b,pick.c,true);
      return;
    }

    // سطح متوسط و سخت
    if(mode==='medium'){
      let pick=choices.find(({b,c})=>{
        let copy=[...boards[b]];
        copy[c]='O';
        return check(copy,'O');
      });

      if(!pick){
        pick=choices.find(({b,c})=>{
          let copy=[...boards[b]];
          copy[c]='X';
          return check(copy,'X');
        });
      }

      if(!pick){
        pick=choices[Math.floor(Math.random()*choices.length)];
      }

      move(pick.b,pick.c,true);
      return;
    }

    // سطح سخت: ارزیابی وضعیت کل بازی
    function lineScore(arr,player){
      let enemy=player==='O'?'X':'O';
      let score=0;

      lines.forEach(line=>{
        let own=line.filter(i=>arr[i]===player).length;
        let other=line.filter(i=>arr[i]===enemy).length;

        if(other===0){
          if(own===2)score+=80;
          else if(own===1)score+=8;
        }

        if(own===0){
          if(other===2)score-=90;
          else if(other===1)score-=8;
        }
      });

      return score;
    }

    function isResolved(i,bs,ws){
      return ws[i]||bs[i].every(Boolean);
    }

    function evaluate(bs,ws){
      let score=lineScore(ws,'O')*12;

      bs.forEach((board,i)=>{
        if(!isResolved(i,bs,ws)){
          score+=lineScore(board,'O');
        }
      });

      return score;
    }

    let bestScore=-Infinity;
    let bestMoves=[];

    choices.forEach(({b,c})=>{
      let bs=boards.map(board=>[...board]);
      let ws=[...winners];

      bs[b][c]='O';

      if(check(bs[b],'O')){
        ws[b]='O';
      }

      let score=evaluate(bs,ws);

      // برد فوری
      if(check(ws,'O'))score+=100000;

      // ارزش بردن یک صفحه
      if(ws[b]==='O')score+=1000;

      // بررسی تهدید در صفحه مقصد
      if(!isResolved(c,bs,ws)){
        let target=bs[c];

        for(let i=0;i<9;i++){
          if(!target[i]){
            let copy=[...target];
            copy[i]='X';

            if(check(copy,'X')){
              score-=700;
              break;
            }
          }
        }
      }else{
        score-=10;
      }

      // ارزش مرکز و گوشه‌ها
      if(c===4)score+=15;
      else if([0,2,6,8].includes(c))score+=7;

      score+=Math.random()*3;

      if(score>bestScore){
        bestScore=score;
        bestMoves=[{b,c}];
      }else if(Math.abs(score-bestScore)<0.0001){
        bestMoves.push({b,c});
      }
    });

    let pick=bestMoves[Math.floor(Math.random()*bestMoves.length)];
move(pick.b,pick.c,true);
  }

  function reset(){
    boards=Array.from({length:9},()=>Array(9).fill(''));
    winners=Array(9).fill('');
    turn='X';
    forced=null;
    done=false;
    draw();
  }

  $('#gameMode').onchange=()=>{
    mode=$('#gameMode').value;
    reset();
  };

  $('#ultimateAgain').onclick=reset;

  draw();
},

puzzle(){open('🧩 پازل اعداد',`<p class="muted">اعداد را به ترتیب ۱ تا ۸ مرتب کن.</p><div class="number-grid" id="nums"></div><div class="row"><button class="action" id="mix">چیدمان جدید</button></div><p id="pmsg" class="muted"></p>`);let a=[1,2,3,4,5,6,7,8,0];function shuffle(){for(let i=0;i<80;i++){let z=a.indexOf(0),n=[z-3,z+3,...(z%3?[z-1]:[]),...(z%3<2?[z+1]:[])].filter(v=>v>=0&&v<9&&Math.abs(v%3-z%3)+Math.abs(Math.floor(v/3)-Math.floor(z/3))===1);[a[z],a[n[Math.random()*n.length|0]]]=[a[n[Math.random()*n.length|0]],a[z]]}draw()}function draw(){$('#nums').innerHTML=a.map((v,i)=>`<button class="${v?'':'empty'}" data-i="${i}">${v||''}</button>`).join('');$('#nums').querySelectorAll('button').forEach(b=>b.onclick=()=>{let i=+b.dataset.i,z=a.indexOf(0);if(Math.abs(i%3-z%3)+Math.abs((i/3|0)-(z/3|0))===1){[a[i],a[z]]=[a[z],a[i]];draw();if(a.join()==='1,2,3,4,5,6,7,8,0'){$('#pmsg').textContent='آفرین! حل شد.';reward(true)}}})}$('#mix').onclick=shuffle;shuffle()},
aim(){open('🎯 هدف‌گیری',`<p class="muted">در ۱۵ ثانیه تا می‌تونی هدف رو بزن.</p><div id="timer" class="big">۱۵</div><button class="target" id="target"></button><p id="hits" class="muted" style="text-align:center">امتیاز: ۰</p><div class="row"><button class="action" id="start">شروع</button></div>`);let t=15,h=0,iv;$('#start').onclick=()=>{clearInterval(iv);t=15;h=0;$('#hits').textContent='امتیاز: ۰';$('#target').disabled=false;iv=setInterval(()=>{t--;$('#timer').textContent=t;if(t<=0){clearInterval(iv);$('#target').disabled=true;$('#hits').textContent='پایان! امتیاز: '+h;reward(h>8,h)}},1000)};$('#target').onclick=()=>{h++;$('#hits').textContent='امتیاز: '+h}},
car(){simpleTap('🏎️ ماشین‌بازی','برای عبور از مسیر، هر بار روی دکمه بزن. ۱۰ حرکت را کامل کن.','حرکت!')},
jump(){simpleTap('🐸 پرش','با هر پرش یک امتیاز می‌گیری. به ۱۰ برس!','پرش!')},
image(){open('🖼️ حدس تصویر',`<div class="big">🍎</div><p class="muted" style="text-align:center">این تصویر چیه؟</p><div class="row">${['سیب','توپ','ماشین'].map(x=>`<button class="choice" data-a="${x}">${x}</button>`).join('')}</div><p id="ans" class="muted"></p>`);area.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{$('#ans').textContent=b.dataset.a==='سیب'?'درست گفتی!':'این بار نه؛ جواب سیب بود.';reward(b.dataset.a==='سیب')})},
football(){open('⚽ ضربه پنالتی',`<div class="big">🥅</div><p class="muted" style="text-align:center">جهت ضربه را انتخاب کن.</p><div class="row">${['چپ','وسط','راست'].map(x=>`<button class="choice" data-dir="${x}">${x}</button>`).join('')}</div><p id="goal" class="muted" style="text-align:center"></p>`);area.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>{let g=['چپ','وسط','راست'][Math.random()*3|0],win=g!==b.dataset.dir;$('#goal').textContent=win?'گل شد! ⚽':'دروازه‌بان گرفت! جهت درست: '+g;reward(win)})}
};
function check(a,p){return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(c=>c.every(i=>a[i]===p))}
function simpleTap(title,desc,label){open(title,`<p class="muted">${desc}</p><div class="big" id="score">۰ / ۱۰</div><div class="row"><button class="action" id="tap">${label}</button></div><p id="done" class="muted"></p>`);let n=0;$('#tap').onclick=()=>{n++;$('#score').textContent=n+' / ۱۰';if(n>=10){$('#tap').disabled=true;$('#done').textContent='عالی بود! مرحله کامل شد.';reward(true,n)}}}
$('#profileTab').onclick=()=>open('پروفایل',`<div class="big">👾</div><p>بازیکن: ${$('#username').textContent}</p><p>سکه: ${data.coins}</p><p>بردها: ${data.wins}</p><p>تجربه: ${data.xp}</p>`);$('#helpTab').onclick=()=>open('راهنما',`<p class="muted">یک بازی را انتخاب کن و بازی کن. امتیاز و سکه‌ها روی همین دستگاه ذخیره می‌شوند. برای همگام‌سازی بین دستگاه‌ها یا بازی آنلاین، سرور لازم است.</p>`);