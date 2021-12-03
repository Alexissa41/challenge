import { Pokemon } from 'src/interfaces/pokemon.interface';

export class translate_interface {
  /**
   * Esta funcion traduce la interfaz de pokemon a español
   * @param objPokemon
   * @returns
   */
  translatePokemon(objPokemon: Pokemon): Object {
    const { id, abilities, name, sprites, types, weight, moves } = objPokemon;
    return {
      id,
      nombre: name,
      foto: sprites,
      tipo: types,
      peso: weight,
      habilidades: abilities,
      movimientos: moves,
    };
  }
}
