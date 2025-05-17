import { z } from "zod";

// Zod schema for validation
export const GeoEntitySchema = z.object({
  country: z.string(),
  name: z.string(),
  state: z.string().optional(), // state might be missing in some cases
  lon: z.number(),
  lat: z.number(),
  local_names: z.record(z.string()).optional(),
});

export type GeoEntity = z.infer<typeof GeoEntitySchema>;
