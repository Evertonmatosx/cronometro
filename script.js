const startButton = document.querySelector('.button-start');
const resetButton = document.querySelector('.button-reset');
const timerDisplay = document.querySelector('.timer-display');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function formatTime(timeInMilliseconds) {
	const totalSeconds = Math.floor(timeInMilliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return [hours, minutes, seconds]
		.map((unit) => String(unit).padStart(2, '0'))
		.join(':');
}

function updateDisplay() {
	elapsedTime = Date.now() - startTime;
	timerDisplay.textContent = formatTime(elapsedTime);
}

function setStartButtonState(isRunning) {
	startButton.classList.toggle('button-stop', isRunning);
	startButton.classList.toggle('button-start', !isRunning);
	startButton.innerHTML = isRunning
		? '<i class="fa-solid fa-stop"></i>Parar'
		: '<i class="fa-solid fa-play"></i>Iniciar';
}

startButton.addEventListener('click', () => {
	if (timerInterval !== null) {
		clearInterval(timerInterval);
		timerInterval = null;
		updateDisplay();
		setStartButtonState(false);
		return;
	}

	startTime = Date.now() - elapsedTime;
	timerInterval = setInterval(updateDisplay, 1000);
	updateDisplay();
	setStartButtonState(true);
});

resetButton.addEventListener('click', () => {
	clearInterval(timerInterval);
	timerInterval = null;
	startTime = 0;
	elapsedTime = 0;
	timerDisplay.textContent = '00:00:00';
	setStartButtonState(false);
});