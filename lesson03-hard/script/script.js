// первый пункт усложненного задания

let lang = prompt('Введите "ru" или "en"');

if (lang === 'ru') {
    console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 'en') {
    console.log('monday, tuesday, wednesday, thursday, friday, sunday, saturday');
} else {
    console.log('Oops');
}

switch (lang) {
    case 'ru': 
        console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        break;
    case 'en': 
        console.log('monday, tuesday, wednesday, thursday, friday, sunday, saturday');
        break;
    default: 
        console.log('Oops');
}


let langArray = [];
langArray.ru = ['понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'];
langArray.en = ['monday, tuesday, wednesday, thursday, friday, sunday, saturday'];
console.log(langArray[lang]);

// второй пункт усложненного задания

let namePerson = prompt('Введите ваше имя');

let position = (namePerson === 'Артем') ? console.log('директор') : 
    (namePerson === 'Максим') ? console.log('преподаватель') : 
    console.log('студент');