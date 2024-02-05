import { argv, cwd, stdin, stdout, exit } from "process";
import { handleOSCommand, getHomeDir } from "./osComands.js";
import { goToParentDir, goToDir, listInFolder } from "./navComands.js";
import { readFile, createFile, renameFile, copyFile,moveFile,deleteFile } from "./fsCommands.js";

const args = argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

console.log(`Welcome to the File Manager, ${username}!`);

let currentWorkingDir = getHomeDir();

console.log(`You are currently in ${currentWorkingDir}`);

stdin.on("data", (userInput) => {
  const command = userInput.toString().trim();
  choiseCommand(command);
});

async function choiseCommand(command) {
  const [operation, ...args] = command.split(" ");

  const argsInCli = args.map((arg) => arg.trim()).filter((arg) => arg !== "");

  switch (operation) {
    case "cat":
      await readFile(currentWorkingDir, args);
      break;
    case "add":
      await createFile(currentWorkingDir, args);
      break;
    case "rn":
      await renameFile(currentWorkingDir, args);
      break;
    case "cp":
      await copyFile(currentWorkingDir, args);
      break;
    case "mv":
      await moveFile(currentWorkingDir, args);
      break;
    case "rm":
      await deleteFile(currentWorkingDir, args);
      break;
    case "up":
      currentWorkingDir = goToParentDir(currentWorkingDir);
      break;
    case "cd":
      currentWorkingDir = await goToDir(currentWorkingDir, args);
      break;
    case "ls":
      listInFolder(currentWorkingDir);
      break;
    case "os":
      handleOSCommand(argsInCli);
      console.log(argsInCli);
      break;
    case ".exit":
      exitFileManager();
      break;
    default:
      console.log("Invalid input.");
  }
}

process.on("SIGINT", () => {
  exitFileManager();
});

function exitFileManager() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  exit(0);
}

process.stdin.resume();
