import { ReactElement } from "react";

import { Footer, Header } from "@/components";

export default function Layout({ children }: { children: ReactElement | React.ReactNode }) {
  return (
    <div
      id="app"
      className="overflow-scroll bg-neutral-50 w-full min-h-screen relative text-black-500  h-screen "
    >
      <Header />
      <main className="min-w-xxs max-w-sm m-auto">{children}</main>
      <Footer />
    </div>
  );
}
