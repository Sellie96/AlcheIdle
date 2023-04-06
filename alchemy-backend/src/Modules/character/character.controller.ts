import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CharacterService, Item } from './character.service';

@ApiBearerAuth()
@ApiTags('Character')
@Controller('character')
export class CharacterController {
  constructor(
    private characterService: CharacterService,
    private authService: AuthService,
  ) {}

  @Post('equipItem')
  @UseGuards(JwtAuthGuard)
  async equipItem(@Request() req, @Body() item: Item) {
    const decodedToken = await this.authService.verifyJwt(
      req.headers.authorization.slice(7),
    );


    let updatedPlayer = await this.characterService.equipItem(
      decodedToken.username,
      item,
    );


    return {
      message: 'Equipped',
      player: updatedPlayer,
    };
  }

  @Post('unequipItem')
  @UseGuards(JwtAuthGuard)
  async unequipItem(@Request() req, @Body() type: string) {
    const decodedToken = await this.authService.verifyJwt(
      req.headers.authorization.slice(7),
    );


    let returnedData = await this.characterService.unequipItem(
      decodedToken.username,
      type,
    );

    return {
      message: 'Unequipped',
      player: returnedData,
    };
  }
}
