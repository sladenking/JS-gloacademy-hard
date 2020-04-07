'use strict';

setInterval(function () {
  let date = new Date();
  const output = document.querySelector('#output1');
  let hour,
    minute,
    second,
    weekday = date.toLocaleString('default', {weekday: 'long'}),
    month = date.toLocaleString('default', {month: 'long'}),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  if (hours === 1 || hours === 21) {
    hour = 'час';
  } else if (hours > 1 && hours < 5 || hours > 21 && hours <= 24) {
    hour = 'часа';
  } else if (hours > 4 && hours < 21) {
    hour = 'часов';
  }

  if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
    minute = 'минута';
  } else if (minutes > 1 && minutes < 5 || minutes > 21 && minutes <= 24 || minutes > 31 && minutes <= 34 || minutes > 41 && minutes <= 44 || minutes > 51 && minutes <= 54) {
    minute = 'минуты';
  } else if (minutes >= 5 && minutes < 21 || minutes >= 25 && minutes < 31 || minutes >= 35 && minutes < 41 || minutes >= 45 && minutes < 51 || minutes >= 55) {
    minute = 'минут';
  }

  if (seconds === 1 || seconds === 21 || seconds === 31 || seconds === 41 || seconds === 51) {
    second = 'секунда';
  } else if (seconds > 1 && seconds < 5 || seconds > 21 && seconds <= 24 || seconds > 31 && seconds <= 34 || seconds > 41 && seconds <= 44 || seconds > 51 && seconds <= 54) {
    second = 'секунды';
  } else if (seconds >= 5 && seconds < 21 || seconds >= 25 && seconds < 31 || seconds >= 35 && seconds < 41 || seconds >= 45 && seconds < 51 || seconds >= 55) {
    second = 'секунд';
  }

  weekday = weekday
    .charAt(0)
    .toUpperCase() + weekday.substr(1);
  month = month.replace('ь', 'я');

  let day = `Сегодня ${weekday}, ${date.getDate()} ${month} ${date.getFullYear()} года, ${hours} ${hour} ${minutes} ${minute} ${seconds} ${second}`;

  output.innerHTML = day;
}, 1000);

setInterval(function () {
  let date = new Date();
  const output = document.querySelector('#output2');
  let day = String(date.getDate()),
    month = date.getMonth(),
    year = date.getFullYear();

  if (day<10) {
      day = '0' + day;
  }
  if (month<10) {
    month = '0' + month;
}

  let d = `${day}.${month}.${year} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  output.innerHTML = d;
  console.log(day.length);
}, 1000);