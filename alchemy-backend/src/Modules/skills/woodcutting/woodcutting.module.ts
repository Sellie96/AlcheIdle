import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { WoodcuttingGateway } from './woodcutting.gateway';
import { WoodcuttingService } from './woodcutting.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [WoodcuttingService, WoodcuttingGateway],
  exports: [WoodcuttingService, WoodcuttingGateway],
})

export class WoodcuttingModule {}