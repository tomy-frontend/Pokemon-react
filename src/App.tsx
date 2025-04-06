import React from "react";
import "./App.css";
import Card from "./components/Card/Card";
import { Navbar } from "./components/Navbar/Navbar";
import { Loading } from "./components/Loading/Loading";
import { Pagination } from "./components/Pagination/Pagination";
import { usePokemonData } from "./hooks/usePokemonData";

/**
 * Main App component
 */
function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const {
    loading,
    pokemonData,
    nextUrl,
    prevUrl,
    handleNextPage,
    handlePrevPage,
  } = usePokemonData(initialURL);

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Pagination
              prevUrl={prevUrl}
              nextUrl={nextUrl}
              onPrevClick={handlePrevPage}
              onNextClick={handleNextPage}
            />
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
