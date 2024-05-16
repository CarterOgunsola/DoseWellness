const paths = document.querySelectorAll(".navigation_circle path");

// Set up the initial state for each path and adjust the visibility of .w--current elements
paths.forEach((path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;

  const parentLink = path.closest(".navigation_link");
  if (parentLink.classList.contains("w--current")) {
    parentLink.style.opacity = 1; // Ensure .w--current links are always visible
    path.style.strokeDashoffset = 0; // Ensure the path of .w--current is fully drawn
  } else {
    path.style.strokeDashoffset = length; // Hide the path initially
  }
});

const navLinks = document.querySelectorAll(".navigation_link");

navLinks.forEach((link) => {
  const circlePath = link.querySelector(".navigation_circle path");
  const length = circlePath.getTotalLength();

  // Hover in
  link.addEventListener("mouseenter", () => {
    gsap.to(circlePath, {
      strokeDashoffset: 0,
      duration: 0.6, // Adjust the duration as needed
      ease: "power2.out", // Choose an easing function
    });
  });

  // Hover out - but only if the link does not have the .w--current class
  link.addEventListener("mouseleave", () => {
    if (!link.classList.contains("w--current")) {
      gsap.to(circlePath, {
        strokeDashoffset: length,
        duration: 0.4, // Adjust the duration as needed
        ease: "power2.out", // Choose an easing function
      });
    }
  });
});

//swiper
function animateSliderCard(card, delay) {
  gsap.from(card, {
    x: "40%",
    opacity: 1,
    duration: 1.2,
    ease: "power3.inOut",
    delay: delay,
  });
}

// Use ScrollTrigger to trigger animations when scrolling into the main swiper component
document
  .querySelectorAll(".slider-main_component[data-swiper='slide-in']")
  .forEach((component, index) => {
    let loopMode = component.getAttribute("loop-mode") === "true";
    let sliderDuration = component.getAttribute("slider-duration")
      ? parseInt(component.getAttribute("slider-duration"), 10)
      : 300;

    const swiper = new Swiper(component.querySelector(".swiper"), {
      speed: sliderDuration,
      loop: loopMode,
      autoHeight: true,
      centeredSlides: loopMode,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: "4%",
      rewind: false,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: "4%",
        },
        768: {
          slidesPerView: 2,
          spaceBetween: "4%",
        },
        992: {
          slidesPerView: 3,
          spaceBetween: "2%",
        },
      },
      pagination: {
        el: component.querySelector(".swiper-bullet-wrapper"),
        bulletActiveClass: "is-active",
        bulletClass: "swiper-bullet",
        bulletElement: "button",
        clickable: true,
      },
      navigation: {
        nextEl: component.querySelector(".swiper-next"),
        prevEl: component.querySelector(".swiper-prev"),
        disabledClass: "is-disabled",
      },
      scrollbar: {
        el: component.querySelector(".swiper-drag-wrapper"),
        draggable: true,
        dragClass: "swiper-drag",
        snapOnRelease: true,
      },
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
    });

    const sliderCards = component.querySelectorAll(".swiper-slide");

    sliderCards.forEach((card, cardIndex) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        onEnter: () => animateSliderCard(card, cardIndex * 0.2),
      });
    });

    function formatNumber(number) {
      return number < 10 ? `0${number}` : number;
    }

    const reviewsSwiper = new Swiper(".swiper.is-reviews", {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-reviews-next",
        prevEl: ".swiper-reviews-prev",
      },
      on: {
        init: function () {
          const totalSlides = this.slides.length - this.loopedSlides * 2; // Adjust for loop duplicates
          document.querySelector("[reviews-swiper=total]").textContent =
            formatNumber(totalSlides);
          document.querySelector("[reviews-swiper=current]").textContent =
            formatNumber(this.realIndex + 1);
        },
        slideChange: function () {
          document.querySelector("[reviews-swiper=current]").textContent =
            formatNumber(this.realIndex + 1);
        },
      },
    });

    // Initialize the Swiper
    reviewsSwiper.init();
  });

