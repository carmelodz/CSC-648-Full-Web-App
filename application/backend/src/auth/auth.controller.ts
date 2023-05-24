import {
  Body, Controller, Get, HttpStatus, Post, Req, Request, Res, Session, UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateDirectorDto } from '../user/dto/create-director.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req, @Res() res) {
    // the authenticated user is stored in req.user thanks to LocalAuthGuard
    const { user } = req;
    req.session.user = user;

    res.status(HttpStatus.OK).json({ message: 'Login success', email: loginDto.email });
  }

    @UseGuards(AuthGuard)
    @ApiOperation({
      summary: 'Authentication Required',
    })
    @Post('logout')
    async logout(@Session() session, @Res() res) {
      session.destroy();
      res.status(HttpStatus.OK).json({ message: 'User successfully logged out' });
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Req() req) {
      req.session.user = await this.userService.create(createUserDto);
      return { message: 'Registration success', email: createUserDto.email };
    }

  @Post('register/director')
    async registerDirector(@Body() createDirectorDto: CreateDirectorDto, @Req() req) {
      req.session.user = await this.userService.createDirector(createDirectorDto);
      return { message: 'Registration success', email: createDirectorDto.email };
    }

    @UseGuards(AuthGuard)
    @ApiOperation({
      summary: 'Authentication Required',
    })
    @Get('me')
  getProfile(@Request() req) {
    return req.session.user;
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Authentication Required',
  })
  @Patch('changepassword')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req, @Res() res) {
      const user = await this.authService.changePassword(changePasswordDto, req);
      if (user) {
        res.status(HttpStatus.OK).json({ message: 'Password successfully changed!' });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Incorrect Password!' });
      }
    }
}
