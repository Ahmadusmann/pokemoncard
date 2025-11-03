import "./Pokemon.css";
import "./Pokemon-responsive.css";
import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards.jsx";

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    //todo fetch data from api
    const fetchPokemon = async() => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            console.log(data);

            const detailedPokemonData = data.results.map(async(curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });

            const detailedResponse = await Promise.all(detailedPokemonData);
            console.log(detailedResponse);
            setPokemon(detailedResponse);
            setLoading(false);
        }
        catch(error) {
            console.error(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    //todo search functionality
    const searchData = pokemon.filter((curPokemon) =>
         curPokemon.name.toLowerCase().includes(search.toLowerCase())
     );

    //todo handle loading
    if(loading) {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    };

    //todo handle error
    if(error) {
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        );
    };

    return(
        <>
           <section className="container">
              <header>
                <h1>Lets Catch Pokémon</h1>
              </header>

              <div className="pokemon-search">
                <input type="text" placeholder="search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>

              <div>
                <ul className="cards">
                {/* {pokemon.map((curPokemon) => { */}
                {searchData.map((curPokemon) => {
                    return (
                        <PokemonCards key={curPokemon.id} pokemonData={curPokemon}
                        className="pokemon-image" />
                    );
                })}
                </ul>
              </div>

           </section>
        </>
    );
};