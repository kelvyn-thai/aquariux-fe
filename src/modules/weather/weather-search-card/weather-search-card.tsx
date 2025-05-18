import clsx from "clsx";
import React, { JSX } from "react";

export interface IWeatherSearchCard extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | React.ReactElement | React.ReactNode;
  className?: string;
}

export const WeatherSearchCard = ({ children, className, ...rest }: IWeatherSearchCard) => {
  return (
    <div
      {...rest}
      className={clsx(
        "border border-slate-200 rounded-xl py-6 shadow-xl min-h-32 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};
