import { argv, cwd, stdin, stdout, exit } from "process";

const args = argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

console.log(`Welcome to the File Manager, ${username}!`);

let currentWorkingDirectory = cwd();

console.log(`You are currently in ${currentWorkingDirectory}`);

stdin.on("data", (userInput) => {
  const command = userInput.toString().trim();
  choiseCommand(command);
});

function choiseCommand(command) {
  const [operation, ...args] = command.split(" ");

  switch (operation) {
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
