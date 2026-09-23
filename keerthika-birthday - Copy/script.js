/* ============================================================
   KEERTHIKA'S BIRTHDAY SITE — SCRIPT
   ------------------------------------------------------------
   Every "EDIT:" comment marks something you can safely change.
   Nothing here needs a server, a build step, or an internet
   connection — just open index.html in a browser, or deploy
   the whole folder as-is.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     EDIT: her name & the birthday date
     Month is 0-indexed in JavaScript, so September = 8.
  ---------------------------------------------------------- */
  const HER_NAME = "Keerthika";
  const BIRTHDAY_MONTH = 8;   // September
  const BIRTHDAY_DAY = 24;

  /* ============================================================
     1. AMBIENT FLOATING HEARTS / STARS
     ============================================================ */
  function initAmbientField() {
    const field = document.getElementById("ambientField");
    if (!field) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Keep it light on mobile CPUs — a reduced-motion visitor gets none.
    const count = prefersReducedMotion ? 0 : (window.innerWidth < 500 ? 14 : 22);
    const symbols = ["♥", "✦", "✧"];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = 10 + Math.random() * 14 + "px";
      el.style.setProperty("--drift-x", (Math.random() * 60 - 30) + "px");
      const duration = 14 + Math.random() * 14;
      el.style.animationDuration = duration + "s";
      el.style.animationDelay = -Math.random() * duration + "s";
      field.appendChild(el);
    }
  }

  /* ============================================================
     2. COUNTDOWN TO SEPTEMBER 24
     ============================================================ */
  function initCountdown() {
    const el = document.getElementById("countdown");
    if (!el) return;

    function render() {
      const now = new Date();
      const isBirthdayToday =
        now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;

      if (isBirthdayToday) {
        el.innerHTML = `<span class="countdown--today">Today is your day, ${HER_NAME}. ✦</span>`;
        return;
      }

      // Find the next occurrence of the birthday (this year or next).
      let target = new Date(now.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
      if (target < now) {
        target = new Date(now.getFullYear() + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
      }

      const diffMs = target - now;
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

      el.innerHTML = `
        <div class="countdown__unit"><span class="countdown__num">${days}</span><span class="countdown__label">days</span></div>
        <div class="countdown__unit"><span class="countdown__num">${hours}</span><span class="countdown__label">hrs</span></div>
        <div class="countdown__unit"><span class="countdown__num">${minutes}</span><span class="countdown__label">min</span></div>
      `;
    }

    render();
    // Update once a minute — no need for anything more frequent.
    setInterval(render, 60 * 1000);
  }

  /* ============================================================
     3. "OPEN MY HEART" — SCROLLS TO THE APOLOGY SECTION
     ============================================================ */
  function initOpenHeart() {
    const btn = document.getElementById("openHeartBtn");
    const target = document.getElementById("apology");
    if (!btn || !target) return;
    btn.addEventListener("click", () => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ============================================================
     4. PHOTO GALLERY LIGHTBOX
     ============================================================ */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    const items = document.querySelectorAll(".gallery__item");
    if (!lightbox || !items.length) return;

    let lastFocused = null;

    function open(item) {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightboxCaption.textContent = item.dataset.caption || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lastFocused = document.activeElement;
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    items.forEach((item) => {
      item.addEventListener("click", () => open(item));
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  /* ============================================================
     5. SURPRISE LETTERS
     ============================================================ */
  function initLetters() {
    const overlay = document.getElementById("letterOverlay");
    const overlayTitle = document.getElementById("letterOverlayTitle");
    const overlayBody = document.getElementById("letterOverlayBody");
    const closeBtn = document.getElementById("letterOverlayClose");
    const seals = document.querySelectorAll(".letter-seal");
    if (!overlay || !seals.length) return;

    let lastFocused = null;

    function open(seal) {
      const title = seal.querySelector(".letter-seal__title").textContent.trim();
      const body = seal.querySelector(".letter-seal__body").textContent.trim();
      overlayTitle.textContent = title;
      overlayBody.textContent = body;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      lastFocused = document.activeElement;
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    seals.forEach((seal) => {
      seal.addEventListener("click", () => open(seal));
    });

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  /* ============================================================
     6. MAKE A WISH — CONFETTI / FLOATING HEARTS
     ============================================================ */
  function initWishBurst() {
    const btn = document.getElementById("makeWishBtn");
    const burstLayer = document.getElementById("wishesBurst");
    if (!btn || !burstLayer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // EDIT: change these hex values to re-colour the confetti burst.
    const colors = ["#d4af6a", "#f2a9c2", "#fbf3ec", "#e8cd9a"];

    btn.addEventListener("click", () => {
      if (prefersReducedMotion) {
        btn.textContent = "Wish made ♥";
        setTimeout(() => (btn.textContent = "Make a Wish"), 2200);
        return;
      }

      const pieceCount = 36;
      for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        const isHeart = Math.random() < 0.35;
        const size = 6 + Math.random() * 8;

        if (isHeart) {
          piece.textContent = "♥";
          piece.style.fontSize = size + 6 + "px";
          piece.style.color = colors[Math.floor(Math.random() * colors.length)];
          piece.style.background = "transparent";
        } else {
          piece.style.width = size + "px";
          piece.style.height = size * 0.4 + "px";
          piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        }

        piece.style.left = Math.random() * 100 + "%";
        const duration = 2.6 + Math.random() * 1.6;
        piece.style.animationDuration = duration + "s";
        piece.style.animationDelay = Math.random() * 0.3 + "s";
        burstLayer.appendChild(piece);

        setTimeout(() => piece.remove(), (duration + 0.3) * 1000);
      }

      btn.textContent = "Wish made ♥";
      setTimeout(() => (btn.textContent = "Make a Wish"), 2200);
    });
  }

  /* ============================================================
     7. FINAL SURPRISE
     ============================================================ */
  function initFinalSurprise() {
    const btn = document.getElementById("lastSurpriseBtn");
    const overlay = document.getElementById("finalOverlay");
    const closeBtn = document.getElementById("finalOverlayClose");
    if (!btn || !overlay) return;

    function open() {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    btn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  /* ============================================================
     8. FLOATING MUSIC PLAYER
     ------------------------------------------------------------
     Mobile browsers require a tap before any audio can play, so
     this never tries to autoplay — it just waits for the button.
     If assets/music/our-song.mp3 hasn't been added yet, tapping
     play will quietly fail and the label will say so.
     ============================================================ */
  function initMusicPlayer() {
    const player = document.getElementById("musicPlayer");
    const audio = document.getElementById("bgAudio");
    const toggle = document.getElementById("musicToggle");
    const icon = document.getElementById("musicIcon");
    const label = document.getElementById("musicLabel");
    const volumeSlider = document.getElementById("volumeSlider");
    if (!player || !audio || !toggle) return;

    audio.volume = parseFloat(volumeSlider.value);
    let hasOpenedPanel = false;

    toggle.addEventListener("click", () => {
      if (!hasOpenedPanel) {
        player.classList.add("is-open");
        hasOpenedPanel = true;
      }

      if (audio.paused) {
        audio.play()
          .then(() => {
            toggle.classList.add("is-playing");
            icon.textContent = "❚❚";
            toggle.setAttribute("aria-label", "Pause our song");
            label.textContent = "Our song";
          })
          .catch(() => {
            // Most likely cause: assets/music/our-song.mp3 hasn't
            // been replaced with a real file yet.
            label.textContent = "Add your song file to play";
          });
      } else {
        audio.pause();
        toggle.classList.remove("is-playing");
        icon.textContent = "♪";
        toggle.setAttribute("aria-label", "Play our song");
        label.textContent = "Paused";
      }
    });

    volumeSlider.addEventListener("input", () => {
      audio.volume = parseFloat(volumeSlider.value);
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    initAmbientField();
    initCountdown();
    initOpenHeart();
    initLightbox();
    initLetters();
    initWishBurst();
    initFinalSurprise();
    initMusicPlayer();
  });
})();
