import React, { Suspense, lazy } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Loading } from "./components/Loading/Loading";
import { Pagination } from "./components/Pagination/Pagination";
import { usePokemonData } from "./hooks/usePokemonData";

const Card3D = lazy(() => import("./components/Card3D/Card3D"));

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
              <Suspense fallback={<Loading />}>
                {pokemonData.map((pokemon) => (
                  <Card3D key={pokemon.id} pokemon={pokemon} />
                ))}
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
