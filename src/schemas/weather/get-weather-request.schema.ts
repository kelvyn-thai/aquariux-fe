import { z } from "zod";

export const GetWeatherRequestSchema = z.object({
  lon: z.string(),
  lat: z.string(),
});

export type GetWeatherRequestDTO = z.infer<typeof GetWeatherRequestSchema>;
