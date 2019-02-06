import * as jwt from 'jsonwebtoken';
import { IAuthService, IJwtOptions } from './auth.interface';
import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _options } from './jwt-options';
import * as crypto from 'crypto';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    get options(): IJwtOptions {
        return _options;
    }

    set options(value: IJwtOptions) {
        this.options.algorithm = value.algorithm;
    }

    public async sign(credentials: { username: string; password: string }): Promise<{code: number; text: string;}> {

        const user = await this.userRepository.findOne({
            where: {
                name: credentials.username,
                password: crypto.createHash('md5').update(credentials.password).digest('hex')
            }
        });
        if (!user) return { code: HttpStatus.BAD_REQUEST, text: 'username or password is incorrect' };


        const payload = {
            id: user.id,
            email: user.email
        };
        const token = await jwt.sign(payload, this.options.jwtid, this.options);
        return { code: HttpStatus.ACCEPTED, text: 'Bearer ' + token };
    }
}
