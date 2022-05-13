import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    imports: [AuthModule],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule {}
