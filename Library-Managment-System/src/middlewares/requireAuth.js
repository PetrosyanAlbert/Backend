module.exports = function requireAuth(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }
    next();
};
