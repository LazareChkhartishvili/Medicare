import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { RefreshTokenDocument } from '../schemas/refresh-token.schema';
import { UserDocument } from '../schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userModel;
    private refreshTokenModel;
    private jwtService;
    constructor(userModel: mongoose.Model<UserDocument>, refreshTokenModel: mongoose.Model<RefreshTokenDocument>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: string;
                role: import("../schemas/user.schema").UserRole;
                name: string;
                email: string;
                phone: string;
                isVerified: boolean;
            };
            token: string;
            refreshToken: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: string;
                role: import("../schemas/user.schema").UserRole;
                name: string;
                email: string;
                phone: string;
                isVerified: boolean;
            };
            token: string;
            refreshToken: string;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        success: boolean;
        message: string;
        data: {
            token: string;
            refreshToken: string;
        };
    }>;
    logout(refreshToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private generateTokens;
}
