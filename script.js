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

    // Scroll Animation Observer (Fade & Slide up on scroll)
    const revealElements = document.querySelectorAll(
        ".skill-card, .project-card, .timeline-item, .edu-card, .cert-item, .about-card"
    );

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Dynamic current year
    const yearElem = document.getElementById("current-year");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }


    // Premium 3D hero-chip interaction
    const chipScene = document.getElementById("chipScene");
    const heroChip = document.getElementById("heroChip");

    if (chipScene && heroChip && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let frame = null;

        chipScene.addEventListener("pointermove", (event) => {
            const rect = chipScene.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 18;
            const rotateX = (0.5 - y) * 14;

            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                chipScene.style.setProperty("--mx", `${x * 100}%`);
                chipScene.style.setProperty("--my", `${y * 100}%`);
                heroChip.style.setProperty("--tilt-x", `${rotateX}deg`);
                heroChip.style.setProperty("--tilt-y", `${rotateY}deg`);
            });
        });

        chipScene.addEventListener("pointerleave", () => {
            if (frame) cancelAnimationFrame(frame);
            heroChip.style.setProperty("--tilt-x", "0deg");
            heroChip.style.setProperty("--tilt-y", "0deg");
            chipScene.style.setProperty("--mx", "50%");
            chipScene.style.setProperty("--my", "50%");
        });
    }

});