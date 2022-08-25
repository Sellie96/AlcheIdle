import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssignCharactersToUserInput } from './assign-character';
import { CreateUserInput } from './create-user-input';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}


  
  @Query((returns) => [UserType])
  getUsers() {
    return this.userService.getUsers();
  }


  @Query((returns) => [UserType])
  getUser(@Args('id') id:string) {
    return this.userService.getUser(id);
  }


  @Mutation((returns) => UserType)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    return this.userService.createUser(
        createUserInput
    );
  }


  @Mutation((returns) => UserType)
  assignCharacterToUser(
    @Args('assignCharacterToUserInput') assignCharacterToUserInput: AssignCharactersToUserInput
  ) {
    const { userId, characterIds } = assignCharacterToUserInput;
    return this.userService.assignCharactersToUser(
        userId, characterIds
    );
  }
}