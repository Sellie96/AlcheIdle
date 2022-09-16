import { PassportSerializer } from "@nestjs/passport";
export declare class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: Error, user: any) => void): any;
    deserializeUser(payload: any, done: (err: Error, payload: string) => void): any;
}
