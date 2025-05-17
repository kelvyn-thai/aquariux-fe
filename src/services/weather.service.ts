import axios, { AxiosResponse } from "axios";
import { v4 } from "uuid";

import {
  GeoEntity,
  GeoEntityResDto,
  GeoEntitySchema,
  GetForecastResponse,
  GetForecastResponseSchema,
  GetGeoEntityResponseDto,
  GetWeatherResponse,
  GetWeatherResponseSchema,
} from "@/schemas";
import { ApiError, ApiErrorCode, ApiStatusCode } from "@/utils";

export class WeatherService {
  apiKey!: string;

  constructor() {
    this.apiKey = process.env.OPEN_WEATHER_API_KEY!;
  }

  async getCurrentWeatherData({
    lon,
    lat,
  }: {
    lon: string;
    lat: string;
  }): Promise<GetWeatherResponse | null> {
    try {
      if (!lon || !lat) {
        throw new ApiError({
          code: ApiErrorCode.ERR_MISSING_QUERY,
          message: "Missing required query parameter 'lon' & 'lat'",
          statusCode: ApiStatusCode.BAD_REQUEST,
        });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${this.apiKey}`,
        {
          next: {
            tags: [`$WEATHER_${lat}_${lon}`],
            revalidate: 30,
          },
          cache: "force-cache",
        }
      );

      if (!response.ok) {
        throw new ApiError({
          code: ApiErrorCode.ERR_EXTERNAL_API_FAILED,
          message: "Failed to fetch external weather data",
          statusCode: ApiStatusCode.BAD_GATEWAY,
        });
      }

      const rawData = await response.json();

      const { error, data } = GetWeatherResponseSchema.safeParse({ data: rawData });

      if (error || !data) {
        throw new ApiError({
          code: ApiErrorCode.ERROR_INVALID_COUNTRY_OR_CITY,
          message: "Location not found or unsupported",
          statusCode: ApiStatusCode.BAD_REQUEST,
        });
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError || error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Unknown error");
    }
  }

  async getForecastData({ lon, lat }: { lon: string; lat: string }): Promise<GetForecastResponse> {
    try {
      if (!lon || !lat) {
        throw new ApiError({
          code: ApiErrorCode.ERR_MISSING_QUERY,
          message: "Missing required query parameter 'lon' & 'lat'",
          statusCode: ApiStatusCode.BAD_REQUEST,
        });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${this.apiKey}`,
        {
          next: {
            tags: [`$FORECAST_{lat}_${lon}`],
            revalidate: 30,
          },
          cache: "force-cache",
        }
      );

      if (!response.ok) {
        throw new ApiError({
          code: ApiErrorCode.ERR_EXTERNAL_API_FAILED,
          message: "Failed to fetch external forecast data",
          statusCode: ApiStatusCode.BAD_GATEWAY,
        });
      }

      const rawData = await response.json();

      let list = rawData.list;

      if (Array.isArray(list)) {
        list = list.map((item) => ({ ...item, id: v4() }));
      }

      const result = GetForecastResponseSchema.safeParse({ data: list });

      const { error, data } = result;

      console.log({ error });

      if (error || data.data.length === 0) {
        throw new ApiError({
          code: ApiErrorCode.ERROR_INVALID_COUNTRY_OR_CITY,
          message: "Location not found or unsupported",
          statusCode: ApiStatusCode.BAD_REQUEST,
        });
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError || error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Unknown error");
    }
  }

  async getDirectGeoCoding(q: string) {
    const response: AxiosResponse<GetGeoEntityResponseDto> = await axios.get(`/api/geo?q=${q}`);

    return response.data;
  }
  //
  async getDirectGeoCodingSA(q?: string): Promise<GetGeoEntityResponseDto> {
    try {
      if (!q) {
        throw new ApiError({
          code: ApiErrorCode.ERR_MISSING_QUERY,
          message: "Missing required query parameter 'q'",
          statusCode: ApiStatusCode.BAD_REQUEST,
        });
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=10&appid=${this.apiKey}`,
        {
          next: {
            tags: [`$GEO_${q}`],
            revalidate: 30,
          },
        }
      );

      if (!response.ok) {
        throw new ApiError({
          code: ApiErrorCode.ERR_EXTERNAL_API_FAILED,
          message: "Failed to fetch external geo data",
          statusCode: ApiStatusCode.BAD_GATEWAY,
        });
      }

      const rawData = await response.json();

      const geoResponse: GeoEntityResDto[] = rawData
        .map((item: GeoEntity) => {
          const result = GeoEntitySchema.safeParse(item);

          if (!result.success) return null;

          return { ...result.data, id: `${result.data.lat}_${result.data.lon}` };
        })
        .filter(Boolean) as GeoEntityResDto[];

      if (geoResponse.length === 0) {
        throw new ApiError({
          code: ApiErrorCode.ERROR_INVALID_COUNTRY_OR_CITY,
          message: "Invalid country or city",
          statusCode: ApiStatusCode.BAD_REQUEST,
        });
      }

      return {
        data: geoResponse,
      };
    } catch (error) {
      if (error instanceof ApiError || error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Unknown error");
    }
  }
}

export const weatherService = new WeatherService();
