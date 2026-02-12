module.exports = {
    schemas: {
        User: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 1,
                },
                fullName: {
                    type: "string",
                    example: "Albert Petrosyan",
                },
                email: {
                    type: "string",
                    example: "albert@mail.com",
                },
                role: {
                    type: "string",
                    enum: ["user", "admin"],
                    example: "user",
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                },
            },
        },

        Product: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 10,
                },
                title: {
                    type: "string",
                    example: "MacBook Pro",
                },
                price: {
                    type: "number",
                    example: 1390000,
                },
                stock: {
                    type: "integer",
                    example: 5,
                },
            },
        },

        OrderItem: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 1,
                },
                quantity: {
                    type: "integer",
                    example: 2,
                },
                unitPrice: {
                    type: "number",
                    example: 120000,
                },
            },
        },

        Order: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    example: 3,
                },
                status: {
                    type: "string",
                    enum: ["pending", "paid", "cancelled"],
                    example: "pending",
                },
                totalPrice: {
                    type: "number",
                    example: 240000,
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                },
                items: {
                    type: "array",
                    items: {
                        $ref: "#/components/schemas/OrderItem",
                    },
                },
            },
        },
    },
};
