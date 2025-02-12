import { defineConfig } from "tinacms";

// Configuration is handled via environment variables
// NEXT_PUBLIC_TINA_CLIENT_ID - The client ID from your Tina Cloud project
// TINA_TOKEN - Your Tina Cloud token
export default defineConfig({
  clientId: "c7fe2362-7424-4956-a241-4d246238f406",
  token: "9de4fe3a4f7ddefcf391fdebc4480d4b0a5b0e20",
  branch: "devin/1739369831-add-tina-cms",
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
