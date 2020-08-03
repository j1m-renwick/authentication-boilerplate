const ApiError = (errorType) => {
    let e = new Error(errorType.message)
    e.status = errorType.status
    return e;
}

const ErrorType = {
    INCORRECT_CREDENTIALS: {message: "User credentials are incorrect.", status: 403},
    TOKEN_NOT_VALID: {message: "Token is not valid.", status: 403},
    REQUEST_PROCESS_FAIL: {message: "Could not process the request.", status: 500},
    NO_USERNAME_SUPPLIED: {message: "A username must be supplied.", status: 400}
}

export {ApiError, ErrorType}