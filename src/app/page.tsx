import PokemonList from "@/components/pokemon-list";
import { PokemonResponse } from "@/interfaces";
import {
  dehydrate,
  HydrationBoundary,
  infiniteQueryOptions,
  QueryClient,
  // queryOptions,
} from "@tanstack/react-query";

export const getPokemons = async (offset: number = 0) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=30`
  );
  const data = await res.json();
  // custom delay
  // new Promise((resolve) => setTimeout(resolve, 2000));

  return data as PokemonResponse;
};

// export const pokemonQueryOption = queryOptions({
//   queryKey: ["pokemons"],
//   queryFn: () => getPokemons(0),
// });

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

const App = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchInfiniteQuery(pokemonInfiniteQueryOption); // this await is important

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-sm md:text-3xl font-bold">
        Tanstack Query With Next JS
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonList />
      </HydrationBoundary>
    </div>
  );
};

export default App;
