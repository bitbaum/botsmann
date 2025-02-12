import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: "devin/1739369831-add-tina-cms",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: []
  }
});
