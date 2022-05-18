import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const puppeteerOptions = {
    browser: {
        headless: true,
        devtools: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 794, height: 900 }
    },
    page: {
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
    }
};

export const pdfGenerator = async (attachmentName: string, attachmentData: object): Promise<any> => {
    try {
        const template = fs.readFileSync(join(process.cwd(), `storage/${attachmentName}`), 'utf8');
        const html = ejs.render(template, attachmentData);
        const browser = await puppeteer.launch(puppeteerOptions.browser);
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const buffer = await page.pdf(puppeteerOptions.page);
        return buffer;
    } catch (err) {
        throw new BadRequestException(err);
    }
};
