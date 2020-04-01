'use strict';

let input = prompt("Введите сообщение");
console.log('input: ', input);

let textEditor = function (input) {
  let regexp = /\D/g;
  if (input.match(regexp)) {
    input = input.trim();
    let sliced = input.slice(0, 30);
    if (sliced.length < input.length) {
      sliced += '...';
    }
    console.log('output: ', sliced);

  } else {

    console.log('Упс, что-то пошло не так! Введено число!');
  }
};

textEditor(input);
