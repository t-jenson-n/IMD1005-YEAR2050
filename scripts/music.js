// Music page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypingEffect();
    initAiLyricGenerator();
    initSonicLab();
    initSpatialSound();
    initTimelineEvents();
    initPoll();
    initHoverSounds();
    initColorParallax();
    
    // Check for saved light mode preference - Dark mode is default
    if (localStorage.getItem('lightMode') === 'enabled') {
        document.body.classList.add('lightMode');
        document.getElementById('btn_lightmode').textContent = 'dark_mode';
    } else {
        // Explicitly set dark mode if no preference or preference is disabled
        document.body.classList.remove('lightMode');
        localStorage.setItem('lightMode', 'disabled');
        document.getElementById('btn_lightmode').textContent = 'light_mode';
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const menuClose = document.getElementById('menu-close');
    
    if (menuToggle && mobileNav && menuClose) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
        });
        
        menuClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    }
});

// Initialize color parallax effect
function initColorParallax() {
    // Only apply parallax effect on devices that likely have the power to handle it
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const parallaxBgs = document.querySelectorAll('.parallax-bg');
            
            parallaxBgs.forEach(bg => {
                const container = bg.closest('.parallax-container, .parallax-section');
                if (!container) return;
                
                const rect = container.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Check if section is in viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    // Calculate how far the section is from the center of the viewport
                    const centerPosition = (rect.top + rect.height / 2) - (windowHeight / 2);
                    // Create a parallax effect by moving the background at a different rate
                    const translateY = centerPosition * 0.1;
                    
                    // Apply the transformation
                    bg.style.transform = `translateY(${translateY}px) translateZ(-1px) scale(2)`;
                }
            });
        });
    }
}

// Typing Text Effect
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const typingSound = document.getElementById('typing-sound');
    const text = "Now generating immersive soundscapes...";
    let i = 0;
    let typingFinished = false;
    
    if (!typingText || !typingSound) return;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            
            // Keep playing typing sound while typing
            if (typingSound.paused && !typingFinished) {
                // Only start playing once
                typingSound.play().catch(e => console.log("Audio playback prevented:", e));
            }
            
            setTimeout(typeWriter, 100);
        } else {
            // When typing is finished, stop the sound
            typingFinished = true;
            typingSound.pause();
            typingSound.currentTime = 0;
        }
    }
    
    // Start typing with a slight delay
    setTimeout(() => {
        typingText.textContent = ''; // Clear initial text
        typeWriter();
    }, 500);
}

