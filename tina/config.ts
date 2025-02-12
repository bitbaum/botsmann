import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: "c7fe2362-7424-4956-a241-4d246238f406",
  token: "9de4fe3a4f7ddefcf391fdebc4480d4b0a5b0e20",
  branch: "main",
  local: true,
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
