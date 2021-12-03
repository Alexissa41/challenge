export interface Pokemon {
  readonly name: string;
  readonly sprites: sprites;
  readonly types: Array<types>;
  readonly weight: number;
  readonly abilities: Array<abilities>;
  readonly moves?: Array<Move>;
}

export interface sprites {
  readonly front_default: string;
  readonly back_default: string;
}

export interface types {
  readonly slot: number;
  readonly type: { name: string; url: string };
}

export interface abilities {
  readonly ability: { name: string; url: string };
  readonly is_hidden: boolean;
  readonly slot: number;
}

//Caracteristicas de los pokemon
export interface characteristic {
  descriptions: Description[];
}

export interface Description {
  description: string;
  language: Species;
}

export interface Move {
  move: Species;
}

//Reutilizable
export interface Species {
  name: string;
  url: string;
}
