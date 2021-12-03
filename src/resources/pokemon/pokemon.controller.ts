import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { translate_interface } from 'src/helpers/translate-Inteface';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly translate_interf: translate_interface,
  ) {}

  @ApiTags('Pokemon')
  @ApiParam({
    name: 'page',
    required: true,
    description: 'Especifique el numero de la página',
    example: '1',
  })
  @ApiParam({
    name: 'limit',
    required: true,
    description: 'Especifique el numero de límite por página',
    example: '20',
  })
  @Get(':page/:limit')
  async getAll(@Res() response, @Param('page') page, @Param('limit') limit) {
    if (page <= 0)
      throw new HttpException(
        'No se puede ingresar un paginado menor a 1',
        HttpStatus.BAD_REQUEST,
      );
    try {
      //Renombramos los campos para traducirlos
      let arrPokemon = await this.pokemonService.findAll(page, limit);
      response.status(HttpStatus.OK).json(
        arrPokemon.map((obj) => {
          return this.translate_interf.translatePokemon(obj);
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('Pokemon')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Especifique el id de pokemon para sus detalles',
    example: '3',
  })
  @Get(':id')
  async getById(@Res() response, @Param('id') id) {
    response.status(HttpStatus.OK).json(await this.pokemonService.findOne(id));
  }
}
