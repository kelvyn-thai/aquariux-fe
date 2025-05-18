"use client";

import { Icon, SearchIcon, TrashIcon } from "@core-ui/@icons";
import { useShallow } from "@core-ui/@zustand";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useWeatherSearchHistoryStore } from "@/hooks";
import { WeatherSearchHistoryFormattedItem } from "@/models";
import { WeatherSearchCard } from "@/modules";

export const WeatherSearchHistory = () => {
  const router = useRouter();

  const [data, removeData] = useWeatherSearchHistoryStore(
    useShallow((s) => [s.data, s.removeData])
  );

  const searchList: WeatherSearchHistoryFormattedItem[] = useMemo(
    () =>
      Object.values(data).map((item) => ({
        ...item,
        formattedValue: `${item.name}, ${item.country} ${item.state ? `- ${item.state}` : ""}`,
      })),
    [data]
  );

  return (
    <div className="mt-4" data-testid="weather-search-history">
      <h4 className="text-base leading-6 font-bold text-neutral-1000">Search history</h4>
      <WeatherSearchCard className="min-h-60 mt-6">
        {searchList.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[4fr_min-content] gap-4 items-center px-6 h-10"
          >
            <span className="text-sm leading-4 font-medium text-neutral-900 truncate">
              {item.formattedValue}
            </span>
            <span className="grid grid-cols-[repeat(2,min-content)] gap-4">
              <Icon
                onClick={() => {
                  router.push(
                    `/?${new URLSearchParams({
                      lon: String(item.lon),
                      lat: String(item.lat),
                      location: item.formattedValue,
                    }).toString()}`
                  );
                }}
                className="hover:text-blue-600 "
              >
                <SearchIcon />
              </Icon>
              <Icon onClick={() => removeData(item.id)} className=" hover:text-rose-600">
                <TrashIcon />
              </Icon>
            </span>
          </div>
        ))}
      </WeatherSearchCard>
    </div>
  );
};
