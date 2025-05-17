import { z } from "zod";

export const ForecastSchema = z.object({
  dt: z.number(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    sea_level: z.number().optional(),
    grnd_level: z.number().optional(),
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  clouds: z.object({
    all: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number().optional(),
  }),
  visibility: z.number(),
  pop: z.number().optional(),
  rain: z
    .object({
      "3h": z.number().optional(),
    })
    .optional(),
  snow: z
    .object({
      "3h": z.number().optional(),
    })
    .optional(),
  sys: z
    .object({
      pod: z.string(),
    })
    .optional(),
  dt_txt: z.string(),
  id: z.string(),
});

export type ForecastEntity = z.infer<typeof ForecastSchema>;
