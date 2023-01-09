import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'email',
      passReqToCallback: true,
    });
    this.authService = authService;
  }

  async validate(email: string): Promise<any> {
    const user = await this.authService.validateUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
