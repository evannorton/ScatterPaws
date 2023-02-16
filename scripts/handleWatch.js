const { exec } = require("child_process");
const killPort = require("kill-port");
const { readFileSync } = require("fs");

killPort(3000).then(() => {
  const commands = JSON.parse(readFileSync("watchExec.json").toString());
  const handleWatchProcess = exec([...commands, "npm run markExecCompleted", "npm start"].join(" && "))
  handleWatchProcess.stdout.on("data", (data) => {
    console.log(data);
  });
  handleWatchProcess.stderr.on("data", (data) => {
    console.error(data);
  });
});