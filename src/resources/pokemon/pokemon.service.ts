import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { characteristic } from '../../interfaces/pokemon.interface';
import { translate_interface } from 'src/helpers/translate-Inteface';

@Injectable()
export class PokemonService {
  constructor(
    private httpService: HttpService,
    private readonly translate_interf: translate_interface,
  ) {}
  private urlbase = process.env.URL_API;
  /**
   *
   * @param page numero de paginacion
   * @param limit limite de la paginacion
   * @returns
   */
  async findAll(page: number, limit: number): Promise<Pokemon[]> {
    //la paginacion comienza en 1 y se le resta -1 siempre, se multiplica por el limite para coincidir con el offset de la página
    const $responseApi = this.httpService.get(
      `${this.urlbase}pokemon?limit=${limit}&offset=${--page * limit}`,
    );
    //Se obtiene el observable que va con $ la variable
    const arrReesult = await (await firstValueFrom($responseApi)).data.results;
    //Usamos promise all para resolver todas las promesas internas
    const mapPokemon: Array<Pokemon> = await Promise.all<Pokemon>(
      arrReesult.map(async ({ url }) => {
        //Obtemos los datos por cada uno de los pokemon
        const { abilities, name, sprites, types, weight }: Pokemon =
          await this.findDetails(undefined, url);
        return { abilities, name, sprites, types, weight };
      }),
    );
    return mapPokemon;
  }

  async findOne(id: number): Promise<any> {
    const objPokemon: Pokemon = await this.findDetails(id);
    //traducimos la interfaz
    let objPokemonSpanish = this.translate_interf.translatePokemon(objPokemon);

    //buscamos la descripcion
    const description = await this.findDescription(id);
    console.log(objPokemonSpanish);
    return {
      ...objPokemonSpanish,
      descripcion: description,
    };
  }

  private async findDetails(id?: number, url?: string): Promise<any> {
    const { name, abilities, sprites, types, weight, moves }: Pokemon = await (
      await firstValueFrom(
        this.httpService.get(id ? `${this.urlbase}pokemon/${id}` : url),
      )
    ).data;

    //Modificamos el retorno de datos para mejor visibilidad
    return {
      name,
      sprites: sprites.front_default,
      weight,
      abilities: abilities.map(({ ability }) => {
        return { ...ability };
      }),
      types: types.map(({ slot: id, type }) => {
        return { id, type: type.name };
      }),
      moves: moves.map(({ move }) => {
        return move.name;
      }),
    };
  }

  private async findDescription(id: number): Promise<string> {
    const { descriptions }: characteristic = await (
      await firstValueFrom(
        this.httpService.get(`${this.urlbase}characteristic/${id}`),
      )
    ).data;
    //buscamos la descripcion en español
    let { description } = descriptions.find((o) => o.language.name === 'es');
    return description;
  }
}
