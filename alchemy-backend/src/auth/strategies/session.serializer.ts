import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/user/user.entity";
import { UsersService } from "src/user/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user);
    };

    deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
        done(null, payload);
    };
}