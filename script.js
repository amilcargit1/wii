(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const passwordScreen = document.getElementById('password');
  const passInput = document.getElementById('passInput');
  const passBtn = document.getElementById('passBtn');
  const passError = document.getElementById('passError');
  const warp = document.getElementById('warp');
  const warpTunnel = document.getElementById('warpTunnel');
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
  const gardenSky = document.getElementById('gardenSky');
  const bouquets = document.getElementById('bouquets');
  const orbitRings = document.getElementById('orbitRings');
  const particleFlower = document.getElementById('particleFlower');
  const particleHeart = document.getElementById('particleHeart');
  const tickerWrap = document.getElementById('tickerWrap');
  const galaxyLayer = document.getElementById('galaxyLayer');

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

  const TICKER_PHRASES = [
    "Un gracias que no necesita fecha", "Contigo el día pesa menos",
    "Hoy el amarillo lleva tu nombre", "Aquí siempre tienes un lugar",
    "Este día contigo tiene otro brillo", "Gracias por ser mi sol de siempre",
    "Eres mi persona favorita", "Contigo todo se siente más bonito"
  ];

  const WORD_CLOUD_WORDS = [
    'Mi destino', 'Brillas', 'Mi sol', 'Esperanza', 'Pasión', 'Eternidad',
    'Reina', 'Libertad', 'Contigo', 'Dulzura', 'Mi cielo', 'Mi fiesta',
    'Sueños', 'Mi universo', 'Mi calma', 'Felicidad', 'Mi amor', 'Ternura'
  ];
  const WORD_COLORS = ['#f7d97a', '#fff6df', '#f6c8d8', '#bfe8f0'];

  const WISH_PHRASES = [
    "Pide un deseo 💛", "Siempre estaré para ti", "Eres mi persona favorita",
    "Gracias por existir", "Mi corazón es tuyo", "Contigo, siempre"
  ];

  const CORRECT_PASSWORD = 'mi princesa';

  function normalize(str) {
    return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  // ---------- CONTRASEÑA ----------
  const WARP_MESSAGES = ['💐', '🌻', 'Para ti', 'Con amor', 'Mi princesa 💛', '✨'];

  function checkPassword() {
    if (normalize(passInput.value) === normalize(CORRECT_PASSWORD)) {
      passwordScreen.classList.add('hidden');
      runWarp();
    } else {
      passError.classList.remove('show');
      void passError.offsetWidth;
      passError.classList.add('show');
    }
  }
  passBtn.addEventListener('click', (e) => { e.stopPropagation(); checkPassword(); });
  passInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPassword(); });

  // ---------- TÚNEL DE VELOCIDAD (transición) ----------
  function runWarp() {
    warp.classList.remove('hidden');

    if (reduced) {
      setTimeout(() => { warp.classList.add('hidden'); gift.classList.remove('hidden'); }, 300);
      return;
    }

    const streakCount = 26;
    for (let i = 0; i < streakCount; i++) {
      const s = document.createElement('div');
      s.className = 'warp-streak';
      s.style.setProperty('--ang', rand(0, 360) + 'deg');
      s.style.animationDuration = rand(0.8, 1.5) + 's';
      s.style.animationDelay = rand(0, 1.2) + 's';
      warpTunnel.appendChild(s);
    }

    const itemCount = 9;
    for (let i = 0; i < itemCount; i++) {
      const it = document.createElement('div');
      it.className = 'warp-item';
      it.textContent = WARP_MESSAGES[i % WARP_MESSAGES.length];
      const ang = rand(0, 360) * Math.PI / 180;
      const dist = rand(220, 380);
      it.style.setProperty('--fx', Math.cos(ang) * dist + 'px');
      it.style.setProperty('--fy', Math.sin(ang) * dist + 'px');
      it.style.animationDuration = rand(1.6, 2.4) + 's';
      it.style.animationDelay = rand(0, 1) + 's';
      warpTunnel.appendChild(it);
    }

    setTimeout(() => {
      warp.classList.add('hidden');
      gift.classList.remove('hidden');
      warpTunnel.innerHTML = '';
    }, 2700);
  }

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
    buildOrbitRings();
    buildParticleFlower();
    buildTicker();
    buildWordCloud();
    startShapeCycle();
    if (!reduced) { buildGarden(); buildFloatingPhrases(); buildButterflies(); buildBouquets(); buildJet(); }
    else buildGardenStatic();
    revealMessages();
    startCounter();
  });

  // ---------- LLUVIA DE ESTRELLAS (toca el cielo) ----------
  gardenSky.addEventListener('click', (e) => {
    spawnShootingStar(e.clientX, e.clientY);
  });

  function spawnShootingStar(x, y) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    document.body.appendChild(star);

    const dx = rand(-120, 120);
    const dy = rand(140, 240);
    star.style.transition = 'transform 1s ease-in, opacity 1s ease-in';
    star.style.zIndex = 40;
    requestAnimationFrame(() => {
      star.style.transform = `translate(${dx}px, ${dy}px)`;
      star.style.opacity = '0';
    });
    setTimeout(() => star.remove(), 1050);

    const wish = document.createElement('div');
    wish.className = 'wish-text';
    wish.textContent = WISH_PHRASES[Math.floor(Math.random() * WISH_PHRASES.length)];
    wish.style.left = Math.min(Math.max(x - 60, 10), window.innerWidth - 130) + 'px';
    wish.style.top = (y - 24) + 'px';
    document.body.appendChild(wish);
    requestAnimationFrame(() => wish.classList.add('show'));
    setTimeout(() => { wish.classList.remove('show'); setTimeout(() => wish.remove(), 500); }, 1600);
  }

  // ---------- RAMOS CON EFECTO ESPECIAL ----------
  function buildBouquets() {
    const radii = [110, 165, 220];
    radii.forEach((r, i) => {
      const b = document.createElement('div');
      b.className = 'bouquet orbit-item';
      b.textContent = '💐';
      b.style.setProperty('--r', r + 'px');
      const dur = 26 + i * 6;
      b.style.animationDuration = dur + 's';
      b.style.animationDelay = -rand(0, dur) + 's';
      b.addEventListener('click', (e) => { e.stopPropagation(); specialEffect(b); });
      bouquets.appendChild(b);
    });
  }

  function specialEffect(el) {
    const flash = document.createElement('div');
    flash.className = 'flash-screen';
    document.body.appendChild(flash);
    requestAnimationFrame(() => flash.classList.add('show'));
    setTimeout(() => flash.classList.remove('show'), 150);
    setTimeout(() => flash.remove(), 700);

    spawnHearts(el);
    popup.textContent = 'Este ramo es solo para ti, Yesica 💐💛';
    popup.classList.add('show');
    clearTimeout(flowerSurprise._t);
    flowerSurprise._t = setTimeout(() => popup.classList.remove('show'), 2600);
  }

  // ---------- MÚSICA SINCRONIZADA ----------
  let audioCtx, analyser, dataArray, syncing = false;
  function startMusicSync() {
    if (reduced || syncing) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const src = audioCtx.createMediaElementSource(bgMusic);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      syncing = true;
      requestAnimationFrame(pulseLoop);
    } catch (err) { /* Web Audio not available — ignore */ }
  }
  function pulseLoop() {
    if (!syncing) return;
    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const flowers = field.querySelectorAll('.flower');
    flowers.forEach((f, i) => {
      f.classList.add('beat');
      f.classList.toggle('pulse', avg > 60 && i % 2 === (Math.floor(performance.now() / 250) % 2));
    });
    requestAnimationFrame(pulseLoop);
  }

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
      p.className = 'float-phrase orbit-item';
      p.textContent = FLOAT_PHRASES[i % FLOAT_PHRASES.length];
      p.style.fontSize = rand(12, 17) + 'px';
      const radius = rand(90, 240);
      const duration = rand(22, 40);
      p.style.setProperty('--r', radius + 'px');
      p.style.animationDuration = duration + 's';
      p.style.animationDelay = -rand(0, duration) + 's';
      field.appendChild(p);
    }
  }

  function buildOrbitRings() {
    const sizes = [
      { w: 220, h: 70 }, { w: 320, h: 100 }, { w: 420, h: 130 }
    ];
    sizes.forEach(s => {
      const r = document.createElement('div');
      r.className = 'orbit-ring';
      r.style.width = s.w + 'px';
      r.style.height = s.h + 'px';
      orbitRings.appendChild(r);
    });
  }

  function buildParticleFlower() {
    const petalCount = 6;
    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.transform = `translate(-50%,-100%) rotate(${(360 / petalCount) * i}deg)`;
      particleFlower.appendChild(p);
    }
  }

  function buildTicker() {
    const rowTops = window.innerWidth < 480 ? [12, 26, 42, 58, 72] : [10, 24, 40, 56, 70, 84];
    rowTops.forEach((top, i) => {
      const row = document.createElement('div');
      row.className = 'ticker-row';
      const shuffled = [...TICKER_PHRASES].sort(() => Math.random() - 0.5);
      row.textContent = shuffled.join('   ✦   ') + '   ✦   ' + shuffled.join('   ✦   ');
      row.style.top = top + 'vh';
      row.style.animationDuration = rand(26, 42) + 's';
      row.style.animationDelay = -rand(0, 20) + 's';
      row.style.fontSize = rand(11, 13) + 'px';
      tickerWrap.appendChild(row);
    });
  }

  function startShapeCycle() {
    if (reduced) return;
    let showingFlower = true;
    setInterval(() => {
      showingFlower = !showingFlower;
      particleFlower.classList.toggle('show', showingFlower);
      particleHeart.classList.toggle('show', !showingFlower);
    }, 6000);
  }

  function buildWordCloud() {
    const wordCloud = document.getElementById('wordCloud');
    const count = window.innerWidth < 480 ? 12 : 18;
    const words = [...WORD_CLOUD_WORDS];
    for (let i = 0; i < count; i++) {
      const w = document.createElement('div');
      w.className = 'word-item';
      w.textContent = words[i % words.length];
      w.style.left = rand(2, 82) + 'vw';
      w.style.top = rand(6, 88) + 'vh';
      w.style.fontSize = rand(11, 22) + 'px';
      w.style.color = WORD_COLORS[i % WORD_COLORS.length];
      w.style.textShadow = `0 0 8px ${WORD_COLORS[i % WORD_COLORS.length]}88`;
      w.style.animationDelay = `${rand(0, 1.5)}s, ${rand(0, 4)}s`;
      w.style.animationDuration = `1.5s, ${rand(4, 7)}s`;
      wordCloud.appendChild(w);
    }
  }

  function buildJet() {
    const count = window.innerWidth < 480 ? 10 : 16;
    for (let i = 0; i < count; i++) {
      const j = document.createElement('div');
      j.className = 'jet-particle';
      j.style.left = (48 + rand(-3, 3)) + '%';
      j.style.top = '34%';
      j.style.setProperty('--jx', rand(-30, 30) + 'px');
      j.style.animationDuration = rand(3, 5.5) + 's';
      j.style.animationDelay = -rand(0, 5) + 's';
      field.appendChild(j);
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

  // ---------- ZOOM Y ARRASTRE DE LA GALAXIA ----------
  function setupGalaxyPanZoom() {
    const pointers = new Map();
    let scale = 1, tx = 0, ty = 0;
    let lastMid = null, lastDist = null, dragging = false;

    function apply() {
      galaxyLayer.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    }
    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
    function mid(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }

    galaxyLayer.addEventListener('pointerdown', (e) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      galaxyLayer.setPointerCapture(e.pointerId);
      if (pointers.size === 1) { dragging = true; lastMid = { x: e.clientX, y: e.clientY }; }
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        lastDist = dist(a, b);
        lastMid = mid(a, b);
      }
    });

    galaxyLayer.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1 && dragging) {
        const p = pointers.get(e.pointerId);
        tx += p.x - lastMid.x;
        ty += p.y - lastMid.y;
        lastMid = p;
        apply();
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const newDist = dist(a, b);
        const newMid = mid(a, b);
        if (lastDist) {
          scale = Math.min(2.4, Math.max(0.7, scale * (newDist / lastDist)));
        }
        tx += newMid.x - lastMid.x;
        ty += newMid.y - lastMid.y;
        lastDist = newDist;
        lastMid = newMid;
        apply();
      }
    });

    function release(e) {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) { dragging = false; lastDist = null; }
      else if (pointers.size === 1) {
        dragging = true;
        lastMid = [...pointers.values()][0];
        lastDist = null;
      }
    }
    galaxyLayer.addEventListener('pointerup', release);
    galaxyLayer.addEventListener('pointercancel', release);
    galaxyLayer.addEventListener('pointerleave', release);
  }
  setupGalaxyPanZoom();

  // ---------- MUSIC TOGGLE ----------
  let playing = false;
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!playing) {
      bgMusic.play().then(() => {
        playing = true;
        musicBtn.textContent = '🔊';
        startMusicSync();
      }).catch(() => {});
    } else {
      bgMusic.pause();
      playing = false;
      musicBtn.textContent = '🔇';
      syncing = false;
      field.querySelectorAll('.flower.pulse').forEach(f => f.classList.remove('pulse'));
    }
  });
})();
