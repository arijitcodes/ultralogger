import { RequestHandler } from "express";
import onFinished from "on-finished";

// Interfaces Imports
import ultraLoggerConfig from "./interfaces/ultraLoggerConfig.js";

// Types Imports
import logType from "./types/logType.js";

// Custom Utility Libraries Imports
import formatHTTPMethod from "./utils/formatHTTPMethod.js";
import formatStatusCode from "./utils/formatStatusCode.js";
import formatResponseTime from "./utils/formatResponseTime.js";
import formatDate from "./utils/formatDate.js";
import formatChalkStringToNormalString from "./utils/formatChalkStringToNormalString.js";
import writeLogToFile from "./utils/writeLogToFile.js";
import writeCustomLog from "./utils/writeCustomLog.js";
import formatIPAddress from "./utils/formatIPAddress.js";

// Default Base Config
let baseConfig: ultraLoggerConfig = {
  logType: "FULL",
  writeToFile: false,
  fileLocation: "./",
  fileName: "UltraLogger.log",
};

/**
 * @typedef ultraLoggerConfig
 * @prop {logType} [logType="FULL"] - The type of log to be generated.
 * @prop {boolean} [writeToFile=false] - Whether to write the log to a file or not.
 * @prop {string} [fileLocation="./"] - The folder/directory location of the Log File.
 * @prop {string} [fileName="UltraLogger.log"] - The name of the Log File.
 */

// Config Setter
/**
 * This method is the Configuration method for the UltraLogger. It takes in a ultraLoggerConfig object and sets the configuration for the UltraLogger.
 *
 * @param {ultraLoggerConfig} config - The configuration to be set for the UltraLogger.
 * @returns {void}: Void
 *
 * @example <caption>Method 1: Create a Config Object of ultraLoggerConfig interface and pass it into the config method.</caption>
 * const config: ultraLoggerConfig = {
 *  logType: "FULL",
 *  writeToFile: true,
 *  fileLocation: "./",
 *  fileName: "UltraLogger.log"
 * }
 *
 * ultraLogger.config(config)
 *
 * // OR, Another way to do the same -
 *
 * @example <caption>Method 2: Pass the ultraLoggerConfig directly into the config method.</caption>
 * ultraLogger.config({
 *  logType: "FULL",
 *  writeToFile: true,
 *  fileLocation: "./",
 *  fileName: "UltraLogger.log"
 * })
 */
const config = (config: ultraLoggerConfig): void => {
  baseConfig = { ...baseConfig, ...config };
};

/**
 *
 * This method is the base middleware of Express RequestHandler type - for the UltraLogger. It takes in a Request, Response, and NextFunction as input, creates a Formatted and Colored Log and prints the Log to the console and writes the Log to a file - if the configuration is set to write to a LogFile.
 *
 * @param {Request} req - Request Object of Express
 * @param {Response} res - Response Object of Express
 * @param {NextFunction} next - NextFunction of Express
 * @returns {void}: Void
 */
const APIReqLoggerBase: RequestHandler = (req, res, next): void => {
  const startTimestamp: number = Date.now();
  const url: string = req.url;
  const method: string = formatHTTPMethod(req.method);
  const date: string = formatDate(startTimestamp);
  const ip: string = formatIPAddress(req);

  onFinished(res, (err, response) => {
    const statusCode: string = formatStatusCode(response.statusCode);
    const totalResponseTimeInMS: string = formatResponseTime(
      Date.now() - startTimestamp
    );

    const log = `${
      ((baseConfig.logType === "FULL" || baseConfig.logType === "DEV") &&
        date) ||
      ""
    }
      ${(baseConfig.logType === "FULL" && ip) || ""}
      ${method} - 
      ${url} : 
      ${statusCode} - 
      ${totalResponseTimeInMS} ms`;

    // Writing to console
    console.log(log);

    // Writing in file if base cofig is setup for it
    if (baseConfig.writeToFile) {
      const cleanLog = formatChalkStringToNormalString(log);
      writeLogToFile(baseConfig, cleanLog).catch((err) => next(err));
    }
  });

  next();
};

// API Request Logger
/**
 *
 * This method is the middleware setter of the UltraLogger. It takes logType as input, sets the logType in BaseConfig of UltraLogger and returns the Middleware Method.
 *
 * @param {logType} logType - The type of log to be generated. Options: FULL | DEV | SHORT - Default: FULL.
 * @returns {RequestHandler} - The Middleware Method of the UltraLogger.
 *
 * @example <caption>Method 1: Without any logType input - which defaults to logType = "FULL"</caption>
 * app.use(ultraLogger.APIReqLogger())
 *
 * @example <caption>Method 2: With logType input. Available Options for logType: FULL | DEV | SHORT </caption>
 * app.use(ultraLogger.APIReqLogger("DEV"))
 */
const APIReqLogger = (logType?: logType): RequestHandler => {
  // check if the 'typeConfig' input is an instance of ultraLoggerConfig interface or is of type logType
  if (logType) {
    baseConfig.logType = logType;
  }

  return APIReqLoggerBase;
};

// Generic Console Logger methods
// General Log
/**
 * This method is the Log method - for logging to the Console. It takes in a text as input, formats the text, creates a Log Format - based on the logType, sets Blue Color & logs the text to the Console.
 *
 * @param {string} text - The text to be Formatted, Colored & Logged on Console.
 */
const log = (text: string): void => {
  writeCustomLog(text, "LOG");
};

// Info Log
/**
 * This method is the Info method - for logging to the Console. It takes in a text as input, formats the text, creates a Log Format - based on the logType, sets Cyan Color & logs the text to the Console.
 *
 * @param {string} text - The text to be Formatted, Colored & Logged on Console.
 */
const info = (text: string): void => {
  writeCustomLog(text, "INFO");
};

// Warning Log
/**
 * This method is the Warn (Warning) method - for logging to the Console. It takes in a text as input, formats the text, creates a Log Format - based on the logType, sets Dark Yellow Color & logs the text to the Console.
 *
 * @param {string} text - The text to be Formatted, Colored & Logged on Console.
 */
const warn = (text: string): void => {
  writeCustomLog(text, "WARNING");
};

// Danger / Error Log
/**
 * This method is the Error / Danger method - for logging to the Console. It takes in a text as input, formats the text, creates a Log Format - based on the logType, sets Red Color & logs the text to the Console.
 *
 * @param {string} text - The text to be Formatted, Colored & Logged on Console.
 */
const error = (text: string): void => {
  writeCustomLog(text, "ERROR");
};

// Success Log
/**
 * This method is the Success method - for logging to the Console. It takes in a text as input, formats the text, creates a Log Format - based on the logType, sets Green Color & logs the text to the Console.
 *
 * @param {string} text - The text to be Formatted, Colored & Logged on Console.
 */
const success = (text: string): void => {
  writeCustomLog(text, "SUCCESS");
};

// Muted Log
/**
 * This method is the Muted method - for logging to the Console. It takes in a text as input, formats the text, creates a Log Format - based on the logType, sets Gray Color & logs the text to the Console.
 *
 * @param {string} text - The text to be Formatted, Colored & Logged on Console.
 */
const muted = (text: string): void => {
  writeCustomLog(text, "MUTED");
};

export default {
  config,
  APIReqLogger,
  log,
  info,
  warn,
  error,
  success,
  muted,
};
