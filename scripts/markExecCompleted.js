const { writeFileSync } = require("fs");

writeFileSync("watchExecCompleted.json", JSON.stringify(true));
writeFileSync("watchModifiedFiles.json", JSON.stringify([]));