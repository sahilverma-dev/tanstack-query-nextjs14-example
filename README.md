# TanStack Query Hydration with Next.js 14 (App Router) Example

This repository demonstrates how to use **TanStack Query** for server-side data fetching, hydration, and caching in a Next.js 14 application with the **App Router**. It includes examples of prefetching data on the server and hydrating it on the client for optimal performance and SEO.

[Live Preview](https://tanstack-query-nextjs14-example.vercel.app/)

## Features

- **Next.js 14 App Router**: Built using the latest Next.js features with support for the `app` directory.
- **TanStack Query**: For efficient data fetching and caching.
- **Server-side Prefetching**: Prefetch data on the server using `dehydrate` and hydrate it on the client.
- **Infinite Scrolling**: Load more items seamlessly with `useInfiniteQuery`.
- **Error Handling**: Graceful error states for better UX.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js >= 18
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sahilverma-dev/tanstack-query-nextjs14-example.git
   cd tanstack-query-nextjs14-example
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

### TanStack Query Integration

1. **Server-Side Prefetching**  
   Data is fetched on the server using TanStack Query and dehydrated using `dehydrate` to send to the client. Example code in `page.tsx`:

   ```tsx
   import { dehydrate } from "@tanstack/react-query";
   import { fetchPokemonList } from "@/lib/fetchers";
   import queryClient from "@/lib/queryClient";

   export async function generateMetadata() {
     return { title: "TanStack Query with Hydration" };
   }

   export default async function Home() {
     await queryClient.prefetchQuery(["pokemon"], fetchPokemonList);
     const dehydratedState = dehydrate(queryClient);

     return (
       <Hydrate state={dehydratedState}>
         <PokemonList />
       </Hydrate>
     );
   }
   ```

2. **Hydration on Client**  
   The `Hydrate` component ensures the client uses the server-fetched data, avoiding duplicate requests.

3. **Infinite Query**  
   The `useInfiniteQuery` hook supports fetching more items dynamically as the user scrolls.

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.

---

## Example API Integration

The app uses the [PokéAPI](https://pokeapi.co/) to fetch a list of Pokémon. Update the `fetchers.ts` file to integrate with your own API if needed.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query/v4/docs/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---
