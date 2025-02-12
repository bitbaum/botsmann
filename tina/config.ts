import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: "c7fe2362-7424-4956-a241-4d246238f406",
  token: "9de4fe3a4f7ddefcf391fdebc4480d4b0a5b0e20",
  branch: process.env.BRANCH || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "navigation",
        label: "Navigation",
        path: "content/navigation",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Navigation Items",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "path",
                label: "Path",
              },
              {
                type: "object",
                name: "children",
                label: "Submenu Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                  {
                    type: "string",
                    name: "path",
                    label: "Path",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "CallToAction",
                label: "Call to Action",
                fields: [
                  {
                    name: "text",
                    label: "Text",
                    type: "string",
                  },
                  {
                    name: "url",
                    label: "URL",
                    type: "string",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "navigation",
        label: "Navigation",
        path: "content/navigation",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Navigation Items",
            list: true,
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "path",
                label: "Path",
              },
              {
                type: "object",
                name: "children",
                label: "Submenu Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                  {
                    type: "string",
                    name: "path",
                    label: "Path",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
