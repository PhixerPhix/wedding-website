// Target Wedding Date: 3 October 2026 at 15:00 (3:00 PM)
// Note: Month index 9 represents October in JavaScript
const weddingDate = new Date(2026, 9, 3, 15, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Time calculations
    // Time conversion mathematics
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) return;

    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "The Big Day Has Arrived!";
        countdownElement.innerHTML = "THE BIG DAY HAS ARRIVED!";
    } else {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s until the big day!`;
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s REMAINING`;
    }
}

// Run immediately and update every second
// Run the script instantly on load and refresh every 1 second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".rsvp-form");
    
    if (form) {
        form.addEventListener("submit", (event) => {
            const nameInput = document.getElementById("name");
            const attendanceSelect = document.getElementById("attendance");
            let isValid = true;

            // Remove any existing custom error messages first
            document.querySelectorAll(".error-message").forEach(el => el.remove());

            // 1. Validate Name Field
            if (!nameInput.value.trim()) {
                showError(nameInput, "We need your name to save your spot!");
                isValid = false;
            }

            // 2. Validate Attendance Dropdown
            if (!attendanceSelect.value) {
                showError(attendanceSelect, "Please let us know if you can make it!");
                isValid = false;
            }

            // If any validation fails, stop the form from sending to Formspree
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
});

// Helper function to create striking Bauhaus error text
function showError(element, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.innerText = message;
    
    // Style the error inline or move to CSS
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
