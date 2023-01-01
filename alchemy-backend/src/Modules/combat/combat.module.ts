import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/Modules/messages/messages.module';
import { UsersModule } from 'src/user/users.module';
import { CombatGateway } from './combat.gateway';
import { MonsterService } from './monster/monster.service';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => MessagesModule),

  ],
  controllers: [],
  providers: [CombatGateway, MonsterService],
  exports: [CombatGateway],
})

export class CombatModule {}