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
  function checkScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check

  // Active Link Handling
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
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

        // Button filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active state
                    filterButtons.forEach(b => {
                        b.classList.remove('btn-gradient');
                        b.classList.add('btn-outline-secondary');
                    });
                    this.classList.remove('btn-outline-secondary');
                    this.classList.add('btn-gradient');

                    // Filter
                    const filterValue = this.getAttribute('data-filter');
                    const cards = courseContainer.querySelectorAll('.col-lg-4');

                    if (filterValue === 'all') {
                        cards.forEach(card => card.style.display = 'block');
                    } else {
                        cards.forEach(card => {
                            const badge = card.querySelector('.badge').textContent.toLowerCase();
                            // Simple mapping or check
                            if (badge.includes(filterValue.toLowerCase()) || 
                                (filterValue === 'business' && (badge.includes('hr') || badge.includes('management')))) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        }
    }
});
