import { JSX, ReactElement } from "react";

import { Footer } from "@/components";

export default function Layout({
  children,
}: {
  children: ReactElement | React.ReactNode | JSX.Element;
}) {
  return (
    <div
      id="app"
      className="overflow-scroll bg-neutral-50 w-full min-h-screen relative text-black-500 h-screen pb-24"
    >
      <main className="min-w-xxs max-w-sm m-auto pt-4">{children}</main>
      <Footer />
    </div>
  );
}
