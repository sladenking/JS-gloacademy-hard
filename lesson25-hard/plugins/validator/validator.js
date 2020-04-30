'use strict';

class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.method = method;
		this.elementsForm = [...this.form.elements].filter(item =>
			item.tagName.toLowerCase() !== 'button' &&
			item.type !== 'button'
		);
		this.error = new Set();
	}

	init() {
		this.applyStyle();
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
		this.form.addEventListener('submit', event => {
			this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
			if (this.error.size) {
				event.preventDefault();
			}
		});
	}

	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};

		if (this.method) {
			const method = this.method[elem.id];

			if (method) {
				return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		} else {
			console.warn('Необходимо передать ID полей ввода и методы проверки этих полей');
		}

		return true;
	}

	checkIt(event) {
		const target = event.target;

		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
	}

	showError(elem) {
		elem.classList.add('error');
		elem.classList.remove('success');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			return;
		}
	}

	showSuccess(elem) {
		elem.classList.add('success');
		elem.classList.remove('error');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
	}

	applyStyle() {
		const style = document.createElement('style');
		style.textContent = `
			body form input.success {
				border: 2px solid green !important;
			}
			body form input.error {
				border: 2px solid red !important;
			}
			.validator-error {
				font-size: 14px;
				color: white;
				z-index: 1;
				display: inline-block
			}
		`;

		document.head.appendChild(style);
	}

	setPattern() {
		if (!this.pattern.name) {
			this.pattern.name = /^[а-яА-Я]+$/i;
		}
		if (!this.pattern.message) {
			this.pattern.message = /^[а-яА-Я ]+$/i;
		}
		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?(38)?([-()]*\d){10}$/;
		}
		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,}$/;
		}
	}
}
