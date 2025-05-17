"use client";

import { useShallow } from "@core-ui/@zustand";
import { useEffect } from "react";

import { Header, Layout } from "@/components";
import { SearchUI } from "@/modules/search";
import { useSearchStore } from "@/stores";

export default function Page() {
  const [selectedItem, setSelectedItem] = useSearchStore(
    useShallow((s) => [s.selectedItem, s.setSelectedItem])
  );

  useEffect(() => {
    setSelectedItem(null);
  }, []);

  return (
    <>
      <Header title={selectedItem !== null ? selectedItem.text : "-"} />
      <Layout>
        <SearchUI />
      </Layout>
    </>
  );
}
