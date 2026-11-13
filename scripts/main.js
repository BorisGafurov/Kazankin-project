/**
 * KAZANKIN VIDEO EDIT & SMM — Master Script
 * 1. Discrete Fullpage Swipe & Section-by-Section Lock Controller (0: Hero, 1: Works, 2: Stages, 3: Reviews, 4: Contact)
 * 2. Works Showcase Slider with Animations & RDR2 Accents
 * 3. Interactive Accordion for Stages
 * 4. 100% Bilingual (RU / EN) Localization
 * 5. Touch & Keyboard Event Handlers
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. I18N DICTIONARIES (RU / EN)
  // ========================================================================
  const translations = {
    ru: {
      "header.subtitle": "ВИДЕОМОНТАЖ & SMM",
      "nav.hero": "Главная",
      "nav.works": "Работа",
      "nav.stages": "Этапы",
      "nav.reviews": "Отзывы",
      "nav.contact": "Связаться",
      
      "hero.category": "МОНТАЖ / ЗВУК / ЦВЕТ / ГРАФИКА",
      "hero.titleLine1": "ВАШИ КАДРЫ.",
      "hero.titleLine2": "ЦЕЛЬНАЯ ИСТОРИЯ.",
      "hero.description": "От отснятого материала до готового видео.<br>Помогу подготовиться к съёмке, соберу монтаж и доведу детали.",
      "hero.btnWorks": "Смотреть работы ↗",
      "hero.btnContact": "Обсудить проект →",
      "hero.tagline": "ВЫ СНИМАЕТЕ. Я СОБИРАЮ ИСТОРИЮ.",
      "hero.nextLink": "ДАЛЬШЕ — РАБОТЫ ↓",

      "works.overline": "01 / ВИЗУАЛЬНЫЕ РАБОТЫ",
      "works.title": "СНАЧАЛА — ВПЕЧАТЛЕНИЕ.",
      "works.description": "Интерактивный слайдер кейсов видеомонтажа, обложек и SMM-форматов.",
      "works.badge": "★ ВЫБРАНО",
      "works.item1.posterTitle": "ИСКУПЛЕНИЕ",
      "works.item1.posterCaption": "акт блага и процесс исправления",
      "works.item1.title": "Искупление",
      "works.item1.category": "Кинематографичный постер / типографика",
      "works.item2.posterTitle": "МОСКВА",
      "works.item2.posterCaption": "система, требующая навыка",
      "works.item2.title": "Москва",
      "works.item2.category": "Урбанистика / динамичный SMM",
      "works.item3.posterTitle": "ЛИБИДО",
      "works.item3.posterCaption": "сексуальное влечение",
      "works.item3.title": "Либидо",
      "works.item3.category": "Эмоциональный нарратив / саунд-дизайн",
      "works.item4.posterTitle": "БИЗНЕС-ШОУ",
      "works.item4.posterCaption": "YouTube проект с удержанием 70%",
      "works.item4.title": "Архитектура Бизнеса",
      "works.item4.category": "YouTube монтаж под ключ",
      "works.item5.posterTitle": "МЕГАПОЛИС 24",
      "works.item5.posterCaption": "коммерческий промо-ролик",
      "works.item5.title": "Промо-кампания",
      "works.item5.category": "Цветокоррекция & VFX",

      "stages.overline": "02 / ЭТАПЫ РАБОТЫ",
      "stages.title": "ГДЕ Я МОГУ ВАМ ПОМОЧЬ",
      "stages.calloutTitle": "Съёмка — на вашей стороне.",
      "stages.calloutText": "С подготовкой материалов помогу. Нажмите на этап для деталей.",
      "stages.badgeAgree": "💭 По договорённости",
      "stages.badgeHelp": "🤝 Помогаю",
      "stages.badgeNone": "— Не выполняю",
      "stages.badgeSelf": "✓ Беру на себя",

      "stages.s1.title": "Задача и идея",
      "stages.s1.text": "Определим аудиторию, целевое действие и формат ролика.",
      "stages.s1.detail": "Бриф, анализ конкурентов, выбор визуального референса и тайминга.",
      "stages.s2.title": "Сценарий и структура",
      "stages.s2.text": "Разработка покадрового плана и текста под вашу задачу.",
      "stages.s2.detail": "Покадровый план, сценарий диктора, расстановка хуков внимания.",
      "stages.s3.title": "Подготовка к съёмке",
      "stages.s3.text": "Подскажу ракурсы, освещение и правила чистоты дублей.",
      "stages.s3.detail": "Технические требования к оборудованию, звуку и композиции кадра.",
      "stages.s4.title": "Съёмка",
      "stages.s4.text": "Снимаете вы или ваш оператор, исходники передаёте мне.",
      "stages.s4.detail": "Приём сырых файлов через облачные хранилища без сжатия.",
      "stages.s5.title": "Разбор материала",
      "stages.s5.text": "Отберу лучшие дубли, вычищу брак, синхронизирую мультикамеру.",
      "stages.s5.detail": "Каталогизация видео, таймкоды ключевых моментов, отбор b-roll.",
      "stages.s6.title": "Монтаж",
      "stages.s6.text": "Соберу историю, выстрою ритм, уберу лишнее, усилю динамику.",
      "stages.s6.detail": "Динамическая склейка, удержание ритма повествования, J- и L-cut.",
      "stages.s7.title": "Звук и музыка",
      "stages.s7.text": "Очищу речь, подберу лицензионный трек и звуковые эффекты (SFX).",
      "stages.s7.detail": "Шумоподавление, компрессия голоса, лицензионные саундтреки, саунд-дизайн.",
      "stages.s8.title": "Цвет",
      "stages.s8.text": "Скорректирую яркость, баланс и киношный Color Grading.",
      "stages.s8.detail": "Баланс белого, экспозиция и стилизованный киногрейдинг.",
      "stages.s9.title": "Графика и субтитры",
      "stages.s9.text": "Титры, динамические субтитры для Reels/Shorts и акценты.",
      "stages.s9.detail": "Анимированные плашки, динамические субтитры, графические указатели.",
      "stages.s10.title": "Подготовка к публикации",
      "stages.s10.text": "Форматы для YouTube, Reels, VK Видео. Помощь с размещением.",
      "stages.s10.detail": "Рендер в максимальном битрейте, адаптация пропорций (16:9, 9:16, 1:1).",

      "reviews.overline": "03 / ОТЗЫВЫ И ДОВЕРИЕ",
      "reviews.title": "ЧТО ГОВОРЯТ О РАБОТЕ",
      "reviews.description": "Честные отзывы авторов каналов, продюсеров и брендов.",
      "reviews.metric1": "Средняя оценка клиентов",
      "reviews.metric2": "Завершённых проектов",
      "reviews.metric3": "Соблюдение дедлайнов",
      "reviews.r1.name": "Александр Морозов",
      "reviews.r1.project": "YouTube-канал «Архитектура Бизнеса»",
      "reviews.r1.text": "«Дмитрий полностью пересобрал динамику наших роликов. Удержание аудитории выросло на 40% уже после первого месяца сотрудничества. Всегда сдает материал точно в срок.»",
      "reviews.r2.name": "Елена Власова",
      "reviews.r2.project": "Reels & SMM продюсирование",
      "reviews.r2.text": "«Отличный саунд-дизайн и чувство ритма. Короткие видео выглядят дорого и кинематографично. Рекомендую как надёжного специалиста по монтажу под ключ.»",
      "reviews.r3.name": "Михаил Рогов",
      "reviews.r3.project": "Серия промо-роликов бренда",
      "reviews.r3.text": "«Понравилось внимание к деталям и цветокоррекции. Из разнородного съёмочного материала получился цельный фильм с яркой историей.»",

      "contact.overline": "04 / НАЧНЁМ С ЗАДАЧИ",
      "contact.title": "ЕСТЬ МАТЕРИАЛ?<br>ЕСТЬ ИДЕЯ?",
      "contact.text": "Расскажите, какое видео хотите получить, что уже готово и когда нужен результат.",
      "contact.btn": "Связаться со мной ↗",
      "footer.geo": "Саратов · удалённо"
    },
    en: {
      "header.subtitle": "VIDEO EDITING & SMM",
      "nav.hero": "Home",
      "nav.works": "Works",
      "nav.stages": "Stages",
      "nav.reviews": "Reviews",
      "nav.contact": "Contact",
      
      "hero.category": "EDITING / SOUND / COLOR / GRAPHICS",
      "hero.titleLine1": "YOUR FOOTAGE.",
      "hero.titleLine2": "A COHESIVE STORY.",
      "hero.description": "From raw footage to finished video.<br>I will help prepare for shooting, craft the edit and polish every detail.",
      "hero.btnWorks": "View Works ↗",
      "hero.btnContact": "Discuss Project →",
      "hero.tagline": "YOU SHOOT. I ASSEMBLE THE STORY.",
      "hero.nextLink": "SCROLL TO WORKS ↓",

      "works.overline": "01 / VISUAL WORKS",
      "works.title": "IMPRESSION FIRST.",
      "works.description": "Interactive showcase slider of video editing cases, covers and SMM formats.",
      "works.badge": "★ SELECTED",
      "works.item1.posterTitle": "REDEMPTION",
      "works.item1.posterCaption": "an act of good and process of correction",
      "works.item1.title": "Redemption",
      "works.item1.category": "Cinematic poster / typography",
      "works.item2.posterTitle": "MOSCOW",
      "works.item2.posterCaption": "a system requiring high skill",
      "works.item2.title": "Moscow",
      "works.item2.category": "Urban pacing / dynamic SMM",
      "works.item3.posterTitle": "LIBIDO",
      "works.item3.posterCaption": "sensual and emotional pull",
      "works.item3.title": "Libido",
      "works.item3.category": "Emotional narrative / sound design",
      "works.item4.posterTitle": "BUSINESS SHOW",
      "works.item4.posterCaption": "YouTube production with 70% retention",
      "works.item4.title": "Business Architecture",
      "works.item4.category": "Turnkey YouTube editing",
      "works.item5.posterTitle": "METROPOLIS 24",
      "works.item5.posterCaption": "commercial brand promo",
      "works.item5.title": "Brand Campaign",
      "works.item5.category": "Color Grading & VFX",

      "stages.overline": "02 / WORK PROCESS",
      "stages.title": "WHERE I CAN HELP YOU",
      "stages.calloutTitle": "Shooting is on your side.",
      "stages.calloutText": "I will assist with material preparation. Tap on any stage for details.",
      "stages.badgeAgree": "💭 Negotiable",
      "stages.badgeHelp": "🤝 I Assist",
      "stages.badgeNone": "— Not provided",
      "stages.badgeSelf": "✓ Handled by me",

      "stages.s1.title": "Task & Concept",
      "stages.s1.text": "Define target audience, CTA and video format.",
      "stages.s1.detail": "Detailed brief, competitor audience analysis, visual reference selection and timing.",
      "stages.s2.title": "Script & Structure",
      "stages.s2.text": "Develop shot list and script copy aligned with your goal.",
      "stages.s2.detail": "Shot list, voiceover script, placement of hooks and psychological triggers.",
      "stages.s3.title": "Pre-shoot Prep",
      "stages.s3.text": "Advise on camera angles, lighting and clean takes.",
      "stages.s3.detail": "Technical guidelines for camera angles, lighting, clean audio and organized takes.",
      "stages.s4.title": "Shooting",
      "stages.s4.text": "Filming is done by you or your operator, raw files sent to me.",
      "stages.s4.detail": "I receive raw files via cloud storage without quality loss.",
      "stages.s5.title": "Footage Sorting",
      "stages.s5.text": "Review all takes, select best fragments and sync multicam.",
      "stages.s5.detail": "Video cataloging, b-roll sorting, timecodes of key moments and multicam sync.",
      "stages.s6.title": "Video Editing",
      "stages.s6.text": "Assemble story, establish rhythm, cut dead air, boost dynamics.",
      "stages.s6.detail": "Dynamic cuts, narrative pacing, J- & L-cut transitions, emotional beats.",
      "stages.s7.title": "Audio & Music",
      "stages.s7.text": "Clean up dialogue, select licensed soundtrack and punchy SFX.",
      "stages.s7.detail": "Noise reduction, vocal compression, licensed music tracks and SFX punch.",
      "stages.s8.title": "Color Grading",
      "stages.s8.text": "Adjust exposure, color balance and apply cinematic film look.",
      "stages.s8.detail": "Primary color correction and creative film look grading.",
      "stages.s9.title": "Graphics & Subtitles",
      "stages.s9.text": "Add lower thirds, dynamic subtitles for Reels/Shorts and accents.",
      "stages.s9.detail": "Animated title cards, dynamic subtitles for Reels/Shorts, visual cues.",
      "stages.s10.title": "Delivery & Formats",
      "stages.s10.text": "Export for YouTube, Reels, VK. Assistance with publishing.",
      "stages.s10.detail": "Export at maximum bitrate, aspect ratio adaptations (16:9, 9:16, 1:1).",

      "reviews.overline": "03 / REVIEWS & TRUST",
      "reviews.title": "WHAT CLIENTS SAY",
      "reviews.description": "Honest feedback from creators, producers and commercial brands.",
      "reviews.metric1": "Average Client Rating",
      "reviews.metric2": "Completed Projects",
      "reviews.metric3": "On-Time Delivery",
      "reviews.r1.name": "Alexander Morozov",
      "reviews.r1.project": "YouTube Channel «Business Architecture»",
      "reviews.r1.text": "«Dmitry completely revamped our video pacing. Audience retention jumped by 40% in the very first month. Always delivers on schedule.»",
      "reviews.r2.name": "Elena Vlasova",
      "reviews.r2.project": "Reels & SMM Production",
      "reviews.r2.text": "«Superb sound design and rhythmic sense. Short-form videos look expensive and cinematic. Highly recommend for turnkey editing.»",
      "reviews.r3.name": "Mikhail Rogov",
      "reviews.r3.project": "Brand Promo Campaign",
      "reviews.r3.text": "«Loved the attention to details and color matching. From fragmented raw takes, he built a cohesive film with a compelling story.»",

      "contact.overline": "04 / START WITH A BRIEF",
      "contact.title": "HAVE FOOTAGE?<br>HAVE AN IDEA?",
      "contact.text": "Tell me what kind of video you want, what is ready and when you need results.",
      "contact.btn": "Get in touch ↗",
      "footer.geo": "Saratov · Remote Worldwide"
    }
  };

  // ========================================================================
  // RDR2 SAND / DUST PARTICLE & AUDIO ENGINE FOR LANGUAGE SWITCHING
  // ========================================================================
  let currentLang = 'ru';
  let isSwitchingLang = false;
  let audioCtx = null;

  function playDesertWindSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const sampleRate = audioCtx.sampleRate;
      const duration = 0.75;
      const bufferSize = Math.floor(sampleRate * duration);
      const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered natural pink/brown noise envelope
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.1614000;
        b2 = 0.87000 * b2 + white * 0.2227000;
        const pink = b0 + b1 + b2 + white * 0.5362;
        const progress = i / bufferSize;
        const env = Math.sin(progress * Math.PI); // Smooth rise & fall
        data[i] = pink * 0.12 * env;
      }

      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = buffer;

      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.value = 2.4;
      bandpass.frequency.setValueAtTime(850, audioCtx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(240, audioCtx.currentTime + 0.7);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.72);

      noiseSource.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(audioCtx.destination);

      noiseSource.start();
    } catch (_) {}
  }

  // Canvas Sand Particles
  const sandCanvas = document.getElementById('sandCanvas');
  const sandCtx = sandCanvas ? sandCanvas.getContext('2d') : null;
  let sandParticles = [];
  let sandAnimId = null;

  function resizeSandCanvas() {
    if (!sandCanvas) return;
    sandCanvas.width = window.innerWidth;
    sandCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeSandCanvas);
  resizeSandCanvas();

  const SAND_PALETTE = ['#E6C280', '#D4A373', '#FAF0CA', '#C8BDB0', '#B58A63', '#8C7355', '#D17A42', '#C91D24'];

  function spawnSandFromElement(el) {
    if (!sandCanvas || !sandCtx) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    // Density of sand particles based on text bounding box
    const area = rect.width * rect.height;
    const count = Math.min(60, Math.max(12, Math.floor(area / 160)));

    for (let i = 0; i < count; i++) {
      const px = rect.left + Math.random() * rect.width;
      const py = rect.top + Math.random() * rect.height;
      sandParticles.push({
        x: px,
        y: py,
        vx: (Math.random() * 3.6 + 1.2), // wind blowing to the right
        vy: (Math.random() * 2.4 - 0.6), // slight vertical dispersion + gravity
        size: Math.random() * 2.4 + 0.8,
        color: SAND_PALETTE[Math.floor(Math.random() * SAND_PALETTE.length)],
        alpha: Math.random() * 0.4 + 0.6,
        life: 1.0,
        decay: Math.random() * 0.018 + 0.016
      });
    }
  }

  function startSandAnimation() {
    if (!sandCtx) return;
    if (sandAnimId) cancelAnimationFrame(sandAnimId);

    function step() {
      sandCtx.clearRect(0, 0, sandCanvas.width, sandCanvas.height);

      for (let i = sandParticles.length - 1; i >= 0; i--) {
        const p = sandParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985; // air resistance
        p.vy += 0.045; // sand gravity
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          sandParticles.splice(i, 1);
          continue;
        }

        sandCtx.save();
        sandCtx.globalAlpha = p.alpha;
        sandCtx.fillStyle = p.color;
        sandCtx.shadowColor = p.color;
        sandCtx.shadowBlur = 3;
        sandCtx.beginPath();
        sandCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        sandCtx.fill();
        sandCtx.restore();
      }

      if (sandParticles.length > 0) {
        sandAnimId = requestAnimationFrame(step);
      } else {
        sandCtx.clearRect(0, 0, sandCanvas.width, sandCanvas.height);
        sandAnimId = null;
      }
    }

    step();
  }

  function applyLanguageInstant(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }

  function switchLanguage(newLang) {
    if (newLang === currentLang || isSwitchingLang) return;
    isSwitchingLang = true;
    currentLang = newLang;
    document.documentElement.lang = newLang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === newLang);
    });

    try {
      localStorage.setItem('kazankin_lang', newLang);
    } catch (_) {}

    // 1. Play desert wind gust audio
    playDesertWindSound();

    // 2. Identify visible elements vs off-screen elements
    const visibleElements = [];
    const allI18n = document.querySelectorAll('[data-i18n]');

    allI18n.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
      if (isVisible) {
        visibleElements.push(el);
        spawnSandFromElement(el);
        el.classList.remove('sand-reforming');
        el.classList.add('sand-dissolving');
      } else {
        // Off-screen: update content quietly
        const key = el.getAttribute('data-i18n');
        if (translations[newLang] && translations[newLang][key]) {
          el.innerHTML = translations[newLang][key];
        }
      }
    });

    // 3. Launch particle engine on canvas
    startSandAnimation();

    // 4. Mid-point: swap text as words crumble into dust, then reform
    setTimeout(() => {
      visibleElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[newLang] && translations[newLang][key]) {
          el.innerHTML = translations[newLang][key];
        }
        el.classList.remove('sand-dissolving');
        el.classList.add('sand-reforming');
      });
    }, 300);

    // 5. Complete transition
    setTimeout(() => {
      visibleElements.forEach(el => {
        el.classList.remove('sand-reforming');
      });
      isSwitchingLang = false;
    }, 720);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        switchLanguage(selected);
      }
    });
  });

  try {
    const saved = localStorage.getItem('kazankin_lang');
    if (saved && (saved === 'ru' || saved === 'en')) {
      applyLanguageInstant(saved);
    }
  } catch (_) {}


  // ========================================================================
  // 2. DISCRETE FULLPAGE SWIPE CONTROLLER (ZERO SKIPPING, 100% LOCK)
  // ========================================================================
  const fullpageTrack = document.getElementById('fullpageTrack');
  const sections = document.querySelectorAll('.section-page');
  const totalSections = sections.length;
  let currentSectionIndex = 0;
  let isTransitioning = false;
  const TRANSITION_LOCK_MS = 600;
  let lastSwipeTimestamp = 0;

  const desktopNavLinks = document.querySelectorAll('.header__nav .nav__link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const sideDots = document.querySelectorAll('.side-dot');

  function updateNavIndicators(index) {
    desktopNavLinks.forEach(link => {
      const targetIdx = parseInt(link.getAttribute('data-goto'), 10);
      link.classList.toggle('active', targetIdx === index);
    });
    mobileNavLinks.forEach(link => {
      const targetIdx = parseInt(link.getAttribute('data-goto'), 10);
      link.classList.toggle('active', targetIdx === index);
    });
    sideDots.forEach(dot => {
      const targetIdx = parseInt(dot.getAttribute('data-goto'), 10);
      dot.classList.toggle('active', targetIdx === index);
    });
  }

  function goToSection(index) {
    if (index < 0 || index >= totalSections) return;
    currentSectionIndex = index;
    isTransitioning = true;
    lastSwipeTimestamp = performance.now();

    // Apply transform translation
    const translateY = -index * 100;
    fullpageTrack.style.transform = `translateY(${translateY}vh)`;

    updateNavIndicators(index);

    setTimeout(() => {
      isTransitioning = false;
    }, TRANSITION_LOCK_MS);
  }

  // Bind clicks on all data-goto elements
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(el.getAttribute('data-goto'), 10);
      if (!isNaN(targetIndex)) {
        goToSection(targetIndex);
        // If mobile drawer open, close it
        if (mobileDrawer.classList.contains('open')) {
          toggleMobileMenu(false);
        }
      }
    });
  });

  // Wheel listener: Single wheel tick -> exactly 1 section transition (Swipe Feel, Zero Skipping)
  // Deterministic timestamp cooldown: eliminates the need to move the cursor, allows immediate consecutive swiping
  window.addEventListener('wheel', (e) => {
    // Prevent default browser scrolling and rubberband bounce
    e.preventDefault();

    const now = performance.now();
    // If currently animating or within transition cooldown, safely ignore residual momentum events
    if (isTransitioning || (now - lastSwipeTimestamp < TRANSITION_LOCK_MS)) {
      return;
    }

    // Require intentional velocity threshold
    if (Math.abs(e.deltaY) >= 22) {
      lastSwipeTimestamp = now;
      if (e.deltaY > 0) {
        // Swipe Down -> Next Section
        if (currentSectionIndex < totalSections - 1) {
          goToSection(currentSectionIndex + 1);
        }
      } else {
        // Swipe Up -> Prev Section
        if (currentSectionIndex > 0) {
          goToSection(currentSectionIndex - 1);
        }
      }
    }
  }, { passive: false });

  // Touch Swipe Gesture Listener
  let touchStartY = 0;
  let touchStartX = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const now = performance.now();
    if (isTransitioning || (now - lastSwipeTimestamp < TRANSITION_LOCK_MS)) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartY - touchEndY;
    const diffX = touchStartX - touchEndX;

    // Only process vertical swipe if vertical movement > horizontal movement
    if (Math.abs(diffY) > 40 && Math.abs(diffY) > Math.abs(diffX)) {
      lastSwipeTimestamp = now;
      if (diffY > 0) {
        // Swipe Up -> Next Section
        if (currentSectionIndex < totalSections - 1) {
          goToSection(currentSectionIndex + 1);
        }
      } else {
        // Swipe Down -> Prev Section
        if (currentSectionIndex > 0) {
          goToSection(currentSectionIndex - 1);
        }
      }
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const now = performance.now();
    if (isTransitioning || (now - lastSwipeTimestamp < TRANSITION_LOCK_MS)) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      if (currentSectionIndex < totalSections - 1) goToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      if (currentSectionIndex > 0) goToSection(currentSectionIndex - 1);
    }
  });


  // ========================================================================
  // 3. WORKS SHOWCASE SLIDER (Centered 3D Carousel & RDR2 Accents)
  // ========================================================================
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderContainer = document.getElementById('worksSlider');
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const counterEl = document.getElementById('sliderCounter');
  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    slides.forEach((slide, idx) => {
      const isActive = idx === currentSlide;
      slide.classList.toggle('active-card', isActive);
      const title = slide.querySelector('.slider-slide__title');
      if (title) {
        title.classList.toggle('active', isActive);
      }
    });

    // Center active slide within sliderContainer
    const firstSlide = slides[0];
    if (firstSlide && sliderContainer && sliderTrack) {
      const slideWidth = firstSlide.offsetWidth;
      const gap = 24;
      const containerWidth = sliderContainer.offsetWidth;
      const totalTrackWidth = totalSlides * slideWidth + (totalSlides - 1) * gap;
      const maxOffset = Math.max(0, totalTrackWidth - containerWidth);

      // Centered calculation
      let targetOffset = (currentSlide * (slideWidth + gap)) - ((containerWidth - slideWidth) / 2);
      targetOffset = Math.max(0, Math.min(targetOffset, maxOffset));
      sliderTrack.style.transform = `translateX(-${targetOffset}px)`;
    }

    if (counterEl) {
      counterEl.textContent = `0${currentSlide + 1} / 0${totalSlides}`;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSlide = idx;
        updateSlider();
      });
    });

    window.addEventListener('resize', updateSlider);
    // Initialize slider position
    setTimeout(updateSlider, 100);
  }


  // ========================================================================
  // 4. MOBILE DRAWER NAVIGATION
  // ========================================================================
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function toggleMobileMenu(isOpen) {
    const open = typeof isOpen === 'boolean' ? isOpen : !mobileDrawer.classList.contains('open');
    burgerBtn.setAttribute('aria-expanded', String(open));
    mobileDrawer.classList.toggle('open', open);
  }

  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener('click', () => toggleMobileMenu());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }


  // ========================================================================
  // 5. STAGE ACCORDION
  // ========================================================================
  const stageCards = document.querySelectorAll('.stage-card');

  stageCards.forEach(card => {
    function toggleCard(e) {
      e.stopPropagation();
      const isExpanded = card.getAttribute('aria-expanded') === 'true';
      // Close other cards in same group to save space
      stageCards.forEach(c => {
        if (c !== card) c.setAttribute('aria-expanded', 'false');
      });
      card.setAttribute('aria-expanded', String(!isExpanded));
    }

    card.addEventListener('click', toggleCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(e);
      }
    });
  });

});
