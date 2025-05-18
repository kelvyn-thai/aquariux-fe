import { WeatherSearchCard } from "@/modules";

const mockDays = ["Today", "18 May", "19 May"];
const slotsPerDay = 5;

export const WeatherForecastInfoSkeleton = () => {
  return (
    <div>
      {mockDays.map((day) => (
        <ul key={day}>
          <li className="mb-6">
            <p className="bg-slate-200 font-semibold text-sm mb-4 animate-pulse w-16 h-5 rounded" />
            {Array.from({ length: slotsPerDay }).map((_, i) => (
              <div
                key={i}
                className="text-sm grid grid-cols-[min-content,max-content,auto] gap-4 items-center h-10 animate-pulse"
              >
                <span className="h-4 w-10 bg-slate-200 rounded" />

                <span className="grid grid-cols-[max-content,auto] gap-2 items-center">
                  <div className="w-6 h-6 bg-slate-200 rounded-full" />
                  <div className="h-4 w-16 bg-slate-200 rounded" />
                </span>

                <span className="h-4 w-20 bg-slate-200 rounded justify-self-end" />
              </div>
            ))}
          </li>
        </ul>
      ))}
    </div>
  );
};

export const WeatherForecastSkeleton = () => {
  return (
    <WeatherSearchCard className="mt-4 p-4 min-h-1/2" data-testid="search-summary">
      <WeatherForecastInfoSkeleton />
    </WeatherSearchCard>
  );
};

export default WeatherForecastSkeleton;
