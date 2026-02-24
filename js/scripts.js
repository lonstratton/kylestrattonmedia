/* ========================================
   KYLE STRATTON MEDIA
======================================== */

document.addEventListener("DOMContentLoaded", function () {

// ================================
// PORTFOLIO FILTERING (data-filter)
// ================================
(() => {
  const filterLinks = document.querySelectorAll(".filter-bar [data-filter]");
  const items = document.querySelectorAll(".works-page figure");

  if (!filterLinks.length || !items.length) return;

  function setActive(el) {
    filterLinks.forEach(a => a.classList.remove("buttonactive"));
    el.classList.add("buttonactive");
  }

  function applyFilter(filter) {
    if (filter === "all") {
      items.forEach(fig => fig.classList.remove("dimmed"));
      return;
    }
    items.forEach(fig => {
      // Your figures should have classes like: <figure class="sports video"> etc.
      fig.classList.toggle("dimmed", !fig.classList.contains(filter));
    });
  }

  filterLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // important if href="#"
      const filter = link.getAttribute("data-filter");
      if (!filter) return;

      setActive(link);
      applyFilter(filter);
    });
  });
})();
}); // End DOMContentLoaded


/* ----------------------------------------
   Mobile Hamburger Menu
---------------------------------------- */
(function () {

  const toggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (!toggle || !mobileNav) return;

  function closeMenu() {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  }

  function openMenu() {
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();

    const isOpen = document.body.classList.contains("nav-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking outside menu
  document.addEventListener("click", function (e) {
    if (
      document.body.classList.contains("nav-open") &&
      !mobileNav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close when clicking a link inside mobile menu
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

})();
    
/* ----------------------------------------
   Modal (Images + Iframe Videos)
---------------------------------------- */
(function () {
  const modal = document.getElementById("modal");
  if (!modal) return;

  const panel = modal.querySelector(".modal-panel");
  const imgWrap = modal.querySelector(".modal-image");
  const vidWrap = modal.querySelector(".modal-video");
  const img = document.getElementById("modal-img");
  const iframe = document.getElementById("modal-iframe");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.offsetHeight;
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // Hide both and clean sources
    if (imgWrap) imgWrap.hidden = true;
    if (vidWrap) vidWrap.hidden = true;

    if (img) img.src = "";
    if (iframe) iframe.removeAttribute("src");
  }

  function showImage(src, alt) {
    if (!imgWrap || !img) return;
    if (vidWrap) vidWrap.hidden = true;

    imgWrap.hidden = false;
    img.src = src;
    img.alt = alt || "";
    openModal();
  }

  function showVideo(src) {
    if (!vidWrap || !iframe) return;
    if (imgWrap) imgWrap.hidden = true;

    vidWrap.hidden = false;
    iframe.src = src;
    openModal();
  }

   // Close when clicking image
  if (imgWrap) {
    imgWrap.addEventListener("click", function () {
      closeModal();
    });
  }
  
  // Click-to-close: any element with [data-close]
  modal.addEventListener("click", (e) => {
    if (e.target && e.target.closest("[data-close]")) {
      closeModal();
    }
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Openers (event delegation)
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal]");
    if (!trigger) return;

    e.preventDefault();

    const type = trigger.getAttribute("data-modal"); // "image" or "video"

// IMAGE: pull src/alt from the <img> inside the trigger (no data-src needed)
if (type === "image") {
  const thumb = trigger.querySelector("img");
  const src = trigger.getAttribute("data-src") || thumb?.getAttribute("src");
  const alt = trigger.getAttribute("data-alt") || thumb?.getAttribute("alt") || "";

  if (!src) return;
  showImage(src, alt);
  return;
}

// VIDEO: still use data-src for iframe URLs
if (type === "video") {
  const src = trigger.getAttribute("data-src");
  if (!src) return;
  showVideo(src);
}
  });

  // Expose close if you ever need it from elsewhere (optional)
  window.ksmCloseModal = closeModal;
})();

/* ----------------------------------------
   iOS Hover Fix
---------------------------------------- */
document.addEventListener("touchstart", function () {}, true);