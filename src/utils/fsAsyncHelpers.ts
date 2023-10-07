import fs from "fs/promises";

/**
 *
 * This method checks if a path is a directory or not and returns a Promise that resolves to a boolean value indicating whether the path is a directory.
 *
 * @param {String} path - Path of Directory to check
 * @returns Promise<boolean>: It returns a Promise that resolves to a boolean value indicating whether the path is a directory.
 *
 * @example <caption>An example to use the method:</caption>
 * const isItADirectory = await isDirectory("./sample/directory/location");
 */
export const isDirectory = async (path: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch (err) {
    return false;
  }
};

/**
 *
 * This method checks if a path is a file or not and returns a Promise that resolves to a boolean value indicating whether the path is a file.
 *
 * @param {String} path - Path of File to check
 * @returns Promise<boolean>: It returns a Promise that resolves to a boolean value indicating whether the path is a file.
 *
 * @example <caption>An example to use the method:</caption>
 * const isItAFile = await isFile("./sample/file/location");
 */
export const isFile = async (path: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(path);
    return stat.isFile();
  } catch (err) {
    return false;
  }
};
