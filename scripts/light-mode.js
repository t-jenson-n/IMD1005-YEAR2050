// Toggle function to switch between light and dark mode
function ToggleLightMode() {
    document.body.classList.toggle('lightMode');
    
    if (document.body.classList.contains('lightMode')) {
        localStorage.setItem('lightMode', 'enabled');
        document.getElementById('btn_lightmode').textContent = 'dark_mode';
    } else {
        localStorage.setItem('lightMode', 'disabled');
        document.getElementById('btn_lightmode').textContent = 'light_mode';
    }
}

// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have a saved preference
    if (localStorage.getItem('lightMode') === 'enabled') {
        document.body.classList.add('lightMode');
        // Make sure the element exists before trying to change its text
        const lightModeBtn = document.getElementById('btn_lightmode');
        if (lightModeBtn) {
            lightModeBtn.textContent = 'dark_mode';
        }
    } else {
        // Explicitly set dark mode if no preference or preference is disabled
        document.body.classList.remove('lightMode');
        localStorage.setItem('lightMode', 'disabled');
        const lightModeBtn = document.getElementById('btn_lightmode');
        if (lightModeBtn) {
            lightModeBtn.textContent = 'light_mode';
        }
    }
});