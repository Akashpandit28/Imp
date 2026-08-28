/* ==========================================================================
   Hey Sis. — script.js
   Vanilla JS only. No build step, no dependencies.

   👉 EVERYTHING YOU NEED TO PERSONALIZE THE WEBSITE IS IN THE "CONFIG"
      OBJECT BELOW. You should not need to touch index.html at all.
   ========================================================================== */

const CONFIG = {
  // Names used across the site
  sisterName: "Princi",
  brotherName: "Mai meeee",

  // The letter section. Use \n\n for a new paragraph.
  letter:
    "Maybe I don't say it enough.\n\n" +
    "Maybe we spend more time annoying each other, arguing over stupid things, and pretending we don't care.\n\n" +
    "But somewhere underneath all of that is something I've always known —\n\n" +
    "I'm incredibly lucky to have you as my sister (Dekho ya Jhoot hai XDXD).\n\n" +
    "You are now part of my life and never want's you to go away (Adha jhoot hai).\n\n" +
    "And no matter how much life changes, how far we go, or how old we get, you'll always have your brother standing beside you \nIrritating to it's fullest extent.\n\n" +
    "I'll always annoy you.\nI'll always tease you.\nI'll always have your back.\n\n" +
    "That's the deal.\n\n" + "Thoda Khana Bhijwa deti to accha hota hehehehe.\n\n"+
    "Happy Raksha Bandhan, Sistaaaaaarrrrrrrrrrr. ❤️",

  // Sign-off under the letter. Leave blank ("") to hide it.
  letterSignature: "— Meeeeeeeeee",

  // Memories gallery. Add or remove as many as you like (6–8 looks best).
  // If a photo file is missing, a soft gradient placeholder is shown instead —
  // nothing breaks.
  photos: [
    { src: "images/1.jpg", caption: "Chimkandi DIDI." },
    { src: "images/2.jpg", caption: "Choti chimkandi." },
    { src: "images/3.png", caption: "Khair Acchi Dikh rahi hai" },
    { src: "images/4.jpg", caption: "Chiiiiiiiii" },
    { src: "images/5.jpg", caption: "Annoying since day one ❤️" },
    { src: "images/6.jpg", caption: "Cute Suar" },
    { src: "images/7.jpeg", caption: "zehahahahaha" },
    { src: "images/8.jpeg", caption: "Bacche se party lena band kar" }
  ],

  // "Things That Make You, You" cards. Each needs a short symbol + a line.
  aboutCards: [
    { icon: "✦", text: "My personal Fav for slapping." },
    { icon: "✧", text: "The person I can annoy without consequences." },
    { icon: "❈", text: "Someone I'll always protect." },
    { icon: "⌂", text: "A permanent part of my Bakchodi" },
    { icon: "☙", text: "My Personal Alarm clock" },
    { icon: "❤", text: "And somehow… I wouldn't trade you for anyone." }
  ],

  // Vertical timeline. Add as many chapters as you like.
  timeline: [
    { chapter: "Chapter 01", title: "The childhood chaos" },
    { chapter: "Chapter 02", title: "Growing up" },
    { chapter: "Chapter 03", title: "Becoming best friends" },
    { chapter: "Chapter 04", title: "Wherever life takes us" }
  ],

  // Final section lines
  finalLineTop: "No matter where life takes us…",
  finalLineMain: "you'll always have your brother.",
  finalLineHappy: "Happy Raksha Bandhan, Didiiiiiiiiii.",
  finalCredit: "Made with love, by your Great(Very Good) brother.",

  // Optional: put a photo path here (e.g. "images/us-together.jpg") to use it
  // as the background of the final section instead of the default gradient.
  finalBackgroundPhoto: "",

  // Music. Point this at a local mp3 in /audio. If the file is missing, the
  // button simply does nothing when clicked — no errors, nothing breaks.
  music: "/Users/akash-racanaa/Downloads/files/rakhi-for-sis/audio.mp3"
};

