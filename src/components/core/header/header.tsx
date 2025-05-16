"use client";

import { cx } from "class-variance-authority";
import { Github, Linkedin, Mail } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React, { JSX, ReactElement, useImperativeHandle, useState } from "react";

import {
  CONTACT_ME_LINK,
  EMAIL_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  PROJECTS_LINK,
  getSectionId,
} from "@/constants";

const NavLinks = ({
  children,
  navClassName = "",
  contentClassName = "",
  ssr = true,
  ...rest
}: {
  children: ReactElement<LinkProps> | JSX.Element[];
  navClassName?: string;
  contentClassName?: string;
  ssr?: boolean;
}) => {
  const navLinks = React.Children.map(children, (navLink) => {
    const { children } = navLink.props;

    const content: JSX.Element = typeof children === "string" ? <span>{children}</span> : children;
    const hash = getSectionId(navLink.props.href);

    return React.cloneElement(
      navLink,
      {
        ...navLink.props,
        target: "_blank",
        className: navClassName,
        ...(ssr
          ? {}
          : {
              href: hash,
              target: "",
              scroll: false,
              onClick: () => {
                const el = document.querySelector(hash);
                el?.scrollIntoView({ behavior: "smooth" });
              },
            }),
      } as LinkProps,
      typeof content !== "undefined" &&
        React.cloneElement(content, {
          className: `w-6 h-6  ${contentClassName}`,
        })
    );
  });
  return (
    <div className="flex flex-row gap-8" {...rest}>
      {navLinks}
    </div>
  );
};

const SocialNavLinks = () => (
  <NavLinks contentClassName="hover:text-green-200" data-testid="social-nav-links">
    <Link href={EMAIL_LINK} aria-label="Send an email to me!">
      <Mail />
    </Link>
    <Link href={GITHUB_LINK} aria-label="View my Github pages!">
      <Github />
    </Link>
    <Link href={LINKEDIN_LINK} aria-label="View my Linkedin profile!">
      <Linkedin />
    </Link>
  </NavLinks>
);

const AppNavLinks = ({ ssr }: { ssr: boolean }) => (
  <NavLinks
    contentClassName="hover:underline hover:text-white"
    data-testid="app-nav-links"
    ssr={ssr}
  >
    <Link href={PROJECTS_LINK}>Projects</Link>
    <Link href={CONTACT_ME_LINK}>Contact me</Link>
  </NavLinks>
);

const Header = ({
  ref,
  children,
}: {
  ref: React.Ref<unknown>;
  children: JSX.Element | JSX.Element[];
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useImperativeHandle(ref, () => ({ isVisible, setIsVisible }), [isVisible]);

  return (
    <div
      id="header"
      className={cx(
        "px-4% py-1% bg-[#18181C] text-white transition-all duration-1000 ease-linear",
        {
          " -translate-y-14": !isVisible,
        }
      )}
    >
      <div className="flex flex-row justify-between gap-5">{children}</div>
    </div>
  );
};

Header.SocialNavLinks = SocialNavLinks;
Header.AppNavLinks = AppNavLinks;

export default Header;
