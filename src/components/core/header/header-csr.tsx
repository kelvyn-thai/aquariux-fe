"use client";

import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

import Header from "./header";

export const HeaderCSR = () => {
  const headerRef = useRef<{
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
  }>(null);
  const pathname = usePathname();

  useEffect(() => {
    const threshold = 68;

    const callback = throttle(() => {
      const scrollTop = window.scrollY;

      if (headerRef.current !== null) {
        if (scrollTop >= threshold) {
          headerRef.current.setIsVisible(false);
        } else {
          headerRef.current.setIsVisible(true);
        }
      }
    }, 168);

    window.addEventListener("scroll", callback);

    return () => window.removeEventListener("scroll", callback);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    // TODO: implement requestAnimationFrame later

    if (hash) {
      const el = document.querySelector(hash);

      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <Header ref={headerRef}>
      <Header.SocialNavLinks />
      <Header.AppNavLinks ssr={false} />
    </Header>
  );
};
