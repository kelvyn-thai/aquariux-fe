import { z } from "zod";

import { WeatherEntity, WeatherSchema } from "./weather.schema";

export const GetWeatherResponseSchema = z.object({
  data: WeatherSchema,
});

export type GetWeatherResponse = { data: WeatherEntity };
