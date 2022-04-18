import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Get, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UserResponse } from './user.interface';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserResponse> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<UserResponse> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Get('/get-user')
    @UseGuards(AuthGuard())
    getUser(@GetUser() user: User): any {
        const { id, username } = user;
        return {
            message: 'success',
            result: { id, username }
        };
    }
}
