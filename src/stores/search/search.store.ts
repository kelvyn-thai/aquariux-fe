import { ComboboxItem } from "@core-ui/@combobox";
import { createStore } from "@core-ui/@zustand";

export interface SearchState {
  selectedItem: ComboboxItem | null;
  setSelectedItem: (item: ComboboxItem | null) => void;
}

export const [useSearchStore] = createStore<SearchState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set(() => ({ selectedItem: item ?? null })),
}));
