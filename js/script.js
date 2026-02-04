document.addEventListener("DOMContentLoaded", function () {
  // Initialize Animate On Scroll (AOS)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Initialize Swiper for Testimonials
  const testimonialSwiper = new Swiper(".testimonials-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm");
      navbar.style.padding = "10px 0";
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.style.padding = "15px 0";
    }
  });
});
