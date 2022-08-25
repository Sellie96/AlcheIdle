import { AssignCharactersToUserInput } from './assign-character';
import { CreateUserInput } from './create-user-input';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("./user.entity").User[]>;
    getUser(id: string): Promise<import("./user.entity").User>;
    createUser(createUserInput: CreateUserInput): Promise<import("./user.entity").User>;
    assignCharacterToUser(assignCharacterToUserInput: AssignCharactersToUserInput): Promise<import("./user.entity").User>;
}
