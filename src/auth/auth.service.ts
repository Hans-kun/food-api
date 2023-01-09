import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string) {
    const user = await this.modelClass.query().select('*').first();

    if (user) {
      const { id, email, roles, createdAt } = user;
      return { id, email, roles, createdAt };
    }
    return null;
  }

  async login(user: UserModel) {
    const { id, ...remains } = user;
    const payload = { email: user.email, roles: user.roles, sub: user.id };
    return {
      user: remains,
      authToken: this.jwtService.sign(payload),
    };
  }
}
