const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const bookService = require("../services/book.service");
const loanService = require("../services/loan.service");

router.get("/books", requireAuth, async (_, res) => {
    const books = await bookService.getAllBooks();
    res.render("pages/books", { books });
});

router.get("/books/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const book = await bookService.findBookById(id);
    if (!book) return res.status(404).render("pages/404");
    res.render("pages/book-details", { book });
});

router.post("/books/:id/borrow", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const book = await bookService.findBookById(bookId);
    if (!book) return res.status(404).render("pages/404");
    if (!book.available) return res.redirect(`/books/${bookId}`);
    const activeLoan = await loanService.getActiveLoanByBookId(bookId);
    if (activeLoan) {
        res.redirect(`/books/${bookId}`);
    }
    await loanService.createLoan(userId, bookId);
    await bookService.setBookAvailability(bookId, false);
    res.redirect(`/books/${bookId}`);
});

router.post("/books/:id/return", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const book = await bookService.findBookById(bookId);
    if (!book) return res.status(404).render("pages/404");
    const loan = await loanService.getActiveLoanByUserAndBook(userId, bookId);
    if (!loan) return res.redirect(`/books/${bookId}`);
    await loanService.closeLoan(loan.id);
    await bookService.setBookAvailability(bookId, true);
    res.redirect(`/books/${bookId}`);
});

router.get("/me/loans", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const loans = await loanService.getLoansByUser(userId);
    const loansBooks = [];
    for (const loan of loans) {
        const book = await bookService.findBookById(loan.bookId);
        if (book) {
            loansBooks.push({ loan, book });
        }
    }
    res.render("pages/my-loans", { loans: loansBooks });
});

module.exports = router;
