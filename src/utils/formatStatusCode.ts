import chalk from "chalk";

/**
 * This method formats the Status Code of a Response to a colorful string.
 * The Color and the Format Properties of the string are determined by the Value of the Status Code.
 *
 * @param {number} statusCode - The Status Code of a Response.
 * @returns string: The Formatted Colored Status Code as Sting.
 */
export default (statusCode: number): string => {
  let formattedStatusCode: string = "";

  if (statusCode >= 200 && statusCode < 300) {
    formattedStatusCode = chalk.green(statusCode);
  } else if (statusCode >= 300 && statusCode < 400) {
    formattedStatusCode = chalk.yellow(statusCode);
  } else if (statusCode >= 400 && statusCode < 500) {
    formattedStatusCode = chalk.red(statusCode);
  } else {
    formattedStatusCode = chalk.redBright.bold(statusCode);
  }

  return formattedStatusCode;
};
