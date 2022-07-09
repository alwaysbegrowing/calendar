import type { App } from "@calcom/types/App";

import _package from "./package.json";

export const metadata = {
  name: "Slack App",
  description: _package.description,
  category: "messaging",
  imageSrc: "/apps/slack.svg",
  logo: "/apps/slack.svg",
  publisher: "app.abg.garden",
  rating: 5,
  reviews: 69,
  slug: "slack",
  title: "Slack App",
  trending: true,
  // DB has type slack_app. It is an inconsistency
  type: "slack_messaging",
  url: "https://slack.com/",
  variant: "conferencing",
  verified: true,
  email: "help@abg.garden",
} as App;

export default metadata;
