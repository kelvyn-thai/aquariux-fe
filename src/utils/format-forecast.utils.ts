import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

import { ForecastEntity, FormattedForecastEntity } from "@/schemas";

dayjs.extend(isToday);

export const formatForecast = (data: ForecastEntity): FormattedForecastEntity => {
  const {
    dt,
    weather: dataWeather,
    main: { humidity, temp_min, temp_max },
    wind,
    visibility,
  } = data;

  const weather = dataWeather?.[0] ?? null;

  return {
    ...data,

    formattedDate: dayjs.unix(dt).format("HH:mm"),
    formattedIconURL: weather
      ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
      : "/fallback.png",

    formattedWeatherDesc: weather.description || "Weather",
    formattedTemperature: `${temp_max.toFixed(2)} / ${temp_min.toFixed(2)}°C`,
    formattedHumidity: `${humidity} %`,
    formattedWindSpeed: `${wind.speed.toFixed(2)} m/s`,
    formattedVisibility: `${(visibility / 1000).toFixed(1)} km`,
  };
};

export const groupForecastByDay = (
  forecastList: ForecastEntity[]
): Record<string, FormattedForecastEntity[]> => {
  const grouped: Record<string, FormattedForecastEntity[]> = {};

  forecastList.forEach((item) => {
    const date = dayjs.unix(item.dt);

    const key = date.isToday() ? "Today" : date.format("D MMMM");
    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(formatForecast(item));
  });

  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => a.dt - b.dt);
  });

  return grouped;
};
