import {
  createClient,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
  createPortableTextComponent,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";

const config = {
  projectId: "ygs6d55a",
  dataSet: "production",
  apiversion: "v2021-10-21",
  useCdn: true,
};

export const sanityClient = createClient(config)
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {}
})
