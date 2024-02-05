import os from "os";

function handleOSCommand(args) {
  const validArgs = [
    "--EOL",
    "--cpus",
    "--homedir",
    "--username",
    "--architecture",
  ];

  if (!validArgs.includes(args[0])) {
    console.log("Invalid input.");
    return;
  }

  if (args.includes("--EOL")) {
    const eol = os.EOL;
    console.log(`End-Of-Line (EOL): ${eol}`);
  }

  if (args.includes("--cpus")) {
    const cpus = os.cpus();
    console.log(`Number of CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
      console.log(`{CPU ${index + 1}: ${cpu.model.trim()} (${cpu.speed} GHz)}`);
    });
  }

  if (args.includes("--homedir")) {
    const homedir = os.homedir();
    console.log(`Home directory: ${homedir}`);
  }

  if (args.includes("--username")) {
    const username = os.userInfo().username;
    console.log(`Current system user name: ${username}`);
  }

  if (args.includes("--architecture")) {
    const architecture = os.arch();
    console.log(`CPU architecture: ${architecture}`);
  }
}

function getHomeDir() {
  return os.homedir();
}

export { handleOSCommand, getHomeDir };
