'use client';

import { Fragment, useRef } from 'react';
import { Popover, Transition, Portal } from '@headlessui/react';
import Link from 'next/link';
import bots from '@/data/bots';
import { getBotPath } from '@/lib/routes';
import { BOT_SWITCHER_COLORS, type CustomBotAccentColor } from '@/lib/config/colors';

interface BotSwitcherProps {
  currentBotSlug: string;
  currentBotTitle: string;
  currentBotEmoji: string;
  accentColor?: string;
}

export function BotSwitcher({
  currentBotSlug,
  currentBotTitle,
  currentBotEmoji,
  accentColor = 'blue',
}: BotSwitcherProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Filter out current bot and bots without nav config
  const otherBots = bots.filter((bot) => bot.slug !== currentBotSlug && bot.nav);
  const colors =
    BOT_SWITCHER_COLORS[accentColor as CustomBotAccentColor] || BOT_SWITCHER_COLORS.blue;

  // Get button position for portal positioning
  const getDropdownStyle = () => {
    if (!buttonRef.current) return {};
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'fixed' as const,
      top: rect.bottom + 8,
      left: rect.left,
      zIndex: 9999,
    };
  };

  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button
            ref={buttonRef}
            className={`group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
              open ? colors.active : `text-gray-700 ${colors.button}`
            }`}
          >
            <span className="text-lg">{currentBotEmoji}</span>
            <span className="font-semibold">{currentBotTitle}</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Popover.Button>

          <Portal>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static style={getDropdownStyle()} className="w-64">
                <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 border border-gray-100">
                  {/* Header */}
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Switch Bot
                    </p>
                  </div>

                  {/* Bot List */}
                  <div className="py-2">
                    {otherBots.map((bot) => (
                      <Link
                        key={bot.slug}
                        href={getBotPath(bot.slug)}
                        onClick={() => close()}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">{bot.nav?.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{bot.nav?.navTitle}</p>
                          {bot.nav?.navDescription && (
                            <p className="text-xs text-gray-500 truncate">
                              {bot.nav.navDescription}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Footer - All Bots link */}
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                    <Link
                      href="/bots"
                      onClick={() => close()}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                      View All Bots
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Portal>
        </>
      )}
    </Popover>
  );
}
