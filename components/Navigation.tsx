"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { menuItems } from "@/data/menuItems";
import MegaMenu from "./MegaMenu";

interface NavLinkProps {
  item: (typeof menuItems)[number];
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

function NavLink({ item, isActive, onClick, className = "" }: NavLinkProps) {
  return (
    <Link
      href={item.path}
      role="menuitem"
      onClick={onClick}
      className={`${className} text-sm font-medium transition-colors ${
        isActive ? "text-openai-green" : "text-gray-600 hover:text-openai-green"
      }`}
    >
      {item.label}
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main"
        className="hidden lg:flex items-center space-x-8"
      >
        <div className="flex-1 flex items-center space-x-8" role="menubar">
          {menuItems
            .filter((item) => !item.isButton)
            .map((item) => {
              const isActive = pathname === item.path;
              if (item.children) {
                return (
                  <MegaMenu key={item.label} item={item} isActive={isActive} />
                );
              }
              return (
                <NavLink key={item.label} item={item} isActive={isActive} />
              );
            })}
        </div>
        <div className="flex-shrink-0">
          {menuItems
            .filter((item) => item.isButton)
            .map((item) => (
              <NavLink
                key={item.label}
                item={item}
                className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
              />
            ))}
        </div>
      </nav>

      <Disclosure as="div" className="relative lg:hidden">
        {({ open, close }) => (
          <>
            <Disclosure.Button
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-openai-green"
            >
              {open ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Disclosure.Button>
            <Disclosure.Panel
              id="mobile-menu"
              role="menu"
              className="absolute left-0 right-0 z-40 mt-2 space-y-2 bg-white p-4 pb-3 shadow-lg border-b border-gray-200"
            >
              {menuItems.map((item) => (
                <div key={item.label} className="px-4">
                  <NavLink
                    item={item}
                    isActive={pathname === item.path}
                    onClick={close}
                    className="block py-2 text-gray-700"
                  />
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.label}
                          item={child}
                          onClick={close}
                          className="block py-1 text-gray-600 text-sm"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
