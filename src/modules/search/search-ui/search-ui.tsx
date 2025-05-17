"use client";

import { SearchBar, SearchHistory } from "@/modules/search";

export const SearchUI = () => {
  return (
    <section className="h-screen min-w-xxs max-w-sm w-full m-auto" data-testid="search-ui">
      <SearchBar />
      <SearchHistory />
    </section>
  );
};

export default SearchUI;
