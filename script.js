let isRunning = false;
let startTime;
let lapStartTime;
let lapCount = 1;
let interval;

function startStop() {
    const btn = document.querySelector('.button');
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (lapStartTime || 0);
        lapStartTime = 0;
        btn.textContent = 'Pause';
        updateDisplay();
        startInterval();
    } else {
        isRunning = false;
        lapStartTime = new Date().getTime() - startTime;
        btn.textContent = 'Resume';
        clearInterval(interval);
    }
}

function pause() {
    startStop(); // Reusing the logic of startStop function
}

function reset() {
    const btn = document.querySelector('.button');
    isRunning = false;
    startTime = 0;
    lapStartTime = 0;
    lapCount = 1;
    btn.textContent = 'Start';
    updateDisplay();
    clearInterval(interval);
    clearLapList();
}

function lap() {
    const btn = document.querySelector('.button');
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const lapItem = document.createElement('li');
        lapItem.className = 'lap-item';
        lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        lapItem.style.color = getLapColor(lapCount);
        document.getElementById('lapList').appendChild(lapItem);
        lapStartTime = new Date().getTime();
        lapCount++;
    }
}

function updateDisplay() {
    const currentTime = isRunning ? new Date().getTime() - startTime : lapStartTime;
    document.getElementById('display').textContent = formatTime(currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        ':' +
        String(milliseconds).padStart(2, '0')
    );
}

function startInterval() {
    interval = setInterval(updateDisplay, 10);
}

function clearLapList() {
    const lapList = document.getElementById('lapList');
    while (lapList.firstChild) {
        lapList.removeChild(lapList.firstChild);
    }
}

function getLapColor(lapNumber) {
    switch (lapNumber % 3) {
        case 1:
            return 'green';
        case 2:
            return 'blue';
        case 0:
            return 'orange';
        default:
            return 'black';
    }
}
