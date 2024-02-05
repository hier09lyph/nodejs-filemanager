import {
  promises as fsPromises,
  createReadStream,
  createWriteStream,
} from "fs";
import { getAbsolutePath, fileExists } from "./utils/utilsForPath.js";

const readFile = async (currentWorkingDir, args) => {
  const absolutePath = await fileCheackAndGetAbsolutePath(
    currentWorkingDir,
    args
  );

  try {
    const fileContent = await fsPromises.readFile(absolutePath, "utf8");
    console.log(fileContent);
  } catch {
    console.log("Read operation failed");
  }
};

const createFile = async (currentWorkingDir, args) => {
   if (args.length < 1) {
    console.log("Invalid input");
    return;
  }

  const filePath = args[0];
  const absolutePath = getAbsolutePath(currentWorkingDir, filePath);

 try {
    await fsPromises.writeFile(absolutePath, "", "utf8");
    console.log("File created successfully.");
  } catch {
    console.log("Create operation failed.");
  }
};

const renameFile = async (currentWorkingDir, args) => {
  const oldFileNamePath = await fileCheackAndGetAbsolutePath(
    currentWorkingDir,
    args
  );

  const newName = args[1];

  const newFileNamePathn = getAbsolutePath(currentWorkingDir, newName);

  try {
    await fsPromises.rename(oldFileNamePath, newFileNamePathn);
    console.log("File renamed successfully.");
  } catch {
    console.log("Rename operation failed.");
  }
};


async function deleteFile(currentWorkingDir, args) {
  if (args.length < 1) {
    console.log(errors.invalidInput);
    return;
  }

  const filePath = args[0];
  const absolutePath = getAbsolutePath(currentWorkingDir, filePath);

  if (!(await fileExists(absolutePath))) {
    console.log('File not found');
    return;
  }

  await fsPromises.unlink(absolutePath);
  console.log("File deleted successfully.");
}

async function copyFile(currentWorkingDir, args) {
  if (args.length < 2) {
    console.log(errors.invalidInput);
    return;
  }

  const sourceFilePath = args[0];
  const destinationFilePath = args[1];
  const absoluteSourcePath = getAbsolutePath(
    currentWorkingDir,
    sourceFilePath
  );
  const absoluteDestinationPath = getAbsolutePath(
    currentWorkingDir,
    destinationFilePath
  );

  if (!(await fileExists(absoluteSourcePath))) {
    console.log("File not found");
    return;
  }

  if (await fileExists(absoluteDestinationPath)) {
    console.log("Destinstion folder not found");
    return;
  }
  const absoluteDestinationFilePath = getAbsolutePath(
    absoluteDestinationPath,
    sourceFilePath
  );

  const sourceStream = createReadStream(absoluteSourcePath);
  const destinationStream = createWriteStream(absoluteDestinationFilePath);

  destinationStream.on("error", (error) => {
    console.log("Error writing to destination file:", error);
  });

  destinationStream.on("close", () => {
    console.log("File copied successfully.");
  });

  sourceStream.pipe(destinationStream);
}

async function moveFile(currentWorkingDir, args) {
  if (args.length < 2) {
    console.log('Invalid input');
    return;
  }

  const sourceFilePath = args[0];
  const destinationFilePath = args[1];
  const absoluteSourcePath = getAbsolutePath(
    currentWorkingDir,
    sourceFilePath
  );
  const absoluteDestinationPath = getAbsolutePath(
    currentWorkingDir,
    destinationFilePath
  );

  if (!(await fileExists(absoluteSourcePath))) {
    console.log('File not found');
    return;
  }

  if (await fileExists(absoluteDestinationPath)) {
    console.log('Destinstion folder not found');
    return;
  }

  const absoluteDestinationFilePath = getAbsolutePath(
    absoluteDestinationPath,
    sourceFilePath
  );


  const sourceStream = createReadStream(absoluteSourcePath);
  const destinationStream = createWriteStream(absoluteDestinationFilePath);

  destinationStream.on("error", (error) => {
    console.log("Error writing to destination file:", error);
  });

  destinationStream.on("close", async () => {
    await fsPromises.unlink(absoluteSourcePath);
    console.log("File moved successfully.");
  });

  sourceStream.pipe(destinationStream);
}

const fileCheackAndGetAbsolutePath = async (currentWorkingDir, args) => {
  if (args.length < 1) {
    console.log("Invalid input");
    return;
  }

  const filePath = args[0];
  const absolutePath = getAbsolutePath(currentWorkingDir, filePath);

  if (!(await fileExists(absolutePath))) {
    console.log("File not found");
    return;
  }

  return absolutePath;
};


export { readFile, createFile, renameFile, deleteFile, moveFile, copyFile };
