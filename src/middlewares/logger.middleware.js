import { createLogger, format, transports } from "winston";
// Create a logger instance
export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm" }),// Add timestamp to logs
    format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}` // Format how logs are displayed
    )
  ),

  transports: [
    // Log to the console (terminal)
    new transports.Console(),
    // Log only 'info' level messages to "logs.txt"
    new transports.File({
      filename: "logs.txt",
      level: "info",
      format: format.combine(
        // Filter out only 'info' level logs
        format((info) => (info.level === "info" ? info : false))(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
        format.printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
      ),
    }),
    // Log only 'error' level messages to "error.logs.txt"
    new transports.File({ filename: "error.logs.txt", level: "error" }),
  ],
});
// Helper function to log auth-related actions
export const loggerFunction = (type, message) => {
  const allowedTypes = ["signIn", "signUp", "logOut"];// Only log these types
  if (allowedTypes.includes(type)) {
    logger.info(`${type}: ${message}`);// Log as 'info' level
  };
};
