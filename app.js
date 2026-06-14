// ========== WATCH DATA ==========
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
    name: "Tissot Leather",
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
    badge: "CLASSIC",
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

// ========== NETFLIX INTRO ==========
function runIntro() {
  const intro = document.getElementById("netflixIntro");
  const store = document.getElementById("mainStore");
  setTimeout(() => {
    intro.classList.add("fade-out");
    setTimeout(() => {
      intro.style.display = "none";
      store.classList.remove("hidden");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          store.classList.add("visible");
          document.body.style.overflow = "auto";
          window.scrollTo(0, 0);
        });
      });
    }, 700);
  }, 2600);
}

// ========== COUNTDOWN TIMER ==========
function initCountdown() {
  const target = new Date("2026-07-07T00:00:00");

  const elDays = document.getElementById("cdDays");
  const elHours = document.getElementById("cdHours");
  const elMins = document.getElementById("cdMins");
  const elSecs = document.getElementById("cdSecs");
  const expiredEl = document.getElementById("countdownExpired");
  const gridEl = document.getElementById("countdownGrid");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function animateTick(el, newVal) {
    const current = el.textContent;
    if (current !== newVal) {
      el.textContent = newVal;
      el.classList.remove("tick");
      void el.offsetWidth; // reflow
      el.classList.add("tick");
    }
  }

  function tick() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      gridEl.style.display = "none";
      expiredEl.style.display = "block";
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    animateTick(elDays, pad(days));
    animateTick(elHours, pad(hours));
    animateTick(elMins, pad(mins));
    animateTick(elSecs, pad(secs));
  }

  tick();
  setInterval(tick, 1000);
}

// ========== PRODUCTS GRID ==========
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  WATCHES.forEach((w, i) => {
    const card = document.createElement("div");
    card.className = "watch-card";
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${w.img}" alt="${w.name}" loading="lazy" />
        <div class="card-badge">${w.badge}</div>
      </div>
      <div class="card-body">
        <div class="card-name">${w.name}</div>
        <div class="card-sub">${w.sub}</div>
        <div class="card-footer">
          <div class="card-price">${w.price} <span>جنيه</span></div>
          <button class="card-btn" data-name="${w.name}">قريبا</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".card-btn");
    if (btn) openModal(btn.dataset.name);
  });
}

// ========== MODAL ==========
function openModal(name) {
  const overlay = document.getElementById("modalOverlay");
  const nameEl = document.getElementById("modalWatchName");
  if (nameEl) nameEl.textContent = name ? `"${name}"` : "";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "auto";
}

// ========== SCROLL REVEAL ==========
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));

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
  document.querySelectorAll(".story-section").forEach((s) => obs2.observe(s));
}

// ========== NAVBAR ==========
function initNavbar() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("nav-scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
}

// ========== SCROLL TO COLLECTION ==========
function initScrollBtn() {
  const btn = document.getElementById("scrollToCollectionBtn");
  if (btn)
    btn.addEventListener("click", () => {
      document
        .getElementById("catalog")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

// ========== CURSOR GLOW (desktop only) ==========
function initCursorGlow() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const g = document.createElement("div");
  g.style.cssText =
    "position:fixed;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(245,197,24,0.04) 0%,transparent 70%);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:left 0.08s,top 0.08s;";
  document.body.appendChild(g);
  document.addEventListener(
    "mousemove",
    (e) => {
      g.style.left = e.clientX + "px";
      g.style.top = e.clientY + "px";
    },
    { passive: true },
  );
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden";
  runIntro();
  renderProducts();
  initReveal();
  initNavbar();
  initScrollBtn();
  initCursorGlow();
  initCountdown();

  document.getElementById("modalClose")?.addEventListener("click", closeModal);
  document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
