// ✅ Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDbc4W4q2gT78EgYx6I9u675Zfrcb_cHb0",
    authDomain: "goldrate-e4872.firebaseapp.com",
    databaseURL: "https://goldrate-e4872-default-rtdb.firebaseio.com",
    projectId: "goldrate-e4872",
    storageBucket: "goldrate-e4872.appspot.com",
    messagingSenderId: "201623141947",
    appId: "1:201623141947:web:7789dd688988634e6ea61e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ✅ Document ready function
document.addEventListener("DOMContentLoaded", function () {
    // ✅ Select elements
    const goldRateForm = document.getElementById("gold-rate-form");
    const goldRateDisplay = document.getElementById("gold-rate");
    const goldRateInput = document.getElementById("gold-rate-input");
    const adminButton = document.getElementById("admin-btn");
    const formModal = document.getElementById("form-modal");
    const closeBtn = document.getElementById("close-btn");
    const adminPass = "Siddhant"; // Change this to a secure password

    // ✅ Fetch and display gold rate from Firebase
    function fetchGoldRate() {
        db.ref("goldRate").on("value", (snapshot) => {
            if (snapshot.exists()) {
                let goldRate = snapshot.val();
                goldRateDisplay.textContent = `₹ ${goldRate} per 10 gram`;
            } else {
                goldRateDisplay.textContent = "Gold rate not available.";
            }
        });
    }

    // ✅ Update gold rate (Admin only)
    function updateGoldRate() {
        let goldRate = goldRateInput.value;
        if (goldRate) {
            db.ref("goldRate").set(goldRate)
                .then(() => alert("Gold rate updated successfully!"))
                .catch(error => console.error("Error updating gold rate:", error));
        }
    }

    // Show form if already logged in
    if (localStorage.getItem("isAdmin") === "true") {
        goldRateForm.style.display = "block";
    }

    // Admin login functionality
    adminButton.addEventListener("click", function () {
        if (localStorage.getItem("isAdmin") !== "true") {
            const password = prompt("Enter Admin Password:");
            if (password === adminPass) {
                localStorage.setItem("isAdmin", "true");
                goldRateForm.style.display = "block";
                alert("Welcome, Admin!");
            } else {
                alert("Incorrect password!");
            }
        } else {
            alert("You are already logged in as Admin.");
            goldRateForm.style.display = "block";
        }
    });

    // Handle gold rate form submission
    goldRateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateGoldRate();
    });

    // ✅ Check if user has already filled the Google Form
    if (!localStorage.getItem("formSubmitted")) {
        formModal.style.display = "flex";
    }

    // ✅ Close form modal
    closeBtn.addEventListener("click", function () {
        formModal.style.display = "none";
        localStorage.setItem("formSubmitted", "true"); // Mark as submitted
    });

    // ✅ Fetch gold rate on page load
    fetchGoldRate();
});

// ✅ Image popup for catalog - This will only run on catalog page if elements exist
document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const popup = document.getElementById("image-popup");
    
    if (thumbnails.length > 0 && popup) {
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
    }
});
