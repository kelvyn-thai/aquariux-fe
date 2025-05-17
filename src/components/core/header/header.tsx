"use client";

import { Icon, MapPinIcon, SearchIcon } from "@core-ui/@icons";
import Link from "next/link";

export const Header = ({ title }: { title: string }) => {
  return (
    <header data-testid="header" className="bg-white py-4 shadow-xl">
      <Link href="/search" className="group">
        <div className="grid grid-cols-[1fr,max-content] gap-2 items-center m-auto m-w-xxs max-w-sm h-8">
          <div className="flex items-center gap-2">
            <Icon className="group-hover:text-blue-500" size="xl">
              <MapPinIcon className="w-5 h-5" />
            </Icon>
            <span className="text-base font-bold truncate max-w-64 group-hover:text-blue-500">
              {title}
            </span>
          </div>
          <Icon className="group-hover:text-blue-500" size="xl">
            <SearchIcon className="w-5 h-5" />
          </Icon>
        </div>
      </Link>
    </header>
  );
};
