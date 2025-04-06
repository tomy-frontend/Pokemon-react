/**
 * Types and functions for interacting with the Pokemon API
 */

/**
 * Response from the Pokemon list API endpoint
 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

/**
 * Basic Pokemon information returned in list responses
 */
export interface PokemonBasic {
  name: string;
  url: string;
}

/**
 * Pokemon sprite information
 */
export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default?: string;
  back_shiny?: string;
  back_female?: string;
  back_shiny_female?: string;
}

/**
 * Pokemon type information
 */
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

/**
 * Pokemon ability information
 */
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

/**
 * Detailed Pokemon information
 */
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  base_experience?: number;
  species?: {
    name: string;
    url: string;
  };
}

/**
 * Fetch a list of Pokemon from the API
 * @param url - The API endpoint URL
 * @returns Promise resolving to PokemonListResponse
 */
export const getAllPokemon = async (
  url: string
): Promise<PokemonListResponse> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
    throw error;
  }
};

/**
 * Fetch detailed information for a specific Pokemon
 * @param url - The API endpoint URL for a specific Pokemon
 * @returns Promise resolving to PokemonDetail
 */
export const getPokemon = async (url: string): Promise<PokemonDetail> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Pokemon details:", error);
    throw error;
  }
};
