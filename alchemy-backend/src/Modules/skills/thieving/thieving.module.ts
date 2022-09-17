import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { ThievingGateway } from './thieving.gateway';
import { ThievingService } from './thieving.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [ThievingService, ThievingGateway],
  exports: [ThievingService, ThievingGateway],
})

export class ThievingModule {}