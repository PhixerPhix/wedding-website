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
    
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".rsvp-form");
    
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); 

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email"); // Grab email input field
            const attendanceSelect = document.getElementById("attendance");
            let isValid = true;

            document.querySelectorAll(".error-message").forEach(el => el.remove());

            // 1. Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, "We need your name to save your spot!");
                isValid = false;
            }

            // 2. Validate Email (NEW)
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

            if (!isValid) return;

            // 3. Send data to Formspree in the background
            const data = new FormData(form);
            const submitButton = form.querySelector(".submit-btn");
            submitButton.innerText = "SENDING...";
            submitButton.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                // Forces the browser to locate the folder root dynamically
                window.location.assign(window.location.pathname.replace("index.html", "thanks.html"));
                }

                } else {
                    alert("Oops! There was a problem submitting your RSVP. Please try again.");
                    submitButton.innerText = "SUBMIT RSVP";
                    submitButton.disabled = false;
                }
            } catch (error) {
                alert("Network error. Please check your connection and try again.");
                submitButton.innerText = "SUBMIT RSVP";
                submitButton.disabled = false;
            }
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
