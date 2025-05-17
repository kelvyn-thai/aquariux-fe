import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Layout } from "@/components";
import { SearchSummary, SearchSummarySkeleton } from "@/modules/search";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    lat: string;
    lon: string;
  }>;
}) {
  const params = await searchParams;

  if (!params.lat || !params.lon) {
    redirect("/search");
  }

  return (
    <Layout>
      <Suspense fallback={<SearchSummarySkeleton />}>
        <SearchSummary {...params} />
      </Suspense>
    </Layout>
  );
}
