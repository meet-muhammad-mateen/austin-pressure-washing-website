/**
 * ============================================================================
 * Production Client Script
 * After Concept - Interactive UI Components & Animations
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initNavbarScroll();
  initMegaMenu();
  initMobileMenu();
  initCaseStudyCarousel();
  initContactForm();
  initCapabilitiesAccordion();
  initStatCounters();
});

/**
 * 1. Hero Background Slider
 * Handles automated background image cycling on the hero section.
 */
function initHeroSlider() {
  const heroSlides = document.querySelectorAll(".hero-img");
  if (!heroSlides.length) return;

  let currentSlide = 0;
  let interval = null;

  const goToSlide = (index) => {
    heroSlides[currentSlide].classList.remove("active");
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add("active");
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 2000);
  };

  const stopAutoPlay = () => {
    if (interval) clearInterval(interval);
  };

  startAutoPlay();
}

/**
 * 2. Sticky Navbar Scroll Effect
 * Transitions the header between transparent and solid brand navy on scroll.
 */
function initNavbarScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  const hasHero = document.querySelector(".hero-bg-slider") || document.querySelector(".hero-img") || document.querySelector("#heroBgSlider");
  if (!hasHero) {
    header.classList.remove("bg-white/0");
    header.classList.add("bg-[#060f1c]");
    return;
  }

  const handleScroll = () => {
    if (header.dataset.megaMenuOpen === "true") return;
    if (window.scrollY > 50) {
      header.classList.remove("bg-white/0");
      header.classList.add("bg-[#060f1c]");
    } else {
      header.classList.add("bg-white/0");
      header.classList.remove("bg-[#060f1c]", "bg-black", "shadow-md");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
}

/**
 * 3. Desktop Mega Menu
 * Controls mega menu open/close hover triggers and sidebar tab navigation.
 */
function initMegaMenu() {
  const header = document.querySelector("header");
  const megaMenuContainer = document.getElementById("megaMenuContainer");
  const dropdownLinks = document.querySelectorAll(".has-dropdown");

  if (!megaMenuContainer || !dropdownLinks.length) return;

    let menuTimeout = null;
  let closeAnimationTimeout = null;

  const showMegaMenu = () => {
    clearTimeout(menuTimeout);
    clearTimeout(closeAnimationTimeout);
    
    // Make it visible first
    megaMenuContainer.classList.remove("invisible");
    
    // Force a reflow
    void megaMenuContainer.offsetWidth;
    
    megaMenuContainer.classList.remove("opacity-0", "scale-y-95", "translate-y-2");
    megaMenuContainer.classList.add("opacity-100", "scale-y-100", "translate-y-0");
    
    if (header) {
      header.classList.remove("bg-white/0", "bg-[#060f1c]");
      header.classList.add("bg-white");
      header.dataset.megaMenuOpen = "true";
      
      const navLinks = document.getElementById("navLinksContainer");
      if (navLinks) {
        navLinks.classList.remove("text-white");
        navLinks.classList.add("text-black");
      }
    }
  };

  const hideMegaMenu = () => {
    menuTimeout = setTimeout(() => {
      // Start the closing animation
      megaMenuContainer.classList.remove("opacity-100", "scale-y-100", "translate-y-0");
      megaMenuContainer.classList.add("opacity-0", "scale-y-95", "translate-y-2");
      
      if (header) {
        header.classList.remove("bg-white");
        header.dataset.megaMenuOpen = "false";
        
        if (window.scrollY > 50) {
          header.classList.add("bg-[#060f1c]");
        } else {
          header.classList.add("bg-white/0");
        }
        
        const navLinks = document.getElementById("navLinksContainer");
        if (navLinks) {
          navLinks.classList.remove("text-black");
          navLinks.classList.add("text-white");
        }
      }
      
      // Wait for the animation to finish before making it invisible
      closeAnimationTimeout = setTimeout(() => {
        megaMenuContainer.classList.add("invisible");
      }, 500); // matches the duration-500 class
    }, 100); // small delay before closing to prevent accidental close
  };
  dropdownLinks.forEach((link) => {
    link.addEventListener("mouseenter", showMegaMenu);
    link.addEventListener("mouseleave", hideMegaMenu);
  });

  megaMenuContainer.addEventListener("mouseenter", showMegaMenu);
  megaMenuContainer.addEventListener("mouseleave", hideMegaMenu);

  // Sidebar Category Tabs inside Mega Menu
  const sidebarButtons = megaMenuContainer.querySelectorAll("button.text-left");
  if (sidebarButtons.length) {
    sidebarButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sidebarButtons.forEach((b) => {
          b.classList.remove("bg-blue-50", "text-black");
          b.classList.add("text-gray-700");
        });
        btn.classList.add("bg-blue-50", "text-black");
        btn.classList.remove("text-gray-700");
      });
    });

    if (sidebarButtons[0]) {
      sidebarButtons[0].classList.add("bg-blue-50", "text-black");
      sidebarButtons[0].classList.remove("text-gray-700");
    }
  }
}

