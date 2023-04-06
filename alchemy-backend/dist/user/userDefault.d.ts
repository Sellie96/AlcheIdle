import { RegisterData } from './register.interface';
import { User } from './user.entity';
export declare function UserDataCreation(registerData: RegisterData): Promise<User>;
