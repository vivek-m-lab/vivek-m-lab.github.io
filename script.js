document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const expanded = navLinks.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", expanded);
        });

        // Close menu on link click
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Header scroll elevation
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }, { passive: true });

    // Dynamic current year
    const yearElem = document.getElementById("current-year");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});