document.addEventListener('DOMContentLoaded', function() {
    var myVideo = document.querySelector('video');
    myVideo.play().catch(error => {
        console.log("Autoplay wurde nicht gestartet:", error);
    });
}); 