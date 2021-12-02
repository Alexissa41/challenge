import { Module } from '@nestjs/common';
import { PokemonDetailsService } from './pokemon-details.service';
import { PokemonDetailsController } from './pokemon-details.controller';

@Module({
  controllers: [PokemonDetailsController],
  providers: [PokemonDetailsService]
})
export class PokemonDetailsModule {}
