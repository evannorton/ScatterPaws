const killPort = require("kill-port");
const nodemon = require("nodemon");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const { resolve, sep } = require("path");

writeFileSync("watchExec.json", JSON.stringify(["npm run build"]));
writeFileSync("watchExecCompleted.json", JSON.stringify(false));

const watcher = nodemon({
  delay: 1,
  exec: "node scripts/handleWatch || exit 1",
  ext: "css,fnt,gif,js,json,mp3,mustache,png,ts,ttf",
  stdout: true,
  stderr: true,
  watch: [
    "./src/",
    "./template.mustache",
    "./node-modules/",
    "./package.json",
    "./package-lock.json",
    "./scripts/*.js",
    "./server.js",
  ]
});

watcher.addListener("restart", (files) => {
  const absoluteDirPieces = resolve().split(sep);
  absoluteDirPieces[0] = absoluteDirPieces[0].toLowerCase();

  if (typeof files === "undefined") {
    files = [];
  }

  if (existsSync("watchModifiedFiles.json")) {
    const modifiedFiles = JSON.parse(readFileSync("watchModifiedFiles.json").toString());
    modifiedFiles.forEach((file) => {
      if (files.includes(file) === false) {
        files.push(file);
      }
    });
  }

  writeFileSync("watchModifiedFiles.json", JSON.stringify(files));

  const filesPieces = [];

  files.forEach((file) => {
    const filePieces = file.split(sep);
    filePieces[0] = filePieces[0].toLowerCase();
    for (const absoluteDirPiece of absoluteDirPieces) {
      if (absoluteDirPiece === filePieces[0]) {
        filePieces.shift();
      }
      else {
        break;
      }
    }
    filesPieces.push(filePieces);
  });

  const buildRelatedFilePieces = filesPieces.find((filePieces) => {
    const joinedFilePieces = filePieces.join("/");
    if (filePieces[0] === "node_modules") {
      return true;
    }
    if (joinedFilePieces === "package.json") {
      return true;
    }
    if (joinedFilePieces === "package-lock.json") {
      return true;
    }
    if (filePieces.length === 2 && filePieces[0] === "scripts") {
      return true;
    }
    return false;
  });

  if (typeof buildRelatedFilePieces !== "undefined") {
    console.log(`Exiting watch script because of a change to ${buildRelatedFilePieces.join("/")}.`);
    watcher.emit("quit");
  }
  else {
    const commands = [];

    if (JSON.parse(readFileSync("watchExecCompleted.json").toString()) === false || filesPieces.some((filePieces) => {
      const joinedFilePieces = filePieces.join("/");
      if (filePieces[0] === "src") {
        return joinedFilePieces.substring(joinedFilePieces.length - 3) === ".ts"
        || joinedFilePieces.substring(joinedFilePieces.length - 5) === ".json";
      }
      return false;
    })) {
      commands.push("npm run build");
    }

    writeFileSync("watchExec.json", JSON.stringify(commands));
  }
});

watcher.addListener("quit", () => {
  killPort(3000).then(() => {
    process.exit();
  });
});