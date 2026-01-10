module.exports = function validateProduct(data, partial = false) {
    const { name, price, stock } = data;
    if (!partial) {
        if (name == null || price == null || stock == null) {
            throw new Error("name, price and stock are required");
        }
    }
    if (name !== undefined) {
        if (typeof name !== "string" || !name.trim()) {
            throw new Error("name must be a non-empty string");
        }
    }
    if (price !== undefined) {
        if (typeof price !== "number" || price <= MAGIC_NUMBERS.ZERO) {
            throw new Error("price must be a positive number");
        }
    }
    if (stock !== undefined) {
        if (!Number.isInteger(stock) || stock < MAGIC_NUMBERS.ZERO) {
            throw new Error("stock must be an integer >= 0");
        }
    }
};
