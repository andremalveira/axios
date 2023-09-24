const errorCode = {
    500: "Internal Server Error",
    422: "Unprocessable Content",
    404: "Not Found",
    403: "Forbidden",
    401: "Unauthorized",
    201: "Created",
    200: "OK"
} as const;

export type statusCode = keyof typeof errorCode;
export const createError = (status:statusCode, message: string) => {
    let err = new Error() as any;
    err.message = message;
    err.status = status;
    err.statusMessage = errorCode[status];
    return err
}