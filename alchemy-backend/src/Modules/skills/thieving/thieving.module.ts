import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { ThievingService } from './thieving.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [ThievingService],
  exports: [ThievingService],
})

export class ThievingModule {}