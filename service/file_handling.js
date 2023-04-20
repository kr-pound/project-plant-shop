const fs = require('fs');
const path = require('path');

const debug = require('debug')('app:service');

class FileHandlingService {
    saveFile(baseName, fileData, fileExtension, encoding = 'base64') {
        const fileName = this.generateFileName(baseName, fileExtension);
        const folderPath = this.getFolderPath();

        const filePath = path.join(folderPath, fileName);
        fs.writeFile(filePath, fileData, { encoding }, (err) => {
            if (err) {
                debug(`--> FileHandling: File save failed: ${filePath}`);
                debug(`--> FileHandling: Error: ${err.message}`);
                return;
            }

            debug(`FileHandling: File saved successfully: ${filePath}`);
        });

        const fileUrl = this.generateFileUrl(fileName);
        return fileUrl;
    }

    generateFileName(baseName, fileExtension) {
        const fileName = `${baseName.replace(/[^a-zA-Z0-9-_]/g, '')}-${Date.now()}${fileExtension}`;
        debug(`FileHandling: File name generated successfully: ${fileName}`);
        return fileName;
    }
    getFolderPath() {
        const currentWorkingDirectory = process.cwd();
        const folderPath = path.join(currentWorkingDirectory, 'public', 'documents');
        debug(`FileHandling: Folder path retrieved successfully: ${folderPath}`);
        return folderPath;
    }
    generateFileUrl(fileName) {
        const fileUrl = `/public/documents/${fileName}`;
        debug(`FileHandling: File URL generated successfully: ${fileUrl}`);
        return fileUrl;
    }
}

module.exports = new FileHandlingService();
