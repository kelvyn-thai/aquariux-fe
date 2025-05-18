import { GeoEntityResDto } from "@/schemas";

export interface WeatherSearchHistoryItem extends GeoEntityResDto {
  searchTime: number;
}

export interface WeatherSearchHistoryFormattedItem extends WeatherSearchHistoryItem {
  formattedValue: string;
}

export interface WeatherSearchHistoryState {
  data: Record<string, WeatherSearchHistoryItem>;
  setData: (item: WeatherSearchHistoryItem) => void;
  removeData: (id: string) => void;
}
