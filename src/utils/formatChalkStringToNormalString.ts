import stripAnsi from "strip-ansi";

/**
 * This function strips ANSI codes from a string and returns the cleaned string.
 *
 * @param {string} chalkString - The string to strip ANSI codes from.
 * @returns string: The cleaned string.
 */
export default (chalkString: string): string => {
  const formattedString: string = stripAnsi(chalkString);

  return formattedString;
};
