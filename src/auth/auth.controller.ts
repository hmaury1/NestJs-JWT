import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public async login(@Body() body, @Res() res) {
        if (!body) {
          res.status(HttpStatus.BAD_REQUEST).json('missing credentials');
        } else if(!body.username || !body.password) {
          res.status(HttpStatus.BAD_REQUEST).json('missing credentials');
        } else {
          const token = await this.authService.sign(body);
          res.status(token.code).json(token.text);
        }
    }
}
