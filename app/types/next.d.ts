declare module 'next/link' {
  interface LinkProps {
    href: string | { pathname: string; query?: Record<string, string> };
  }
}
