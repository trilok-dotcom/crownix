// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Link Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Custom Cursor Implementation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverElements = document.querySelectorAll('a, button, .service-card, .pricing-card, .showcase-item');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position immediately
    gsap.to(cursor, {
        duration: 0.1,
        x: mouseX,
        y: mouseY,
        ease: "power2.out"
    });
});

// Animate follower with a delay
gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    gsap.set(cursorFollower, {
        x: followerX,
        y: followerY
    });
});

hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorFollower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorFollower.classList.remove('hovered');
    });
});

// Initialization & Loading Sequence
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // Reset positions
    gsap.set(".line", { y: "150%" });
    gsap.set(".hero-subtitle, .hero-cta, .bg-video, #particles", { autoAlpha: 0 });

    // 1. Loader Logo sequence
    tl.to(".loader-logo", {
        autoAlpha: 1,
        y: -10,
        duration: 1,
        ease: "power3.out"
    })
    .to(".loader-logo", {
        autoAlpha: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.in",
        delay: 0.5
    })
    // 2. Hide loader background
    .to(".loader", {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
    }, "-=0.2")
    // 3. Reveal Background
    .to(".bg-video", {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out"
    }, "-=0.5")
    .to("#particles", {
        autoAlpha: 1,
        duration: 1.5
    }, "-=1.5")
    // 4. Hero Stagger Text
    .to(".line", {
        y: "0%",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=1.5")
    .to(".hero-subtitle", {
        autoAlpha: 1,
        y: -10,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".hero-cta", {
        autoAlpha: 1,
        y: -10,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6");
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
ScrollTrigger.create({
    start: "top -50",
    end: 99999,
    toggleClass: {className: "scrolled", targets: navbar}
});

// Hero Parallax Effect
gsap.to(".bg-video", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Services Stagger Animation
gsap.to(".service-card", {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)",
    scrollTrigger: {
        trigger: ".services",
        start: "top 70%",
    }
});

// Showcase Slider Horizontal Scroll
const showcaseTrack = document.querySelector('.showcase-track');
const showcaseItems = gsap.utils.toArray('.showcase-item');

if (showcaseTrack && window.innerWidth > 768) {
    function getScrollAmount() {
        let trackWidth = showcaseTrack.scrollWidth;
        return -(trackWidth - window.innerWidth + 48); // 48 is padding
    }

    const tween = gsap.to(showcaseTrack, {
        x: getScrollAmount,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: ".showcase-slider",
        start: "top 20%",
        end: () => `+=${getScrollAmount() * -1}`,
        animation: tween,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
    });
}

// Pricing Stagger Animation
gsap.to(".pricing-card", {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".pricing",
        start: "top 65%",
    }
});

// About Section Animation
gsap.from(".about-content > *", {
    y: 30,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-wrapper",
        start: "top 80%",
    }
});

gsap.from(".founder-img", {
    scale: 0.8,
    autoAlpha: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "expo.out",
    scrollTrigger: {
        trigger: ".about-images",
        start: "top 80%",
    }
});

// CTA Box Animation
gsap.from(".cta-box", {
    y: 50,
    autoAlpha: 0,
    scale: 0.95,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: {
        trigger: ".cta",
        start: "top 85%",
    }
});

// Form Elements Animation
gsap.from(".input-group", {
    y: 20,
    autoAlpha: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
    }
});
gsap.from(".submit-btn", {
    y: 20,
    autoAlpha: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
    }
});
