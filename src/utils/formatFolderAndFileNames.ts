import fs from "fs";

// Interfaces Imports
import ultraLoggerConfig from "../interfaces/ultraLoggerConfig.js";

// Utils Imports
import { isDirectory } from "./fsAsyncHelpers.js";

/**
 * This method is used to format the folder location / path and file names.
 *
 * @param {ultraLoggerConfig} baseConfig - The baseConfig object of type ultraLoggerConfig.
 * @returns {void} Void: Returns void.
 */
export default (baseConfig: ultraLoggerConfig): void => {
  // Checking for proper Directory name and File name - if they are not proper, then correcting them
  if (
    baseConfig.writeToFile &&
    baseConfig.fileLocation &&
    baseConfig.fileName
  ) {
    // Cleaning Folder location
    baseConfig.fileLocation = baseConfig.fileLocation.replace(
      /[^a-zA-Z0-9_./-]/g,
      ""
    );

    // Cleaning File Name
    baseConfig.fileName = baseConfig.fileName.replace(/[^a-zA-Z0-9._-]/g, "");

    // If folder location doesnt end with / - add one
    if (!baseConfig.fileLocation.endsWith("/")) {
      baseConfig.fileLocation += "/";
    }

    // Check if folder exists - if not, create it
    isDirectory(baseConfig.fileLocation).then((res) => {
      if (!res) {
        const dir: string = baseConfig.fileLocation || "./";
        fs.mkdir(
          dir,
          { recursive: true },
          (err: NodeJS.ErrnoException | null) => {
            if (err) throw err;
          }
        );
      }
    });
  }
};
