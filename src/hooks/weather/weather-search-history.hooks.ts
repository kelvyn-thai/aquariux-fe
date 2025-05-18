import { createStore } from "@core-ui/@zustand";

import { WeatherSearchHistoryItem, WeatherSearchHistoryState } from "@/models";

export const [useWeatherSearchHistoryStore] = createStore<WeatherSearchHistoryState>(
  (set) => ({
    data: {},
    setData: (item) =>
      set((prevState) => {
        const mapNextData: Record<string, WeatherSearchHistoryItem> = {
          ...prevState.data,
          [item.id]: item,
        };

        const nextData: [string, WeatherSearchHistoryItem][] = Object.values(mapNextData)
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
