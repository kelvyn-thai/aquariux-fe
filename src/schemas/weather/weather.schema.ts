import { z } from "zod";

export const WeatherSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),

  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),

  base: z.string(),

  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    sea_level: z.number().optional(),
    grnd_level: z.number().optional(),
  }),

  visibility: z.number(),

  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number().optional(),
  }),

  clouds: z.object({
    all: z.number(),
  }),

  rain: z
    .object({
      "1h": z.number().optional(),
      "3h": z.number().optional(),
    })
    .optional(),

  snow: z
    .object({
      "1h": z.number().optional(),
      "3h": z.number().optional(),
    })
    .optional(),

  dt: z.number(),

  sys: z.object({
    type: z.number().optional(),
    id: z.number().optional(),
    message: z.number().optional(),
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number(),
  }),

  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

export type WeatherEntity = z.infer<typeof WeatherSchema>;

export interface FormattedWeatherEntity extends WeatherEntity {
  formattedDate: string;
  formattedTemperature: string;
  formattedWeatherDesc: string;
  formattedIconURL: string;
  formattedHumidity: string;
  formattedWindSpeed: string;
  formattedVisibility: string;
}
