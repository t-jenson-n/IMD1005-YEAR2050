let $gallery = document.getElementById('gallery')
let $imgViewer = document.getElementById('imgViewer')

$gallery.addEventListener('click', (event) => {
    if (event.target.tagName == "IMG") {
        $imgViewer.classList.remove('hidden')

        let file = event.target.dataset.full_image
        $imgViewer.innerHTML = "<img src='images/" + file + "'>"
    }
})
 
$imgViewer.addEventListener('click', (event) => {
    $imgViewer.classList.add('hidden')
})