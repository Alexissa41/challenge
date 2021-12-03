import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpModule } from '@nestjs/axios';
import { translate_interface } from '../../helpers/translate-Inteface';

@Module({
  imports: [HttpModule.register({ maxRedirects: 5 })],
  controllers: [PokemonController],
  providers: [PokemonService, translate_interface],
})
export class PokemonModule {}
