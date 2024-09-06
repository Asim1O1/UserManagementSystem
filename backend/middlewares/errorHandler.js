import createError from "http-errors";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    StatusCode: statusCode,
    IsSuccess: false,
    ErrorMessage: [{ message: error.message }],
    Result: null,
  });
};

// Middleware to handle 404 errors
export const notFoundHandler = (req, res, next) => {
  next(createError(404, "Not Found"));
};
