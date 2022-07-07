import cache from "memory-cache";

import { CONSOLE_URL } from "@calcom/lib/constants";

const CACHING_TIME = 86400000; // 24 hours in milliseconds

async function checkLicense(license: string): Promise<boolean> {
  return true;
}

export default checkLicense;
