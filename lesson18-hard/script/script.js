'use strict';

window.addEventListener("DOMContentLoaded", () => {

	const startBtn = document.querySelector('.start__btn'),
		resetBtn = document.querySelector('.reset__btn'),
		img = document.querySelector('img');

	let flyInterval,
		count = 0,
		animateStart = false;

	const startAnimate = function() {
		flyInterval = requestAnimationFrame(startAnimate);
		count++;
		if (count < 500) {
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
		img.style.transform = `rotate(0deg)`;
		cancelAnimationFrame(flyInterval);
	});

	startBtn.addEventListener('click', () => {
		if (animateStart) {
			animateStart = false;
			cancelAnimationFrame(flyInterval);
		} else {
			animateStart = true;
			flyInterval = requestAnimationFrame(startAnimate);
		}

	});


});
