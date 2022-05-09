import { Controller, Get, Query, Response, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get()
    getFile(@Query('name') name: string, @Response({ passthrough: true }) res): any {
        res.set({
            'Content-Type': 'text/pdf',
            'Content-Disposition': `attachment; filename=${name}`
        });
        const file = createReadStream(join(process.cwd(), `storage/${name}`));
        return new StreamableFile(file);
    }
}
