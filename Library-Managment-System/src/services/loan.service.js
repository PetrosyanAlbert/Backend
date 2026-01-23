const { read, write } = require("./jsonStore");
const generateId = require("../utils/id");

const LOANS_FILE = "loans.json";

async function getActiveLoanByBookId(bookId) {
    const loans = await read(LOANS_FILE);
    return loans.find((l) => l.id === bookId && l.returnedAt === null) || null;
}

async function getActiveLoanByUserAndBook(userId, bookId) {
    const loans = await read(LOANS_FILE);
    return (
        loans.find(
            (l) =>
                l.userId === userId &&
                l.bookId === bookId &&
                l.returnedAt === null,
        ) || null
    );
}

async function getLoansByUser(userId) {
    const loans = await read(LOANS_FILE);
    return loans.filter((l) => l.userId === userId && l.returnedAt === null);
}

async function createLoan(userId, bookId) {
    const loans = await read(LOANS_FILE);
    const loan = {
        id: generateId("l"),
        userId,
        bookId,
        borrowedAt: new Date().toISOString(),
        returnedAt: null,
    };
    loans.push(loan);
    await write(LOANS_FILE, loans);
    return loan;
}

async function closeLoan(loanId) {
    const loans = await read(LOANS_FILE);
    const loan = loans.find((l) => l.id === loanId);
    if (!loan || loan.returnedAt !== null) return null;
    loan.returnedAt = new Date().toISOString();
    await write(LOANS_FILE, loans);
    return loan;
}

module.exports = {
    getActiveLoanByBookId,
    getActiveLoanByUserAndBook,
    getLoansByUser,
    createLoan,
    closeLoan,
};
