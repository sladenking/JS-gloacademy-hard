'use strict';

window.addEventListener("DOMContentLoaded", () => {

	const startBtn = document.querySelector('.start__btn'),
		resetBtn = document.querySelector('.reset__btn'),
		img = document.querySelector('img');

	let flyInterval;
	let count = 0;
	let animateStart = false;

	const start = function() {
		flyInterval = requestAnimationFrame(start);
		count++;
		if (count < 300) {
			img.style.left = count * 2 + 'px';
			img.style.transform = `rotate(${count * 5}deg)`;
		} else {
			count = 0;
		}
	};



	resetBtn.addEventListener('click', () => {
		count = 0;
		animateStart = false;
		img.style.left = 0;
		cancelAnimationFrame(flyInterval);
	});

	startBtn.addEventListener('click', () => {
		if (!animateStart) {
			animateStart = true;
			flyInterval = requestAnimationFrame(start);
		} else {
			animateStart = false;
			cancelAnimationFrame(flyInterval);
		}

	});


});
