import { httpStatus } from "../constants/index.js";

export function sendResponse(
    res,
    {
        statusCode = httpStatus.OK,
        success = true,
        message = "Success",
        data = null,
        code = null,
    } = {},
) {
    const payload = {
        success,
        message,
    };

    if (code) {
        payload.code = code;
    }

    if (data !== null) {
        payload.data = data;
    }

    return res.status(statusCode).json(payload);
}

export function ok(res, message = "Success", data = null) {
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message,
        data,
    });
}

export function created(res, message = "Created successfully", data = null) {
    return sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message,
        data,
    });
}

export function fail(
    res,
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    message = "Internal server error",
    code = null,
) {
    return sendResponse(res, {
        statusCode,
        success: false,
        message,
        code,
    });
}
