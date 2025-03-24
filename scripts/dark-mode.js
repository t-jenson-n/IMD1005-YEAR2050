function ToggleDarkMode() {
    document.body.classList.toggle('darkMode')

    let $btn = document.getElementById('btn_darkmode')

    if (document.body.classList.contains('darkMode')) {
        $btn.innerText = 'light_mode'
    } else {
        $btn.innerText = 'dark_mode'
    }
   
}