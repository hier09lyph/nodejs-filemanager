
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



export { getAbsolutePath, fileExists, directoryExists, getFileType};
