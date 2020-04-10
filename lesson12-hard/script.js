'use strict';

let genNew = document.querySelector('#genNew');
let color = document.querySelector('#color');


const setBg = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  color.textContent = "#" + randomColor;
};

genNew.addEventListener("click", setBg);
setBg();