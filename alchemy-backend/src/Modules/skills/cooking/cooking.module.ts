import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { CookingService } from './cooking.service';

@Module({
    imports: [
      forwardRef(() => AuthModule),
      forwardRef(() => UsersModule),
    ],
    controllers: [],
    providers: [CookingService],
    exports: [CookingService],
  })

  
export class CookingModule {}
