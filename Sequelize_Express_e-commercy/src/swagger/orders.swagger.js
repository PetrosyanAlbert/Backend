module.exports = {
    "/orders": {
        post: {
            tags: ["Orders"],
            summary: "Create order",
            description: "Create empty order for a user",

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["userId"],
                            properties: {
                                userId: {
                                    type: "integer",
                                    example: 1,
                                },
                            },
                        },
                    },
                },
            },

            responses: {
                201: {
                    description: "Order created",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Order",
                            },
                        },
                    },
                },
                400: {
                    description: "Invalid input",
                },
            },
        },
    },

    "/orders/{id}": {
        get: {
            tags: ["Orders"],
            summary: "Get order by id",
            description: "Returns order with items and products",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],

            responses: {
                200: {
                    description: "Order found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Order",
                            },
                        },
                    },
                },
                404: {
                    description: "Order not found",
                },
            },
        },
    },

    "/orders/{id}/items": {
        post: {
            tags: ["Orders"],
            summary: "Add item to order",
            description: "Add product to existing order",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["productId", "quantity"],
                            properties: {
                                productId: {
                                    type: "integer",
                                    example: 3,
                                },
                                quantity: {
                                    type: "integer",
                                    example: 2,
                                },
                            },
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Item added to order",
                },
                400: {
                    description: "Invalid input or order status",
                },
                404: {
                    description: "Order or product not found",
                },
            },
        },
    },

    "/orders/{id}/status": {
        patch: {
            tags: ["Orders"],
            summary: "Update order status",
            description: "Change order status to paid or cancelled",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["status"],
                            properties: {
                                status: {
                                    type: "string",
                                    enum: ["paid", "cancelled"],
                                    example: "paid",
                                },
                            },
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Order status updated",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Order",
                            },
                        },
                    },
                },
                400: {
                    description: "Invalid status or transition",
                },
                404: {
                    description: "Order not found",
                },
            },
        },
    },

    "/users/{id}/orders": {
        get: {
            tags: ["Orders"],
            summary: "Get user orders",
            description: "Returns all orders for a specific user",

            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
            ],

            responses: {
                200: {
                    description: "Orders list",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Order",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
