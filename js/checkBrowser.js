document.addEventListener("DOMContentLoaded", function() {
    const videoElement = document.getElementById('video');

    function isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    if (isSafari()) {
        videoElement.innerHTML = '<source src="images/landing-page-video.mp4" type="video/mp4">';
    } else {
        videoElement.innerHTML = '<source src="images/landing-page-video.webm" type="video/webm">';
    }
});