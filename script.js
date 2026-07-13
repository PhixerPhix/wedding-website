// Target Wedding Date: 19 June 2027 at 15:00 (3:00 PM)
// Note: Month index 5 represents June in JavaScript (0 = Jan, 1 = Feb)
const weddingDate = new Date(2026, 9, 3, 15, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Time conversion mathematics
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) return;

    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "OH LAWD. IT'S HAPPENIN' !";
    } else {
        countdownElement.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S REMAINING`;
    }
}

// Run the script instantly on load and refresh every 1 second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// --- RSVP FORM HANDLING ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".rsvp-form");
    
    if (form) {
        form.addEventListener("submit", (event) => {
            // Stop the form initially to run validations
            event.preventDefault(); 

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email"); 
            const attendanceSelect = document.getElementById("attendance");
            let isValid = true;

            // Clear old errors
            document.querySelectorAll(".error-message").forEach(el => el.remove());

            // 1. Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, "We need your name to save your spot!");
                isValid = false;
            }

            // 2. Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, "Please leave an email address!");
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, "That email format doesn't look quite right!");
                isValid = false;
            }

            // 3. Validate Attendance
            if (!attendanceSelect.value) {
                showError(attendanceSelect, "Please let us know if you can make it!");
                isValid = false;
            }

            // Stop execution if form validation fails
            if (!isValid) return;

            // Changing button text visually before submission
            const submitButton = form.querySelector(".submit-btn");
            submitButton.innerText = "SENDING...";
            submitButton.disabled = true;

            // Validation passed! Submit naturally via browser HTML flow
            form.submit();
        });
    }
});

function showError(element, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.innerText = message;
    
    error.style.color = "var(--bh-red)";
    error.style.fontFamily = "'Syne', sans-serif";
    error.style.fontWeight = "800";
    error.style.textTransform = "uppercase";
    error.style.fontSize = "0.85rem";
    error.style.marginTop = "-15px";
    error.style.marginBottom = "20px";
    
    element.insertAdjacentElement("afterend", error);
    element.style.borderColor = "var(--bh-red)";
}
