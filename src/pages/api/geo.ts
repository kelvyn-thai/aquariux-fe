import type { NextApiRequest, NextApiResponse } from "next";

import { GeoEntity, GeoEntityResDto, GeoEntitySchema, GetGeoEntityResponseDto } from "@/schemas";
import { ApiError, ApiErrorCode, ApiStatusCode } from "@/utils";

const API_KEY = process.env.OPEN_WEATHER_API_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetGeoEntityResponseDto>
) {
  const { q } = req.query as { q: string };

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

    res.status(ApiStatusCode.OK).json({ data: geoResponse });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        errorMsg: error.message,
      });
    }

    if (error instanceof Error) {
      res.status(ApiStatusCode.INTERNAL_SERVER_ERROR).json({ errorMsg: error.message });
    }

    res.status(ApiStatusCode.INTERNAL_SERVER_ERROR).json({
      errorMsg: "Unknown error",
    });
  }
}
