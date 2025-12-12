const books = [];
const members = [];

function addBook(book) {
    books.push(book);
}

function addMember(member) {
    members.push(member);
}

function findBook(title) {
    return books.find(b => b.title === title);
}

function findMember(id) {
    return members.find(m => m.memberId === id);
}

function borrow(title, memberId) {
    const book = findBook(title);
    const member = findMember(memberId);

    if (!book) return console.log(`Книга "${title}" не найдена.`);
    if (!member) return console.log(`Участник с id=${memberId} не найден.`);

    member.borrowBook(book);
}

function returnBook(title, memberId) {
    const book = findBook(title);
    const member = findMember(memberId);

    if (!book) return console.log(`Книга "${title}" не найдена.`);
    if (!member) return console.log(`Участник с id=${memberId} не найден.`);

    member.returnBook(book);
}

module.exports = {
    addBook,
    addMember,
    findBook,
    findMember,
    borrow,
    return: returnBook
};
