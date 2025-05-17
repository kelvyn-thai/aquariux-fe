import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Layout } from "@/components";
import {
  SearchDetail,
  SearchDetailSkeleton,
  SearchSummary,
  SearchSummarySkeleton,
} from "@/modules/search";

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

      <section className="mt-6">
        <h4 className="font-bold text-base">5-day Forecast (3 Hours)</h4>
        <Suspense fallback={<SearchDetailSkeleton />}>
          <SearchDetail {...params} />
        </Suspense>
      </section>
    </Layout>
  );
}
