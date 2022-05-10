import { Controller, Get, Param, Response, StreamableFile, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
@UseGuards(AuthGuard())
export class FileController {
    @Get('/:name')
    getFile(@Param('name') name: string, @Response({ passthrough: true }) res): any {
        res.set({
            'Content-Type': 'text/pdf',
            'Content-Disposition': `attachment; filename=${name}`
        });
        const file = createReadStream(join(process.cwd(), `storage/${name}`));
        return new StreamableFile(file);
    }
}
