/* =============================================================================
   Maxime Cortes — portfolio
   JavaScript vanilla, sans dépendance.
   ========================================================================== */
(function () {
  "use strict";

  /* --- Révélation au défilement ------------------------------------------ */
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
