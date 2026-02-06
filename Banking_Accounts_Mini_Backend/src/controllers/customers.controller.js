const BadRequest = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const service = require("../services/customers.service");

module.exports.createCustomer = async (req, res, next) => {
    try {
        const { full_name, email, phone } = req.body;
        if (!full_name || !email) {
            throw new BadRequest("full_name and email are required");
        }
        const customer = await service.createCustomer({
            full_name,
            email,
            phone,
        });
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
};

module.exports.getCustomerById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            throw new NotFoundError("Customer not fount");
        }
        const customer = await service.getCustomerById(id);
        return res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
};
