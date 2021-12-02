import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './resources/pokemon/pokemon.module';
import { PokemonDetailsModule } from './resources/pokemon-details/pokemon-details.module';

@Module({
  imports: [PokemonModule, PokemonDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
