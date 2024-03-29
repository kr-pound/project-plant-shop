const fs = require('fs');
const path = require('path');

const config = require('config');
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
        const baseUrl = config.get('localhost.localhost_base_url');
        return  baseUrl + fileUrl;
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

    // identify its type by the header
    decodeBase64(base64String) {
        const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches.length !== 3) {
            throw new Error('Invalid base64 string format');
        }

        return Buffer.from(matches[2], 'base64');
    }
}

module.exports = new FileHandlingService();
