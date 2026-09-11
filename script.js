/* =========================================================================
   LUXURY DIGITAL WEDDING INVITATION
   Everything you normally change lives in the EASY EDIT ZONE below.
   Nothing else in this file needs to be touched for a new wedding.
   ====================================================================== */

/* ======================= EASY EDIT ZONE — START ======================== */
const CONFIG = {

  /* --- browser tab + WhatsApp link preview ---------------------------- */
  pageTitle:   "Ayesha & Imran — Wedding Invitation",
  shareBlurb:  "You are warmly invited to our wedding.",

  /* --- the couple ------------------------------------------------------ */
  brideName:   "Ayesha",
  groomName:   "Imran",
  heroKicker:  "Together with their families",
  openLabel:   "Tap to open",

  /* --- date & time ----------------------------------------------------- */
  dayName:     "Saturday",
  dateLine:    "25 August 2026",
  timeLine:    "12:30 PM",
  /* used by the countdown — format: YYYY-MM-DDTHH:MM:SS (local time) */
  dateISO:     "2026-08-25T12:30:00",

  /* --- venue ----------------------------------------------------------- */
  venueName:    "Villa Serena Banquet Hall",
  venueAddress: "142 Kurunegala Road, Puttalam 61300",
  cityLine:     "Puttalam, Sri Lanka",
  mapsUrl:      "https://maps.google.com/?q=Puttalam,+Sri+Lanka",

  /* --- words ----------------------------------------------------------- */
  message:
    "Two families, one prayer, and a day we have imagined for a long time. " +
    "We would be honoured to have you beside us as we begin our life together.",
  brideParents: "Mr. & Mrs. A. R. Hameed",
  groomParents: "Mr. & Mrs. M. S. Nazeer",
  photoCaption: "the beginning of always",
  signoff:      "With love",

  /* --- section headings (edit or translate freely) --------------------- */
  eventsTitle:  "Order of the day",
  countTitle:   "Counting the days",
  venueTitle:   "Where to find us",
  rsvpTitle:    "Will you join us?",
  rsvpNote:     "Kindly let us know before 10 August 2026.",

  /* --- events ---------------------------------------------------------- */
  events: [
    { name: "Nikkah",    time: "11:00 AM", place: "Jumma Masjid, Puttalam" },
    { name: "Reception", time: "12:30 PM", place: "Villa Serena Banquet Hall" },
    { name: "Dinner",    time: "07:30 PM", place: "Villa Serena Garden Lawn" }
  ],

  /* --- photo (replace the file, keep the path) ------------------------- */
  photo:    "assets/images/couple.jpg",
  photoAlt: "Ayesha and Imran",

  /* --- WhatsApp (country code, no + and no spaces) --------------------- */
  whatsappNumber:  "94770000000",
  rsvpMessage:     "Hello, I would like to RSVP for the wedding of Ayesha & Imran.",
  contactMessage:  "Hello, I have a question about the wedding invitation.",

  /* --- music (leave "" to keep the player hidden) ---------------------- */
  musicFile:   "",          // e.g. "assets/audio/theme.mp3"
  musicVolume: 0.35
};
/* ======================== EASY EDIT ZONE — END ========================= */


