const fs = require("fs");
const path = require("path");

const buildDir = "./dist";
const jsModuleToGenerateFor = "BOTH"; // BOTH = For Both CJS and ESM, CJS =For CommonJS, ESM =For  ECMAScript Module

function createEsmModulePackageJson() {
  fs.readdir(buildDir, function (err, dirs) {
    if (err) {
      throw err;
    }
    dirs.forEach(function (dir) {
      if (
        (jsModuleToGenerateFor === "BOTH" || jsModuleToGenerateFor === "ESM") &&
        dir === "esm"
      ) {
        var packageJsonFile = path.join(buildDir, dir, "/package.json");
        if (!fs.existsSync(packageJsonFile)) {
          fs.writeFile(
            packageJsonFile,
            new Uint8Array(Buffer.from('{"type": "module"}')),
            function (err) {
              if (err) {
                throw err;
              }
            }
          );
        }
      } else if (
        (jsModuleToGenerateFor === "BOTH" || jsModuleToGenerateFor === "CJS") &&
        dir === "cjs"
      ) {
        var packageJsonFile = path.join(buildDir, dir, "/package.json");
        if (!fs.existsSync(packageJsonFile)) {
          fs.writeFile(
            packageJsonFile,
            new Uint8Array(Buffer.from('{"type": "commonjs"}')),
            function (err) {
              if (err) {
                throw err;
              }
            }
          );
        }
      }
    });
  });
}

createEsmModulePackageJson();
