import fs from "fs/promises";

import ultraLoggerConfig from "../interfaces/ultraLoggerConfig.js";
import { isDirectory } from "./fsAsyncHelpers.js";
import formatFolderAndFileNames from "./formatFolderAndFileNames.js";

/**
 * This method takes in a ultraLoggerConfig object and a Clean Log as string and appends the Log to the Log File - specified in the ultraLoggerConfig object.
 *
 * @param {Object} baseConfig - The ultraLoggerConfig object.
 * @property {logType} [logType="FULL"] - The type of log to be generated.
 * @property {boolean} [writeToFile=false] - Whether to write the log to a file or not.
 * @property {string} [fileLocation="./"] - The folder/directory location of the Log File.
 * @property {string} [fileName="UltraLogger.log"] - The name of the Log File.
 *
 * @returns Promise<void | Error>: Returns a Promise that resolves to void or rejects with an Error.
 */
export default async (
  baseConfig: ultraLoggerConfig,
  cleanLog: string
): Promise<void | Error> => {
  try {
    // Check if directory exists or has been deleted
    isDirectory(`${baseConfig.fileLocation}`).then((isDir) => {
      if (!isDir) {
        // If dir doesn't exist, create it
        formatFolderAndFileNames(baseConfig);
      } else {
        // If directory exists, append log to file
        fs.appendFile(
          `${baseConfig.fileLocation}${baseConfig.fileName}`,
          cleanLog + "\n"
        );
      }
    });
  } catch (err) {
    throw err;
  }
};
