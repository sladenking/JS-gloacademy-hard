'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Timer
	const countTimer = () => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateNow = new Date(),
				dateStop = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		}

		function formatTime(data) {
			if (data < 10) {
				data = '0' + data;
			}
			return data;
		}

		setInterval(() => {

			const timer = getTimeRemaining();

			timerHours.textContent = formatTime(timer.hours);
			timerMinutes.textContent = formatTime(timer.minutes);
			timerSeconds.textContent = formatTime(timer.seconds);

		}, 1000);
	};

	countTimer();

	const scroll = elem => {
		event.preventDefault();
		console.log(elem);
		const link = elem.href.split('#')[1];
		document.querySelector('#' + link).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'center'
		});
	};

	const scrollHead = () => {
		const btnScrolling = document.querySelector('a[href="#service-block"]');
		btnScrolling.addEventListener('click', event => {
			event.preventDefault();
			scroll(btnScrolling);
		});
	};

	scrollHead();

	//Menu
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		document.body.addEventListener('click', event => {
			const target = event.target;

			if (target === btnMenu) {
				menu.classList.add('active-menu');
			} else if (target.tagName === 'A' && target.className !== 'close-btn') {
				scroll(target);
				menu.classList.remove('active-menu');
			} else if (target.classList.contains('close-btn') || target !== menu) {
				menu.classList.remove('active-menu');
			}
		});
	};

	toggleMenu();

	//PopUp
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupContent = popup.querySelector('.popup-content');

		let flyInterval, count = -40, animateStart = true;

		const startAnimate = function() {
			if (document.documentElement.clientWidth < 768) {
				popup.style.display = 'block';
				popupContent.style.top = '10%';
				return;
			}
			flyInterval = requestAnimationFrame(startAnimate);
			count++;
			if (count < 10) {
				popupContent.style.top = count * 2 + '%';
				popup.style.display = 'block';
			} else {
				count = -40;
				cancelAnimationFrame(flyInterval);
			}
		};

		document.body.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-btn')) {
				if (!animateStart) {
					cancelAnimationFrame(flyInterval);
					animateStart = false;
				} else {
					flyInterval = requestAnimationFrame(startAnimate);
					animateStart = true;
				}
			}

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}
		});
	};

	togglePopUp();

	//Tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}

		});
	};

	tabs();
});
