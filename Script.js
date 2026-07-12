// Set your wedding target date here (Year, Month Index 0-11, Day, Hour, Minute)
const weddingDate = new Date(2026, 9, 3, 15, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Time calculations
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "The Big Day Has Arrived!";
    } else {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s until the big day!`;
    }
}

// Run immediately and update every second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
