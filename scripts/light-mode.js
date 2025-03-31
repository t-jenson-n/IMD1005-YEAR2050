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

if (localStorage.getItem('lightMode') === 'enabled') {
    document.body.classList.add('lightMode');
    document.getElementById('btn_lightmode').textContent = 'dark_mode';
} else {
    // Explicitly set dark mode if no preference or preference is disabled
    document.body.classList.remove('lightMode');
    localStorage.setItem('lightMode', 'disabled');
    document.getElementById('btn_lightmode').textContent = 'light_mode';
}