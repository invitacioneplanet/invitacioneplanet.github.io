/* ══════════════════════════════════════════
   PÉTALOS DE FONDO
══════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, petals = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  const colors = [
    'rgba(126,200,227,.42)', 'rgba(168,224,240,.35)',
    'rgba(200,238,248,.5)',  'rgba(80,160,210,.28)'
  ];

  function mk() {
    return {
      x: Math.random() * W, y: -20,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * .7 + .35,
      vx: (Math.random() - .5) * .5,
      angle: Math.random() * Math.PI * 2,
      va: (Math.random() - .5) * .035,
      wobble: Math.random() * Math.PI * 2,
      ws: Math.random() * .035 + .008
    };
  }

  for (let i = 0; i < 40; i++) { const p = mk(); p.y = Math.random() * H; petals.push(p); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => {
      p.y += p.vy; p.x += p.vx + Math.sin(p.wobble) * .4;
      p.angle += p.va; p.wobble += p.ws;
      if (p.y > H + 20) Object.assign(p, mk());
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 1.65, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill(); ctx.restore();
    });
    if (Math.random() < .025 && petals.length < 65) petals.push(mk());
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-section, .reveal-up').forEach(el => {
  revealObserver.observe(el);
});

/* ══════════════════════════════════════════
   SECCIÓN 2 — TYPEWRITER
══════════════════════════════════════════ */
let section2Triggered = false;

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !section2Triggered) {
      section2Triggered = true;
      document.getElementById('msg-label').classList.add('visible');
      setTimeout(() => document.getElementById('msg-photo-wrap').classList.add('visible'), 500);
      startTypewriter();
    }
  });
}, { threshold: .2 }).observe(document.getElementById('message'));

function startTypewriter() {
  const text =
    'Hoy, con la gracia de Dios,\n' +
    'nuestros corazones rebosan\n' +
    'de infinita dicha…\n\n' +
    'Como por primera vez,\n' +
    'hace 15 años,\n' +
    'cuando felices te recibimos\n' +
    'en nuestros brazos…';

  const el = document.getElementById('typewriter-text');
  const cursor = document.getElementById('typewriter-cursor');
  const cap = document.getElementById('photo-caption');
  let i = 0;

  function type() {
    if (i >= text.length) {
      cursor.style.display = 'none';
      cap.classList.add('show');
      return;
    }
    const ch = text[i++];
    if (ch === '\n') el.appendChild(document.createElement('br'));
    else el.appendChild(document.createTextNode(ch));
    const delay = ch === ',' ? 240 : ch === '.' ? 300 : ch === '…' ? 420 : ch === '\n' ? 380 : 47;
    setTimeout(type, delay);
  }
  setTimeout(type, 700);
}

/* ══════════════════════════════════════════
   SECCIÓN 3 — SLIDER GALERÍA
══════════════════════════════════════════ */
const slides = [
  { src: '1.jpg',   caption: '' },
  { src: '2.jpg',   caption: '' },
  { src: '3.jpg',   caption: '' },
  { src: '4.jpg',   caption: '' },
  { src: '5.jpg',   caption: '' },
  { src: '6.jpg',   caption: '' },
  { src: '7.jpg',   caption: '' },
  { src: '8.jpg',   caption: '' },
  { src: '9.jpg',   caption: '' },
  { src: '10.jfif', caption: '' },
  { src: '11.jfif', caption: '' },
  { src: '12.jfif', caption: '' },
  { src: '13.jfif', caption: '' },
  { src: '14.jfif', caption: '' },
  { src: '15.jfif', caption: '' },
  { src: '16.jfif', caption: '' },
  { src: '17.jfif', caption: '' },
  { src: '18.jfif', caption: '' },
  { src: '19.jfif', caption: '' },
  { src: '20.jfif', caption: '' },
  { src: '21.jfif', caption: '' },
  { src: '22.jfif', caption: '' },
  { src: '23.jfif', caption: '' },
  { src: '24.jfif', caption: '' },
  { src: '25.jfif', caption: '' },
  { src: '26.jfif', caption: '' },
  { src: '27.jfif', caption: '' },
  { src: '28.jfif', caption: '' },
  { src: '29.jfif', caption: '' },
  { src: '30.jfif', caption: '' },
  { src: '31.jfif', caption: '' },
  { src: '32.jfif', caption: '' },
  { src: '33.jfif', caption: '' },
];

let current = 0;
let autoTimer = null;
let isAnimating = false;

