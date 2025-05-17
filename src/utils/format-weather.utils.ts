import { FormattedWeatherEntity, WeatherEntity } from "@/schemas";

export const formatWeather = (data: WeatherEntity): FormattedWeatherEntity => {
  const {
    dt,
    weather: dataWeather,
    main: { temp, humidity },
    wind,
    visibility,
  } = data;

  const weather = dataWeather?.[0] ?? null;

  return {
    ...data,

    formattedDate: new Date(dt * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    formattedIconURL: weather
      ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
      : "/fallback.png",

    formattedWeatherDesc: weather.description || "Weather",

    formattedTemperature: `${Math.round(temp)}°C`,
    formattedHumidity: `${humidity} %`,
    formattedWindSpeed: `${wind.speed.toFixed(2)} m/s`,
    formattedVisibility: `${(visibility / 1000).toFixed(1)} km`,
  };
};
