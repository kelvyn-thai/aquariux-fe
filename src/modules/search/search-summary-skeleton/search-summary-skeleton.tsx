import { SearchCard } from "@/modules/search";

export const SearchSummarySkeleton = () => {
  return (
    <SearchCard className="p-4 animate-pulse min-h-[230px]">
      <div className="space-y-2">
        <div className="h-6 w-28 bg-slate-200 rounded" />

        <div className="grid grid-cols-2 gap-4 items-center h-[100px]">
          <div className="h-20 w-20 bg-slate-200 rounded-full mx-auto" />
          <div className="space-y-2">
            <div className="h-6 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-28 bg-slate-200 rounded" />
          </div>
        </div>

        <div className="flex justify-around text-sm mt-4 text-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-16 bg-slate-200 rounded mx-auto" />
              <div className="h-4 w-10 bg-slate-300 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </SearchCard>
  );
};
