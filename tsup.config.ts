import type { Options } from "tsup";

const env = process.env.NODE_ENV;

export const tsup: Options = {
  splitting: false,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  format: ["cjs", "esm"], // generate cjs and esm files
  minify: env === "production",
  //   bundle: env === "production",
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ["src/index.ts"],
  watch: env === "development",
  target: "es2015",
  //   outDir: env === "production" ? "dist" : "lib",
  outDir: "dist",
  entry: ["src/**/*.ts"], //include all files under src
  external: ["chalk", "strip-ansi", "on-finished"],
};
