/* =============================================================================
   Maxime Cortes — portfolio
   JavaScript vanilla, sans dépendance.
   ========================================================================== */
(function () {
  "use strict";

  /* ==========================================================================
     1. Bilingue FR / EN

     Le français est la langue par défaut : il vit directement dans le HTML.
     Seul l'anglais est stocké ici — les chaînes françaises sont capturées
     depuis le DOM au chargement. Une chaîne FR ne peut donc jamais désynchro-
     niser entre le HTML et le JS : il n'y en a qu'un seul exemplaire.
     ========================================================================== */
  var EN = {
    "skip": "Skip to content",

    "meta.title": "Maxime Cortes — Freelance React Native Mobile Developer",
    "meta.desc":
      "Freelance mobile developer, React Native / Expo. Your mobile app shipped to production, from specification to release on the App Store and Google Play.",

    "nav.work": "Case study",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.eyebrow": "Mobile development — from spec to the stores",
    "hero.title": "Your mobile app,<br />shipped to production.",
    "hero.lead":
      "Not a resume — proof: a complete app, designed and shipped solo, monetized, live on both stores.",
    "hero.cta1": "Let's talk about your project →",
    "hero.cta2": "See ChallengeTies",

    "facts.rateValue": "€450 / day",
    "facts.rate": "Day rate",
    "facts.startValue": "< 2 weeks",
    "facts.start": "Kick-off",
    "facts.remoteValue": "Full remote",
    "facts.remote": "France · UTC+1",

    "ct.eyebrow": "Live in production",
    "ct.subtitle": "— habits & duo",
    "ct.lead":
      "Designed, built and shipped solo, end to end: architecture, serverless backend, subscriptions, push notifications, 13 languages, store compliance.",
    "ct.alt.duo":
      "ChallengeTies duo challenge screen: two participants, progress bars and battle bar.",
    "ct.alt.defis": "ChallengeTies challenge catalogue, sorted by category.",
    "ct.alt.stats":
      "ChallengeTies statistics screen: success rate, trophies and activity calendar.",
    "ct.alt.classement":
      "ChallengeTies leaderboard with global, national and regional filters.",
    "ct.showcase": "Code & specs ↗",
    "ct.stackTitle": "Stack",
    "ct.tag.push": "Push notifications",
    "ct.tag.i18n": "i18n — 13 languages",
    "ct.hlTitle": "Engineering highlights",
    "ct.hl1.title": "RevenueCat subscriptions in production",
    "ct.hl1.body":
      "Paywall, in-app purchases on iOS and Android, subscription state handling and store compliance cleared on both platforms.",
    "ct.hl2.title": "OTA hotfix pipeline",
    "ct.hl2.body":
      "Bug caught in production (Sentry), fix developed, tested and shipped over-the-air on iOS and Android in under 4 hours, with no store re-review.",
    "ct.hl3.title": "Internationalization — 13 languages",
    "ct.hl3.body":
      "Full translation architecture covering the interface, the content and the localized store listings.",

    "off.eyebrow": "What I do for you",
    "off.title": "Services",
    "off.1.title": "Full mobile app development",
    "off.1.body":
      "From specification to release on both stores. Delivered in 6–8 weeks, clean documented TypeScript.",
    "off.2.title": "App rescue & takeover",
    "off.2.body":
      "Bugs, tech debt, blocked review, developer gone: I take over the project, stabilize, and ship.",
    "off.3.title": "Monetization & subscriptions",
    "off.3.body":
      "RevenueCat, paywalls, in-app purchases, compliance. Battle-tested in production on iOS and Android.",
    "off.terms": "Terms",
    "terms.rateValue": "€450 / day",
    "terms.rate": "Day rate",
    "terms.availValue": "10–12 d / month",
    "terms.avail": "Availability",
    "terms.startValue": "< 2 weeks",
    "terms.start": "Kick-off",
    "terms.depositValue": "40 %",
    "terms.deposit": "Upfront deposit",

    "pr.eyebrow": "Also in the portfolio",
    "pr.title": "Other work",
    "pr.unc.badge": "Client · Delivered",
    "pr.unc.body":
      "Full association website for the Union Nationale des Combattants des Pyrénées-Orientales: editorial pages, membership area and Firebase-managed content.",
    "pr.unc.link": "Visit the site ↗",

    "co.eyebrow": "Contact",
    "co.title": "A mobile project overflowing? Let's talk.",
    "co.mailLabel": "Email me",
    "co.phone": "Phone",
    "co.stores": "ChallengeTies",

    "footer.legal": "FR sole trader · EU invoicing · Full remote (UTC+1)",
  };

  var STORAGE_KEY = "mc-lang";
  var metaDesc = document.querySelector('meta[name="description"]');

  // Capture des chaînes françaises telles qu'écrites dans le HTML.
  var FR = {
    "meta.title": document.title,
    "meta.desc": metaDesc ? metaDesc.content : "",
  };

  var nodes = document.querySelectorAll("[data-i18n], [data-i18n-html], [data-i18n-alt]");

  nodes.forEach(function (el) {
    if (el.dataset.i18n) FR[el.dataset.i18n] = el.textContent.trim();
    if (el.dataset.i18nHtml) FR[el.dataset.i18nHtml] = el.innerHTML.trim();
    if (el.dataset.i18nAlt) FR[el.dataset.i18nAlt] = el.alt;
  });

  function translate(lang) {
    var dict = lang === "en" ? EN : FR;

    nodes.forEach(function (el) {
      var k;

      k = el.dataset.i18n;
      if (k && dict[k] !== undefined) el.textContent = dict[k];

      k = el.dataset.i18nHtml;
      if (k && dict[k] !== undefined) el.innerHTML = dict[k];

      k = el.dataset.i18nAlt;
      if (k && dict[k] !== undefined) el.alt = dict[k];
    });

    document.documentElement.lang = lang;
    if (dict["meta.title"]) document.title = dict["meta.title"];
    if (metaDesc && dict["meta.desc"]) metaDesc.content = dict["meta.desc"];

    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* mode privé : on ignore, la bascule reste fonctionnelle pour la session */
    }
  }

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      translate(btn.dataset.lang);
    });
  });

  // Français par défaut ; on ne rétablit l'anglais que s'il a été choisi.
  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    stored = null;
  }
  if (stored === "en") translate("en");

  /* ==========================================================================
     2. Révélation au défilement
     ========================================================================== */
  var revealables = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    // Navigateur ancien : on affiche tout immédiatement.
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  revealables.forEach(function (el) {
    observer.observe(el);
  });
})();
