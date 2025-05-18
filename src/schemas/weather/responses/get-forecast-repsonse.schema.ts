import { z } from "zod";

import { ForecastEntity, ForecastSchema } from "@/schemas";

export const GetForecastResponseSchema = z.object({
  data: z.array(ForecastSchema),
});

export type GetForecastResponse = { data: ForecastEntity[] };

export interface FormattedForecastEntity extends ForecastEntity {
  formattedDate: string;
  formattedTemperature: string;
  formattedWeatherDesc: string;
  formattedIconURL: string;
  formattedHumidity: string;
  formattedWindSpeed: string;
  formattedVisibility: string;
}
