import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonDetailsService {

    async getById(idMensaje: number): Promise{
        return await this.mensajeRepository.findOne(idMensaje);
      }
}
