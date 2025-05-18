"use client";

import { Button } from "@core-ui/@button";
import "@core-ui/@button/index.css";
import { Combobox, ComboboxItem } from "@core-ui/@combobox";
import "@core-ui/@combobox/index.css";
import { createQueryStore, useShallow } from "@core-ui/@zustand";
import { AxiosError } from "axios";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { getDirectGeoCodingSA } from "@/app/actions";
import { useWeatherSearchHistoryStore } from "@/hooks";
import { GetGeoEntityResponseDto } from "@/schemas";
// import { weatherService } from "@/services";
import { useWeatherSearchStore } from "@/stores";

const useQuery = createQueryStore<GetGeoEntityResponseDto>();

export const WeatherSearchBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [setData] = useWeatherSearchHistoryStore(useShallow((s) => [s.setData]));
  const [selectedItem, setSelectedItem] = useWeatherSearchStore(
    useShallow((s) => [s.selectedItem, s.setSelectedItem])
  );

  const {
    isPending,
    error,
    data,
    executeQueryFn,
    setError,
    setData: setItems,
  } = useQuery(useShallow((s) => s));

  const searchItemsFormatted: ComboboxItem[] = useMemo(
    () =>
      (data?.data || []).map((item) => ({
        value: item.id,
        text: `${item.name}, ${item.country} ${item.state ? `- ${item.state}` : ""}`,
        metadata: item,
      })),
    [data?.data]
  );

  const items: ComboboxItem[] = useMemo(() => {
    const isSearching = !!keySearch && keySearch.length !== 0;

    if (isSearching) {
      return searchItemsFormatted;
    }

    return [];
  }, [searchItemsFormatted, keySearch]);

  const handleSearch = useMemo(() => {
    return debounce(async (value: string) => {
      const isSearchEmpty = value.trim().length === 0;

      if (isSearchEmpty) {
        setItems({ data: [] });
        return;
      }

      executeQueryFn({
        queryFn: async () => {
          setError("");
          setItems({ data: [] });

          // const response = await weatherService.getDirectGeoCoding(value);

          const response = await getDirectGeoCodingSA(value);

          return response;
        },
        queryFnFail(error) {
          console.log({ error });
          if (error instanceof AxiosError) {
            setError(error.response?.data?.errorMsg);
            setItems({ data: [] });
          }
        },
      });
    }, 500);
  }, [executeQueryFn, setError, setItems]);

  return (
    <div className="h-16" data-testid="weather-search-bar">
      <div className="grid grid-cols-[3fr_1fr] gap-4 items-end">
        <Combobox
          placeholder="Search country or city here..."
          items={items}
          onSelectItem={(item) => {
            unstable_batchedUpdates(() => {
              setSelectedItem(item);
              setIsMenuOpen(false);
              setKeySearch(item.text);
              setData({ ...item.metadata, searchTime: new Date().getTime() });
            });
          }}
          selectedItem={selectedItem}
          keySearch={keySearch}
          onChangeKeySearch={async (value) => {
            unstable_batchedUpdates(() => {
              setKeySearch(value);
              setError("");
              setSelectedItem(null);
              handleSearch(value);
            });
          }}
          isLoading={isPending}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          className="[&>.base-wrapper-input>input.base-input]:min-w-[200px]"
        />
        <Button
          disabled={!selectedItem}
          onClick={() =>
            selectedItem &&
            router.push(
              `/?${new URLSearchParams({
                lon: selectedItem.metadata.lon,
                lat: selectedItem.metadata.lat,
                location: selectedItem.text,
              }).toString()}`
            )
          }
        >
          Search
        </Button>
      </div>
      {error && (
        <p className="text-red-500 text-sm leading-4 mt-2" data-testid="error-msg">
          {error}
        </p>
      )}
    </div>
  );
};
