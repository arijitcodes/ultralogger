import chalk from "chalk";

/**
 * This method takes in a Response Time and Returns a formatted & colored string.
 * The color of the string depends on the Response Time.
 *
 * @param {number} responseTime - The Response Time to be formatted.
 * @returns string: The formatted & colored string.
 */
export default (responseTime: number) => {
  let formattedResponseTime: string = "";

  if (responseTime < 300) {
    formattedResponseTime = chalk.cyanBright(responseTime);
  } else if (responseTime >= 300 && responseTime < 500) {
    formattedResponseTime = chalk.yellow(responseTime);
  } else {
    formattedResponseTime = chalk.redBright(responseTime);
  }

  return formattedResponseTime;
};