/* ==========================================================================
   Rendering — turns CONFIG into DOM, so you never have to edit index.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  applyNames();
  renderGallery();
  renderLetter();
  renderAboutCards();
  renderTimeline();
  renderFinal();
  setupAudio();
  setupHeroParticles();
  setupHeroCta();
  setupThreadRail();
  setupRevealOnScroll();
  setupRakhiInteraction();
});

function applyNames() {
  document.title = `Hey ${firstName(CONFIG.sisterName) || "Sis"}. | A Raksha Bandhan Letter`;
}

function firstName(name) {
  if (!name || name === "Sister Name") return "";
  return name.split(" ")[0];
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  CONFIG.photos.forEach((photo, index) => {
    const card = document.createElement("figure");
    card.className = "polaroid";

    const img = document.createElement("img");
    img.className = "polaroid__photo";
    img.alt = photo.caption || `Memory ${index + 1}`;
    img.loading = "lazy";
    img.src = photo.src;
    // If the photo file doesn't exist yet, quietly fall back to a gradient
    // (set via CSS on .polaroid__photo) instead of a broken image icon.
    img.addEventListener("error", () => {
      img.removeAttribute("src");
      img.alt = photo.caption ? `${photo.caption} (add this photo in /images)` : "Add a photo here";
    });

    const caption = document.createElement("figcaption");
    caption.className = "polaroid__caption";
    caption.textContent = photo.caption || "";

    card.appendChild(img);
    card.appendChild(caption);
    gallery.appendChild(card);
  });
}

function renderLetter() {
  const body = document.getElementById("letterBody");
  const sign = document.getElementById("letterSign");
  if (body) body.textContent = CONFIG.letter;
  if (sign) {
    if (CONFIG.letterSignature) {
      sign.textContent = CONFIG.letterSignature;
    } else {
      sign.style.display = "none";
    }
  }
}

function renderAboutCards() {
  const grid = document.getElementById("aboutGrid");
  if (!grid) return;

  CONFIG.aboutCards.forEach((item) => {
    const card = document.createElement("div");
    card.className = "about-card";

    const icon = document.createElement("span");
    icon.className = "about-card__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = item.icon || "✦";

    const text = document.createElement("p");
    text.className = "about-card__text";
    text.textContent = item.text;

    card.appendChild(icon);
    card.appendChild(text);
    grid.appendChild(card);
  });
}

function renderTimeline() {
  const track = document.getElementById("timelineTrack");
  if (!track) return;

  CONFIG.timeline.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "timeline-item";

    const chapter = document.createElement("span");
    chapter.className = "timeline-item__chapter";
    chapter.textContent = item.chapter;

    const title = document.createElement("h3");
    title.className = "timeline-item__title";
    title.textContent = item.title;

    entry.appendChild(chapter);
    entry.appendChild(title);
    track.appendChild(entry);
  });
}

function renderFinal() {
  const top = document.querySelector(".final__line:not(.final__line--script):not(.final__line--small)");
  const main = document.getElementById("finalMainLine");
  const happy = document.getElementById("finalHappyLine");
  const credit = document.getElementById("finalCredit");

  if (top) top.textContent = CONFIG.finalLineTop;
  if (main) main.textContent = CONFIG.finalLineMain;
  if (happy) happy.textContent = CONFIG.finalLineHappy;
  if (credit) credit.textContent = CONFIG.finalCredit;

  if (CONFIG.finalBackgroundPhoto) {
    const bg = document.getElementById("finalBg");
    if (bg) {
      const img = new Image();
      img.onload = () => {
        bg.style.backgroundImage = `url("${CONFIG.finalBackgroundPhoto}")`;
      };
      // If the photo fails to load, we simply keep the default gradient —
      // no errors, nothing breaks.
      img.src = CONFIG.finalBackgroundPhoto;
    }
  }
}

/* ==========================================================================
   Music — plays only on click, never autoplays. Fails silently if the
   audio file isn't there yet.
   ========================================================================== */

