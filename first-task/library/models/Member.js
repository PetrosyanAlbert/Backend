class Member {
    constructor(name, memberId) {
        this.name = name;
        this.memberId = memberId;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.borrow()) {
            this.borrowedBooks.push(book);
        }
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1 && book.returnBook()) {
            this.borrowedBooks.splice(index, 1);
        }
    }
}

module.exports = Member;