(function () {
  "use strict";

  /* Mark the page as JavaScript-driven and lock scrolling behind the card.
     These live here, not inline in the HTML, on purpose: if this file fails to
     load or throws, the page falls back to a plain, readable invitation
     instead of a card that will not open. */
  document.documentElement.classList.add("js");
  document.body.classList.add("is-locked");

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. put the config on the page --------------------------- */
  function fillText() {
    $$("[data-c]").forEach(el => {
      const key = el.getAttribute("data-c");
      if (CONFIG[key] != null) el.textContent = CONFIG[key];
    });

    document.title = CONFIG.pageTitle;
    const ogT = $('meta[property="og:title"]');
    const ogD = $('meta[property="og:description"]');
    if (ogT) ogT.setAttribute("content", CONFIG.pageTitle);
    if (ogD) ogD.setAttribute("content", CONFIG.shareBlurb);
  }

  function fillPhoto() {
    const img = $("#photoMain");
    if (!img) return;
    img.alt = CONFIG.photoAlt || "";
    img.addEventListener("error", () => {
      img.removeAttribute("src");
      img.closest(".frame__mat").classList.add("is-empty");
    }, { once: true });
    img.src = CONFIG.photo;
  }

  function fillEvents() {
    const wrap = $("#events");
    if (!wrap) return;
    wrap.innerHTML = "";
    (CONFIG.events || []).forEach(ev => {
      const box = document.createElement("article");
      box.className = "event reveal";
      box.innerHTML =
        '<h3 class="event__name"></h3>' +
        '<p class="event__time"></p>' +
        '<p class="event__place"></p>';
      $(".event__name",  box).textContent = ev.name  || "";
      $(".event__time",  box).textContent = ev.time  || "";
      $(".event__place", box).textContent = ev.place || "";
      wrap.appendChild(box);
    });
  }

  function fillLinks() {
    const wa = String(CONFIG.whatsappNumber || "").replace(/\D/g, "");
    const link = (msg) => "https://wa.me/" + wa + "?text=" + encodeURIComponent(msg);

    const map = $("#mapBtn");
    if (map) map.href = CONFIG.mapsUrl || "#";

    const rsvp = $("#rsvpBtn");
    if (rsvp) rsvp.href = wa ? link(CONFIG.rsvpMessage) : (CONFIG.mapsUrl || "#");

    const chat = $("#waBtn");
    if (chat) chat.href = wa ? link(CONFIG.contactMessage) : "#";
  }

  /* ---------- 2. countdown -------------------------------------------- */
  function countdown() {
    const box = $("#countdown");
    if (!box) return;
    const target = new Date(CONFIG.dateISO).getTime();
    if (isNaN(target)) { box.closest(".sheet").hidden = true; return; }

    const tick = () => {
      let left = target - Date.now();
      if (left < 0) left = 0;
      const mins  = Math.floor(left / 60000);
      $("#cd-d").textContent = Math.floor(mins / 1440);
      $("#cd-h").textContent = Math.floor(mins % 1440 / 60);
      $("#cd-m").textContent = mins % 60;
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- 3. opening the card ------------------------------------- */
  const cover  = $("#cover");
  const invite = $("#invite");
  let opened = false;

  function unlockScroll() {
    document.body.classList.remove("is-locked");
    document.body.style.position = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  function openCard() {
    if (opened) return;
    opened = true;

    cover.classList.add("is-open");
    const wait = reduced ? 0 : 520;

    setTimeout(() => {
      unlockScroll();
      window.scrollTo(0, 0);
      invite.removeAttribute("inert");
      invite.classList.add("is-visible");
      startReveals();
      showMusic();
    }, wait);

    /* The cover is taken out of the page entirely once it has swung open.
       visibility:hidden alone can still swallow touches on some phones. */
    setTimeout(() => {
      cover.classList.add("is-gone");
      cover.style.display = "none";
      unlockScroll();
    }, reduced ? 60 : 1650);
  }

  const openBtn = $("#openBtn");
  if (openBtn) openBtn.addEventListener("click", openCard);
  // the whole card is tappable, but the button stays the accessible control
  cover.addEventListener("click", openCard);

  /* ---------- 4. scroll reveals + gentle corner drift ------------------ */
  let revealsOn = false;
  function startReveals() {
    if (revealsOn) return;
    revealsOn = true;

    if (reduced || !("IntersectionObserver" in window)) {
      $$(".reveal").forEach(el => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });

    $$(".reveal").forEach(el => io.observe(el));

    /* Safety net: whatever is already on screen shows at once, and nothing
       stays invisible for more than a couple of seconds. */
    $$(".reveal").forEach(el => {
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) el.classList.add("is-in");
    });
    setTimeout(() => $$(".reveal").forEach(el => el.classList.add("is-in")), 2500);

    const sheets = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle("is-near", e.isIntersecting));
    }, { threshold: 0.3 });
    $$(".sheet").forEach(el => sheets.observe(el));
  }

  /* ---------- 5. music ------------------------------------------------- */
  const audio = $("#audio");
  const musicBtn = $("#musicBtn");

  function showMusic() {
    if (!CONFIG.musicFile || !audio || !musicBtn) return;
    audio.src = CONFIG.musicFile;
    audio.volume = CONFIG.musicVolume;
    musicBtn.hidden = false;

    musicBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          musicBtn.setAttribute("aria-pressed", "true");
          musicBtn.setAttribute("aria-label", "Pause background music");
        }).catch(() => { /* browser blocked it — leave the control as is */ });
      } else {
        audio.pause();
        musicBtn.setAttribute("aria-pressed", "false");
        musicBtn.setAttribute("aria-label", "Play background music");
      }
    });
  }

  /* ---------- 6. go ---------------------------------------------------- */
  /* Content filling is wrapped so that a typo in CONFIG can never stop the
     card from opening. Check the browser console if something looks blank. */
  try {
    fillText();
    fillPhoto();
    fillEvents();
    fillLinks();
    countdown();
  } catch (err) {
    console.error("Invitation content error:", err);
  }
})();
