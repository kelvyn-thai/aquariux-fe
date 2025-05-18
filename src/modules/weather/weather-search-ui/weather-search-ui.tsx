"use client";

import { WeatherSearchBar, WeatherSearchHistory } from "@/modules";

export const WeatherSearchUI = () => {
  return (
    <section className="h-screen min-w-xxs max-w-sm w-full m-auto" data-testid="weather-search-ui">
      <WeatherSearchBar />
      <WeatherSearchHistory />
    </section>
  );
};

export default WeatherSearchUI;
