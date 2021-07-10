import React, { useState, useEffect } from "react";
import { getAllPokemons, getPokemon } from "../../api/api";
import Pokedex from "./Pokedex";
import Loading from "./Utils/Loading";
import Search from "./Utils/Search";

const Pages = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPokemons = async () => {
      const response = await getAllPokemons(pokemonUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    };

    getPokemons();
  }, []);

  const next = async () => {
    setLoading(true);
    const data = await getAllPokemons(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) {
      return;
    }
    setLoading(true);
    const data = await getAllPokemons(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    const pokemonDetails = await Promise.all(
      data.map(async (pokemon) => {
        const pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(pokemonDetails);
  };

  return (
    <div className="pages">
      <div className="functions">
        <div className="search">
          <Search setSearchTerm={setSearchTerm} />
        </div>
        <div className="btn">
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="pokedex">
          {pokemons
            .filter((pokemon) => {
              if (searchTerm === "") {
                return pokemon;
              } else if (
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return pokemon;
              }
              return false;
            })
            .map((pokemon, i) => (
              <Pokedex pokemon={pokemon} key={i} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Pages;
