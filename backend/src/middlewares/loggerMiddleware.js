// This file contains a basic logging middleware.
// It intercepts incoming requests, logs the method and URL, and then passes control to the next middleware.
// It is used in app.js to demonstrate middleware usage globally.
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
};

module.exports = loggerMiddleware;
