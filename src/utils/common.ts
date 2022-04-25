const fs = require('fs');
const crypto = require('crypto');
const filePath = 'storage';

export const SaveFileFromBase64 = (base64String: string, title: string, unique = true): Promise<string | void> => {
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
    const extension = base64String.split(';')[0].split('/')[1];
    let fileName = `${title.toLowerCase().replace(/\s+/g, '_').trim()}`;
    if (unique) fileName = fileName + `_${crypto.randomBytes(3).toString('hex')}`;
    fileName = fileName + '.' + extension;
    const base64Data = base64String.replace(/^data:([A-Za-z-+/]+);base64,/, '');

    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}/${fileName}`, base64Data, 'base64', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve(`${fileName}`);
        });
    });
};
