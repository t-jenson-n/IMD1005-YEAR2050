// Make sure we wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const predictBtn = document.getElementById("predict-button");
    const predictionText = document.getElementById("prediction-text");
    const scrollingYear = document.getElementById("scrolling-year");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const menuClose = document.getElementById("menu-close");
    const timelineMarkers = document.querySelectorAll(".timeline-marker");
    const timeTravelBtn = document.getElementById("time-travel-btn");
    const yearContext = document.getElementById("year-context");
    
    // Toggle mobile menu
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", function() {
            mobileNav.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
        });
    }
    
    // Close mobile menu
    if (menuClose && mobileNav) {
        menuClose.addEventListener("click", function() {
            mobileNav.classList.remove("active");
            document.body.style.overflow = ""; // Re-enable scrolling
        });
    }
    
    // Future prediction options
    const predictions = [
        "Your art will live in the metaverse.",
        "AI will design your music collaborations.",
        "Fashion will be coded, not stitched.",
        "You'll wear augmented creativity.",
        "Installations will react to your thoughts.",
        "Digital fashion will adapt to your mood in real-time.",
        "You'll communicate through sensory art experiences.",
        "Your home will transform based on your emotional state.",
        "Music will be shaped by collective consciousness.",
        "Creative boundaries between disciplines will dissolve completely."
    ];
    
    // Prediction button click handler
    if (predictBtn) {
        predictBtn.addEventListener("click", function() {
            // Fade out current text
            predictionText.style.opacity = "0";
            
            // After fading out, update the text
            setTimeout(function() {
                // Get random prediction
                const randomIndex = Math.floor(Math.random() * predictions.length);
                predictionText.textContent = predictions[randomIndex];
                
                // Fade in new text
                predictionText.style.opacity = "1";
            }, 300);
        });
    }
    
    // Timeline interaction
    if (timelineMarkers.length > 0) {
        // Year content by timeline position
        const yearContents = {
            "timeline-2050": {
                year: "2050",
                text: "In 2050, creative expression transcends current limitations through neural interfaces, immersive environments, and AI collaborations that seamlessly blend human intent with technological possibilities.",
                buttonText: "Travel to 2025"
            },
            "timeline-2030": {
                year: "2030",
                text: "In 2030, we'll witness the early integration of neural interfaces with creative processes, collaborative AI becoming commonplace, and the foundation of what will become the immersive technologies of 2050.",
                buttonText: "Travel to 2050"
            },
            "timeline-2025": {
                year: "2025",
                text: "Today in 2025, we're laying the groundwork for tomorrow's creative evolution with early neural interfaces, AI-assisted creativity tools, and experimental immersive spaces that hint at what's to come.",
                buttonText: "Travel to 2030"
            }
        };
        
        // Function to update timeline display
        function updateTimelineDisplay(markerId) {
            // Update active marker
            timelineMarkers.forEach(marker => {
                marker.classList.remove("active");
                if (marker.id === markerId) {
                    marker.classList.add("active");
                }
            });
            
            // Update content
            const content = yearContents[markerId];
            
            // Animate year change
            animateYearChange(scrollingYear.textContent, content.year);
            
            // Update context text with fade
            yearContext.style.opacity = "0";
            setTimeout(() => {
                const contextParagraph = yearContext.querySelector("p");
                const contextButton = yearContext.querySelector("button");
                
                if (contextParagraph) contextParagraph.textContent = content.text;
                if (contextButton) contextButton.textContent = content.buttonText;
                
                yearContext.style.opacity = "1";
            }, 300);
        }
        
        // Add click listeners to timeline markers
        timelineMarkers.forEach(marker => {
            marker.addEventListener("click", () => {
                updateTimelineDisplay(marker.id);
            });
        });
        
        // Time travel button cycles through years
        if (timeTravelBtn) {
            timeTravelBtn.addEventListener("click", () => {
                const activeMarker = document.querySelector(".timeline-marker.active");
                let nextMarkerId;
                
                if (activeMarker.id === "timeline-2050") {
                    nextMarkerId = "timeline-2025";
                } else if (activeMarker.id === "timeline-2030") {
                    nextMarkerId = "timeline-2050";
                } else {
                    nextMarkerId = "timeline-2030";
                }
                
                updateTimelineDisplay(nextMarkerId);
            });
        }
    }
    
    // Animate year count change
    function animateYearChange(startYear, endYear) {
        startYear = parseInt(startYear);
        endYear = parseInt(endYear);
        
        const duration = 1500; // 1.5 seconds
        const stepTime = 30; // Update every 30ms
        const steps = duration / stepTime;
        const stepChange = (endYear - startYear) / steps;
        
        let currentYear = startYear;
        let currentStep = 0;
        
        const yearInterval = setInterval(() => {
            currentStep++;
            currentYear += stepChange;
            
            if (currentStep >= steps) {
                clearInterval(yearInterval);
                scrollingYear.textContent = endYear;
            } else {
                scrollingYear.textContent = Math.round(currentYear);
            }
        }, stepTime);
    }
    
    // Card animations with intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});