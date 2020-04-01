'use strict';

let arr = [];

for (let i = 0; i < 7; i++) {
  arr.push(String(Math.floor(Math.random() * 1001)));
  if (arr[i].search(/(2|4)/) === 0) {
    console.log(arr[i]);
  }
}

let arr1 = [];


for (let i = 2; i <= 100; i++) {
  let count = 0;
  for (let j = 1; j <= i; j++) {
    if (i % j !== 0) {
      continue;
    }
    count += 1;
  }
  if (count === 2) {
    arr1.push(String(i));    
    console.log(arr1[arr1.length-1], `делители этого числа 1 и ${arr1[arr1.length-1]}`);
  }
}
