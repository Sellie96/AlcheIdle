import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CombatModule } from './Modules/combat/combat.module';
import { ShopModule } from './Modules/shop/shop.module';
import { AgilityModule } from './Modules/skills/agility/agility.module';
import { CookingModule } from './Modules/skills/cooking/cooking.module';
import { FiremakingModule } from './Modules/skills/firemaking/firemaking.module';
import { FishingModule } from './Modules/skills/fishing/fishing.module';
import { MiningModule } from './Modules/skills/mining/mining.module';
import { SkillsModule } from './Modules/skills/skills/skilling.module';
import { ThievingModule } from './Modules/skills/thieving/thieving.module';
import { WoodcuttingModule } from './Modules/skills/woodcutting/woodcutting.module';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';
import { CharacterModule } from './Modules/character/character.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User],
      useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
    WoodcuttingModule,
    ThievingModule,
    FishingModule,
    MiningModule,
    AgilityModule,
    FiremakingModule,
    CookingModule,
    SkillsModule,
    ShopModule,
    CharacterModule,
    CombatModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
