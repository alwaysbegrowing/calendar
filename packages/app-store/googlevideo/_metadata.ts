import { validJson } from "@calcom/lib/jsonUtils";
import type { App } from "@calcom/types/App";

import { LocationType } from "../locations";
import _package from "./package.json";

export const metadata = {
  name: "Google Meet",
  description: _package.description,
  installed: !!(process.env.GOOGLE_API_CREDENTIALS && validJson(process.env.GOOGLE_API_CREDENTIALS)),
  slug: "google-meet",
  category: "video",
  type: "google_video",
  title: "Google Meet",
  imageSrc: "/api/app-store/googlevideo/logo.webp",
  variant: "conferencing",
  logo: "/api/app-store/googlevideo/logo.webp",
  publisher: "app.abg.garden",
  rating: 5,
  reviews: 69,
  trending: false,
  url: "https://abg.garden/",
  verified: true,
  isGlobal: true,
  email: "help@abg.garden",
  locationType: LocationType.GoogleMeet,
  locationLabel: "Google Meet",
} as App;

export default metadata;
