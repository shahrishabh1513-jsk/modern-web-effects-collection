// Function to update clock time
function updateClock() {
    const now = new Date();
    
    // Get time components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
    
    // Add leading zeros
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    // Update time display
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('ampm').textContent = ampm;
    
    // Update date
    updateDate(now);
    
    // Update greeting
    updateGreeting(now);
}

// Update date display
function updateDate(now) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    document.getElementById('dayName').textContent = dayName;
    document.getElementById('fullDate').textContent = `${monthName} ${date}, ${year}`;
}

// Update greeting based on time of day
function updateGreeting(now) {
    const hours = now.getHours();
    const greeting = document.getElementById('greeting');
    const icon = document.getElementById('greetingIcon');
    
    if (hours < 12) {
        greeting.textContent = 'Good Morning';
        icon.className = 'fas fa-sun';
    } else if (hours < 17) {
        greeting.textContent = 'Good Afternoon';
        icon.className = 'fas fa-cloud-sun';
    } else if (hours < 20) {
        greeting.textContent = 'Good Evening';
        icon.className = 'fas fa-moon';
    } else {
        greeting.textContent = 'Good Night';
        icon.className = 'fas fa-star';
    }
}

// Initialize clock immediately
updateClock();

// Update clock every second
setInterval(updateClock, 1000);

// Log to confirm clock is working
console.log("Modern Clock is running!");