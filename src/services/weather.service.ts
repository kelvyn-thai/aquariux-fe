import axios, { AxiosResponse } from "axios";

import {
  GeoEntity,
  GeoEntityResDto,
  GeoEntitySchema,
  GetGeoEntityResponseDto,
  GetWeatherResponse,
  GetWeatherResponseSchema,
} from "@/schemas";
import { ApiError, ApiErrorCode, ApiStatusCode } from "@/utils";

const API_KEY = process.env.OPEN_WEATHER_API_KEY!;

export class WeatherService {
  async getCurrentWeatherData({
    lon,
    lat,
  }: {
    lon: string;
    lat: string;
  }): Promise<GetWeatherResponse | null> {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`,
      {
        next: {
          tags: [`$WEATHER_${lat}_${lon}`],
          revalidate: 30,
        },
        cache: "force-cache",
      }
    ).then((res) => res.json());

    const { error, data } = GetWeatherResponseSchema.safeParse({ data: response });

    if (error) {
      return null;
    }

    return data;
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=10&appid=${API_KEY}`,
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
