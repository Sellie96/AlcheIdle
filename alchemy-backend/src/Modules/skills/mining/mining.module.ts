import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { MiningService } from './mining.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [MiningService],
  exports: [MiningService],
})

export class MiningModule {}