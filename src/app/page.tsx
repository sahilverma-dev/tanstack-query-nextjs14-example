import PokemonList from "@/components/pokemon-list";
import { pokemonInfiniteQueryOption } from "@/hooks/usePokemonList";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  // queryOptions,
} from "@tanstack/react-query";

// export const pokemonQueryOption = queryOptions({
//   queryKey: ["pokemons"],
//   queryFn: () => getPokemons(0),
// });

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
