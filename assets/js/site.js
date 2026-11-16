/* HM Schoonmaakdiensten — interactie */
(function () {
  "use strict";

  var $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  /* ---------- Mobiel menu ---------- */

  var menuToggle = $("#menu-toggle");
  var mobileNav = $("#mobile-nav");
  var menuIconUse = menuToggle ? menuToggle.querySelector("use") : null;

  function setMenu(open) {
    if (!menuToggle || !mobileNav) return;
    mobileNav.hidden = !open;
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    if (menuIconUse) {
      menuIconUse.setAttribute("href", open ? "#i-close" : "#i-menu");
    }
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      setMenu(mobileNav.hidden);
    });

    $$("a", mobileNav).forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !mobileNav.hidden) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  /* ---------- Header bij scrollen ---------- */

  var header = $("#site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Actieve sectie in navigatie ---------- */

  var navLinks = $$('.nav a[href^="#"], .mobile-nav a[href^="#"]');
  var sectionIds = ["diensten", "sectoren", "werken-bij", "contact"];
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function markActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });
        var current = null;
        sectionIds.forEach(function (id) {
          if (visible[id] && !current) current = id;
        });
        if (current) {
          markActive(current);
        } else {
          navLinks.forEach(function (link) {
            link.removeAttribute("aria-current");
          });
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Offerteformulier ---------- */

  var form = $("#quote-form");
  var summary = $("#quote-summary");
  var summaryList = $("#summary-list");
  var whatsappLink = $("#send-whatsapp");
  var copyButton = $("#copy-request");
  var copyStatus = $("#copy-status");
  var editButton = $("#edit-request");
  var nextButton = $("#quote-next");
  var backButton = $("#quote-back");
  var submitButton = $("#quote-submit");
  var steps = $$(".form-step", form || document);
  var indicators = $$(".stepper__step");
  var currentStep = 1;
  var currentMessage = "";
  var statusTimer = null;

  var labels = {
    sector: "Sector",
    dienst: "Dienst",
    frequentie: "Frequentie",
    start: "Gewenste start",
    naam: "Naam",
    bedrijf: "Bedrijfsnaam",
    telefoon: "Telefoon",
    email: "E-mail",
    plaats: "Plaats",
    postcode: "Postcode",
    toelichting: "Toelichting"
  };

  function value(name) {
    if (!form) return "";
    var el = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : "";
  }

  function fieldValue(name) {
    if (!form) return "";
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : "";
  }

  function setError(step, message) {
    if (!form) return;
    var el = form.querySelector('[data-error="' + step + '"]');
    if (el) el.textContent = message || "";
  }

  function clearErrors() {
    if (!form) return;
    $$("[data-error]", form).forEach(function (el) { el.textContent = ""; });
  }

  function showStep(step) {
    currentStep = step;
    steps.forEach(function (el) {
      el.hidden = Number(el.getAttribute("data-step")) !== step;
    });
    indicators.forEach(function (el) {
      var n = Number(el.getAttribute("data-step-indicator"));
      el.classList.toggle("is-active", n === step);
      el.classList.toggle("is-done", n < step);
      if (n === step) {
        el.setAttribute("aria-current", "step");
      } else {
        el.removeAttribute("aria-current");
      }
    });
    if (backButton) backButton.hidden = step === 1;
    if (nextButton) nextButton.hidden = step === 4;
    if (submitButton) submitButton.hidden = step !== 4;
    clearErrors();
    var panel = steps[step - 1];
    if (panel) {
      window.setTimeout(function () { panel.focus({ preventScroll: true }); }, 30);
    }
    scrollToStepper();
  }

  function scrollToStepper() {
    var stepper = $("#quote-stepper");
    if (!stepper) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(function () {
      stepper.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 40);
  }

  function selectedRadio(name) {
    return form ? form.querySelector('[name="' + name + '"]:checked') : null;
  }

  function focusRadio(name) {
    var radio = form ? form.querySelector('[name="' + name + '"]') : null;
    if (radio) radio.focus({ preventScroll: false });
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateStep(step) {
    if (!form) return true;

    if (step === 1 && !selectedRadio("sector")) {
      setError(1, "Kies een sector om verder te gaan.");
      focusRadio("sector");
      return false;
    }

    if (step === 2 && !selectedRadio("dienst")) {
      setError(2, "Kies een dienst om verder te gaan.");
      focusRadio("dienst");
      return false;
    }

    if (step === 3) {
      if (!selectedRadio("frequentie")) {
        setError(3, "Geef aan hoe vaak de schoonmaak moet plaatsvinden.");
        focusRadio("frequentie");
        return false;
      }
      if (!selectedRadio("start")) {
        setError(3, "Geef aan wanneer u wilt starten.");
        focusRadio("start");
        return false;
      }
    }

    if (step === 4) {
      var naam = fieldValue("naam");
      var plaats = fieldValue("plaats");
      var telefoon = fieldValue("telefoon");
      var email = fieldValue("email");

      if (!naam) {
        setError(4, "Vul uw naam in.");
        var naamField = $("#q-naam");
        if (naamField) naamField.focus();
        return false;
      }
      if (!plaats) {
        setError(4, "Vul uw plaats in.");
        var plaatsField = $("#q-plaats");
        if (plaatsField) plaatsField.focus();
        return false;
      }
      if (!telefoon && !email) {
        setError(4, "Vul een telefoonnummer of e-mailadres in, zodat we contact kunnen opnemen.");
        var telField = $("#q-telefoon");
        if (telField) telField.focus();
        return false;
      }
      if (email && !validEmail(email)) {
        setError(4, "Controleer het e-mailadres. Dit lijkt geen geldig adres.");
        var emailField = $("#q-email");
        if (emailField) emailField.focus();
        return false;
      }
      if (telefoon && telefoon.replace(/\D/g, "").length < 6) {
        setError(4, "Controleer het telefoonnummer.");
        var telField2 = $("#q-telefoon");
        if (telField2) telField2.focus();
        return false;
      }
    }

    setError(step, "");
    return true;
  }

  function summaryRows() {
    var rows = [
      ["sector", value("sector")],
      ["dienst", value("dienst")],
      ["frequentie", value("frequentie")],
      ["start", value("start")],
      ["naam", fieldValue("naam")],
      ["bedrijf", fieldValue("bedrijf")],
      ["telefoon", fieldValue("telefoon")],
      ["email", fieldValue("email")],
      ["plaats", fieldValue("plaats")],
      ["postcode", fieldValue("postcode")],
      ["toelichting", fieldValue("toelichting")]
    ];
    return rows.filter(function (row) { return row[1]; });
  }

  function buildMessage(rows) {
    var lines = ["Offerteaanvraag via hmschoonmaakdiensten.nl", ""];
    rows.forEach(function (row) {
      lines.push(labels[row[0]] + ": " + row[1]);
    });
    lines.push("");
    lines.push("Graag nemen jullie contact met mij op.");
    return lines.join("\n");
  }

  function renderSummary() {
    if (!summaryList) return;
    summaryList.textContent = "";
    var rows = summaryRows();
    rows.forEach(function (row) {
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = labels[row[0]];
      dd.textContent = row[1];
      summaryList.appendChild(dt);
      summaryList.appendChild(dd);
    });
    currentMessage = buildMessage(rows);
    if (whatsappLink) {
      whatsappLink.href =
        "https://wa.me/31639140047?text=" + encodeURIComponent(currentMessage);
    }
  }

  function showSummary() {
    if (!form || !summary) return;
    renderSummary();
    form.hidden = true;
    summary.hidden = false;
    if (copyStatus) copyStatus.textContent = "";
    window.setTimeout(function () {
      summary.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 30);
  }

  function backToForm() {
    if (!form || !summary) return;
    summary.hidden = true;
    form.hidden = false;
    showStep(4);
    var naamField = $("#q-naam");
    if (naamField) naamField.focus({ preventScroll: true });
  }

  /* ---------- Dynamische offerteachtergrond ---------- */

  var quoteBg = $(".quote__bg");
  var quoteBgTimer = null;

  var sectorImages = {
    Kantoor: "assets/img/bg-placeholder.svg",
    Retail: "assets/img/bg-placeholder.svg",
    Zorg: "assets/img/bg-placeholder.svg",
    Onderwijs: "assets/img/bg-placeholder.svg",
    Horeca: "assets/img/bg-placeholder.svg",
    Industrie: "assets/img/bg-placeholder.svg",
    Vastgoed: "assets/img/bg-placeholder.svg",
    Anders: "assets/img/bg-placeholder.svg"
  };

  var serviceImages = {
    Schoonmaakonderhoud: "assets/img/bg-placeholder.svg",
    Glasbewassing: "assets/img/bg-placeholder.svg",
    Vloeronderhoud: "assets/img/bg-placeholder.svg",
    "Sanitair en hygiëne": "assets/img/bg-placeholder.svg",
    "Eenmalige schoonmaak": "assets/img/bg-placeholder.svg",
    Buitenschoonmaak: "assets/img/bg-placeholder.svg",
    "Meerdere diensten": "assets/img/bg-placeholder.svg",
    "Weet ik nog niet": "assets/img/bg-placeholder.svg"
  };

  function setQuoteBg(src) {
    if (!quoteBg || !src) return;
    if (quoteBg.getAttribute("src") === src) return;
    quoteBg.style.opacity = "0";
    window.clearTimeout(quoteBgTimer);
    quoteBgTimer = window.setTimeout(function () {
      quoteBg.onload = function () {
        quoteBg.style.opacity = "1";
        quoteBg.onload = null;
      };
      quoteBg.src = src;
    }, 160);
  }

  if (form) {
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (!validateStep(currentStep)) return;
        if (currentStep < 4) showStep(currentStep + 1);
      });
    }

    if (backButton) {
      backButton.addEventListener("click", function () {
        if (currentStep > 1) showStep(currentStep - 1);
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateStep(4)) return;
      showSummary();
    });

    form.addEventListener("change", function (event) {
      var target = event.target;
      if (!target || !target.name) return;
      var step = Number(target.closest(".form-step") ? target.closest(".form-step").getAttribute("data-step") : 0);
      if (step) setError(step, "");
      if (target.name === "sector" && sectorImages[target.value]) {
        setQuoteBg(sectorImages[target.value]);
      }
      if (target.name === "dienst" && serviceImages[target.value]) {
        setQuoteBg(serviceImages[target.value]);
      }
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      if (!currentMessage) return;
      var done = function (ok) {
        if (!copyStatus) return;
        copyStatus.textContent = ok
          ? "De aanvraag staat op uw klembord. Plak deze in WhatsApp of een e-mail."
          : "Kopiëren lukt niet automatisch. Selecteer de tekst hierboven en kopieer handmatig.";
        window.clearTimeout(statusTimer);
        statusTimer = window.setTimeout(function () {
          if (copyStatus) copyStatus.textContent = "";
        }, 7000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentMessage).then(
          function () { done(true); },
          function () { done(false); }
        );
      } else {
        done(false);
      }
    });
  }

  if (editButton) {
    editButton.addEventListener("click", backToForm);
  }

  // Een branchekaart kiest de bijbehorende sector alvast voor.
  $$(".branch-card[data-sector]").forEach(function (card) {
    card.addEventListener("click", function () {
      if (!form) return;
      var wanted = card.getAttribute("data-sector");
      var radios = $$('input[name="sector"]', form);
      radios.forEach(function (radio) {
        if (radio.value === wanted) radio.checked = true;
      });
      setQuoteBg(sectorImages[wanted]);
    });
  });

  /* ---------- Hero-offerteformulier ---------- */

  var heroForm = $("#hero-form");
  if (heroForm) {
    heroForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = $("#hq-naam").value.trim();
      var contact = $("#hq-contact").value.trim();
      var message = $("#hq-bericht").value.trim();
      var error = $("#hero-error");
      var status = $("#hero-status");

      if (!name || !contact) {
        if (error) error.textContent = "Vul uw naam en een telefoonnummer of e-mailadres in.";
        return;
      }
      if (error) error.textContent = "";

      var text =
        "Offerteaanvraag via hmschoonmaakdiensten.nl\n\nNaam: " +
        name +
        "\nContact: " +
        contact +
        (message ? "\nToelichting: " + message : "");
      if (status) {
        status.textContent =
          "Uw aanvraag is klaar. WhatsApp opent in een nieuw venster; u kunt ook bellen of mailen.";
      }
      window.open(
        "https://wa.me/31639140047?text=" + encodeURIComponent(text),
        "_blank",
        "noopener"
      );
    });
  }

  /* ---------- Brancheslider ---------- */

  var branchGrid = $(".branch-grid");
  var branchCards = branchGrid ? $$(".branch-card", branchGrid) : [];
  var branchDots = $$(".branch-dot");
  var branchPrev = $("[data-branch-prev]");
  var branchNext = $("[data-branch-next]");
  var branchIndex = 0;
  var branchScrollTimer = null;
  var branchReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setBranchActive(index) {
    branchIndex = index;
    branchDots.forEach(function (dot, i) {
      var active = i === index;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function scrollToBranch(index) {
    if (!branchGrid || !branchCards.length) return;
    var target =
      ((index % branchCards.length) + branchCards.length) % branchCards.length;
    var card = branchCards[target];
    var left = card.offsetLeft - branchCards[0].offsetLeft;
    branchGrid.scrollTo({
      left: left,
      behavior: branchReduced ? "auto" : "smooth"
    });
    setBranchActive(target);
  }

  if (branchGrid && branchCards.length) {
    branchDots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        scrollToBranch(i);
      });
    });

    if (branchPrev) {
      branchPrev.addEventListener("click", function () {
        scrollToBranch(branchIndex - 1);
      });
    }

    if (branchNext) {
      branchNext.addEventListener("click", function () {
        scrollToBranch(branchIndex + 1);
      });
    }

    branchGrid.addEventListener(
      "scroll",
      function () {
        window.clearTimeout(branchScrollTimer);
        branchScrollTimer = window.setTimeout(function () {
          var step =
            branchCards.length > 1
              ? branchCards[1].offsetLeft - branchCards[0].offsetLeft
              : 1;
          var index = Math.round(branchGrid.scrollLeft / step);
          setBranchActive(
            Math.max(0, Math.min(branchCards.length - 1, index))
          );
        }, 80);
      },
      { passive: true }
    );
  }

  /* ---------- Branche-scrollbar (puur visueel) ---------- */

  var branchScrollbar = $(".branch-scrollbar");
  var branchThumb = $(".branch-scrollbar__thumb");

  function updateBranchScrollbar() {
    if (!branchGrid || !branchScrollbar || !branchThumb) return;

    var trackWidth = branchScrollbar.clientWidth;
    var maxScroll = branchGrid.scrollWidth - branchGrid.clientWidth;

    if (!trackWidth || maxScroll <= 1) {
      branchThumb.style.width = "0px";
      branchThumb.style.transform = "translateX(0)";
      return;
    }

    var thumbWidth = Math.max(
      (branchGrid.clientWidth / branchGrid.scrollWidth) * trackWidth,
      28
    );
    var maxLeft = Math.max(trackWidth - thumbWidth, 0);
    var left = (branchGrid.scrollLeft / maxScroll) * maxLeft;

    branchThumb.style.width = thumbWidth + "px";
    branchThumb.style.transform = "translateX(" + left + "px)";
  }

  if (branchGrid && branchScrollbar) {
    branchGrid.addEventListener("scroll", updateBranchScrollbar, { passive: true });
    window.addEventListener("resize", updateBranchScrollbar);
    window.addEventListener("load", updateBranchScrollbar);
    updateBranchScrollbar();
  }

  /* ---------- Chatfeed ---------- */

  var chatTrack = $(".chat-track");
  var chatMessages = chatTrack ? $$(".chat-card__message", chatTrack) : [];
  var chatGroupSize = Math.floor(chatMessages.length / 2);
  var chatIndex = 0;
  var chatTimer = null;
  var chatReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function chatStep() {
    if (!chatTrack || chatMessages.length < 2) return;

    chatIndex += 1;
    if (chatIndex >= chatMessages.length) chatIndex = 1;

    var target = chatMessages[chatIndex];
    var offset = target.offsetTop - chatMessages[0].offsetTop;
    chatTrack.style.transition =
      "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";
    chatTrack.style.transform = "translateY(-" + offset + "px)";

    if (chatIndex >= chatGroupSize) {
      window.setTimeout(function () {
        chatTrack.style.transition = "none";
        chatTrack.style.transform = "translateY(0)";
        chatIndex = 0;
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            chatTrack.style.transition = "";
          });
        });
      }, 700);
    }
  }

  function startChat() {
    if (chatReduced || !chatTrack || chatMessages.length < 2 || chatTimer) return;
    chatTimer = window.setInterval(chatStep, 3600);
  }

  function stopChat() {
    if (!chatTimer) return;
    window.clearInterval(chatTimer);
    chatTimer = null;
  }

  if (chatTrack) {
    startChat();
    var chatCard = chatTrack.closest(".chat-card");
    if (chatCard) {
      chatCard.addEventListener("mouseenter", stopChat);
      chatCard.addEventListener("mouseleave", startChat);
      chatCard.addEventListener("focusin", stopChat);
      chatCard.addEventListener("focusout", startChat);
    }
  }

  /* ---------- Cijfers tellen op ---------- */

  var counters = $$("[data-count]");
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          counterObserver.unobserve(entry.target);

          var el = entry.target;
          var target = Number(el.getAttribute("data-count"));
          if (!isFinite(target)) return;

          el.textContent = "0";
          var duration = 900;
          var start = null;

          function frame(now) {
            if (start === null) start = now;
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(target * eased));
            if (progress < 1) {
              window.requestAnimationFrame(frame);
            } else {
              el.textContent = String(target);
            }
          }

          window.requestAnimationFrame(frame);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ---------- Privacyvenster ---------- */

  var privacyDialog = $("#privacy-dialog");

  function openPrivacy() {
    if (!privacyDialog) return;
    if (typeof privacyDialog.showModal === "function") {
      privacyDialog.showModal();
    } else {
      privacyDialog.setAttribute("open", "");
    }
    var close = privacyDialog.querySelector("[data-close-dialog]");
    if (close) close.focus();
  }

  function closePrivacy() {
    if (!privacyDialog) return;
    if (typeof privacyDialog.close === "function") {
      privacyDialog.close();
    } else {
      privacyDialog.removeAttribute("open");
    }
  }

  $$("[data-open-privacy]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openPrivacy();
    });
  });

  if (privacyDialog) {
    var closeButton = privacyDialog.querySelector("[data-close-dialog]");
    if (closeButton) closeButton.addEventListener("click", closePrivacy);
    privacyDialog.addEventListener("click", function (event) {
      if (event.target === privacyDialog) closePrivacy();
    });
  }

  /* ---------- Jaartal ---------- */

  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
