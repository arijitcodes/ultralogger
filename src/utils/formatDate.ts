import chalk from "chalk";

/**
 *
 * This function takes in a date as MS and returns Formatted Date as String
 *
 * @param {number} date Date in milliseconds
 * @returns string - The Date formatted in a Particular Format. Ex: [ YYYY/MM/DD, HH:MM:SS AM/PM ]
 */
export const generateDateTimeFormat = (date: number): string => {
  const formattedDate: string = new Date(date).toLocaleString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const tempDate = formattedDate.split(", ")[0];
  const tempTime = formattedDate.split(", ")[1];

  const finalDate = tempDate.split("/").reverse().join("/");
  const finalDateTime = `[ ${finalDate}, ${tempTime} ] `;

  return finalDateTime;
};

/**
 *
 * This function takes a date in MS and returns Formatted Date as Colored String
 *
 * @param {number} date - Date in milliseconds
 * @returns string: Formatted date and time as a string with chalk colors
 */
export default (date: number): string => {
  const finalDateTime = generateDateTimeFormat(date);
  return chalk.gray(finalDateTime);
};
