"use client";

import React from "react";
import Link from "next/link";
import type { MobileMenuProps } from "./types";

export function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  activeSection,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "block" : "hidden"}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.dropdown ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-gray-500">
                      {item.label}
                    </div>
                    {item.dropdown.items.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={
                          typeof subItem.path === "string"
                            ? subItem.path
                            : subItem.path.pathname
                        }
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          activeSection === subItem.section
                            ? "bg-green-50 text-green-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={
                      typeof item.path === "string"
                        ? item.path
                        : item.path.pathname
                    }
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === item.section
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-100">
            <Link
              href="/projects/governance/portal"
              className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                👤
              </div>
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