/* ── BURST DE PARTÍCULAS ── */
function burstRosas(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const emojis = ['🌸', '🌹', '✿', '❀', '💮', '🌺'];
  const count = 14;

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (Math.PI * 2 / count) * i + (Math.random() - .5) * .5;
    const dist  = 60 + Math.random() * 70;
    const size  = 14 + Math.random() * 14;
    const dur   = 600 + Math.random() * 400;

    Object.assign(span.style, {
      position: 'fixed', left: cx + 'px', top: cy + 'px',
      fontSize: size + 'px', pointerEvents: 'none', zIndex: 9999,
      transform: 'translate(-50%,-50%) scale(1)', opacity: '1',
      transition: `transform ${dur}ms cubic-bezier(.2,.8,.4,1), opacity ${dur}ms ease`,
      willChange: 'transform, opacity',
    });
    document.body.appendChild(span);
    span.getBoundingClientRect();

    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 30;
    span.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0) rotate(${Math.random()*360}deg)`;
    span.style.opacity   = '0';
    setTimeout(() => span.remove(), dur + 50);
  }
}

/* ── BUILD SLIDER ── */
function buildSlider() {
  const track      = document.getElementById('slider-track');
  const thumbsWrap = document.getElementById('slider-thumbs');
  document.getElementById('slide-total').textContent = slides.length;

  slides.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.innerHTML = `<img src="${s.src}" alt="Foto ${i+1}" loading="lazy">
                     <div class="slide-caption">${s.caption}</div>`;
    track.appendChild(div);

    const thumb = document.createElement('div');
    thumb.className = 'thumb' + (i === 0 ? ' active' : '');
    thumb.innerHTML = `<img src="${s.src}" alt="" loading="lazy">`;
    thumb.addEventListener('click', () => { goTo(i, null); resetAuto(); });
    thumbsWrap.appendChild(thumb);
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    burstRosas(document.getElementById('btn-prev'));
    goTo(current - 1, 'left');
    resetAuto();
  });
  document.getElementById('btn-next').addEventListener('click', () => {
    burstRosas(document.getElementById('btn-next'));
    goTo(current + 1, 'right');
    resetAuto();
  });

  let tx0 = 0;
  track.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx0;
    if (Math.abs(dx) > 40) {
      const dir = dx < 0 ? 'right' : 'left';
      burstRosas(dx < 0 ? document.getElementById('btn-next') : document.getElementById('btn-prev'));
      goTo(dx < 0 ? current + 1 : current - 1, dir);
      resetAuto();
    }
  });

  startAuto();
}

/* ── NAVEGACIÓN ── */
function goTo(index, dir) {
  if (isAnimating) return;
  isAnimating = true;

  const allSlides = document.querySelectorAll('.slide');
  const allThumbs = document.querySelectorAll('.thumb');
  const total = slides.length;
  const next  = ((index % total) + total) % total;

  if (next === current) { isAnimating = false; return; }

  const goRight  = dir === 'right' || (dir === null && next > current);
  const outClass = goRight ? 'exit-left'   : 'exit-right';
  const inClass  = goRight ? 'enter-right' : 'enter-left';

  allSlides[next].classList.add(inClass, 'active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      allSlides[next].classList.remove(inClass);
      allSlides[current].classList.add(outClass);
      allThumbs[current].classList.remove('active');
      allThumbs[next].classList.add('active');
      document.getElementById('slide-current').textContent = next + 1;

      setTimeout(() => {
        allSlides[current].classList.remove('active', outClass);
        current = next;
        isAnimating = false;
      }, 550);
    });
  });
}

function startAuto() { autoTimer = setInterval(() => goTo(current + 1, 'right'), 4500); }
function resetAuto() { clearInterval(autoTimer); startAuto(); }

document.addEventListener('DOMContentLoaded', buildSlider);

/* ══════════════════════════════════════════
   SECCIÓN 4 — TEMPORIZADOR
══════════════════════════════════════════ */
function startCountdown() {
  const targetDate = new Date(2026, 6, 18, 16, 0, 0).getTime();
  let finalFired = false;

  function updateTimer() {
    const diff    = targetDate - Date.now();
    const daysEl  = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl  = document.getElementById('timer-minutes');
    const secsEl  = document.getElementById('timer-seconds');
    const section = document.getElementById('countdown');

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      if (!finalFired) {
        finalFired = true;
        clearInterval(timerInterval);
        section.classList.add('countdown-finished');
        const msg = document.createElement('div');
        msg.className = 'countdown-final-message';
        msg.innerHTML = '💙 HOY ES EL GRAN DÍA 💙';
        section.querySelector('.countdown-inner').appendChild(msg);
        setTimeout(lanzarExplosionFinal, 500);
      }
      return;
    }

    daysEl.textContent  = String(Math.floor(diff / 86400000)).padStart(2,'0');
    hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
    minsEl.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    secsEl.textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

/* ══════════════════════════════════════════
   EXPLOSIÓN FINAL DE PARTÍCULAS
══════════════════════════════════════════ */
function lanzarExplosionFinal() {
  const emojis  = ['🌸','💙','✨','🎉','🌺','⭐','💫','🎊','🌷','💐'];
  const colores = ['#7ec8e3','#a8d8ea','#c8edf8','#3a8fb5','#daf5fd','#90cfe8'];
  const total   = 80;

  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i < total; i++) {
        const useEmoji = Math.random() < .45;
        const span = document.createElement('span');
        const startX = window.innerWidth  * (.2 + Math.random() * .6);
        const startY = window.innerHeight * (.3 + Math.random() * .4);
        const angle  = Math.random() * Math.PI * 2;
        const dist   = 80 + Math.random() * 220;
        const size   = useEmoji ? 18 + Math.random() * 18 : 8 + Math.random() * 10;
        const dur    = 900 + Math.random() * 700;

        span.textContent = useEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : '●';
        Object.assign(span.style, {
          position: 'fixed', left: startX + 'px', top: startY + 'px',
          fontSize: size + 'px', color: colores[Math.floor(Math.random() * colores.length)],
          pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: '1',
          transition: `transform ${dur}ms cubic-bezier(.1,.8,.2,1), opacity ${dur*.8}ms ease ${dur*.2}ms`,
          willChange: 'transform, opacity',
        });
        document.body.appendChild(span);
        span.getBoundingClientRect();

        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 60;
        span.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0) rotate(${Math.random()*720}deg)`;
        span.style.opacity   = '0';
        setTimeout(() => span.remove(), dur + 100);
      }
    }, wave * 450);
  }
}

