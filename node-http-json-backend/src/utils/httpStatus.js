const HTTP_STATUS = {
    OK: 200, // Successful GET / Update
    CREATED: 201, // Resource created
    NO_CONTENT: 204, // Resource deleted (no body)
    BAD_REQUEST: 400, // Invalid request
    NOT_FOUND: 404, // Resource not found
    METHOD_NOT_ALLOWED: 405, // Method not allowed
    INTERNAL_SERVER_ERROR: 500, // Internal server error
};

module.exports = HTTP_STATUS;