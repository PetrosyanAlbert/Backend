const utils = require('./utils');

console.log("Сегодняшняя дата:", utils.date(new Date()));
console.log("Случайное число:", utils.random(1, 10));
utils.logger("Это сообщение из логгера!");
