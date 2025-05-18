import { z } from "zod";

import { WeatherEntity, WeatherSchema } from "@/schemas";

export const GetWeatherResponseSchema = z.object({
  data: WeatherSchema,
});

export type GetWeatherResponse = { data: WeatherEntity };
