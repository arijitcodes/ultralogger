import chalk from "chalk";

// Utility Imports
import { generateDateTimeFormat } from "./formatDate.js";

/**
 * @type {Varient} Varient: Varient of the Log. Options: LOG | INFO | WARNING | ERROR | SUCCESS | MUTED
 */
type Varient = "LOG" | "INFO" | "WARNING" | "ERROR" | "SUCCESS" | "MUTED";
type CustomLogType = "APP_SELF" | "CLIENT";

const color = {
  LOG: chalk.blueBright,
  INFO: chalk.cyanBright,
  WARNING: chalk.yellow,
  ERROR: chalk.red,
  SUCCESS: chalk.green,
  MUTED: chalk.gray,
};

/**
 * This method takes in a Text and the Varient / Type of the Log, formats it & prints it to the Console.
 * The Color of the Log is dependent on the Varient.
 *
 * @param {string} text - Text to be printed
 * @param {Varient} [varient="INFO"] - Type of the Log. Varient Options: LOG | INFO | WARNING | ERROR | SUCCESS | MUTED
 * @param {CustomLogType} [customLogType="CLIENT"] - Type of the Log. CustomLogType Options: APP_SELF | CLIENT
 * @returns {void} Void
 */
export default (
  text: string,
  varient: Varient = "INFO",
  customLogType: CustomLogType = "CLIENT"
): void => {
  const dateTime: string = generateDateTimeFormat(Date.now());
  console.log(
    `${color["MUTED"](dateTime)}${
      customLogType === "APP_SELF" ? chalk.magenta("[ UltraLog ] ") : ""
    }${color[varient](text)}`
  );
};
