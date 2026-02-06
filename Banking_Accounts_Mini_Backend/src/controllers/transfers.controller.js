const service = require("../services/transfers.service");
const BadRequest = require("../errors/BadRequestError");

module.exports.transfer = async (req, res, next) => {
    try {
        const { fromAccountId, toAccountId, amount, reference, note } =
            req.body;
        if (!fromAccountId || !toAccountId) {
            throw new BadRequest("fromAccountId and toAccountId are required");
        }
        if (fromAccountId === toAccountId) {
            throw new BadRequest("Accounts must be different");
        }
        if (!amount || amount <= 0) {
            throw new BadRequest("Amount must be greater than 0");
        }
        if (!reference) {
            throw new BadRequest("Reference is required");
        }
        const result = await service.transfer({
            fromAccountId,
            toAccountId,
            amount,
            reference,
            note,
        });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};