/**
 * 4. Mobile Menu
 * Toggles fullscreen mobile navigation overlay and animated icon state.
 */
function initMobileMenu() {
  const header = document.querySelector("header");
  const megaMenuContainer = document.getElementById("megaMenuContainer");
  const hamburgerBtn = document.querySelector('button[aria-label="Toggle menu"]');

  if (!hamburgerBtn || !megaMenuContainer) return;

  let isOpen = false;

  hamburgerBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      megaMenuContainer.classList.remove("hidden", "lg:block", "opacity-0", "scale-y-95", "invisible");
      megaMenuContainer.classList.add("block", "opacity-100", "scale-y-100", "visible");
      megaMenuContainer.style.height = "calc(100dvh - 80px)";

      if (header) {
        header.classList.remove("bg-white/0");
        header.classList.add("bg-[#060f1c]");
      }

      const svg = hamburgerBtn.querySelector("svg");
      if (svg) svg.querySelector("path")?.setAttribute("d", "M6 18L18 6M6 6l12 12");
    } else {
      megaMenuContainer.classList.add("hidden", "lg:block", "opacity-0", "scale-y-95", "invisible");
      megaMenuContainer.classList.remove("block", "opacity-100", "scale-y-100", "visible");
      megaMenuContainer.style.height = "auto";

      if (window.scrollY <= 50 && header) {
        header.classList.add("bg-white/0");
        header.classList.remove("bg-[#060f1c]", "bg-black", "shadow-md");
      }

      const svg = hamburgerBtn.querySelector("svg");
      if (svg) svg.querySelector("path")?.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
  });
}

/**
 * 5. Case Study Carousel
 * Controls the sliding stack animation and active pagination dots.
 */
