// ========== ORIGINAL WATCH DATA ==========
const WATCHES = [
  {
    id: 3,
    name: "Tissot PRX",
    sub: "STEEL BEAST",
    price: "400",
    badge: "STEEL",
    img: "Tissot PRX.jpg",
  },
  {
    id: 4,
    name: "Tissot Lather",
    sub: "CLASSIC REVIVAL",
    price: "650",
    badge: "CLASSIC",
    img: "Tissot Lather.jpg",
  },
  {
    id: 5,
    name: "PAILY PHILIPPE",
    sub: "CAPTAIN LUXURY",
    price: "650",
    badge: "LUXURY",
    img: "Patek Rubber.jpg",
  },
  {
    id: 6,
    name: "Landa Dollar",
    sub: "CLASSIC STEEL",
    price: "450",
    badge: "LIMITED",
    img: "Landa Dollar.jpg",
  },
  {
    id: 7,
    name: "Lacoste",
    sub: "MAESTRO BROWN",
    price: "650",
    badge: "NEW",
    img: "Lacoste.jpg",
  },
  {
    id: 8,
    name: "CARTIER",
    sub: "CLASSIC EDITION",
    price: "350",
    badge: "clASSIC",
    img: "Catier.jpg",
  },
  {
    id: 9,
    name: "Casio",
    sub: "BLACK GOLD",
    price: "450",
    badge: "LTD",
    img: "Casio.jpg",
  },
];

// ========== INTRO WORD SEQUENCE ==========
const wordSequence = [
  { word: "الوقت", bgColor: "#ffffff", textColor: "#0a0a0a" },
  { word: "لِسَّة", bgColor: "#0a0a0a", textColor: "#ffffff" },
  { word: "مخلصش", bgColor: "#ffffff", textColor: "#0a0a0a" },
  { word: "لِسَّة فيه", bgColor: "#0a0a0a", textColor: "#d4af5c" },
];

let wordScreens = [];
let currentIndex = 0;
let journeyStarted = false;
let autoTimer = null;
let isSkipping = false;

function createWordScreen(data, idx) {
  const div = document.createElement("div");
  div.className = "word-screen";
  div.style.backgroundColor = data.bgColor;
  div.style.color = data.textColor;
  const wordEl = document.createElement("div");
  wordEl.className = "word-large";
  wordEl.textContent = data.word;
  const skipBtn = document.createElement("button");
  skipBtn.className = "skip-btn";
  skipBtn.textContent = "تخطي ←";
  skipBtn.addEventListener("click", skipIntro);
  div.appendChild(wordEl);
  div.appendChild(skipBtn);
  document.body.appendChild(div);
  return div;
}

function skipIntro() {
  if (isSkipping) return;
  isSkipping = true;
  if (autoTimer) clearTimeout(autoTimer);
  wordScreens.forEach((screen) => {
    screen.style.opacity = "0";
    screen.style.visibility = "hidden";
    setTimeout(() => {
      if (screen.parentNode) screen.remove();
    }, 100);
  });
  showBrandFinalAndStoreDirect();
}

