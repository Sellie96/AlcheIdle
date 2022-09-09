import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (await this.usersService.doesUserExist(username)) {
      const user = await this.usersService.findOneByUsername(username);
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
      userData: this.usersService.findOneByUsername(user.username),
    };
  }
}
