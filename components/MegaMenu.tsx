"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { MenuItem } from "@/types/navigation";

interface MegaMenuProps {
  item: MenuItem;
  isActive?: boolean;
}

export default function MegaMenu({ item, isActive }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = `menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !panelRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!item.children) return null;
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        id={id}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
          open || isActive ? "text-openai-green" : "text-gray-600"
        } hover:text-openai-green`}
      >
        <span>{item.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 translate-y-1"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-1"
      >
        <div
          ref={panelRef}
          role="menu"
          aria-labelledby={id}
          className="absolute left-1/2 z-20 mt-3 w-screen max-w-md -translate-x-1/2 px-4 sm:px-0"
        >
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-6 bg-white p-6 lg:grid-cols-2">
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.path}
                  role="menuitem"
                  className="flex rounded-lg p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="ml-2 text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {child.label}
                    </p>
                    {child.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
