import type { App } from "@calcom/types/App";

import _package from "./package.json";

export const metadata = {
  name: "MetaMask",
  description: _package.description,
  installed: true,
  category: "web3",
  // If using static next public folder, can then be referenced from the base URL (/).
  imageSrc: "/api/app-store/metamask/icon.svg",
  logo: "/api/app-store/metamask/icon.svg",
  publisher: "app.abg.garden",
  rating: 5,
  reviews: 69,
  slug: "metamask",
  title: "MetaMask",
  trending: true,
  type: "metamask_web3",
  url: "https://abg.garden/",
  variant: "other",
  verified: true,
  email: "help@abg.garden",
} as App;

export default metadata;
