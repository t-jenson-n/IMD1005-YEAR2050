function ToggleLightMode() {
    document.body.classList.toggle('lightMode')

    let $btn = document.getElementById('btn_lightmode')

    if (document.body.classList.contains('lightMode')) {
        $btn.innerText = 'dark_mode'
    } else {
        $btn.innerText = 'light_mode'
    }
   
}