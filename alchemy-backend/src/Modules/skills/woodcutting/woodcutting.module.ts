import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { WoodcuttingService } from './woodcutting.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [WoodcuttingService],
  exports: [WoodcuttingService],
})

export class WoodcuttingModule {}