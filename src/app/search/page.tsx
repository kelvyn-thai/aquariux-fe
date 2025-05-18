"use client";

import { useShallow } from "@core-ui/@zustand";
import { useEffect } from "react";

import { Header, Layout } from "@/components";
import { WeatherSearchUI } from "@/modules";
import { useWeatherSearchStore } from "@/stores";

export default function Page() {
  const [selectedItem, setSelectedItem] = useWeatherSearchStore(
    useShallow((s) => [s.selectedItem, s.setSelectedItem])
  );

  useEffect(() => {
    setSelectedItem(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title={selectedItem !== null ? selectedItem.text : "-"} />
      <Layout>
        <WeatherSearchUI />
      </Layout>
    </>
  );
}
