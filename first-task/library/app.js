// app.js

const Book = require("./models/Book");
const Member = require("./models/Member");
const library = require("./services/libraryService");

// Создание книг
const b1 = new Book("Clean Code", "Robert C. Martin", 2008);
const b2 = new Book("The Pragmatic Programmer", "Andrew Hunt", 1999);

// Регистрация книг
library.addBook(b1);
library.addBook(b2);

// Создание участников
const m1 = new Member("Albert", 1);
const m2 = new Member("John", 2);

// Регистрация участников
library.addMember(m1);
library.addMember(m2);

// Демонстрация
console.log("\n--- Взятие книг ---");
library.borrow("Clean Code", 1);
library.borrow("Clean Code", 2); // уже занята

console.log("\n--- Возврат книги ---");
library.return("Clean Code", 1);

console.log("\n--- Повторное взятие ---");
library.borrow("Clean Code", 2);
