import { createJSONStorage, createStore } from "@core-ui/@zustand";
import axios from "axios";

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
      storage: createJSONStorage(() => ({
        async setItem(key, value) {
          try {
            const res = await axios.post("/api/encrypt", { value });

            const encrypted = res.data.encrypted || null;

            localStorage.setItem(key, encrypted);
          } catch (err) {
            console.error("Failed to encrypt:", err);
            localStorage.removeItem(key);
            return null;
          }
        },
        async getItem(key) {
          const encrypted = localStorage.getItem(key);

          if (!encrypted) return null;

          try {
            const res = await axios.post("/api/decrypt", {
              cipherText: encrypted,
            });

            const decrypted = res.data.decrypted;

            return JSON.stringify(decrypted);
          } catch (err) {
            console.error("Failed to decrypt:", err);
            localStorage.removeItem(key);
            return null;
          }
        },
        removeItem(key) {
          localStorage.removeItem(key);
        },
      })),

      version: 1,
    },
  }
);
