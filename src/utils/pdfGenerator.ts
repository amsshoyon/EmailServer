import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
const ejs = require('ejs');
const puppeteer = require('puppeteer');

export const pdfGenerator = async (attachmentName, attachmentData): Promise<any> => {
    try {
        const template = fs.readFileSync(join(process.cwd(), `storage/${attachmentName}`), 'utf8');
        const html = ejs.render(template, attachmentData);
        const browser = await puppeteer.launch({
            headless: true,
            devtools: false,
            args: ['--disable-infobars', '--ash-host-window-bounds=794x900'],
            defaultViewport: { width: 794, height: 900 }
        });

        // create a new page
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // create a pdf buffer
        const buffer = await page.pdf({
            displayHeaderFooter: false,
            printBackground: true,
            preferCSSPageSize: false,
            format: 'A4',
            scale: 0.9,
            margin: {
                top: 16,
                bottom: 0,
                left: 0,
                right: 0
            }
        });
        return buffer;
    } catch (err) {
        throw new BadRequestException(err);
    }
};
