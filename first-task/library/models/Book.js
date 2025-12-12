class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = false;
    }

    borrow() {
        if (this.isBorrowed) {
            console.log(`Книга "${this.title}" уже взята.`);
            return false;
        }
        this.isBorrowed = true;
        console.log(`Книга "${this.title}" успешно взята.`);
        return true;
    }

    returnBook() {
        if (!this.isBorrowed) {
            console.log(`Книга "${this.title}" не находится у читателя.`);
            return false;
        }
        this.isBorrowed = false;
        console.log(`Книга "${this.title}" возвращена.`);
        return true;
    }
}

module.exports = Book;
