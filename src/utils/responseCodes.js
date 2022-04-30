const CLIENT_SUCCESS_STATUSES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
};

const CLIENT_ERROR_STATUSES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};

const CLIENT_ERRORS = {
    [CLIENT_ERROR_STATUSES.BAD_REQUEST]: () => ({
        statusCode: CLIENT_ERROR_STATUSES.BAD_REQUEST,
        code: Object.keys(CLIENT_ERROR_STATUSES.BAD_REQUEST),
        message: "Bad request. ",
    }),

    [CLIENT_ERROR_STATUSES.UNAUTHORIZED]: () => ({
        statusCode: CLIENT_ERROR_STATUSES.UNAUTHORIZED,
        code: Object.keys(CLIENT_ERROR_STATUSES.UNAUTHORIZED),
        message: "Unauthorized. Invalid Token",
    }),

    [CLIENT_ERROR_STATUSES.FORBIDDEN]: () => ({
        statusCode: CLIENT_ERROR_STATUSES.FORBIDDEN,
        code: Object.keys(CLIENT_ERROR_STATUSES.FORBIDDEN),
        message: "Forbidden. A token is required for authentication",
    }),

    [CLIENT_ERROR_STATUSES.NOT_FOUND]: (entity) => ({
        statusCode: CLIENT_ERROR_STATUSES.NOT_FOUND,
        code: Object.keys(CLIENT_ERROR_STATUSES.NOT_FOUND),
        message: `"${entity.constructor.name}" is not Found.`,
    }),
};

export {
    CLIENT_ERRORS,
    CLIENT_ERROR_STATUSES,

    CLIENT_SUCCESS_STATUSES,
};
