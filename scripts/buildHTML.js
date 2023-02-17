const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const html = readFileSync("template.mustache").toString()
  .replace("data-run-id=\"{{runID}}\"", "")
  .replace("./out/script.js", "./script.js")
  .replace("./out/style.css", "./style.css");

writeFileSync(join("out", "index.html"), html);