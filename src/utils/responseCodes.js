const CLIENT_SUCCESS_STATUSES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
};

const CLIENT_ERROR_STATUSES = {
    SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
};

const CLIENT_ERRORS = {
    [CLIENT_ERROR_STATUSES.BAD_REQUEST]: () => ({
        code: "BAD_REQUEST",
        message: "Bad request. ",
        statusCode: CLIENT_ERROR_STATUSES.BAD_REQUEST,
    }),

    [CLIENT_ERROR_STATUSES.UNAUTHORIZED]: () => ({
        code: "UNAUTHORIZED",
        message: "Unauthorized. Invalid Token",
        statusCode: CLIENT_ERROR_STATUSES.UNAUTHORIZED,
    }),

    [CLIENT_ERROR_STATUSES.FORBIDDEN]: () => ({
        code: "FORBIDDEN",
        message: "Forbidden. A token is required for authentication",
        statusCode: CLIENT_ERROR_STATUSES.FORBIDDEN,
    }),

    [CLIENT_ERROR_STATUSES.NOT_FOUND]: (entity) => ({
        code: "NOT_FOUND",
        message: `"${entity.constructor.name}" is not Found.`,
        statusCode: CLIENT_ERROR_STATUSES.NOT_FOUND,
    }),
    [CLIENT_ERROR_STATUSES.CONFLICT]: (entity) => ({
        code: "CONFLICT",
        message: `Duplicate entry "${entity.constructor.name}" entity`,
        statusCode: CLIENT_ERROR_STATUSES.NOT_FOUND,
    }),
};

export {
    CLIENT_ERRORS,
    CLIENT_ERROR_STATUSES,

    CLIENT_SUCCESS_STATUSES,
};
