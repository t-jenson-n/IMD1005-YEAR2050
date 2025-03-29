var countDownDate = new Date("Jan 1, 2050 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + " days +<br>" + hours + ":" + minutes + ":" + seconds + " hrs";

    if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "We have reached 2050";
    }
}, 1000);
