import clsx from "clsx";
import React, { JSX } from "react";

export interface ISearchCard extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | React.ReactElement | React.ReactNode;
  className?: string;
}

export const SearchCard = ({ children, className, ...rest }: ISearchCard) => {
  return (
    <div
      {...rest}
      className={clsx(
        "mt-6 border border-slate-200 rounded-xl py-6 shadow-xl min-h-32 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SearchCard;
