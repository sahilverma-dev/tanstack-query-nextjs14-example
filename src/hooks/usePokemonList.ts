import { PokemonResponse } from "@/interfaces";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const pokemonInfiniteQueryOption = infiniteQueryOptions({
  queryKey: ["pokemons"],
  queryFn: ({ pageParam }) => getPokemons(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    const url = new URL(lastPage.next as string);
    const offset = url.searchParams.get("offset");
    return offset ? Number(offset) : null;
  },
});

export const getPokemons = async (offset: number = 0) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=30`
  );
  const data = await res.json();
  // custom delay
  // new Promise((resolve) => setTimeout(resolve, 2000));

  return data as PokemonResponse;
};

export const usePokemonList = () =>
  useInfiniteQuery(pokemonInfiniteQueryOption);
