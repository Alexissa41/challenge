import { Controller } from '@nestjs/common';
import { PokemonDetailsService } from './pokemon-details.service';

@Controller('pokemon-details')
export class PokemonDetailsController {
  constructor(private readonly pokemonDetailsService: PokemonDetailsService) {}
}
