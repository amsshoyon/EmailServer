import { TemplateDto } from 'src/template/dto/template-dtos';

const fs = require('fs');
const crypto = require('crypto');
const filePath = 'storage';

export const SaveFileFromBase64 = (base64String: string, title: string, unique = true): Promise<string | void> => {
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
    const extension = base64String.split(';')[0].split('/')[1];
    let fileName = ToCamelCase(title);
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

export const ToCamelCase = (str: string): string => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
};

export const toString = (str: string): string => {
    return str
        .replace(/\r?\n|\r/g, '') // remove all newlines
        .replace(/(\r\n|\n|\r)/gm, '') // remove line breaks
        .replace(/\s\s+/g, ' '); // remove multiple spaces
};

export const modelTemplateData = (data: any): TemplateDto => {
    const dataModel = {
        id: data.id,
        title: data.title,
        projectId: data.projectId,
        templateName: data.templateName,
        templateData: JSON.parse(data.data),
        cc: data.cc,
        bcc: data.bcc,
        attachment: JSON.parse(data.attachment).reduce((acc, curr) => {
            const data = {
                attachmentName: curr.attachmentName,
                attachmentData: JSON.parse(curr.attachmentData)
            };
            return [...acc, data];
        }, [])
    };
    return dataModel;
};
