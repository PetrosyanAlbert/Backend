const express = require("express");
const router = express.Router();

const requireAdmin = require("../middlewares/requireAdmin");
const bookService = require("../services/book.service");
const userService = require("../services/user.service");

router.get("/", requireAdmin, (_, res) => {
    res.render("pages/admin-dashboard");
});

router.get("/books", requireAdmin, async (_, res) => {
    const books = await bookService.getAllBooks();
    res.render("pages/books", { books });
});

router.get("/books/new", requireAdmin, async (_, res) => {
    res.render("pages/admin-book-form", { book: null });
});

router.post("/books", requireAdmin, async (req, res) => {
    try {
        const { title, author, year } = req.body;
        await bookService.createBook({ title, author, year: Number(year) });
        res.redirect("/admin/books");
    } catch (err) {
        res.render("pages/admin-book-form", { error: err.message, book: null });
    }
});

router.get("/books/:id/edit", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const book = await bookService.findBookById(id);
    if (!book) {
        return res.status(404).render("pages/404");
    }
    res.render("pages/admin-book-form", { book });
});

router.post("/books/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const { title, author, year } = req.body;
        const updated = await bookService.updateBook(id, {
            title,
            author,
            year: Number(year),
        });
        res.redirect("/admin/books");
    } catch (err) {
        const book = await bookService.findBookById(id);
        res.render("pages/admin-book-form", { error: err.message, book });
    }
});

router.post("/books/:id/delete", requireAdmin, async (req, res) => {
    const { id } = req.params;
    await bookService.deleteBook(id);
    res.redirect("/admin/books");
});

router.get("/users", requireAdmin, async (_, res) => {
    const users = await userService.getAllUsers();
    res.render("pages/admin-users", { users });
});

module.exports = router;
