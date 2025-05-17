import { ReactElement } from "react";

import { Footer, Header } from "@/components";

export default function Layout({ children }: { children: ReactElement | React.ReactNode }) {
  return (
    <div
      id="app"
      className="overflow-scroll bg-neutral-50 w-full min-h-screen relative text-black-500 shadow-2xl h-screen min-w-xxs max-w-sm m-auto"
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
