const userService = require("../services/user.service");

module.exports = async function attachUser(req, res, next) {
    const userId = req.session.userId;
    if (!userId) {
        req.user = null;
        res.locals.currentUser = null;
        return next();
    }
    try {
        const user = await userService.findById(userId);
        if (!user) {
            req.session.destroy(() => {});
            req.user = null;
            res.locals.currentUser = null;
            return next();
        }
        req.user = user;
        res.locals.currentUser = user;
        next();
    } catch (err) {
        next(err);
    }
};
