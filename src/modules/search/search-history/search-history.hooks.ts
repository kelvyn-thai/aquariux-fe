import { createStore } from "@core-ui/@zustand";

import { SearchHistoryGeoEntityResDto, SearchHistoryState } from "./search-history.models";

export const [useSearchHistoryStore] = createStore<SearchHistoryState>(
  (set) => ({
    data: {},
    setData: (item) =>
      set((prevState) => {
        const mapNextData = { ...prevState.data, [item.id]: item };

        const nextData: [string, SearchHistoryGeoEntityResDto][] = Object.values(mapNextData)
          .sort((a, b) => b.searchTime - a.searchTime)
          .slice(0, 5)
          .map((value) => [value.id, { ...value, local_names: {} }]);

        return {
          data: Object.fromEntries(nextData),
        };
      }),
    removeData: (id) => {
      set((prevState) => {
        delete prevState.data[id];
        return { data: { ...prevState.data } };
      });
    },
  }),
  {
    persistOptions: {
      name: Symbol("$SEARCH_HISTORY_STORE_STORAGE").toString(),
      partialize(state) {
        return {
          data: state.data,
        };
      },
      version: 1,
    },
  }
);
