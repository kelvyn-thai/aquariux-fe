import { ComboboxItem } from "@core-ui/@combobox";
import { createStore } from "@core-ui/@zustand";

export interface WeatherSearchState {
  selectedItem: ComboboxItem | null;
  setSelectedItem: (item: ComboboxItem | null) => void;
}

export const [useWeatherSearchStore] = createStore<WeatherSearchState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set(() => ({ selectedItem: item ?? null })),
}));
