import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      type: 'Bearer',
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(request: Request, payload: any) {
    // do something with the request
    console.log(request);
    return { password: payload.password, username: payload.username };
  }
}