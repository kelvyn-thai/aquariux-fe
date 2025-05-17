import { GeoEntity } from "./geo.schema";

export interface GeoEntityResDto extends GeoEntity {
  id: string;
}

export interface GetGeoEntityResponseDto {
  data?: GeoEntityResDto[];
  errorMsg?: string;
}
