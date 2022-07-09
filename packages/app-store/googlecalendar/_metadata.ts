import { validJson } from "@calcom/lib/jsonUtils";
import type { App } from "@calcom/types/App";

import { LocationType } from "../locations";
import _package from "./package.json";

export const metadata = {
  name: "Google Calendar",
  description: _package.description,
  installed: !!(process.env.GOOGLE_API_CREDENTIALS && validJson(process.env.GOOGLE_API_CREDENTIALS)),
  type: "google_calendar",
  title: "Google Calendar",
  imageSrc: "/api/app-store/googlecalendar/icon.svg",
  variant: "calendar",
  category: "calendar",
  logo: "/api/app-store/googlecalendar/icon.svg",
  publisher: "app.abg.garden",
  rating: 5,
  reviews: 69,
  slug: "google-calendar",
  trending: false,
  url: "https://abg.garden/",
  verified: true,
  email: "help@abg.garden",
} as App;

export default metadata;