/* ══════════════════════════════════════════
   BOTÓN RSVP → WHATSAPP + SONIDO
══════════════════════════════════════════ */
function confirmarAsistencia(btn) {
  const sound = document.getElementById('rsvp-sound');
  if (sound) {
    sound.volume = 0.1;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
  burstRosas(btn);
  window.open("https://wa.link/mptue1", "_blank");
  setTimeout(() => {
    btn.textContent = '¡Gracias por confirmar! 💙';
    btn.disabled = true;
    setTimeout(lanzarExplosionFinal, 200);
  }, 300);
}

startCountdown();

/* ══════════════════════════════════════════
   MÚSICA — COMPATIBLE CON ANDROID & iOS
══════════════════════════════════════════ */
(function () {
  const music = document.getElementById('bg-music');
  music.volume = 0.25;

  /* ── Botón flotante de música ── */
  const btn = document.createElement('button');
  btn.id = 'music-fab';
  btn.setAttribute('aria-label', 'Reproducir música');
  btn.innerHTML = '♪';
  Object.assign(btn.style, {
    position:       'fixed',
    bottom:         '24px',
    right:          '24px',
    zIndex:         '9999',
    width:          '52px',
    height:         '52px',
    borderRadius:   '50%',
    border:         '2px solid rgba(255,255,255,0.7)',
    background:     'rgba(126,200,227,0.85)',
    color:          '#fff',
    fontSize:       '22px',
    cursor:         'pointer',
    boxShadow:      '0 4px 16px rgba(0,0,0,0.18)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)',
    transition:     'transform .2s, background .2s',
  });
  document.body.appendChild(btn);

  let playing = false;

  function tocarMusica() {
    music.muted = false;
    music.volume = 0.25;
    const p = music.play();
    if (p !== undefined) {
      p.then(() => {
        playing = true;
        btn.innerHTML = '♫';
        btn.style.background = 'rgba(80,160,210,0.90)';
        /* animación de pulso mientras suena */
        btn.style.animation = 'musicPulse 1.8s ease-in-out infinite';
      }).catch(() => {
        /* si aún falla, el botón permanece visible para reintentar */
      });
    }
  }

  function pausarMusica() {
    music.pause();
    playing = false;
    btn.innerHTML = '♪';
    btn.style.background = 'rgba(126,200,227,0.85)';
    btn.style.animation = 'none';
  }

  /* Alternar al pulsar el botón flotante */
  btn.addEventListener('click', e => {
    e.stopPropagation();
    playing ? pausarMusica() : tocarMusica();
  });

  /* Intentar autoplay al cargar (funciona en iOS con atributos correctos,
     y en algunos Android; si falla el botón ya está visible) */
  window.addEventListener('load', () => {
    music.muted = true;            /* muted permite autoplay en más navegadores */
    const p = music.play();
    if (p !== undefined) {
      p.then(() => {
        /* Autoplay ok → desmutear suavemente */
        music.muted = false;
        playing = true;
        btn.innerHTML = '♫';
        btn.style.background = 'rgba(80,160,210,0.90)';
        btn.style.animation = 'musicPulse 1.8s ease-in-out infinite';
      }).catch(() => {
        /* Autoplay bloqueado → el botón flotante guía al usuario */
        music.muted = false;
      });
    }
  });

  /* Primera interacción del usuario (scroll, toque) activa el audio
     si todavía no está sonando */
  function primeraInteraccion() {
    if (!playing) tocarMusica();
    document.removeEventListener('touchstart', primeraInteraccion);
    document.removeEventListener('scroll',     primeraInteraccion);
  }
  document.addEventListener('touchstart', primeraInteraccion, { once: true });
  document.addEventListener('scroll',     primeraInteraccion, { once: true });

  /* Inyectar keyframes del pulso */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes musicPulse {
      0%,100% { transform: scale(1);    box-shadow: 0 4px 16px rgba(0,0,0,.18); }
      50%      { transform: scale(1.12); box-shadow: 0 6px 22px rgba(80,160,210,.5); }
    }
    #music-fab:hover { transform: scale(1.08); }
  `;
  document.head.appendChild(style);
})();