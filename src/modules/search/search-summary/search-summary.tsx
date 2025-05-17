import Image from "next/image";

import { ErrorCard, WindDirectionIcon } from "@/components";
import { SearchCard } from "@/modules/search";
import { GetWeatherResponse, WeatherEntity } from "@/schemas";
import { weatherService } from "@/services";
import { formatWeather } from "@/utils";

export const SearchSummaryInfo = ({ data }: { data: WeatherEntity }) => {
  const {
    formattedDate,
    formattedIconURL,
    formattedWeatherDesc,
    formattedTemperature,
    formattedHumidity,
    formattedWindSpeed,
    formattedVisibility,
    wind: { deg },
  } = formatWeather(data);

  return (
    <>
      <div className="space-y-2">
        <p className="text-base font-medium ">{formattedDate}</p>
        <div className="grid grid-cols-2 gap-4 items-center">
          <Image
            src={formattedIconURL}
            alt={formattedWeatherDesc}
            width={100}
            height={100}
            className="mx-auto"
            loading="lazy"
            priority={false}
          />
          <div>
            <p className="text-3xl font-bold">{formattedTemperature}</p>
            <p className="capitalize text-base truncate">{formattedWeatherDesc}</p>
          </div>
        </div>

        <div className="flex justify-around text-sm mt-4 text-center">
          <div>
            <p className="text-neutral-700">Humidity</p>
            <p className="font-bold">{formattedHumidity}</p>
          </div>
          <div>
            <p className="text-neutral-700">Winds</p>
            <p className="font-bold flex items-center">
              <WindDirectionIcon deg={deg} />
              {formattedWindSpeed}
            </p>
          </div>
          <div>
            <p className="text-neutral-700">Visibility</p>
            <p className="font-bold">{formattedVisibility}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const SearchSummary = async ({ lon, lat }: { lat: string; lon: string }) => {
  let response: GetWeatherResponse | null = null;
  let errorMsg: string | undefined = undefined;

  try {
    response = await weatherService.getCurrentWeatherData({ lat, lon });
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Unknown Error!";
    }
  }

  return (
    <section>
      <SearchCard className="p-4 min-h-[230px]" data-testid="search-summary">
        {response?.data && <SearchSummaryInfo data={response.data} />}
      </SearchCard>
      {errorMsg && <ErrorCard errorMsg={errorMsg} />}
    </section>
  );
};

export default SearchSummary;
