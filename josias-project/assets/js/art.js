// art.js - Future of Installation & Digital Art interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initHeroAnimation();
    initParticles();
    initGallery();
    initLightbox();
    initTabs();
    initArtGenerator();
    initReturnButton();
  });
  
  // Theme Toggle with different icons for dark/light mode
  function initThemeToggle() {
    const toggleBtn = document.getElementById('toggle-theme');
    const htmlEl = document.documentElement;
    
    if (!toggleBtn) return;
    
    // Set initial icon based on current theme
    updateThemeIcon(toggleBtn, htmlEl.getAttribute('data-theme'));
    
    toggleBtn.addEventListener('click', function() {
      if (htmlEl.getAttribute('data-theme') === 'dark') {
        htmlEl.setAttribute('data-theme', 'light');
        updateThemeIcon(toggleBtn, 'light');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        updateThemeIcon(toggleBtn, 'dark');
      }
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
  
  // Hero Section Animation
  function initHeroAnimation() {
    // Animate hero content with GSAP
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });
    
    timeline
      .to(".subtitle", { opacity: 1, y: 0, duration: 1 })
      .to(".glitch-title", { opacity: 1, y: 0, duration: 1 }, "-=0.5");
  }
  
  // Create and animate particles for hero background
  function initParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      container.appendChild(particle);
      
      // Animate with GSAP
      gsap.to(particle, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: `random(0.3, 0.8)`,
        duration: `random(20, 40)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Make particles react to mouse movement
    container.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        // Subtle movement based on mouse position
        gsap.to(particle, {
          x: `+=${(mouseX - 0.5) * 30}`,
          y: `+=${(mouseY - 0.5) * 30}`,
          duration: 2,
          ease: "power1.out"
        });
      });
    });
  }
  
  // Gallery section animations
  function initGallery() {
    // Stagger reveal gallery items on scroll
    gsap.from(".gallery-item", {
      scrollTrigger: {
        trigger: ".gallery-section",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }
  
  // Lightbox functionality
  function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxLocation = document.getElementById('lightbox-location');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (!galleryItems.length || !lightbox || !lightboxImage) return;
    
    // Open lightbox when clicking gallery item
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imageUrl = item.querySelector('.gallery-image').style.backgroundImage;
        const title = item.getAttribute('data-title');
        const location = item.getAttribute('data-location');
        
        lightboxImage.style.backgroundImage = imageUrl;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxLocation) lightboxLocation.textContent = location;
        
        lightbox.classList.add('active');
        
        // Prevent body scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox
    if (closeLightbox) {
      closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Interactive Tabs functionality
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (!tabBtns.length || !tabPanels.length) return;
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Get the tab ID
        const tabId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(tabId);
        
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        btn.classList.add('active');
        if (targetPanel) targetPanel.classList.add('active');
        
        // Handle special animations for each tab
        if (tabId === 'tab1') {
          initVisualText();
        } else if (tabId === 'tab2') {
          initParallaxEffect();
        } else if (tabId === 'tab3') {
          initGenerativeArt();
          animateFadeText();
        }
      });
    });
    
    // Initialize the first tab by default
    initVisualText();
  }
  
  // Tab 1: Visual Text Animation
  function initVisualText() {
    const typingText = document.querySelector('.typing-text');
    
    if (!typingText) return;
    
    // Use GSAP for a simple reveal animation instead of typing
    gsap.fromTo(typingText, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }
  
  // Tab 2: Parallax Effect
  function initParallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (!parallaxBg) return;
    
    // Reset position
    gsap.set(parallaxBg, { y: 0 });
    
    // Create scrolling effect inside the tab panel
    const panel = document.getElementById('tab2');
    if (panel) {
      panel.addEventListener('mousemove', (e) => {
        const moveY = (e.clientY / window.innerHeight - 0.5) * 50;
        gsap.to(parallaxBg, {
          y: moveY,
          duration: 1,
          ease: "power1.out"
        });
      });
    }
  }
  
  // Tab 3: Generative Art and Text Animation
  function initGenerativeArt() {
    const canvas = document.getElementById('generative-art');
    
    if (!canvas) return;
    
    // Clear previous elements
    canvas.innerHTML = '';
    
    // Create geometric shapes
    const shapeCount = 15;
    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.className = 'gen-shape';
      
      // Random styling
      const size = Math.random() * 30 + 10;
      const isCircle = Math.random() > 0.5;
      
      shape.style.position = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.background = `rgba(${Math.random() * 100}, ${Math.random() * 200}, ${Math.random() * 255}, 0.3)`;
      shape.style.borderRadius = isCircle ? '50%' : '0';
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      canvas.appendChild(shape);
      
      // Animate with GSAP
      gsap.to(shape, {
        x: `random(-50, 50)`,
        y: `random(-30, 30)`,
        rotation: `random(-180, 180)`,
        scale: `random(0.5, 1.5)`,
        duration: `random(5, 15)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }
  
  // Animate fade-in text for Tab 3
  function animateFadeText() {
    const fadeTexts = document.querySelectorAll('.fade-text');
    
    gsap.to(fadeTexts, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.5,
      ease: "power2.out"
    });
  }
  
  // Interactive Art Generator
  function initArtGenerator() {
    // Control buttons
    const lightBtns = document.querySelectorAll('.light-btn');
    const motionBtns = document.querySelectorAll('.motion-btn');
    const moodBtns = document.querySelectorAll('.mood-btn');
    const generateBtn = document.getElementById('generate-btn');
    const generationMessage = document.querySelector('.generation-message');
    
    // Canvas layers
    const layerLight = document.querySelector('.layer-light');
    const layerMotion = document.querySelector('.layer-motion');
    const layerMood = document.querySelector('.layer-mood');
    
    if (!lightBtns.length || !motionBtns.length || !moodBtns.length || !generateBtn) return;
    
    // Current selections
    let currentLight = 'soft-glow';
    let currentMotion = 'floating';
    let currentMood = 'calm';
    
    // Light style buttons
    lightBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all light buttons
        lightBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update current light style
        currentLight = btn.getAttribute('data-light');
        
        // Update canvas
        updateLight(currentLight);
      });
    });
    
    // Motion style buttons
    motionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all motion buttons
        motionBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update current motion style
        currentMotion = btn.getAttribute('data-motion');
        
        // Update canvas
        updateMotion(currentMotion);
      });
    });
    
    // Mood style buttons
    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all mood buttons
        moodBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update current mood style
        currentMood = btn.getAttribute('data-mood');
        
        // Update canvas
        updateMood(currentMood);
      });
    });
    
    // Generate button
    generateBtn.addEventListener('click', () => {
      // Reset all layers
      resetLayers();
      
      // Add glitch effect to button
      generateBtn.classList.add('glitching');
      setTimeout(() => generateBtn.classList.remove('glitching'), 500);
      
      // Generate new art with current settings
      setTimeout(() => {
        // Apply current settings
        updateLight(currentLight);
        updateMotion(currentMotion);
        updateMood(currentMood);
        
        // Show generation message
        if (generationMessage) {
          generationMessage.classList.add('active');
        }
        
        // Apply a unique effect based on combination
        applyUniqueEffect(currentLight, currentMotion, currentMood);
      }, 300);
    });
    
    // Helper functions
    function resetLayers() {
      if (layerLight) {
        layerLight.className = 'art-layer layer-light';
        layerLight.style.opacity = '0';
      }
      
      if (layerMotion) {
        layerMotion.className = 'art-layer layer-motion';
        layerMotion.style.opacity = '0';
      }
      
      if (layerMood) {
        layerMood.className = 'art-layer layer-mood';
        layerMood.style.opacity = '0';
      }
      
      if (generationMessage) {
        generationMessage.classList.remove('active');
      }
    }
    
    function updateLight(style) {
      if (!layerLight) return;
      
      layerLight.className = `art-layer layer-light ${style}`;
      layerLight.style.opacity = '1';
    }
    
    function updateMotion(style) {
      if (!layerMotion) return;
      
      layerMotion.className = `art-layer layer-motion ${style}`;
      layerMotion.style.opacity = '1';
      
      // For responsive motion, add mouse tracking
      if (style === 'responsive') {
        const artCanvas = document.getElementById('art-canvas');
        if (artCanvas) {
          artCanvas.addEventListener('mousemove', handleCanvasMouseMove);
        }
      } else {
        const artCanvas = document.getElementById('art-canvas');
        if (artCanvas) {
          artCanvas.removeEventListener('mousemove', handleCanvasMouseMove);
        }
      }
    }
    
    function updateMood(style) {
      if (!layerMood) return;
      
      layerMood.className = `art-layer layer-mood ${style}`;
      layerMood.style.opacity = '1';
    }
    
    function handleCanvasMouseMove(e) {
      if (!layerMotion) return;
      
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;
      
      layerMotion.style.transform = `translate(${xPercent * 20}px, ${yPercent * 20}px)`;
    }
    
    function applyUniqueEffect(light, motion, mood) {
      const artCanvas = document.getElementById('art-canvas');
      if (!artCanvas) return;
      
      // Create a unique visual effect based on the combination
      
      // Example: Add floating elements for specific combinations
      if (light === 'laser-grid' && mood === 'distorted') {
        // Create glitchy elements
        for (let i = 0; i < 5; i++) {
          const glitch = document.createElement('div');
          glitch.className = 'glitch-element';
          glitch.style.position = 'absolute';
          glitch.style.width = `${Math.random() * 50 + 10}px`;
          glitch.style.height = `${Math.random() * 5 + 1}px`;
          glitch.style.background = 'var(--art-secondary)';
          glitch.style.left = `${Math.random() * 100}%`;
          glitch.style.top = `${Math.random() * 100}%`;
          glitch.style.opacity = '0.7';
          glitch.style.zIndex = '5';
          
          artCanvas.appendChild(glitch);
          
          // Animate the glitch element
          gsap.to(glitch, {
            x: `random(-30, 30)`,
            opacity: `random(0.3, 0.8)`,
            duration: 0.2,
            repeat: 10,
            yoyo: true,
            onComplete: () => glitch.remove()
          });
        }
      }
      
      // Example: Add particle burst for organic + calm
      if (light === 'organic' && mood === 'calm') {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'organic-particle';
          particle.style.position = 'absolute';
          particle.style.width = `${Math.random() * 10 + 2}px`;
          particle.style.height = `${Math.random() * 10 + 2}px`;
          particle.style.borderRadius = '50%';
          particle.style.background = 'var(--art-tertiary)';
          particle.style.left = '50%';
          particle.style.top = '50%';
          particle.style.zIndex = '5';
          
          artCanvas.appendChild(particle);
          
          // Animate the particle
          gsap.to(particle, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            opacity: 0,
            duration: `random(1, 3)`,
            ease: "power2.out",
            onComplete: () => particle.remove()
          });
        }
      }
    }
    
    // Initialize with default settings
    updateLight(currentLight);
    updateMotion(currentMotion);
    updateMood(currentMood);
  }
  
  // Return to 2025 button animation
  function initReturnButton() {
    const returnBtn = document.querySelector('.return-btn');
    
    if (!returnBtn) return;
    
    // Add hover animation
    returnBtn.addEventListener('mouseenter', () => {
      gsap.to(returnBtn, {
        y: -5,
        boxShadow: '0 5px 20px var(--art-primary)',
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    returnBtn.addEventListener('mouseleave', () => {
      gsap.to(returnBtn, {
        y: 0,
        boxShadow: '0 0 10px rgba(0, 238, 255, 0.3)',
        duration: 0.3,
        ease: "power2.out"
      });
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