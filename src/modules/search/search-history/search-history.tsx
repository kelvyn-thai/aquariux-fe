"use client";

import { Icon, SearchIcon, TrashIcon } from "@core-ui/@icons";
import { useShallow } from "@core-ui/@zustand";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { SearchCard } from "@/modules/search";

import { useSearchHistoryStore } from "./search-history.hooks";
import { SearchHistoryGeoEntityFormattedResDto } from "./search-history.models";

export const SearchHistory = () => {
  const router = useRouter();

  const [data, removeData] = useSearchHistoryStore(useShallow((s) => [s.data, s.removeData]));

  const searchList: SearchHistoryGeoEntityFormattedResDto[] = useMemo(
    () =>
      Object.values(data).map((item) => ({
        ...item,
        formattedValue: `${item.name}, ${item.country} ${item.state ? `- ${item.state}` : ""}`,
      })),
    [data]
  );

  return (
    <div className="mt-6" data-testid="search-history">
      <h4 className="text-base leading-6 font-bold text-neutral-1000">Search history</h4>
      <SearchCard className="min-h-1/2">
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
      </SearchCard>
    </div>
  );
};
