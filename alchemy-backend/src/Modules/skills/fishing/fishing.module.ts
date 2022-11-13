import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { FishingService } from './fishing.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [FishingService],
  exports: [FishingService],
})

export class FishingModule {}