import Image from "next/image";

import { ErrorCard } from "@/components";
import { WeatherSearchCard } from "@/modules";
import { ForecastEntity, GetForecastResponse } from "@/schemas";
import { weatherService } from "@/services";
import { groupForecastByDay } from "@/utils";

export const WeatherForecastInfo = ({ data }: { data: ForecastEntity[] }) => {
  const grouped = groupForecastByDay(data);

  return (
    <div>
      {Object.entries(grouped).map(([key, values]) => {
        return (
          <ul key={key}>
            <li className="mb-6">
              <p className="text-neutral-600 font-semibold text-sm mb-4">{key}</p>
              {values.map(
                ({
                  id,
                  formattedDate,
                  formattedIconURL,
                  formattedWeatherDesc,
                  formattedTemperature,
                }) => (
                  <div
                    key={id}
                    className="text-sm grid grid-cols-[min-content,max-content,auto] gap-4 items-center h-8"
                  >
                    <span className="font-bold">{formattedDate}</span>

                    <span className="grid grid-cols-[max-content,auto] gap-2 items-center">
                      <Image
                        src={formattedIconURL}
                        alt={formattedWeatherDesc}
                        width={32}
                        height={32}
                        loading="lazy"
                        priority={false}
                      />
                      <span className="text-neutral-700 font-semibold text-xs">
                        {formattedTemperature}
                      </span>
                    </span>

                    <span className="font-bold justify-self-end truncate  max-w-24 xs:max-w-none">
                      {formattedWeatherDesc}
                    </span>
                  </div>
                )
              )}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export const WeatherForecast = async ({ lon, lat }: { lat: string; lon: string }) => {
  let response: GetForecastResponse | null = null;
  let errorMsg: string | undefined = undefined;

  try {
    response = await weatherService.getForecastData({ lat, lon });
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Unknown Error!";
    }
  }

  return (
    <>
      <WeatherSearchCard className="mt-4 p-4 min-h-1/2" data-testid="weather-summary">
        {response && <WeatherForecastInfo data={response.data} />}
      </WeatherSearchCard>
      {errorMsg && <ErrorCard errorMsg={errorMsg} />}
    </>
  );
};

export default WeatherForecast;
