import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FileController } from './file.controller';

@Module({
    imports: [AuthModule],
    controllers: [FileController]
})
export class FileModule {}
