import { MenuItem } from "@/types/navigation";
import { UrlObject } from "url";

export const menuItems: MenuItem[] = [
  {
    label: "Offerings",
    path: "/offerings",
    children: [
      {
        label: "Bots",
        path: "/offerings?filter=bots",
        description: "AI-powered assistants.",
      },
      {
        label: "Solutions",
        path: "/offerings?filter=solutions",
        description: "AI solutions for different sectors.",
      },
      {
        label: "Projects",
        path: "/offerings?filter=projects",
        description: "Ongoing research and development.",
      },
    ],
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact Us",
    path: "/contact",
    isButton: true,
  },
];
