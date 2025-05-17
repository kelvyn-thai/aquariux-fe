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

import { useSearchHistoryStore } from "@/modules/search";
import { GetGeoEntityResponseDto } from "@/schemas";
import { weatherService } from "@/services";

const useQuery = createQueryStore<GetGeoEntityResponseDto>();

export const SearchBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keySearch, setKeySearch] = useState("");

  const [setData] = useSearchHistoryStore(useShallow((s) => [s.setData]));

  const {
    isPending,
    error,
    data,
    executeQueryFn,
    setError,
    setData: setItems,
  } = useQuery(useShallow((s) => s));
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);

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
      if (value.trim().length === 0) {
        setItems({ data: [] });
        return;
      }

      executeQueryFn({
        queryFn: async () => {
          setError("");
          setItems({ data: [] });

          const response = await weatherService.getDirectGeoCoding(value);

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
    <div className="h-24" data-testid="search-bar">
      <div className="grid grid-cols-[3fr_1fr] gap-4 items-end">
        <Combobox
          label={""}
          placeholder="Search country or city here..."
          items={items}
          onSelectItem={(item) => {
            setSelectedItem(item);
            setIsMenuOpen(false);
            setKeySearch(item.text);
            setData({ ...item.metadata, searchTime: new Date().getTime() });
          }}
          selectedItem={selectedItem}
          keySearch={keySearch}
          onChangeKeySearch={async (value) => {
            setKeySearch(value);
            handleSearch(value);
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
