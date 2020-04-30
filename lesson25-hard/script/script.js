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

		const menu = document.querySelector('menu');

		document.body.addEventListener('click', event => {
			const target = event.target;

			if (target.matches('.menu, #menu__img, #menu__name')) {
				menu.classList.add('active-menu');
			} else if (target.tagName === 'A' && target.className !== 'close-btn') {
				scroll(target);
				menu.classList.remove('active-menu');
			} else if (target.classList.contains('close-btn') || target !== menu && target.tagName !== 'LI') {
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

	//Slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			dots = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

		for (let i = 0; i < slide.length; i++) {
			dots.insertAdjacentHTML('beforeend',
				`<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
		}

		const dot = document.querySelectorAll('.dot');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, i, strClass) => {
			elem[i].classList.remove(strClass);
		};

		const nextSlide = (elem, i, strClass) => {
			elem[i].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, i) => {
					if (elem === target) {
						currentSlide = i;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			} else if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide();
	};

	slider();

	//ChangePhoto
	const changePhoto = () => {
		const photosContainer = document.querySelector('.command>.container>.row');

		photosContainer.addEventListener('mouseover', event => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				target.src = target.dataset.img;
			}
		});

		photosContainer.addEventListener('mouseout', event => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				target.src = `${target.currentSrc.slice(0, -5)}.jpg`;
			}
		});

	};

	changePhoto();

	//Input Digits
	const inputDigits = () => {
		const calcItems = document.querySelector('.calc-block');
		calcItems.addEventListener('input', event => {
			const target = event.target;

			if (target.tagName === 'INPUT') {
				target.value = target.value.replace(/\D/gi, '');
			}
		});
	};

	inputDigits();

	//Calculator
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value <= 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			} else {
				total = 0;
			}

			totalValue.textContent = total;
		};


		calcBlock.addEventListener('change', event => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}


		});

	};

	calc(100);

	//Send-ajax-form
	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const forms = document.querySelectorAll('form');
		const bodyHtml = document.querySelector('body');

		const loader = () => `
			<style>
			.preloader__container {
				position: fixed;
				 background-color: rgba(0, 0, 0, .8);
				 height: 100%;
				width: 100%;
				z-index: 10;
				 display: flex;
				 flex-wrap: wrap;
				 justify-content: space-around;
				 align-content: space-around;
				top: 0;
			}
			 .sk-rotating-plane {
				 width: 4em;
				 height: 4em;
				 margin: auto;
				 background-color: #337ab7;
				 animation: sk-rotating-plane 1.2s infinite ease-in-out;
			}
			 @keyframes sk-rotating-plane {
				 0% {
					 transform: perspective(120px) rotateX(0deg) rotateY(0deg);
				}
				 50% {
					 transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
				}
				 100% {
					 transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
				}
			}		 
			</style>
			<section></section>
			<div class="preloader">
				<div class="preloader__container">
					<div class='sk-rotating-plane'></div>
				</div>
			</div>
			`;

		const statusMessage = document.createElement('div');
		statusMessage.classList.add('status-message');
		statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();

			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});

			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');


			request.send(JSON.stringify(body));
		};

		const removeStatusMessage = () => {
			const status = document.querySelector('.status-message');
			if (!status) return;
			setTimeout(() => {
				status.remove();
			}, 5000);
		};

		forms.forEach(form => {
			form.addEventListener('input', event => {
				const target = event.target;
				if (target.name === 'user_phone') {
					target.value = target.value.replace(/[^+\d]/g, '');
				}

				if (target.name === 'user_name' || target.name === 'user_message') {
					target.value = target.value.replace(/[^а-я ]/gi, '');
				}
			});

			form.addEventListener('submit', event => {
				event.preventDefault();
				form.insertAdjacentElement('beforeend', statusMessage);
				statusMessage.textContent = loadMessage;

				bodyHtml.insertAdjacentHTML('beforeend', loader());
				const loaderHtml = document.querySelector('.preloader');

				const formData = new FormData(form);
				const body = {};
				formData.forEach((val, key) => {
					body[key] = val;
				});

				postData(body,
					() => {
						removeStatusMessage();
						statusMessage.textContent = successMessage;
						form.reset();
						loaderHtml.remove();
					},
					error => {
						removeStatusMessage();
						statusMessage.textContent = errorMessage;
						console.error(error);
						loaderHtml.remove();
					});

			});
		});
	};

	sendForm();
});
