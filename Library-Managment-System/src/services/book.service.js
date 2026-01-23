const { read, write } = require("./jsonStore");
const generateId = require("../utils/id");

const BOOKS_FILE = "books.json";

async function getAllBooks() {
    return await read(BOOKS_FILE);
}

async function findBookById(id) {
    const books = await read(BOOKS_FILE);
    return books.find((b) => b.id === id);
}

async function createBook({ title, author, year }) {
    if (!title || !author || !year) {
        throw new Error("Title, author and year are required");
    }
    if (!Number.isInteger(year)) {
        throw new Error("Year must integer");
    }
    const books = await read(BOOKS_FILE);
    const book = {
        id: generateId("b"),
        title,
        author,
        year,
        available: true,
        createdAt: new Date().toISOString(),
    };
    books.push(book);
    await write(BOOKS_FILE, books);
    return book;
}

async function updateBook(id, data) {
    const { title, author, year } = data;
    const books = await read(BOOKS_FILE);
    const book = books.find((b) => b.id == id);
    if (!book) return null;
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (year !== undefined) {
        if (!Number.isInteger(year)) {
            throw new Error("Year must be a valid integer");
        }
        book.year = year;
    }
    await write(BOOKS_FILE, books);
    return book;
}

async function deleteBook(id) {
    const books = await read(BOOKS_FILE);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    books.slice(index, 1);
    await write(BOOKS_FILE, books);
    return true;
}

async function setBookAvailability(bookId, available) {
    const books = await read(BOOKS_FILE);
    const book = books.find((b) => b.id === bookId);
    if (!book) return null;
    book.available = available;
    await write(BOOKS_FILE, books);
    return book;
}

module.exports = {
    getAllBooks,
    findBookById,
    createBook,
    updateBook,
    deleteBook,
    setBookAvailability,
};
