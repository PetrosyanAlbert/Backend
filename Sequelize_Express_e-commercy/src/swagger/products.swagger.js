module.exports = {
    "/products": {
        get: {
            tags: ["Products"],
            summary: "Get all products",
            description: "Returns list of products",

            responses: {
                200: {
                    description: "Products list",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                },
            },
        },

        post: {
            tags: ["Products"],
            summary: "Create product",
            description: "Create a new product",

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["title", "price", "stock"],
                            properties: {
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
                    },
                },
            },

            responses: {
                201: {
                    description: "Product created",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product",
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

    "/products/{id}": {
        patch: {
            tags: ["Products"],
            summary: "Update product",
            description: "Update product fields by id",

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
                            properties: {
                                title: {
                                    type: "string",
                                },
                                price: {
                                    type: "number",
                                },
                                stock: {
                                    type: "integer",
                                },
                            },
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Product updated",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product",
                            },
                        },
                    },
                },
                404: {
                    description: "Product not found",
                },
            },
        },
    },
};
