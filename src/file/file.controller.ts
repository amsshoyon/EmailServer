import { Controller, Get, Param, Query, Response, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
    @Get('/:name')
    getFile(@Param('name') name: string, @Response({ passthrough: true }) res): any {
        console.log('name:', name)
        res.set({
            'Content-Type': 'text/pdf',
            'Content-Disposition': `attachment; filename=${name}`
        });
        const file = createReadStream(join(process.cwd(), `storage/${name}`));
        return new StreamableFile(file);
    }
}
