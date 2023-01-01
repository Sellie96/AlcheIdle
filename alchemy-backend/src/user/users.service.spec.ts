import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Logs } from 'src/Modules/skills/woodcutting/entities/message.entity';
import { AuthService } from 'src/auth/auth.service';
import { Character } from 'src/Modules/character/character.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        AuthService,
        User,
        Character
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('updateWoodcuttingByUsername', () => {
    it('should update woodcutting skill for a user', async () => {
      const woodcutter = {
        username: 'test-user',
        type: Logs.normal,
        jwt: 'test-jwt',
        timestamp: "" 
      };

      const save = jest.fn().mockResolvedValue(undefined);
      repository.save = save;

      const findOne = jest.fn().mockResolvedValue({
        character: {
          skills: {
            woodcutting: {
              xpCurrent: 0,
              level: 1,
            },
          },
          backpack: [],
        },
      });
      repository.findOne = findOne;

      const returnedObject = await service.updateWoodcuttingByUsername(woodcutter);
      expect(returnedObject.logAmount).toBe(1);
      expect(returnedObject.user.character.skills.woodcutting.xpCurrent).toBe(Logs.normal.xp);
      expect(returnedObject.user.character.backpack).toHaveLength(1);
      expect(returnedObject.user.character.backpack[0]).toEqual(Logs.normal);
      expect(save).toHaveBeenCalled();
    });
  });
});
