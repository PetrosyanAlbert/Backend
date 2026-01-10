module.exports = function validateOrders(data) {
    const { items } = data;
    if (!Array.isArray(items) || items.length === MAGIC_NUMBERS.ZERO) {
        throw new Error("Items must be a non-empty array");
    }
    for (const item of items) {
        const { productId, quantity } = item;
        if (!productId || typeof productId !== "string") {
            throw new Error("ProductId must be non-empty string");
        }
        if (!Number.isInteger(quantity) || quantity <= MAGIC_NUMBERS.ZERO) {
            throw new Error("Quantity must be a positive integer");
        }
    }
};