function initCaseStudyCarousel() {
  const caseSlides = document.querySelectorAll(".case-study-slide");
  const prevBtn = document.querySelector('button[aria-label="Previous slide"]');
  const nextBtn = document.querySelector('button[aria-label="Next slide"]');
  const paginationDots = document.querySelectorAll('button[aria-label^="Go to slide"]');

  if (!caseSlides.length) return;

  let currentCaseSlide = 0;
  let isTransitioning = false;

  const updatePaginationDots = () => {
    paginationDots.forEach((dot, index) => {
      const ring = dot.querySelector("div:first-child");
      const innerDot = dot.querySelector("div:last-child");
      if (!ring || !innerDot) return;

      if (index === currentCaseSlide % paginationDots.length) {
        ring.classList.remove("opacity-0", "scale-50");
        ring.classList.add("opacity-100", "scale-100");
        innerDot.classList.remove("bg-[#bfdbfe]");
        innerDot.classList.add("bg-[#0a76db]");
        innerDot.style.backgroundColor = "#0a76db";
        innerDot.style.width = "";
        innerDot.style.height = "";
      } else {
        ring.classList.add("opacity-0", "scale-50");
        ring.classList.remove("opacity-100", "scale-100");
        innerDot.classList.add("bg-[#bfdbfe]");
        innerDot.classList.remove("bg-[#0a76db]");
        innerDot.style.backgroundColor = "#bfdbfe";
      }
    });
  };

  const goToCaseSlide = (index, dir = 1) => {
    if (isTransitioning || index === currentCaseSlide) return;
    isTransitioning = true;

    const oldSlideIndex = currentCaseSlide;
    currentCaseSlide = (index + caseSlides.length) % caseSlides.length;

    const oldSlide = caseSlides[oldSlideIndex];
    const newSlide = caseSlides[currentCaseSlide];

    caseSlides.forEach((slide, i) => {
      if (i !== oldSlideIndex && i !== currentCaseSlide) {
        slide.style.zIndex = "0";
        slide.style.visibility = "hidden";
        slide.style.animation = "none";
        slide.style.pointerEvents = "none";
      }
    });

    if (oldSlide) {
      oldSlide.style.zIndex = "10";
      oldSlide.style.visibility = "visible";
      oldSlide.style.animation = "none";
      oldSlide.style.transform = "translate3d(0, 0, 0)";
      oldSlide.style.pointerEvents = "none";
    }

    if (newSlide) {
      newSlide.style.zIndex = "20";
      newSlide.style.visibility = "visible";
      newSlide.style.pointerEvents = "auto";
      newSlide.style.animation = "none";
      void newSlide.offsetWidth; // Force DOM reflow to re-trigger CSS keyframes
      newSlide.style.animation = dir === 1 
        ? "carouselSlideInRight 800ms cubic-bezier(0.33, 1, 0.68, 1) forwards"
        : "carouselSlideInLeft 800ms cubic-bezier(0.33, 1, 0.68, 1) forwards";
    }

    updatePaginationDots();

    setTimeout(() => {
      isTransitioning = false;
      if (oldSlide) {
        oldSlide.style.zIndex = "0";
        oldSlide.style.visibility = "hidden";
      }
    }, 800);
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToCaseSlide(currentCaseSlide - 1, -1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToCaseSlide(currentCaseSlide + 1, 1));
  }

  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (index === currentCaseSlide) return;
      const dir = index > currentCaseSlide ? 1 : -1;
      goToCaseSlide(index, dir);
    });
  });

  
  // Auto-play for Case Study Carousel
  let autoPlayInterval1;
  const startAutoPlay1 = () => {
    autoPlayInterval1 = setInterval(() => {
      goToCaseSlide(currentCaseSlide + 1, 1);
    }, 2000);
  };
  const stopAutoPlay1 = () => {
    clearInterval(autoPlayInterval1);
  };
  
  // Start autoplay initially
  startAutoPlay1();
  
  // Pause on hover
  const carouselContainer1 = document.querySelector('.case-study-slide').parentElement;
  if (carouselContainer1) {
    carouselContainer1.addEventListener('mouseenter', stopAutoPlay1);
    carouselContainer1.addEventListener('mouseleave', startAutoPlay1);
  }

  
  // Auto-play for New Carousel
  let autoPlayInterval2;
  const startAutoPlay2 = () => {
    autoPlayInterval2 = setInterval(() => {
      goToCaseSlide(currentCaseSlide + 1, 1);
    }, 2000);
  };
  const stopAutoPlay2 = () => {
    clearInterval(autoPlayInterval2);
  };
  
  // Start autoplay initially
  startAutoPlay2();
  
  // Pause on hover
  const carouselContainer2 = document.querySelector('.new-carousel-slide').parentElement;
  if (carouselContainer2) {
    carouselContainer2.addEventListener('mouseenter', stopAutoPlay2);
    carouselContainer2.addEventListener('mouseleave', startAutoPlay2);
  }

  // Initial display setup
  caseSlides.forEach((slide, i) => {
    if (i === 0) {
      slide.style.zIndex = "20";
      slide.style.visibility = "visible";
      slide.style.pointerEvents = "auto";
      slide.style.transform = "translate3d(0, 0, 0)";
      slide.style.animation = "none";
    } else {
      slide.style.zIndex = "0";
      slide.style.visibility = "hidden";
      slide.style.pointerEvents = "none";
      slide.style.animation = "none";
    }
  });
}

