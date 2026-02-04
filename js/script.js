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
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.padding = '10px 0';
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.padding = '15px 0';
        }
    });

    // --- Search Functionality ---

    // 1. Home Page Search
    const homeSearchBtn = document.getElementById('homeSearchBtn');
    const homeSearchInput = document.getElementById('homeSearchInput');

    if (homeSearchBtn && homeSearchInput) {
        homeSearchBtn.addEventListener('click', function() {
            const query = homeSearchInput.value.trim();
            if (query) {
                window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        // Also allow pressing "Enter"
        homeSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = homeSearchInput.value.trim();
                if (query) {
                    window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // 2. Courses Page Search & Filter
    const courseSearchInput = document.getElementById('courseSearchInput');
    const courseContainer = document.getElementById('courseContainer');

    if (courseSearchInput && courseContainer) {
        // Filter function
        function filterCourses(searchTerm) {
            const cards = courseContainer.querySelectorAll('.col-lg-4');
            const term = searchTerm.toLowerCase();

            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const badge = card.querySelector('.badge').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();

                if (title.includes(term) || badge.includes(term) || description.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Check URL for search query on load
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        
        if (searchQuery) {
            courseSearchInput.value = searchQuery;
            filterCourses(searchQuery);
        }

        // Live filtering
        courseSearchInput.addEventListener('input', function() {
            filterCourses(this.value);
        });
    }
});
