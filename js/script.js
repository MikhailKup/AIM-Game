const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('#board');
const screens = document.querySelectorAll('.screen');
const timeElement = document.querySelector('#time');
const colors = ['#4169E1', '#9966CC', '#E4717A', '#CA2C92', '#FFE5B4', '#50C878', '#FFD700', '#1CD3A2'];
let time = 0;
let score = 0;

// Функционал инициализации первого экрана
startBtn.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up');
});


timeList.addEventListener('click', (e) => {
	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', (e) => {
	if (e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createRandomCircle();
	}
});


// Функция начала игры
function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
};

// Функция окончания игры
function finishGame() {
	timeElement.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
};

//? ---------------------------------------------------

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current);
	}
};

function setTime(value) {
	timeElement.innerHTML = `00:${value}`;
};

//? ---------------------------------------------------

function createRandomCircle() {
	const circle = document.createElement('div');
	const radius = getRandomNumber(10, 60);
	circle.classList.add('circle');
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - radius);
	const y = getRandomNumber(0, height - radius);
	circle.style.width = `${radius}px`;
	circle.style.height = `${radius}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	setColor(circle);
	board.append(circle);
};

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
};

//? ---------------------------------------------------

const getRandomColor = () => {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
};

const setColor = (elem) => {
	const color = getRandomColor();
	elem.style.backgroundColor = color;
	elem.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
};