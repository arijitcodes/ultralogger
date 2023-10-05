import logType from "../types/logType";

export default interface ultraLoggerConfig {
  logType?: logType;
  writeToFile?: boolean;
  fileLocation?: string;
  fileName?: string;
}
