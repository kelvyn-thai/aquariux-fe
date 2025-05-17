import { GeoEntityResDto } from "@/schemas";

export interface SearchHistoryGeoEntityResDto extends GeoEntityResDto {
  searchTime: number;
}

export interface SearchHistoryGeoEntityFormattedResDto extends SearchHistoryGeoEntityResDto {
  formattedValue: string;
}

export interface SearchHistoryState {
  data: Record<string, SearchHistoryGeoEntityResDto>;
  setData: (item: SearchHistoryGeoEntityResDto) => void;
  removeData: (id: string) => void;
}
