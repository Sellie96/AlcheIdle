import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { Request } from '@nestjs/common';
import { ShopService } from './shop.service';
import { AuthService } from 'src/auth/auth.service';

export interface Item {
    name: string;
    description: string;
    value: number;
}

@ApiBearerAuth()
@ApiTags('Shop')
@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService, private authService: AuthService) {}

    @Post('buyItem')
    @UseGuards(JwtAuthGuard)
    async buyItem(@Request() req, @Body() item: Item) {
        const decodedToken = await this.authService.verifyJwt(req.headers.authorization.slice(7));
        let returnedData = this.shopService.buyItem(decodedToken.username, item);
        return returnedData;
      }
}
