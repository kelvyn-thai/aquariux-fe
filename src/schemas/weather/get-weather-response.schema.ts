import { z } from "zod";

import { WeatherSchema } from "./weather.schema";

export const GetWeatherResponseSchema = z.object({
  data: WeatherSchema,
});

export type GetWeatherResponse = z.infer<typeof GetWeatherResponseSchema>;
