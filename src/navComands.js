import { promises as fs 
} from "fs";
import path from "path";
import { getAbsolutePath, directoryExists, sortAlphabetically, fileExists, getFileType  } from "../src/utils/utils.js";

function goToParentDir(currentWorkingDir) {
  const parentDir = path.dirname(currentWorkingDir);
  if (parentDir !== currentWorkingDir) {
    console.log(`You are now in ${parentDir}`);
    return parentDir;
  } else {
    console.log("You are already in the root directory.");
    return currentWorkingDir;
  }
}

async function goToDir(currentWorkingDir, directoryPath) {
  const absolutePath = getAbsolutePath(
    currentWorkingDir,
    directoryPath[0]
  );
  if (await directoryExists(absolutePath)) {
    console.log(`You are now in ${absolutePath}`);
    return absolutePath;
  } else {
    console.log("Directory not found.");
    return currentWorkingDir;
  }
}

async function listInFolder(currentWorkingDir) {
  const filesAndFolders = await fs.readdir(currentWorkingDir);
  if(filesAndFolders.length === 0){ 
    return console.log('Folder is empty')
  }
  const sortedfilesAndDirs = sortAlphabetically(filesAndFolders);
  const tableData = [];

  for (let i = 0; i < sortedfilesAndDirs.length; i++) {
    const el = sortedfilesAndDirs[i];
    const elPath = path.join(currentWorkingDir, el);
    const elType = await getFileType(elPath);

    tableData.push({
      Name: el,
      Type: elType,
    });
  }

  console.table(tableData);
  
}

export {
  goToParentDir,
  goToDir,
  listInFolder,
};