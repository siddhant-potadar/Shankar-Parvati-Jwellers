
document.addEventListener('DOMContentLoaded', function () {
    const goldRateForm = document.getElementById('gold-rate-form');
    const goldRateDisplay = document.getElementById('gold-rate');

    goldRateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const rate = document.getElementById('gold-rate-input').value;
        localStorage.setItem('goldRate', rate);
        goldRateDisplay.textContent = `₹ ${rate} per gram`;
    });

    // Load stored rate if available
    const savedRate = localStorage.getItem('goldRate');
    if (savedRate) {
        goldRateDisplay.textContent = `₹ ${savedRate} per gram`;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const popup = document.getElementById("image-popup");
    const popupImg = document.getElementById("popup-img");
    const closeBtn = document.getElementById("close-btn");

    thumbnails.forEach(img => {
        img.addEventListener("click", function () {
            popupImg.src = this.getAttribute("data-full");
            popup.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});

