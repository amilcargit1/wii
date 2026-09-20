(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const gift = document.getElementById('gift');
  const intro = document.getElementById('intro');
  const garden = document.getElementById('garden');
  const envelope = document.getElementById('envelope');
  const startBtn = document.getElementById('startBtn');
  const nameTitle = document.getElementById('nameTitle');
  const field = document.getElementById('field');
  const messageBox = document.getElementById('messageBox');
  const counterBox = document.getElementById('counterBox');
  const counterValue = document.getElementById('counterValue');
  const popup = document.getElementById('popup');
  const musicBtn = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const letterBtn = document.getElementById('letterBtn');
  const letterOverlay = document.getElementById('letterOverlay');
  const letterClose = document.getElementById('letterClose');
  const letterText = document.getElementById('letterText');

  const START_DATE = new Date(2024, 4, 14, 0, 0, 0); // 14/05/2024

  const PHRASES = [
    "Mi lugar favorito siempre será a tu lado. 💛",
    "Tu sonrisa hace bonito cualquier día.",
    "Si pudiera elegir otra vez, volvería a elegirte.",
    "Para mi princesa, con todo mi corazón. 🌻",
    "Contigo todo se siente un poquito más bonito.",
    "Eres la razón de mis mejores sonrisas. ✨",
    "Cada flor de este jardín te pertenece. 💛"
  ];

  const FLOAT_PHRASES = [
    'Siempre brillas', 'Mi flor favorita', 'Solo para ti', 'Luz en mi vida',
    'Un detalle amarillo', 'Eres luz', 'Flores para ti', 'Feliz de tenerte'
  ];

  const LETTER_TEXT = `Yesica,

Desde el 14 de mayo de 2024 mi vida tiene un color distinto, uno amarillo,
cálido, como estas flores.

Quiero que sepas que cada día contigo ha sido un regalo, y que armé este
pequeño jardín para recordarte lo mucho que significas para mí.

Gracias por elegirme, por quedarte, por tu risa y por todos los días que
aún nos faltan por vivir juntos.

Te quiero, mi princesa. 💛`;

  function rand(min, max) { return Math.random() * (max - min) + min; }

  // ---------- MODO REGALO -> INTRO ----------
  envelope.addEventListener('click', openGift);
  gift.addEventListener('click', openGift);
  function openGift() {
    gift.classList.add('hidden');
    intro.classList.remove('hidden');
    animateName();
  }

  function animateName() {
    const word = 'YESICA';
    nameTitle.innerHTML = '';
    [...word].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      span.style.animationDelay = (i * 0.12) + 's';
      nameTitle.appendChild(span);
      if (!reduced) {
        setTimeout(() => spawnNameSpark(span), i * 120);
      }
    });
  }

  function spawnNameSpark(span) {
    const rect = span.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
      const s = document.createElement('div');
      s.style.position = 'fixed';
      s.style.left = (rect.left + rect.width / 2) + 'px';
      s.style.top = (rect.top + rect.height / 2) + 'px';
      s.style.width = '3px';
      s.style.height = '3px';
      s.style.borderRadius = '50%';
      s.style.background = 'var(--gold-soft)';
      s.style.boxShadow = '0 0 6px 2px rgba(244,197,66,.8)';
      s.style.zIndex = 30;
      s.style.pointerEvents = 'none';
      s.style.transition = 'transform .7s ease, opacity .7s ease';
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(${rand(-25, 25)}px, ${rand(-25, 25)}px)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 750);
    }
  }

  // ---------- INTRO -> GARDEN ----------
  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    intro.classList.add('hidden');
    garden.classList.remove('hidden');
    if (!reduced) { buildGarden(); buildFloatingPhrases(); buildButterflies(); }
    else buildGardenStatic();
    revealMessages();
    startCounter();
  });

  // ---------- BUILD SCENE ----------
  function buildGarden() {
    const flowerEmojis = ['🌻', '🌼'];
    const count = window.innerWidth < 480 ? 14 : 20;

    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'flower';
      const depth = Math.random();
      const size = 26 + depth * 34;
      const left = rand(2, 94);
      const stemH = 40 + depth * 70;
      const delay = rand(0, 1.6);
      const windDur = rand(3.5, 6);

      f.style.left = left + 'vw';
      f.style.fontSize = size + 'px';
      f.style.zIndex = Math.round(depth * 10);
      f.style.opacity = 0.55 + depth * 0.45;
      f.style.animationDelay = `${delay}s, ${rand(0, 2)}s`;
      f.style.animationDuration = `1.4s, ${windDur}s`;

      f.innerHTML = `<span class="bloom" style="animation-delay:${rand(0,3)}s">${flowerEmojis[i % 2]}</span><div class="stem" style="height:${stemH}px"></div>`;
      f.addEventListener('click', () => flowerSurprise(f));
      field.appendChild(f);
    }

    const petalCount = window.innerWidth < 480 ? 10 : 16;
    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = '🌼';
      p.style.left = rand(0, 100) + 'vw';
      p.style.fontSize = rand(10, 18) + 'px';
      p.style.setProperty('--drift', rand(-40, 40) + 'px');
      p.style.animationDuration = rand(8, 16) + 's';
      p.style.animationDelay = rand(0, 10) + 's';
      field.appendChild(p);
    }

    const sparkCount = window.innerWidth < 480 ? 12 : 18;
    for (let i = 0; i < sparkCount; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.style.left = rand(0, 100) + 'vw';
      s.style.bottom = rand(0, 20) + 'vh';
      s.style.animationDuration = rand(5, 10) + 's';
      s.style.animationDelay = rand(0, 6) + 's';
      field.appendChild(s);
    }
  }

  function buildGardenStatic() {
    const flowerEmojis = ['🌻', '🌼'];
    for (let i = 0; i < 10; i++) {
      const f = document.createElement('div');
      f.className = 'flower';
      f.style.left = rand(4, 90) + 'vw';
      f.style.fontSize = '38px';
      f.style.opacity = 1;
      f.innerHTML = `<span class="bloom">${flowerEmojis[i % 2]}</span><div class="stem" style="height:60px"></div>`;
      f.addEventListener('click', () => flowerSurprise(f));
      field.appendChild(f);
    }
  }

  function buildFloatingPhrases() {
    const count = window.innerWidth < 480 ? 6 : 9;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'float-phrase';
      p.textContent = FLOAT_PHRASES[i % FLOAT_PHRASES.length];
      p.style.left = rand(4, 88) + 'vw';
      p.style.top = rand(8, 62) + 'vh';
      p.style.fontSize = rand(13, 19) + 'px';
      p.style.animationDuration = rand(9, 15) + 's';
      p.style.animationDelay = rand(0, 8) + 's';
      field.appendChild(p);
    }
  }

  function buildButterflies() {
    const count = window.innerWidth < 480 ? 3 : 5;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'butterfly';
      b.innerHTML = '<span>🦋</span>';
      b.style.left = rand(8, 85) + 'vw';
      b.style.top = rand(10, 55) + 'vh';
      b.style.fontSize = rand(16, 24) + 'px';
      b.style.setProperty('--dx1', rand(30, 60) + 'px');
      b.style.setProperty('--dy1', -rand(20, 45) + 'px');
      b.style.setProperty('--dx2', -rand(20, 40) + 'px');
      b.style.setProperty('--dy2', -rand(40, 70) + 'px');
      b.style.setProperty('--dx3', rand(20, 45) + 'px');
      b.style.setProperty('--dy3', -rand(10, 30) + 'px');
      b.style.animationDuration = rand(10, 16) + 's';
      b.style.animationDelay = rand(0, 5) + 's';
      field.appendChild(b);
    }
  }

  // ---------- MESSAGE SEQUENCE ----------
  function revealMessages() {
    const lines = [
      { el: '.line1', text: 'YESICA 💛' },
      { el: '.line2', text: 'Estas flores son para ti...' },
      { el: '.line3', text: 'Porque entre millones de personas, mi corazón tuvo la suerte de encontrarte.' },
      { el: '.line4', text: 'Te quiero, mi princesa. 💛' }
    ];
    lines.forEach((line, i) => {
      const el = messageBox.querySelector(line.el);
      el.textContent = line.text;
      setTimeout(() => el.classList.add('show'), 1800 + i * 1400);
    });
    setTimeout(() => counterBox.classList.add('show'), 1800 + lines.length * 1400 + 600);
  }

  // ---------- CONTADOR DE TIEMPO JUNTOS ----------
  function startCounter() {
    updateCounter();
    setInterval(updateCounter, 1000);
  }
  function updateCounter() {
    const now = new Date();
    let diffMs = now - START_DATE;
    if (diffMs < 0) diffMs = 0;
    const days = Math.floor(diffMs / 86400000);
    const hours = Math.floor((diffMs % 86400000) / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    const secs = Math.floor((diffMs % 60000) / 1000);
    counterValue.textContent = `${days} días, ${hours}h ${mins}m ${secs}s`;
  }

  // ---------- FLOWER CLICK SURPRISE ----------
  function flowerSurprise(f) {
    f.classList.add('flash');
    setTimeout(() => f.classList.remove('flash'), 600);
    if (!reduced) spawnHearts(f);
    const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    popup.textContent = phrase;
    popup.classList.add('show');
    clearTimeout(flowerSurprise._t);
    flowerSurprise._t = setTimeout(() => popup.classList.remove('show'), 2600);
  }

  function spawnHearts(f) {
    const rect = f.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const h = document.createElement('div');
      h.textContent = '💛';
      h.style.position = 'fixed';
      h.style.left = (rect.left + rect.width / 2 + rand(-15, 15)) + 'px';
      h.style.top = rect.top + 'px';
      h.style.fontSize = rand(12, 18) + 'px';
      h.style.pointerEvents = 'none';
      h.style.zIndex = 50;
      h.style.transition = 'transform 1.4s ease, opacity 1.4s ease';
      document.body.appendChild(h);
      requestAnimationFrame(() => {
        h.style.transform = `translateY(-${rand(60, 110)}px) translateX(${rand(-30, 30)}px)`;
        h.style.opacity = '0';
      });
      setTimeout(() => h.remove(), 1500);
    }
  }

  // ---------- CARTA ----------
  letterText.textContent = LETTER_TEXT;
  letterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    letterOverlay.classList.add('show');
  });
  letterClose.addEventListener('click', (e) => {
    e.stopPropagation();
    letterOverlay.classList.remove('show');
  });
  letterOverlay.addEventListener('click', (e) => {
    if (e.target === letterOverlay) letterOverlay.classList.remove('show');
  });

  // ---------- MUSIC TOGGLE ----------
  let playing = false;
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!playing) {
      bgMusic.play().then(() => {
        playing = true;
        musicBtn.textContent = '🔊';
      }).catch(() => {});
    } else {
      bgMusic.pause();
      playing = false;
      musicBtn.textContent = '🔇';
    }
  });
})();
