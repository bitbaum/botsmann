"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { menuItems } from "@/data/menuItems";
import MegaMenu from "./MegaMenu";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:flex items-center space-x-8">
        <div className="flex-1 flex items-center space-x-8">
          {menuItems.map((item) => {
            if (item.isButton) return null;
            const isActive = pathname === item.path;
            if (item.children) {
              return (
                <MegaMenu key={item.label} item={item} isActive={isActive} />
              );
            }
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-openai-green" : "text-gray-600"
                } hover:text-openai-green`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex-shrink-0">
          {menuItems.map(
            (item) =>
              item.isButton && (
                <Link
                  key={item.label}
                  href={item.path}
                  className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
                >
                  {item.label}
                </Link>
              ),
          )}
        </div>
      </nav>

      <Disclosure as="div" className="lg:hidden">
        {({ open, close }) => (
          <>
            <Disclosure.Button className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-openai-green">
              <span className="sr-only">
                {open ? "Close menu" : "Open menu"}
              </span>
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
            <Disclosure.Panel className="space-y-2 pt-2 pb-3">
              {menuItems.map((item) => (
                <div key={item.label} className="px-4">
                  <Link
                    href={item.path}
                    className="block py-2 text-gray-700"
                    onClick={() => close()}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.path}
                          className="block py-1 text-gray-600 text-sm"
                          onClick={() => close()}
                        >
                          {child.label}
                        </Link>
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
