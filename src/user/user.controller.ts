import { Controller, Get, ClassSerializerInterceptor, UseInterceptors, Body, Param, Patch, Post, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { _options } from 'src/auth/jwt-options';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async  index() {
    return await this.userService.index();
  }

  @Get('/getMenu')
  async getMenu(@Req() req) {
    const token = (req.headers.authorization as string).split(' ')[1];
    const decoded: any = jwt.verify(token, _options.jwtid);
    return await this.userService.getMenu(decoded.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async show(@Param('id') id: string) {
      return await this.userService.getMenu(+id);
  }

  @Post()
  async create(@Body() user: User) {
      const createdUser = await this.userService.create(user);
      return { user: createdUser };
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() user: Partial<User>) {
      return await this.userService.update(+id, user);
  }

  @Delete('/:id')
  async destroy(@Param('id') id: string) {
      await this.userService.delete(+id);
      return;
  }
}