function createBrandFinal() {
  const div = document.createElement("div");
  div.className = "brand-final-screen";
  div.style.backgroundColor = "#0a0a0a";
  div.style.color = "#d4af5c";
  div.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; line-height:0.85; margin-bottom:1rem;">
          <span style="font-family:var(--font-display); font-size:clamp(3rem,12vw,7rem); font-weight:900;">EXTRA</span>
          <span style="font-family:var(--font-display); font-size:clamp(3rem,12vw,7rem); font-weight:900; color:transparent; -webkit-text-stroke:2px #d4af5c;">TIME</span>
          <span style="font-family:var(--font-display); font-size:clamp(3rem,12vw,7rem); font-weight:900;">90</span>
        </div>
        <div style="font-family:var(--font-arabic); font-size:1rem; margin-top:1.5rem; opacity:0.7;">الوقت الإضافي لأصحاب الطموح</div>
      `;
  document.body.appendChild(div);
  return div;
}

let brandScreen = null;

function showBrandFinalAndStoreDirect() {
  if (!brandScreen) brandScreen = createBrandFinal();
  brandScreen.style.opacity = "1";
  brandScreen.style.visibility = "visible";
  brandScreen.style.transform = "scale(1)";
  setTimeout(() => {
    brandScreen.style.opacity = "0";
    setTimeout(() => {
      const landing = document.getElementById("landing");
      const store = document.getElementById("mainStore");
      landing.style.opacity = "0";
      setTimeout(() => {
        landing.style.display = "none";
        store.classList.remove("hidden");
        store.classList.add("visible");
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
        if (brandScreen && brandScreen.parentNode) brandScreen.remove();
        wordScreens.forEach((s) => {
          if (s.parentNode) s.remove();
        });
      }, 150);
    }, 400);
  }, 1500);
}

function showBrandFinalAndStore() {
  if (!brandScreen) brandScreen = createBrandFinal();
  brandScreen.style.opacity = "1";
  brandScreen.style.visibility = "visible";
  brandScreen.style.transform = "scale(1)";
  setTimeout(() => {
    brandScreen.style.opacity = "0";
    setTimeout(() => {
      const landing = document.getElementById("landing");
      const store = document.getElementById("mainStore");
      landing.style.opacity = "0";
      setTimeout(() => {
        landing.style.display = "none";
        store.classList.remove("hidden");
        store.classList.add("visible");
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
        wordScreens.forEach((s) => {
          if (s.parentNode) s.remove();
        });
        if (brandScreen && brandScreen.parentNode) brandScreen.remove();
      }, 150);
    }, 400);
  }, 1500);
}

function showWord(index) {
  if (index >= wordSequence.length) {
    showBrandFinalAndStore();
    return;
  }
  const screen = wordScreens[index];
  if (!screen) return;
  screen.style.opacity = "1";
  screen.style.visibility = "visible";
  screen.style.transform = "scale(1)";
  if (autoTimer) clearTimeout(autoTimer);
  autoTimer = setTimeout(() => {
    nextWord();
  }, 900);
}

function nextWord() {
  const current = wordScreens[currentIndex];
  if (current) {
    current.style.opacity = "0";
    current.style.transform = "scale(0.96)";
    current.style.visibility = "hidden";
  }
  setTimeout(() => {
    if (current && current.parentNode) current.style.display = "none";
    currentIndex++;
    if (currentIndex < wordSequence.length) {
      showWord(currentIndex);
    } else {
      showBrandFinalAndStore();
    }
  }, 300);
}

function startJourney() {
  if (journeyStarted) return;
  journeyStarted = true;
  wordSequence.forEach((data, i) => {
    wordScreens.push(createWordScreen(data, i));
  });
  currentIndex = 0;
  showWord(0);
}

// ========== ORIGINAL FUNCTIONS ==========
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  WATCHES.forEach((w, i) => {
    const card = document.createElement("div");
    card.className = "watch-card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `<div class="card-img-wrap"><img src="${w.img}" alt="${w.name}" loading="lazy"><div class="card-badge">${w.badge}</div></div><div class="card-body"><div class="card-name">${w.name}</div><div class="card-sub">${w.sub}</div><div class="card-footer"><div class="card-price">${w.price} <span>جنيه</span></div><button class="card-btn" data-name="${w.name}"> قريبا</button></div></div>`;
    grid.appendChild(card);
  });
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-btn");
    if (btn) openModal(btn.dataset.name);
  });
}

function openModal(watchName) {
  const overlay = document.getElementById("modalOverlay");
  const nameSpan = document.getElementById("modalWatchName");
  if (nameSpan) nameSpan.textContent = watchName ? `"${watchName}"` : "";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "auto";
}

function createRipple(event, element) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-effect");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = event.clientX - rect.left - size / 2 + "px";
  ripple.style.top = event.clientY - rect.top - size / 2 + "px";
  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function initMorphTransition() {
  const btn = document.getElementById("enterBtn");
  const overlay = document.getElementById("morphOverlay");
  const landing = document.getElementById("landing");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    createRipple(e, btn);
    btn.style.pointerEvents = "none";
    const rect = btn.getBoundingClientRect();
    overlay.style.width = rect.width + "px";
    overlay.style.height = rect.height + "px";
    overlay.style.top = rect.top + rect.height / 2 + "px";
    overlay.style.left = rect.left + rect.width / 2 + "px";
    overlay.classList.add("active");
    setTimeout(() => {
      landing.style.opacity = "0";
      setTimeout(() => {
        landing.style.display = "none";
        startJourney();
      }, 150);
    }, 400);
    setTimeout(() => {
      overlay.style.opacity = "0";
    }, 700);
    setTimeout(() => {
      overlay.style.display = "none";
      overlay.style.opacity = "1";
    }, 1200);
  });
}

function spawnParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  for (let i = 0; i < 45; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = 60 + Math.random() * 40 + "%";
    p.style.setProperty("--dur", 4 + Math.random() * 9 + "s");
    p.style.setProperty("--delay", Math.random() * 8 + "s");
    container.appendChild(p);
  }
}

function initReveal() {
  const reveals = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((r) => obs.observe(r));
  const storySections = document.querySelectorAll(".story-section");
  storySections.forEach((sec) => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition =
      "opacity 0.8s var(--ease-luxury), transform 0.8s var(--ease-luxury)";
    const obs2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            obs2.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    obs2.observe(sec);
  });
}

function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  });
}

function initCardAnimations() {
  const cards = document.querySelectorAll(".watch-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "all 0.5s var(--ease-bounce)";
    });
  });
}

// ========== زر الانزلاق للكولكشن ==========
function initScrollToCollection() {
  const scrollBtn = document.getElementById("scrollToCollectionBtn");
  const catalogSection = document.getElementById("catalog");
  if (scrollBtn && catalogSection) {
    scrollBtn.addEventListener("click", () => {
      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

// ========== COUNTDOWN TIMER ==========
function initCountdown() {
  const TARGET = new Date("2026-07-07T00:00:00");
  // Progress bar: starts from site creation date (approx)
  const START = new Date("2025-01-01T00:00:00");
  const totalMs = TARGET - START;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = new Date();
    const diff = TARGET - now;

    if (diff <= 0) {
      document.getElementById("cdDays").textContent = "00";
      document.getElementById("cdHours").textContent = "00";
      document.getElementById("cdMins").textContent = "00";
      document.getElementById("cdSecs").textContent = "00";
      document.getElementById("countdownBar").style.width = "100%";
      const note = document.querySelector(".countdown-note");
      if (note) note.textContent = "🎉 الوقت الإضافي بدأ! مرحباً بكم!";
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);

    document.getElementById("cdDays").textContent  = pad(days);
    document.getElementById("cdHours").textContent = pad(hours);
    document.getElementById("cdMins").textContent  = pad(mins);
    document.getElementById("cdSecs").textContent  = pad(secs);

    // Progress bar (elapsed %)
    const elapsed = now - START;
    const pct = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));
    document.getElementById("countdownBar").style.width = pct + "%";

    setTimeout(tick, 1000);
  }

  tick();
}

document.addEventListener("DOMContentLoaded", () => {
  spawnParticles();
  initMorphTransition();
  renderProducts();
  initReveal();
  initNavbarScroll();
  initCardAnimations();
  initScrollToCollection();
  initCountdown();

  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay)
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  if (window.matchMedia("(pointer: fine)").matches) {
    const glowDiv = document.createElement("div");
    glowDiv.style.cssText =
      "position:fixed; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(212,175,92,0.04) 0%, transparent 70%); pointer-events:none; z-index:9999; transform:translate(-50%,-50%);";
    document.body.appendChild(glowDiv);
    document.addEventListener("mousemove", (e) => {
      glowDiv.style.left = e.clientX + "px";
      glowDiv.style.top = e.clientY + "px";
    });
  }
});