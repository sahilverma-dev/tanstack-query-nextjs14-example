/* eslint-disable @next/next/no-img-element */
"use client";

import { usePokemonList } from "@/hooks/usePokemonList";
import { Result } from "@/interfaces";

const LoadingCard = () => (
  <div className="aspect-square flex flex-col items-center justify-center space-y-2 bg-zinc-800 p-4 rounded-lg shadow ">
    <img
      src="https://i.gifer.com/ZKZg.gif"
      alt=""
      className="h-6 aspect-square"
    />
  </div>
);

const PokemonCard: React.FC<{
  pokemon: Result;
  index: number;
}> = ({ pokemon, index }) => (
  <div className="aspect-square flex flex-col items-center justify-center space-y-2 bg-zinc-800 rounded-lg shadow hover:bg-zinc-700">
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`}
      alt={`Image of ${pokemon.name}`}
      className="w-20 h-auto object-contain "
    />
    <p className="capitalize font-medium">{pokemon.name}</p>
  </div>
);

const PokemonList = () => {
  const { data, fetchNextPage, isLoading, isFetchingNextPage, isError } =
    usePokemonList();

  return (
    <div className="space-y-4 md:p-4 bg-zinc-900 min-h-screen text-zinc-100">
      {isError && (
        <div className="text-red-500">
          Oops! Something went wrong. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading &&
          Array.from({ length: 30 }).map((_, i) => <LoadingCard key={i} />)}
        {data?.pages
          .flatMap((page) => page.results)
          .map((pokemon, index) => (
            <PokemonCard key={pokemon.url} pokemon={pokemon} index={index} />
          ))}
      </div>

      {data && (
        <div className="text-center mt-4">
          {isFetchingNextPage ? (
            <p className="text-zinc-400">Loading...</p>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-white"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