function setupAudio() {
  const toggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgAudio");
  if (!toggle || !audio) return;

  let sourceReady = false;
  if (CONFIG.music) {
    audio.src = CONFIG.music;
    sourceReady = true;
  }

  toggle.addEventListener("click", () => {
    if (!sourceReady) {
      // No music file configured — do nothing, no error shown to the user.
      toggle.classList.add("shake");
      setTimeout(() => toggle.classList.remove("shake"), 300);
      return;
    }

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise
          .then(() => {
            toggle.classList.add("is-playing");
            toggle.setAttribute("aria-pressed", "true");
          })
          .catch(() => {
            // File missing or blocked — fail silently, keep the UI intact.
            toggle.classList.remove("is-playing");
            toggle.setAttribute("aria-pressed", "false");
          });
      }
    } else {
      audio.pause();
      toggle.classList.remove("is-playing");
      toggle.setAttribute("aria-pressed", "false");
    }
  });
}

/* ==========================================================================
   Hero — subtle floating hearts, respects prefers-reduced-motion
   ========================================================================== */

function setupHeroParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const symbols = ["❤", "✦", "❈"];
  const maxParticles = 8;

  function spawn() {
    if (container.childElementCount >= maxParticles) return;
    const span = document.createElement("span");
    span.className = "particle";
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    span.style.animationDuration = `${9 + Math.random() * 6}s`;
    span.style.fontSize = `${10 + Math.random() * 10}px`;
    container.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }

  spawn();
  const interval = setInterval(spawn, 2600);

  // Stop spawning once the hero has scrolled well out of view, to keep
  // things lightweight.
  const heroSection = document.getElementById("hero");
  if (heroSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          clearInterval(interval);
          observer.disconnect();
        }
      });
    }, { threshold: 0 });
    observer.observe(heroSection);
  }
}

function setupHeroCta() {
  const cta = document.getElementById("heroCta");
  const target = document.getElementById("memories");
  if (!cta || !target) return;
  cta.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth" });
  });
}

/* ==========================================================================
   Thread rail — acts as both nav dots and a scroll progress indicator
   ========================================================================== */

function setupThreadRail() {
  const dots = Array.from(document.querySelectorAll(".thread-dot"));
  const fill = document.getElementById("threadFill");
  const sections = dots
    .map((dot) => document.getElementById(dot.dataset.target))
    .filter(Boolean);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  function updateOnScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (fill) fill.style.height = `${Math.min(100, Math.max(0, progress))}%`;

    let activeIndex = 0;
    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5) activeIndex = i;
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeIndex));
  }

  window.addEventListener("scroll", throttle(updateOnScroll, 100), { passive: true });
  updateOnScroll();
}

/* ==========================================================================
   Scroll-triggered reveal animations (IntersectionObserver only)
   ========================================================================== */

function setupRevealOnScroll() {
  const revealables = document.querySelectorAll(".reveal, .polaroid, .about-card, .timeline-item");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealables.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   Interactive Rakhi — click to "renew the bond"
   ========================================================================== */

function setupRakhiInteraction() {
  const button = document.getElementById("rakhiButton");
  const caption = document.getElementById("rakhiCaption");
  const particles = document.getElementById("rakhiParticles");
  if (!button || !caption) return;

  const originalCaption = caption.textContent;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  button.addEventListener("click", () => {
    button.classList.add("is-renewed");
    caption.style.opacity = "0";

    setTimeout(() => {
      caption.textContent = "Promise renewed ❤️";
      caption.style.opacity = "1";
    }, 250);

    if (!prefersReducedMotion && particles) {
      spawnBurst(particles);
    }

    setTimeout(() => {
      button.classList.remove("is-renewed");
      caption.style.opacity = "0";
      setTimeout(() => {
        caption.textContent = originalCaption;
        caption.style.opacity = "1";
      }, 250);
    }, 3200);
  });
}

function spawnBurst(container) {
  const symbols = ["❤", "✦", "❈"];
  const count = 10;
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const distance = 60 + Math.random() * 40;
    span.style.setProperty("--bx", `${Math.cos(angle) * distance}px`);
    span.style.setProperty("--by", `${Math.sin(angle) * distance}px`);
    span.style.animationDelay = `${Math.random() * 0.15}s`;
    container.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }
}

/* ==========================================================================
   Utilities
   ========================================================================== */

function throttle(fn, wait) {
  let lastCall = 0;
  let timeout = null;
  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    if (remaining <= 0) {
      lastCall = now;
      fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
