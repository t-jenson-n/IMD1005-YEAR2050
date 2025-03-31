// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// DOM Elements
const themeToggle = document.getElementById("toggle-theme");
const predictBtn = document.getElementById("predict-btn");
const predictionText = document.getElementById("prediction-text");
const countdownDisplay = document.getElementById("countdown-display");
const scrollingYear = document.getElementById("scrolling-year");
const cardsSection = document.querySelector(".cards-section");
const backToTopBtn = document.getElementById("back-to-top");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Theme Toggle with distinct icons
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isLight = html.getAttribute("data-theme") === "light";
  html.setAttribute("data-theme", isLight ? "dark" : "light");
  
  // Update the icon based on the new theme
  updateThemeIcon();
});

// Update theme toggle icon based on current theme
function updateThemeIcon() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  
  if (currentTheme === "dark") {
    themeToggle.textContent = "☀️"; // Sun icon for switching to light mode
  } else {
    themeToggle.textContent = "🌙"; // Moon icon for switching to dark mode
  }
}

// Set initial icon based on starting theme
document.addEventListener("DOMContentLoaded", () => {
  updateThemeIcon();
  
  // Rest of DOMContentLoaded code...
  // Animate the hero content
  gsap.from(".glitch", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5
  });
  
  gsap.from("#predict-btn", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8
  });
  
  gsap.from("#prediction-text", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1
  });
  
  // Setup scroll animations
  setupScrollTrigger();
});

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      hamburger.textContent = "☰";
    }
  });
});

// Future Prediction
const predictions = [
  "Your art will live in the metaverse.",
  "AI will design your music collaborations.",
  "Fashion will be coded, not stitched.",
  "You'll wear augmented creativity.",
  "Installations will react to your thoughts."
];

predictBtn.addEventListener("click", () => {
  // Fade out
  gsap.to(predictionText, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      // Change text
      const random = Math.floor(Math.random() * predictions.length);
      predictionText.textContent = predictions[random];
      
      // Fade in
      gsap.to(predictionText, {
        opacity: 1,
        duration: 0.5
      });
    }
  });
});

// Real-Time Countdown to 2050
function updateCountdown() {
  const now = new Date();
  const future = new Date("Jan 1, 2050 00:00:00");
  const diff = future - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  
  countdownDisplay.textContent = `${days}d ${hrs}h ${mins}m ${secs}s`;
  
  // Pulse animation on seconds change
  gsap.to(countdownDisplay, {
    scale: 1.05,
    duration: 0.2,
    onComplete: () => {
      gsap.to(countdownDisplay, {
        scale: 1,
        duration: 0.2
      });
    }
  });
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll animation for year counter
let yearObj = { value: 2049 };
let yearTween;
let scrollTrigger;

function setupScrollTrigger() {
  // Year scroll animation
  scrollTrigger = ScrollTrigger.create({
    trigger: ".year-scroll-section",
    start: "top center",
    onEnter: () => {
      if (yearTween) yearTween.kill();
      
      yearTween = gsap.to(yearObj, {
        value: 2025,
        duration: 3,
        ease: "power2.out",
        onUpdate: () => {
          scrollingYear.textContent = Math.floor(yearObj.value);
        },
        onComplete: () => {
          scrollingYear.textContent = "2025";
        }
      });
    }
  });
  
  // Simple animations for section entries
  gsap.from(".countdown-section", {
    scrollTrigger: {
      trigger: ".countdown-section",
      start: "top 80%"
    },
    y: 30,
    opacity: 0.8,
    duration: 0.8
  });
  
  gsap.from(".year-scroll-section", {
    scrollTrigger: {
      trigger: ".year-scroll-section",
      start: "top 80%"
    },
    y: 30,
    opacity: 0.8,
    duration: 0.8
  });
  
  // Card animations - simple and reliable
  gsap.from(".card", {
    scrollTrigger: {
      trigger: ".cards-section",
      start: "top 80%"
    },
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: "power1.out"
  });
  
  gsap.from(".back-to-top-wrapper", {
    scrollTrigger: {
      trigger: ".back-to-top-wrapper",
      start: "top 90%"
    },
    y: 20,
    opacity: 0.8,
    duration: 0.6
  });
}

// Back to Top button
backToTopBtn.addEventListener("click", () => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: { y: 0, autoKill: true },
    onComplete: () => {
      // Reset year value
      if (yearTween) yearTween.kill();
      yearObj = { value: 2049 };
      scrollingYear.textContent = "2049";
      
      // Reinitialize the scroll trigger
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      setupScrollTrigger();
    }
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  document.querySelector('.hero').style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
});