// AI Lyric Generator
function initAiLyricGenerator() {
    const generateBtn = document.getElementById('generate-lyric');
    const lyricDisplay = document.getElementById('lyric-display');
    const lyricSound = document.getElementById('lyric-sound');
    
    if (!generateBtn || !lyricDisplay || !lyricSound) return;
    
    const futuristicLyrics = [
        "Neural waves cascade through digital harmony, your consciousness synced to the beat of tomorrow.",
        "In the quantum soundscape, we dance between dimensions, frequencies unbound by time.",
        "Brainwave melodies translate emotions into sound, no words needed when minds connect.",
        "Your DNA is the sheet music, cells vibrating in perfect harmony with the cosmic symphony.",
        "AI composers weave your memories into melodies, past and future merging in sound.",
        "Sonic architecture builds new realities, step inside the music and become the rhythm.",
        "Emotional algorithms decode the soundtrack of your life, adapting as your feelings shift.",
        "Subatomic vibrations whisper ancient truths, neural implants translating the universe's song.",
        "Time spirals in audio dimensions, yesterday's echoes harmonizing with tomorrow's beats.",
        "Sentient melodies evolve through the night, learning your dreams to compose a new dawn."
    ];
    
    generateBtn.addEventListener('click', function() {
        // Play lyric glitch sound
        lyricSound.currentTime = 0;
        lyricSound.play().catch(e => console.log("Audio playback prevented:", e));
        
        // Add glitch animation class
        lyricDisplay.classList.add('glitching');
        
        // Choose random lyric
        const randomLyric = futuristicLyrics[Math.floor(Math.random() * futuristicLyrics.length)];
        
        // Display after short delay for effect
        setTimeout(() => {
            lyricDisplay.textContent = randomLyric;
            lyricDisplay.classList.remove('glitching');
            
            // Add appearing animation if GSAP is available
            if (typeof gsap !== 'undefined') {
                gsap.from(lyricDisplay, {
                    opacity: 0,
                    y: 10,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }, 800);
    });
}

// Sonic Lab Sound Pads
function initSonicLab() {
    const padBtns = document.querySelectorAll('.pad-btn');
    
    // Track which sounds are currently playing
    const playingStatus = {
        synth: false,
        drum: false,
        glitch: false
    };
    
    padBtns.forEach(btn => {
        const soundType = btn.getAttribute('data-sound');
        const soundEl = document.getElementById(`${soundType}-sound`);
        const waveformEl = document.getElementById(`${soundType}-wave`);
        
        if (!soundEl || !waveformEl) return;
        
        btn.addEventListener('click', function() {
            // Toggle sound play/pause based on current state
            if (playingStatus[soundType]) {
                // If sound is playing, pause it
                soundEl.pause();
                soundEl.currentTime = 0; // Reset to beginning
                playingStatus[soundType] = false;
                
                // Remove active state from button
                btn.classList.remove('active');
                
                // Stop the waveform animation
                waveformEl.innerHTML = '';
            } else {
                // If sound isn't playing, play it
                soundEl.currentTime = 0; // Reset to beginning
                soundEl.play().catch(e => console.log("Audio playback prevented:", e));
                playingStatus[soundType] = true;
                
                // Add active state to button
                btn.classList.add('active');
                
                // Create wave animation
                createWaveAnimation(waveformEl);
            }
        });
    });
}

// Create waveform visualization
function createWaveAnimation(waveformEl) {
    // Clear previous waveform
    waveformEl.innerHTML = '';
    
    // Create wave bars
    const numBars = 20;
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        
        // Set random height for initial wave shape
        const height = Math.floor(Math.random() * 70) + 10;
        bar.style.height = `${height}%`;
        
        // Set position
        bar.style.left = `${(i / numBars) * 100}%`;
        
        // Set animation delay
        bar.style.animationDelay = `${i * 0.03}s`;
        
        waveformEl.appendChild(bar);
    }
    
    // Create animation with GSAP if available
    if (typeof gsap !== 'undefined') {
        // We're not setting onComplete to keep the animation going while sound plays
        gsap.to(waveformEl.querySelectorAll('.wave-bar'), {
            height: () => Math.floor(Math.random() * 70) + 10 + '%',
            duration: 0.3,
            repeat: -1, // Infinite repeat while sound is playing
            ease: "sine.inOut",
            stagger: {
                each: 0.05,
                from: "center"
            }
        });
    }
}

// Spatial Sound/3D Concert Experience
function initSpatialSound() {
    const spatialContainer = document.getElementById('spatial-sound');
    const indicator = document.querySelector('.spatial-indicator');
    const toggleBtn = document.getElementById('toggle-spatial');
    const ambientSound = document.getElementById('ambient-sound');
    
    if (!spatialContainer || !indicator || !toggleBtn || !ambientSound) return;
    
    let isPlaying = false;
    
    // Control spatial position with mouse movement
    spatialContainer.addEventListener('mousemove', function(e) {
        const rect = spatialContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate position as percentage
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Move the indicator to follow mouse
        indicator.style.left = `${xPercent}%`;
        indicator.style.top = `${yPercent}%`;
        
        // Add trail effect
        createTrailEffect(spatialContainer, xPercent, yPercent);
        
        // If ambient sound is playing, adjust volume and panning according to position
        if (isPlaying && ambientSound) {
            const volumeLevel = 0.5 + (yPercent / 200); // 0.5 to 1 range
            ambientSound.volume = Math.min(volumeLevel, 1.0);
        }
    });
    
    // Toggle 3D sound on/off
    toggleBtn.addEventListener('click', function() {
        if (!ambientSound) return;
        
        if (isPlaying) {
            ambientSound.pause();
            toggleBtn.textContent = "Enable 3D Sound";
            isPlaying = false;
        } else {
            ambientSound.currentTime = 0; // Reset to beginning
            ambientSound.play().catch(e => console.log("Audio playback prevented:", e));
            toggleBtn.textContent = "Disable 3D Sound";
            isPlaying = true;
        }
    });
}

// Create trail effect for the spatial sound
function createTrailEffect(container, x, y) {
    const trail = document.createElement('div');
    trail.className = 'sound-trail';
    trail.style.left = `${x}%`;
    trail.style.top = `${y}%`;
    
    container.appendChild(trail);
    
    if (typeof gsap !== 'undefined') {
        gsap.to(trail, {
            opacity: 0,
            scale: 3,
            duration: 1,
            onComplete: () => {
                trail.remove();
            }
        });
    } else {
        // Fallback animation with CSS
        setTimeout(() => {
            trail.style.opacity = 0;
            trail.style.transform = 'translate(-50%, -50%) scale(3)';
            setTimeout(() => trail.remove(), 1000);
        }, 10);
    }
}

function initTimelineEvents() {
    const timelineItems = document.querySelectorAll('.year-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the year data
            const year = item.getAttribute('data-year');
            
            // Add highlight effect
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Animate the timeline item with GSAP if available
            if (typeof gsap !== 'undefined') {
                gsap.to(item, {
                    scale: 1.1,
                    duration: 0.3,
                    boxShadow: "0 0 20px var(--bright-green), 0 0 40px var(--bright-green)",
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        // Reset to normal state after animation
                        gsap.to(item, {
                            boxShadow: "none",
                            scale: 1
                        });
                    }
                });
            }
        });
    });
}

