// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

// DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Format time function (HH:MM:SS)
function formatTime(timeInMs) {
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update display function
function updateDisplay() {
    const currentTime = Date.now();
    const timeDiff = elapsedTime + (currentTime - startTime);
    display.textContent = formatTime(timeDiff);
}

// Start stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 100); // Update every 100ms for smooth display
        isRunning = true;
        
        // Update button states
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        
        console.log("Stopwatch started");
    }
}

// Pause stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        console.log("Stopwatch paused");
    }
}

// Reset stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00';
    lapCount = 1;
    lapList.innerHTML = '';
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    
    console.log("Stopwatch reset");
}

// Record lap
function recordLap() {
    if (isRunning) {
        const currentTime = elapsedTime + (Date.now() - startTime);
        const formattedTime = formatTime(currentTime);
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formattedTime}</span>
        `;
        
        lapList.insertBefore(lapItem, lapList.firstChild);
        lapCount++;
        
        console.log(`Lap ${lapCount-1} recorded: ${formattedTime}`);
    }
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initialize button states
pauseBtn.disabled = true;
resetBtn.disabled = true;
lapBtn.disabled = true;

// Log to confirm stopwatch is ready
console.log("Stopwatch is ready!");