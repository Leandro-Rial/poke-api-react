import React from "react";
import PokemonType from "./Utils/pokemonTypes";

const Pokedex = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className="card-name">{pokemon.name}</div>
      <div className="card-types">
        {pokemon.types.map((type, i) => {
          return (
            <div
              className="card-type"
              key={i}
              style={{ backgroundColor: PokemonType[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="card-info">
        <div className="card-data card-data-weight">
          <p className="title">Weight</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="card-data card-data-height">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="card-data card-data-ability">
          <p className="title">Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
