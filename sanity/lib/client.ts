import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: "drafts",
});

// Write client for mutations - server-side only
// Requires SANITY_API_WRITE_TOKEN env var with Editor or higher permissions
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!writeToken) {
  throw new Error(
    'SANITY_API_WRITE_TOKEN is required for write operations. ' +
    'Please set the environment variable with Editor or higher permissions.'
  );
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
});
