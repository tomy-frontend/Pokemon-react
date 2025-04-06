import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon, PokemonDetail, PokemonBasic } from "../utils/pokemon";

interface UsePokemonDataReturn {
  loading: boolean;
  pokemonData: PokemonDetail[];
  nextUrl: string | null;
  prevUrl: string | null;
  handleNextPage: () => Promise<void>;
  handlePrevPage: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage Pokemon data
 * @param initialURL - The initial API URL to fetch Pokemon data from
 * @returns Object containing Pokemon data, loading state, and pagination handlers
 */
export const usePokemonData = (initialURL: string): UsePokemonDataReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await getAllPokemon(initialURL);

        await loadPokemon(res.results);
        setNextUrl(res.next);
        setPrevUrl(res.previous);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [initialURL]);

  /**
   * Load detailed Pokemon data for each Pokemon in the list
   * @param data - Basic Pokemon data array
   */
  const loadPokemon = async (data: PokemonBasic[]): Promise<void> => {
    try {
      const detailedPokemonData = await Promise.all(
        data.map((pokemon) => getPokemon(pokemon.url))
      );
      setPokemonData(detailedPokemonData);
    } catch (error) {
      console.error("Failed to load Pokemon details:", error);
      setLoading(false);
    }
  };

  /**
   * Handle navigation to the next page of Pokemon
   */
  const handleNextPage = async (): Promise<void> => {
    if (!nextUrl) return;

    setLoading(true);
    try {
      const data = await getAllPokemon(nextUrl);
      await loadPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      console.error("Failed to load next page:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle navigation to the previous page of Pokemon
   */
  const handlePrevPage = async (): Promise<void> => {
    if (!prevUrl) return;

    setLoading(true);
    try {
      const data = await getAllPokemon(prevUrl);
      await loadPokemon(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      console.error("Failed to load previous page:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    pokemonData,
    nextUrl,
    prevUrl,
    handleNextPage,
    handlePrevPage,
  };
};
