import { BadRequestError } from "../errors/index.js";

export const validate = (schema, property = "body") => {
    return function validateMiddleware(req, _, next) {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const message = error.details
                .map((item) => item.message)
                .join(", ");
            return next(new BadRequestError(message));
        }
        req[property] = value;
        next();
    };
};
