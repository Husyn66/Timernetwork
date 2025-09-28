/* ===== helpers ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* Year in footer */
(() => {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

/* ===== Hero demo: watch progress + like unlock ===== */
(() => {
  const playBtn = $('#playBtn');
  const likeBtn = $('#likeBtn');
  const progress = $('#demoProgress');
  const percentEl = $('#demoPercent');

  if (!playBtn || !likeBtn || !progress || !percentEl) return;

  let timer = null;
  // Ускоренная демо-модель «2 минуты видео» -> ~2 сек
  const durationMs = 2000; 
  const stepMs = 50;

  function setProgress(p) {
    const clamped = Math.max(0, Math.min(100, p));
    progress.value = clamped;
    percentEl.textContent = clamped + '%';

    if (clamped >= 100) {
      likeBtn.disabled = false;
      likeBtn.setAttribute('aria-disabled', 'false');
      likeBtn.textContent = '👍 Like (unlocked)';
      clearInterval(timer);
      timer = null;
    }
  }

  playBtn.addEventListener('click', () => {
    if (timer) return; // уже идёт
    likeBtn.disabled = true;
    likeBtn.setAttribute('aria-disabled', 'true');
    likeBtn.textContent = '👍 Like (unlock at 100%)';
    setProgress(0);
    const step = 100 / (durationMs / stepMs);
    timer = setInterval(() => {
      setProgress(progress.value + step);
      if (progress.value >= 100) {
        clearInterval(timer);
        timer = null;
      }
    }, stepMs);
  });
})();

/* ===== Rewards demo: points and simulated QNX ===== */
(() => {
  const likeBtn = $('#addLike');
  const commentBtn = $('#addComment');
  const shareBtn = $('#addShare');
  const referralBtn = $('#addReferral');
  const resetBtn = $('#resetPts');
  const pointsEl = $('#points');
  const simQnxEl = $('#simQnx');

  if (!pointsEl || !simQnxEl) return;

  const REWARDS = { like: 1, comment: 2, share: 3, referral: 15 };
  let points = 0;

  function render() {
    pointsEl.textContent = String(points);
    // Демо-конвертация 1:1 — как в тексте
    simQnxEl.textContent = String(points);
  }

  likeBtn && likeBtn.addEventListener('click', () => { points += REWARDS.like; render(); });
  commentBtn && commentBtn.addEventListener('click', () => { points += REWARDS.comment; render(); });
  shareBtn && shareBtn.addEventListener('click', () => { points += REWARDS.share; render(); });
  referralBtn && referralBtn.addEventListener('click', () => { points += REWARDS.referral; render(); });
  resetBtn && resetBtn.addEventListener('click', () => { points = 0; render(); });

  render();
})();

/* ===== Referral link generator ===== */
(() => {
  const nameInput = $('#refName');
  const makeBtn = $('#makeRef');
  const out = $('#refOut');

  if (!nameInput || !makeBtn || !out) return;

  function makeLink(name) {
    const clean = String(name || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!clean) return '';
    return `https://timernetwork.app/r/${clean}`;
  }

  makeBtn.addEventListener('click', () => {
    const link = makeLink(nameInput.value);
    if (!link) {
      out.style.display = 'none';
      out.textContent = '';
      return;
    }
    out.textContent = link;
    out.style.display = 'inline-flex';
  });

  out.addEventListener('click', async () => {
    const text = out.textContent || '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      out.textContent = 'Copied ✅ ' + text;
      setTimeout(() => { out.textContent = text; }, 1200);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
      out.textContent = 'Copied ✅ ' + text;
      setTimeout(() => { out.textContent = text; }, 1200);
    }
  });
})();

/* ===== Waitlist form (demo) ===== */
(() => {
  const email = $('#email');
  const joinBtn = $('#joinBtn');
  const thanks = $('#thanks');

  if (!email || !joinBtn || !thanks) return;

  joinBtn.addEventListener('click', () => {
    const v = String(email.value || '').trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!ok) {
      email.focus();
      email.setAttribute('aria-invalid', 'true');
      email.style.boxShadow = '0 0 0 2px var(--danger)';
      setTimeout(() => (email.style.boxShadow = ''), 1200);
      return;
    }
    email.value = '';
    thanks.style.display = 'block';
    setTimeout(() => { thanks.style.display = 'none'; }, 2500);
  });
})();

/* ===== Service Worker registration (если есть sw.js) ===== */
(() => {
  if ('serviceWorker' in navigator) {
    // sw.js должен лежать в корне (рядом с index.html)
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
