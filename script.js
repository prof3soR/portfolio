document.addEventListener("DOMContentLoaded", function() {
    const ripple = document.querySelector(".ripple");

    setInterval(() => {
        ripple.style.animation = "none";
        setTimeout(() => {
            ripple.style.animation = "";
        }, 10);
    }, 2000);
});
