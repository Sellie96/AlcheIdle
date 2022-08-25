import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Character])
    ],
    providers: [CharacterResolver, CharacterService]
})
export class CharacterModule {}
