import type { App } from "@calcom/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Giphy",
  description: _package.description,
  installed: true,
  category: "other",
  // If using static next public folder, can then be referenced from the base URL (/).
  imageSrc: "/api/app-store/giphy/icon.svg",
  logo: "/api/app-store/giphy/icon.svg",
  publisher: "app.abg.garden",
  rating: 0,
  reviews: 0,
  slug: "giphy",
  title: "Giphy",
  trending: true,
  type: "giphy_other",
  url: "https://abg.garden/apps/giphy",
  variant: "other",
  verified: true,
  email: "help@abg.garden",
} as App;

export default metadata;
