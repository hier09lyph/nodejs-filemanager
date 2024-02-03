
import { promises as fs } from "fs";
import path from "path";

function getAbsolutePath(currentWorkingDir, filePath) {
  return path.resolve(currentWorkingDir, filePath);
}

async function fileExists(filePath) {
  try{
    const stats = await fs.stat(filePath)
    return stats.isFile();
  } catch(e){
    return false
  }
}

async function directoryExists(dirPath) {
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
}

async function getFileType(filePath) {
  const stats = await fs.stat(filePath);
  return stats.isFile() ? "file" : "directory";
}

function sortAlphabetically(filesAndDirs) {
  return filesAndDirs.slice().sort((a, b) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });
}

export { getAbsolutePath, fileExists, directoryExists, getFileType, sortAlphabetically };
