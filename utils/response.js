export const sendResponse = (res, statusCode, status, message, result = null) => {
  res.status(statusCode).json({
    response_code: statusCode,
    status,
    message,
    ...(result && { result }) // only add result if not null
  });
};

export const sendError = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({
    response_code: statusCode,
    status: false,
    message,
    ...(error && { error })
  });
};
