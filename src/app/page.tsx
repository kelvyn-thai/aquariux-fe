import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Header, Layout } from "@/components";
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
    location: string;
  }>;
}) {
  const params = await searchParams;

  if (!params.lat || !params.lon || !params.location) {
    redirect("/search");
  }

  return (
    <>
      <Header title={params.location} />
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
    </>
  );
}
