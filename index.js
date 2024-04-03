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
    x: "100%",
    opacity: 0,
    duration: 1.4,
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

    const reviewsSwiper = new Swiper('.swiper.is-reviews', {
      // effect: "fade",
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".swiper-reviews-next",
        prevEl: ".swiper-reviews-prev"
      },
    });
  });

console.log("test");

