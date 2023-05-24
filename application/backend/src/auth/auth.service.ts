import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
        private userService: UserService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const isValidPassword = await this.validatePassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, req): Promise<User | null> {
    const { id, password } = req.session.user;
    const { currentPassword, newPassword, confirmNewPassword } =
      changePasswordDto;
    // check if user's current password is correct
    const isValidPassword = await this.validatePassword(
      currentPassword,
      password,
    );
    if (isValidPassword) {
      if (newPassword !== confirmNewPassword) {
        return null;
      } else { // valid password & fields match
        const updateUserDto = {
          password: await bcrypt.hash(newPassword, 10),
        };
        return this.userService.update(id, updateUserDto);
      }
    } else { // incorrect password
      return null;
    }
  }

}
