import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.4/content/c7fe2362-7424-4956-a241-4d246238f406/github/main', token: '9de4fe3a4f7ddefcf391fdebc4480d4b0a5b0e20', queries });
export default client;
  