import { JwtPayload, UserInterface } from './user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string; user: UserInterface }> {
        await this.userRepository.signUp(authCredentialsDto);
        return this.signIn(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string; user: UserInterface }> {
        const user = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const { username, id } = user;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken, user: { id, username } };
    }
}
