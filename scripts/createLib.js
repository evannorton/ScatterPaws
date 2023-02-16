const { existsSync, mkdirSync, rmSync } = require("fs");
const { resolve } = require("path");

const path = resolve("lib");
if (existsSync(path)) {
  rmSync(path, { recursive: true });
}
mkdirSync(path);