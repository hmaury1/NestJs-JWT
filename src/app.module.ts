import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthMiddleware } from './auth/Auth.middleware';
import { Permission } from './permission/permission.entity';
import { Option } from './option/option.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Option, Permission])
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/users', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.PUT },
                { path: '/users/:id', method: RequestMethod.DELETE }
            );
    }
}
