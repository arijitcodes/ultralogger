import chalk from "chalk";

/**
 * This method takes in the 'method' property of Express 'req' object and returns a formatted HTTP Method as Colored String.
 *
 * @param {string} method - The HTTP method of the request.
 * @returns string: The formatted HTTP Method String with Chalk Colors
 */
export default (method: string): string => {
  let formattedMethod: string = "";

  switch (method) {
    case "GET":
      formattedMethod = chalk.green(`[ ${method} ]`);
      break;

    case "POST":
      formattedMethod = chalk.yellow(`[ ${method} ]`);
      break;

    case "PUT":
      formattedMethod = chalk.yellowBright(`[ ${method} ]`);
      break;

    case "PATCH":
      formattedMethod = chalk.magenta(`[ ${method} ]`);
      break;

    case "DELETE":
      formattedMethod = chalk.red(`[ ${method} ]`);
      break;

    default:
      formattedMethod = chalk.white(`[ ${method} ]`);
      break;
  }

  return formattedMethod;
};
