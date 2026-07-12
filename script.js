// Target Wedding Date: 3 October 2026 at 15:00 (3:00 PM)
// Note: Month index 9 represents October in JavaScript
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
        countdownElement.innerHTML = "THE BIG DAY HAS ARRIVED!";
    } else {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s REMAINING`;
    }
}

// Run the script instantly on load and refresh every 1 second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
