import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { _options } from './jwt-options'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                const token = (req.headers.authorization as string).split(' ')[1];
                const decoded: any = jwt.verify(token, _options.jwtid);
                const user = await this.userRepository.findOne({
                    where: {
                        id: decoded.id,
                        email: decoded.email
                    }
                });
                if (!user) res.status(HttpStatus.UNAUTHORIZED).json('request:unauthorized');
                next();
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json('request:unauthorized');
            }
        };
    }
}