document.querySelectorAll("[pg-truncate]").forEach((paragraph) => {
  const maxLength = parseInt(paragraph.getAttribute("pg-truncate"), 10);
  const fullText = paragraph.textContent;
  if (fullText.length > maxLength) {
    const truncatedText = fullText.substr(0, maxLength) + "... ";
    const moreLink = document.createElement("a");
    moreLink.href = paragraph.getAttribute("pg-more-link"); // Get the link from the attribute
    moreLink.textContent = "More";
    moreLink.target = "_blank"; // Open in new tab
    moreLink.rel = "noopener noreferrer"; // Security measure

    // Replace paragraph text with truncated version and append "More" link
    paragraph.textContent = truncatedText;
    paragraph.appendChild(moreLink);
  }
});

// MARQUEE POWER-UP START
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // marquee component
  $("[tr-marquee-element='component']").each(function (index) {
    let componentEl = $(this),
      panelEl = componentEl.find("[tr-marquee-element='panel']"),
      triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']"),
      triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']");
    let speedSetting = attr(100, componentEl.attr("tr-marquee-speed")),
      verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical")),
      reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse")),
      scrollDirectionSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrolldirection"),
      ),
      scrollScrubSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrollscrub"),
      ),
      moveDistanceSetting = -100,
      timeScaleSetting = 1,
      pausedStateSetting = false;
    if (reverseSetting) moveDistanceSetting = 100;
    let marqueeTimeline = gsap.timeline({
      repeat: -1,
      onReverseComplete: () => marqueeTimeline.progress(1),
    });
    if (verticalSetting) {
      speedSetting = panelEl.first().height() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { yPercent: 0 },
        { yPercent: moveDistanceSetting, ease: "none", duration: speedSetting },
      );
    } else {
      speedSetting = panelEl.first().width() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { xPercent: 0 },
        { xPercent: moveDistanceSetting, ease: "none", duration: speedSetting },
      );
    }
    let scrubObject = { value: 1 };
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!pausedStateSetting) {
          if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
            timeScaleSetting = self.direction;
            marqueeTimeline.timeScale(self.direction);
          }
          if (scrollScrubSetting) {
            let v = self.getVelocity() * 0.006;
            v = gsap.utils.clamp(-60, 60, v);
            let scrubTimeline = gsap.timeline({
              onUpdate: () => marqueeTimeline.timeScale(scrubObject.value),
            });
            scrubTimeline.fromTo(
              scrubObject,
              { value: v },
              { value: timeScaleSetting, duration: 0.5 },
            );
          }
        }
      },
    });
    function pauseMarquee(isPausing) {
      pausedStateSetting = isPausing;
      let pauseObject = { value: 1 };
      let pauseTimeline = gsap.timeline({
        onUpdate: () => marqueeTimeline.timeScale(pauseObject.value),
      });
      if (isPausing) {
        pauseTimeline.fromTo(
          pauseObject,
          { value: timeScaleSetting },
          { value: 0, duration: 0.5 },
        );
        triggerClickEl.addClass("is-paused");
      } else {
        pauseTimeline.fromTo(
          pauseObject,
          { value: 0 },
          { value: timeScaleSetting, duration: 0.5 },
        );
        triggerClickEl.removeClass("is-paused");
      }
    }
    if (window.matchMedia("(pointer: fine)").matches) {
      triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
      triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
    }
    triggerClickEl.on("click", function () {
      !$(this).hasClass("is-paused") ? pauseMarquee(true) : pauseMarquee(false);
    });
  });
});
// MARQUEE POWER UP END

//text animation start

document.addEventListener("DOMContentLoaded", function () {
  // Initialize SplitType on all elements with 'animate' and 'animate-meta' attributes
  let typeSplit = new SplitType("[animate], [animate-meta]", {
    types: "lines, words, chars",
    tagName: "span",
  });

  // GSAP animation for lines in elements with 'animate' attribute
  document.querySelectorAll("[animate]").forEach(function (elem) {
    gsap.from(elem.querySelectorAll(".line"), {
      y: "100%",
      opacity: 0,
      duration: 0.65,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: elem,
        start: "top bottom",
      },
    });
  });

  // GSAP animation for words in elements with 'animate-meta' attribute
  document.querySelectorAll("[animate-meta]").forEach(function (elem) {
    gsap.from(elem.querySelectorAll(".word"), {
      y: "110%",
      opacity: 0,
      rotationZ: "10",
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: elem,
        start: "top bottom",
      },
    });
  });
});

//text animation end

console.log("csb git");
