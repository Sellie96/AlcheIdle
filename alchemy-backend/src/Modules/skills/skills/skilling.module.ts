import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/Modules/messages/messages.module';
import { UsersModule } from 'src/user/users.module';
import { AgilityModule } from '../agility/agility.module';
import { CookingModule } from '../cooking/cooking.module';
import { FiremakingModule } from '../firemaking/firemaking.module';
import { FishingModule } from '../fishing/fishing.module';
import { MiningModule } from '../mining/mining.module';
import { ThievingModule } from '../thieving/thieving.module';
import { WoodcuttingModule } from '../woodcutting/woodcutting.module';
import { SkillsGateway } from './skills.gateway';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => MiningModule),
    forwardRef(() => AgilityModule),
    forwardRef(() => FishingModule),
    forwardRef(() => WoodcuttingModule),
    forwardRef(() => ThievingModule),
    forwardRef(() => MessagesModule),
    forwardRef(() => FiremakingModule),
    forwardRef(() => CookingModule)

  ],
  controllers: [],
  providers: [SkillsGateway],
  exports: [SkillsGateway],
})

export class SkillsModule {}