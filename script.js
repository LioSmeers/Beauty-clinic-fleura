const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector("#site-nav");
const siteHeader = document.querySelector(".site-header");

if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

const markHeaderOnScroll = () => {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
};

markHeaderOnScroll();
window.addEventListener("scroll", markHeaderOnScroll, { passive: true });

document.querySelectorAll(".intro-grid article, .split-section > *, .service-list a, .banner, .page-hero > *, .service-card, .price-row, .note-section, .story-section > *, .values article, .contact-layout > *").forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

document.querySelectorAll(".price-row").forEach((row) => {
    row.addEventListener("click", () => {
        document.querySelectorAll(".price-row.selected").forEach((selectedRow) => {
            selectedRow.classList.remove("selected");
        });
        row.classList.add("selected");
    });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const successMessage = contactForm.querySelector(".form-success");

        if (successMessage) {
            successMessage.textContent = "Bedankt! Je aanvraag is goed ontvangen. We nemen snel contact met je op.";
        }

        contactForm.reset();
    });
}

let sparkleReady = true;

document.addEventListener("pointermove", (event) => {
    if (!sparkleReady || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    sparkleReady = false;
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
        sparkleReady = true;
    }, 650);
});
