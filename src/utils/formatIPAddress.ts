import chalk from "chalk";
import { Request } from "express";

/**
 * This Object is used to map the various Proxy and Client IP Forward Headers to their respective Client IP Forward Headers.
 * The keys of the objects are different Proxy Services Names and their respective values are the Header Strings
 */
const PROXIES_AND_THEIR_CLIENT_IP_FORWARD = {
  cloudflare: "cf-connecting-ip",
  nginx: "x-real-ip",
  fastcgi: "x-real-ip",
  fastly: "fastly-client-ip",
  akamai: "true-client-ip",
  others: "x-forwarded-for",
};

/**
 * This method takes in the Express Request Object and Returns the IP Address of the Client - if available (Most Accurate One), or returns a string "IP ADDR N/A"
 * In both cases - the returned string will be Colored.
 *
 * @param req - Express Request Object
 * @returns string: Formatted IP Address of the Client - if available, or returns a string "IP ADDR N/A"
 */
export default (req: Request): string => {
  const ip =
    (req.headers &&
      (req.headers[PROXIES_AND_THEIR_CLIENT_IP_FORWARD.cloudflare] ||
        req.headers[PROXIES_AND_THEIR_CLIENT_IP_FORWARD.nginx] ||
        req.headers[PROXIES_AND_THEIR_CLIENT_IP_FORWARD.fastcgi] ||
        req.headers[PROXIES_AND_THEIR_CLIENT_IP_FORWARD.fastly] ||
        req.headers[PROXIES_AND_THEIR_CLIENT_IP_FORWARD.akamai] ||
        req.headers[PROXIES_AND_THEIR_CLIENT_IP_FORWARD.others])) ||
    req.ip ||
    "IP ADDR N/A";

  return `${chalk.yellow("[ " + ip + " ]")} - `;
};
