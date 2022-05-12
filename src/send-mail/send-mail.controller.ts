import { Body, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { EmailDto } from './dto/mailDto';
import { SendMailService } from './send-mail.service';

@Controller('send-mail')
@UseInterceptors(ResponseInterceptor)
export class SendMailController {
    constructor(private sendMailService: SendMailService) {}

    @Post()
    @UsePipes(ValidationPipe)
    snedEmail(@Body() emailDto: EmailDto): Promise<any> {
        return this.sendMailService.sendEmail(emailDto);
    }
}