/**
 * 6. Contact Form Validation & State
 * Handles client-side field validation and feedback indicator.
 */
function initContactForm() {
  const contactForm = document.querySelector("form.flex.flex-col.gap-5");
  const submitBtn = contactForm ? contactForm.querySelector('button[type="button"]') : null;

  if (!submitBtn || !contactForm) return;

  submitBtn.addEventListener("click", () => {
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.type === "checkbox") return;
      const value = input.value.trim();
      if (!value) {
        isValid = false;
        input.style.borderColor = "#ef4444";
      } else {
        input.style.borderColor = "#d1d5db";
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    submitBtn.textContent = "Message Sent! Redirecting...";
    submitBtn.classList.remove("bg-[#0d6efd]", "hover:bg-blue-700");
    submitBtn.classList.add("bg-green-600");
    submitBtn.disabled = true;

    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 1200);
  });
}

/**
 * 7. Core Capabilities Accordion
 * Handles accordion expand/collapse and switches the featured capability preview image.
 */
function initCapabilitiesAccordion() {
  const accordionTiles = document.querySelectorAll(".tile-container");
  if (!accordionTiles.length) return;

  const previewImages = [
    "./images/residential%20pressure%20wash.webp",
    "./images/Driveway%20pressure%20wash%20cleaning.webp",
    "./images/Sideways%20washing.webp",
    "./images/pool%20pressure%20washing.webp",
    "./images/fence%20pressure%20washing.webp",
    "./images/roof%20soft%20wash.webp",
    "./images/limestone.webp",
    "./images/oil%20rust%20washing.webp"
  ];

  const mainImg = document.querySelector(".main-img");

  const updatePreviewImage = (index) => {
    if (!mainImg || !previewImages[index]) return;
    mainImg.style.backgroundImage = `url("${previewImages[index]}")`;
  };

  accordionTiles.forEach((tile, index) => {
    const header = tile.children[0];
    const content = tile.children[1];
    const icon = header ? header.querySelector("div:last-child") : null;

    if (!header) return;

    header.addEventListener("click", () => {
      // Close all other accordion tiles
      accordionTiles.forEach((otherTile, otherIndex) => {
        if (index !== otherIndex) {
          if (otherTile.children[1]) otherTile.children[1].style.display = "none";
          const otherIcon = otherTile.children[0]?.querySelector("div:last-child");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Toggle clicked accordion tile
      if (content) {
        const isClosed = content.style.display === "none" || content.style.display === "";
        if (isClosed) {
          content.style.display = "flex";
          if (icon) icon.style.transform = "rotate(180deg)";
          updatePreviewImage(index);
        } else {
          content.style.display = "none";
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      }
    });
  });
}

/**
 * 8. Animated Stat Counters
 * Uses IntersectionObserver to trigger smooth number increment animation on scroll.
 */
function initStatCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = Number(counter.getAttribute("data-target")) || 0;
          let current = 0;
          const duration = 800; // Complete animation in 0.8s
          const increment = target / (duration / 16);

          const step = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(step);
            } else {
              counter.innerText = target;
            }
          };

          step();
          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * New Carousel Control
 */
function initNewCarousel() {
  const caseSlides = document.querySelectorAll(".new-carousel-slide");
  const prevBtn = document.querySelector('button[aria-label="Previous new slide"]');
  const nextBtn = document.querySelector('button[aria-label="Next new slide"]');
  const paginationDots = document.querySelectorAll('button[aria-label^="Go to new slide"]');

  if (!caseSlides.length) return;

  let currentCaseSlide = 0;
  let isTransitioning = false;

  const updatePaginationDots = () => {
    paginationDots.forEach((dot, index) => {
      const ring = dot.querySelector("div:first-child");
      const innerDot = dot.querySelector("div:last-child");
      if (!ring || !innerDot) return;

      if (index === currentCaseSlide % paginationDots.length) {
        ring.classList.remove("opacity-0", "scale-50");
        ring.classList.add("opacity-100", "scale-100");
        innerDot.classList.remove("bg-[#bfdbfe]"); // Updated color match from HTML
        innerDot.classList.add("bg-[#0a76db]");
        innerDot.style.backgroundColor = "#0a76db";
        innerDot.style.width = "";
        innerDot.style.height = "";
      } else {
        ring.classList.add("opacity-0", "scale-50");
        ring.classList.remove("opacity-100", "scale-100");
        innerDot.classList.add("bg-[#bfdbfe]");
        innerDot.classList.remove("bg-[#0a76db]");
        innerDot.style.backgroundColor = "#bfdbfe";
      }
    });
  };

  const goToCaseSlide = (index, dir = 1) => {
    if (isTransitioning || index === currentCaseSlide) return;
    isTransitioning = true;

    const oldSlideIndex = currentCaseSlide;
    currentCaseSlide = (index + caseSlides.length) % caseSlides.length;

    const oldSlide = caseSlides[oldSlideIndex];
    const newSlide = caseSlides[currentCaseSlide];

    caseSlides.forEach((slide, i) => {
      if (i !== oldSlideIndex && i !== currentCaseSlide) {
        slide.style.zIndex = "0";
        slide.style.visibility = "hidden";
        slide.style.animation = "none";
        slide.style.pointerEvents = "none";
      }
    });

    if (oldSlide) {
      oldSlide.style.zIndex = "10";
      oldSlide.style.visibility = "visible";
      oldSlide.style.animation = "none";
      oldSlide.style.transform = "translate3d(0, 0, 0)";
      oldSlide.style.pointerEvents = "none";
      
      const onOldAnimationEnd = () => {
        oldSlide.style.zIndex = "0";
        oldSlide.style.visibility = "hidden";
        oldSlide.removeEventListener("animationend", onOldAnimationEnd);
      };
      
      // oldSlide.addEventListener("animationend", onOldAnimationEnd); 
      // The original script just hides it later or relies on the new slide covering it up.
      // Let's copy exactly what the original does below.
    }

    if (newSlide) {
      newSlide.style.zIndex = "20";
      newSlide.style.visibility = "visible";
      newSlide.style.pointerEvents = "auto";
      newSlide.style.animation = "none";
      void newSlide.offsetWidth; // Force DOM reflow
      newSlide.style.animation = dir === 1 
        ? "carouselSlideInRight 800ms cubic-bezier(0.33, 1, 0.68, 1) forwards"
        : "carouselSlideInLeft 800ms cubic-bezier(0.33, 1, 0.68, 1) forwards";

      const onAnimationEnd = () => {
        isTransitioning = false;
        newSlide.removeEventListener("animationend", onAnimationEnd);
        if (oldSlide) {
          oldSlide.style.zIndex = "0";
          oldSlide.style.visibility = "hidden";
        }
      };
      newSlide.addEventListener("animationend", onAnimationEnd);
    }
    updatePaginationDots();
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToCaseSlide(currentCaseSlide - 1, -1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToCaseSlide(currentCaseSlide + 1, 1));
  }

  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (index === currentCaseSlide) return;
      const dir = index > currentCaseSlide ? 1 : -1;
      goToCaseSlide(index, dir);
    });
  });

    // Auto-play for New Carousel
  let autoPlayInterval2;
  const startAutoPlay2 = () => {
    autoPlayInterval2 = setInterval(() => {
      goToCaseSlide(currentCaseSlide + 1, 1);
    }, 2000);
  };
  const stopAutoPlay2 = () => {
    clearInterval(autoPlayInterval2);
  };
  
  startAutoPlay2();
  
  const carouselContainer2 = document.querySelector('.new-carousel-slide').parentElement;
  if (carouselContainer2) {
    carouselContainer2.addEventListener('mouseenter', stopAutoPlay2);
    carouselContainer2.addEventListener('mouseleave', startAutoPlay2);
  }

  updatePaginationDots();
}


document.addEventListener('DOMContentLoaded', initNewCarousel);
