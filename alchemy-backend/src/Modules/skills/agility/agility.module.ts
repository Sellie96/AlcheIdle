import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { AgilityService } from './agility.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [AgilityService],
  exports: [AgilityService],
})

export class AgilityModule {}