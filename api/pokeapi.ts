// api/pokeapi.ts

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  return res.json();
};

export const getPokemonByName = async (name: string) => {
  const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Pokémon not found");
  return res.json();
};

export const getPokemonList = async (limit = 20, offset = 0) => {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
};

export const getSpeciesInfo = async (id: number) => {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!res.ok) throw new Error("Failed to fetch species info");
  return res.json();
};

export const getEvolutionChain = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch evolution chain");
  return res.json();
};

export const getPokemonSpecies = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  if (!res.ok) throw new Error("Failed to fetch species");
  return res.json();
};

// export const getAllPokemonNames = async (): Promise<string[]> => {
//   const res = await fetch(
//     "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
//   );
//   const data = await res.json();
//   return data.results.map((p: { name: string }) => p.name);
// };
