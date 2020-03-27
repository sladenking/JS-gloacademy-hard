'use strict';

let num = 266219;

let num1 = num.toString().split('');
let mult =1;
for (let i=0; i<num1.length; i++){
    mult *= num1[i];
}

console.log(mult);
let output = mult.toString().split('');
let alertWindow = output[0] + output[1];
alert(alertWindow);
