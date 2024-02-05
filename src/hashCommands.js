import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { getAbsolutePath } from "./utils/utilsForPath.js";

const calculateSHA256Hash = async (currentWorkingDir, args) => {
  if (args.length < 1) {
   console.log("Invalid input");
   return;
 }

 const filePath = args[0];
 const absolutePath = getAbsolutePath(currentWorkingDir, filePath);
    
 const hash = createHash('sha256');
    const readStream = createReadStream(absolutePath);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        const hashResult = hash.digest('hex');
        console.log(`SHA256 hash for ${filePath}: ${hashResult}`);
    });

    readStream.on('error', (error) => {
        console.error(`Error reading file: ${error.message}`);
    });
};

export {calculateSHA256Hash}
