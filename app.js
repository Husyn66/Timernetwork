// Year
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('year').textContent = new Date().getFullYear();
});

// --- Persistence (demo only) ---
const LS_KEY = "timer-demo-state";
const state = JSON.parse(localStorage.getItem(LS_KEY) || '{"points":0,"watch":0}');
const save = () => localStorage.setItem(LS_KEY, JSON.stringify(state));

// --- Demo watch-to-like with minimal anti-bot cadence ---
let playing = false, timer = null;
const prog = document.getElementById('demoProgress');
const pct = document.getElementById('demoPercent');
const playBtn = document.getElementById('playBtn');
const likeBtn = document.getElementById('likeBtn');

function renderWatch() {
  prog.value = state.watch;
  pct.textContent = state.watch + '%';
  likeBtn.disabled = state.watch < 100 || likeBtn.dataset.locked === "1";
  likeBtn.setAttribute('aria-disabled', likeBtn.disabled ? 'true' : 'false');
}
renderWatch();

playBtn.addEventListener('click', () => {
  if (playing) return;
  playing = true;
  playBtn.textContent = '⏸ Playing...';
  timer = setInterval(() => {
    // cadence: grow 2% every 120ms; stop at 100
    state.watch = Math.min(100, state.watch + 2);
    save(); renderWatch();
    if (state.watch >= 100) {
      clearInterval(timer); playing = false; playBtn.textContent = '▶ Replay';
    }
  }, 120);
});

// like once per full watch (locks for 10s)
likeBtn.addEventListener('click', () => {
  if (likeBtn.disabled) return;
  bump(1);
  likeBtn.dataset.locked = "1";
  likeBtn.disabled = true;
  setTimeout(() => { likeBtn.dataset.locked = "0"; renderWatch(); }, 10_000);
  alert('Like counted! +1 point');
});

// --- Points simulator ---
let pointsSpan = document.getElementById('points');
let simQnx = document.getElementById('simQnx');

function renderPoints() {
  pointsSpan.textContent = state.points;
  simQnx.textContent = (state.points * 0.1).toFixed(2);
}
function bump(v) { state.points += v; save(); renderPoints(); }
renderPoints();

document.getElementById('addLike').onclick = ()=>bump(1);
document.getElementById('addComment').onclick = ()=>bump(2);
document.getElementById('addShare').onclick = ()=>bump(3);
document.getElementById('addReferral').onclick = ()=>bump(15);
document.getElementById('resetPts').onclick = ()=>{ state.points = 0; save(); renderPoints(); };

// --- Referral generator ---
const makeRef = document.getElementById('makeRef');
const refName = document.getElementById('refName');
const refOut = document.getElementById('refOut');

makeRef.addEventListener('click', ()=>{
  const n = (refName.value||'yourname').trim().toLowerCase().replace(/[^a-z0-9_-]/g,'');
  const url = `https://timer.app/r/${n}`;
  refOut.textContent = url;
  refOut.style.display = 'inline-flex';
});
refOut.addEventListener('click', async ()=>{
  try {
    await navigator.clipboard.writeText(refOut.textContent);
    const prev = refOut.textContent;
    refOut.textContent = 'Copied!';
    setTimeout(()=>{ refOut.textContent = prev; }, 1200);
  } catch {}
});

// --- Waitlist (mock) ---
document.getElementById('joinBtn').addEventListener('click', ()=>{
  document.getElementById('thanks').style.display='block';
});

// --- PWA: register service worker (optional offline) ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