function initPoll() {
    const pollBtns = document.querySelectorAll('.poll-btn');
    const pollResults = document.querySelector('.poll-results');
    
    if (!pollBtns.length || !pollResults) return;
    
    let results = {
        ai: 35,
        vr: 30,
        brainwave: 25,
        robots: 10
    };
    
    if (localStorage.getItem('pollResults2050')) {
        try {
            results = JSON.parse(localStorage.getItem('pollResults2050'));
        } catch (e) {
            console.error("Error parsing poll results:", e);
        }
    }
    
    updatePollResults(results);
    
    let isUpdating = false;
    
    pollBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isUpdating) return; // Prevent multiple rapid clicks
            isUpdating = true;
            
            const option = btn.getAttribute('data-option');
            
            // Show visual feedback for selected option immediately
            pollBtns.forEach(b => b.classList.remove('voted'));
            btn.classList.add('voted');
            
            setTimeout(() => {
                // Increase the selected option by 10%
                results[option] += 10;
                
                // Decrease other options proportionally
                const otherOptions = Object.keys(results).filter(key => key !== option);
                otherOptions.forEach(key => {
                    results[key] = Math.max(0, results[key] - (10/3)); // Distribute 10% reduction
                });
                
                // Normalize to ensure total is 100%
                const total = Object.values(results).reduce((a, b) => a + b, 0);
                Object.keys(results).forEach(key => {
                    results[key] = Math.round((results[key] / total) * 100);
                });
                
                // Save to localStorage
                localStorage.setItem('pollResults2050', JSON.stringify(results));
                localStorage.setItem('musicPoll2050', option);
                
                // Update visual display
                updatePollResults(results);
                
                // Reset the update flag after animation completes
                setTimeout(() => {
                    isUpdating = false;
                }, 600);
            }, 50);
        });
    });
    
    // If user already voted, highlight their choice
    if (localStorage.getItem('musicPoll2050')) {
        const userChoice = localStorage.getItem('musicPoll2050');
        const selectedBtn = document.querySelector(`.poll-btn[data-option="${userChoice}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('voted');
        }
    }
}
function updatePollResults(results) {
    // Update each bar and percentage display
    Object.keys(results).forEach(key => {
        const bar = document.getElementById(`${key}-bar`);
        const percentage = document.getElementById(`${key}-percentage`);
        
        if (bar && percentage) {
            // Update the bar width - CSS transition handles the animation
            bar.style.width = `${results[key]}%`;
            
            // Update the percentage text
            percentage.textContent = `${Math.round(results[key])}%`;
        }
    });
}

// Hover Sound Effects
function initHoverSounds() {
    const timelineItems = document.querySelectorAll('.year-item');
    const hoverSound = document.getElementById('hover-sound');
    
    if (!hoverSound || !timelineItems.length) return;
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Reset and play hover sound at lower volume
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play().catch(e => console.log("Audio playback prevented:", e));
        });
    });
}