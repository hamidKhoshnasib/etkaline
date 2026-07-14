import type { Metadata } from "next";

import { ApplianceHome } from "@/features/home/appliances";
import { getHomeMetaTags } from "@/features/home/appliances/api/get-home-meta-tags";

export async function generateMetadata(): Promise<Metadata> {
  const metaTags = await getHomeMetaTags();

  if (!metaTags) {
    return {};
  }

  return {
    title: { absolute: metaTags.homeMetaTitle },
    description: metaTags.homeMetaDescription,
    openGraph: {
      title: metaTags.homeMetaTitle,
      description: metaTags.homeMetaDescription,
    },
  };
}

export default function HomeIndex() {
  return <ApplianceHome />;
}
