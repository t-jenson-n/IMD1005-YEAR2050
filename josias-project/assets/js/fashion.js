// fashion.js - Future of Fashion interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initDropdowns();
    initTryOnSection();
    initScrollAnimations();
  });
  
  // Theme Toggle with different icons for dark/light mode
  function initThemeToggle() {
    const toggleBtn = document.getElementById('toggle-theme');
    const htmlEl = document.documentElement;
    
    if (!toggleBtn) return;
    
    // Set initial icon based on current theme
    updateThemeIcon(toggleBtn, htmlEl.getAttribute('data-theme'));
    
    toggleBtn.addEventListener('click', function() {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Set the attribute first
      htmlEl.setAttribute('data-theme', newTheme);
      
      // Update the icon
      updateThemeIcon(toggleBtn, newTheme);
      
      // Apply any theme-specific JS animations or effects
      applyThemeSpecificEffects(newTheme);
    });
  }
  
  // Update theme toggle icon based on current theme
  function updateThemeIcon(button, theme) {
    if (theme === 'dark') {
      button.textContent = '☀️'; // Sun icon for switching to light mode
    } else {
      button.textContent = '🌙'; // Moon icon for switching to dark mode
    }
  }
  
  // Apply theme-specific effects that may need JavaScript
  function applyThemeSpecificEffects(theme) {
    // Any additional JS-based theme effects can be added here
    // For example, changing GSAP animations or dynamic elements
    
    // Adjust glow intensity on theme change
    const glowElements = document.querySelectorAll('.glitch-title, .section-title');
    
    if (theme === 'light') {
      // Subtle glows for light theme
      glowElements.forEach(el => {
        gsap.to(el, {
          textShadow: '0 0 5px rgba(0, 187, 136, 0.5), 0 0 10px rgba(0, 187, 136, 0.3)',
          duration: 0.5
        });
      });
    } else {
      // Stronger glows for dark theme
      glowElements.forEach(el => {
        gsap.to(el, {
          textShadow: '0 0 5px #00ffbb, 0 0 15px #00ffbb',
          duration: 0.5
        });
      });
    }
  }
  
  // Mobile Navigation Menu
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      });
      
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
          }
        });
      });
    }
  }
  
  // Initialize Dropdown Functionality
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      
      if (toggle) {
        toggle.addEventListener('click', () => {
          // Toggle active class on clicked dropdown
          dropdown.classList.toggle('active');
          
          // Update toggle icon (+ to x rotation)
          const icon = toggle.querySelector('.toggle-icon');
          if (icon) {
            icon.textContent = dropdown.classList.contains('active') ? '+' : '+';
          }
        });
      }
    });
  }
  
  // Try On Section Interactivity
  function initTryOnSection() {
    const outfitBtns = document.querySelectorAll('.outfit-btn');
    const outfits = document.querySelectorAll('.outfit');
    const outfitTitle = document.getElementById('outfit-title');
    const outfitDescription = document.getElementById('outfit-description');
    
    // Outfit data
    const outfitData = [
      {
        title: "Adaptive Climate Wear",
        description: "This smart ensemble regulates body temperature in any environment, from arctic cold to desert heat."
      },
      {
        title: "Neural Interface Suit",
        description: "Embedded neural sensors allow this suit to respond to your thoughts and emotions, changing style on command."
      },
      {
        title: "Living Bioluminescent Fabric",
        description: "Lab-grown living fabric that generates its own light, adapting brightness to your surroundings and mood."
      }
    ];
    
    outfitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Get outfit index from data attribute
        const outfitIndex = parseInt(btn.getAttribute('data-outfit')) - 1;
        
        // Remove active class from all buttons
        outfitBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all outfits
        outfits.forEach(outfit => outfit.classList.remove('active'));
        
        // Show selected outfit
        if (outfits[outfitIndex]) {
          outfits[outfitIndex].classList.add('active');
        }
        
        // Update outfit info text
        if (outfitData[outfitIndex]) {
          // Use GSAP for smooth text transition
          gsap.to([outfitTitle, outfitDescription], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              outfitTitle.textContent = outfitData[outfitIndex].title;
              outfitDescription.textContent = outfitData[outfitIndex].description;
              
              gsap.to([outfitTitle, outfitDescription], {
                opacity: 1,
                duration: 0.5,
                stagger: 0.1
              });
            }
          });
        }
      });
    });
  }
  
  // Initialize Scroll-based Animations
  function initScrollAnimations() {
    // Hero section parallax and animation
    gsap.from(".glitch-title", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
    
    gsap.from(".intro-text", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });
    
    // Animate section titles on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });
    
    // Feature section animations
    const featureSections = document.querySelectorAll('.feature-section');
    
    featureSections.forEach(section => {
      // Animate visual
      const visual = section.querySelector('.feature-visual');
      if (visual) {
        gsap.from(visual, {
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          x: section.querySelector('.section-content.reverse') ? 50 : -50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      }
      
      // Animate dropdowns with stagger
      const dropdowns = section.querySelectorAll('.dropdown');
      gsap.from(dropdowns, {
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    });
    
    // Try-on section animations
    const tryOnSection = document.querySelector('.try-on-section');
    if (tryOnSection) {
      gsap.from('.mannequin', {
        scrollTrigger: {
          trigger: tryOnSection,
          start: "top 70%",
          toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
      
      gsap.from('.outfit-info, .outfit-buttons', {
        scrollTrigger: {
          trigger: tryOnSection,
          start: "top 60%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
    
    // Quote section animation
    gsap.from('blockquote', {
      scrollTrigger: {
        trigger: '.quote-section',
        start: "top 70%",
        toggleActions: "play none none none"
      },
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
    
    // Enhanced grid overlay parallax
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const gridOverlay = document.querySelector('.grid-overlay');
      if (gridOverlay) {
        gridOverlay.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
    });
  }
  
  // Set initial theme icon on page load
  document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-theme');
    const htmlEl = document.documentElement;
    
    if (toggleBtn) {
      updateThemeIcon(toggleBtn, htmlEl.getAttribute('data-theme') || 'dark');
    }
  });