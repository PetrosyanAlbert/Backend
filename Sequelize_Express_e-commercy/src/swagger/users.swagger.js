module.exports = {
    "/users": {
        get: {
            tags: ["Users"],
            summary: "Get all users",
            description: "Returns list of all users",

            responses: {
                200: {
                    description: "Users list",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                    },
                },
            },
        },

        post: {
            tags: ["Users"],
            summary: "Create user",
            description: "Create a new user",

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["fullName", "email"],
                            properties: {
                                fullName: {
                                    type: "string",
                                },
                                email: {
                                    type: "string",
                                },
                                role: {
                                    type: "string",
                                    enum: ["user", "admin"],
                                },
                            },
                        },
                    },
                },
            },

            responses: {
                201: {
                    description: "User created",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
                400: { description: "Invalid input" },
                409: { description: "User already exists" },
            },
        },
    },

    "/users/:id": {
        get: {
            tags: ["Users"],
            summary: "Get user by id",
            description: "Returns a single user by id",

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
                    description: "User found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },

                404: {
                    description: "User not found",
                },
            },
        },
    },
};
