const BadRequest = require("../errors/BadRequestError");
const service = require("../services/accounts.service");

module.exports.createAccount = async (req, res, next) => {
    try {
        const { customerId, currency } = req.body;
        if (!customerId || !currency) {
            throw new BadRequest("customerId and currency are required");
        }
        const account = await service.createAccount({ customerId, currency });
        return res.status(201).json(account);
    } catch (err) {
        next(err);
    }
};

module.exports.getAccountById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new BadRequest("Invalid account id");
        }
        const account = await service.getAccountById(id);
        return res.status(200).json(account);
    } catch (err) {
        next(err);
    }
};

module.exports.deposit = async (req, res, next) => {
    try {
        const accountId = Number(req.params.id);
        const { amount, reference, note } = req.body;
        if (!Number.isInteger(accountId)) {
            throw new BadRequest("Invalid account id");
        }
        if (!reference) {
            throw new BadRequest("Reference is required");
        }
        const result = await service.deposit({
            accountId,
            amount,
            reference,
            note,
        });
        return res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

module.exports.updateStatus = async (req, res, next) => {
    try {
        const accountId = Number(req.params.id);
        const { status } = req.body;
        if (!Number.isInteger(accountId)) {
            throw new BadRequest("Invalid account id");
        }
        if (!status) {
            throw new BadRequest("Status is required");
        }
        const result = await service.updateStatus({ accountId, status });
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
