import { InferGetStaticPropsType } from "next";

import { getAppRegistry } from "@calcom/app-store/_appRegistry";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import prisma from "@calcom/prisma";

import AppsShell from "@components/AppsShell";
import Shell from "@components/Shell";
import AllApps from "@components/apps/AllApps";
import AppStoreCategories from "@components/apps/Categories";

export default function Apps({ appStore, categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useLocale();

  return (
    <Shell heading={t("app_store")} subtitle={t("app_store_description")} large isPublic>
      <AppsShell>
        <AppStoreCategories categories={categories} />
        <AllApps apps={appStore} />
      </AppsShell>
    </Shell>
  );
}

export const getStaticProps = async () => {
  const appStore = await getAppRegistry();

  const categoryQuery = await prisma.app.findMany({
    select: {
      categories: true,
    },
  });
  const categories = categoryQuery.reduce((c, app) => {
    for (const category of app.categories) {
      c[category] = c[category] ? c[category] + 1 : 1;
    }
    return c;
  }, {} as Record<string, number>);
  return {
    props: {
      categories: Object.entries(categories).map(([name, count]) => ({ name, count })),
      appStore,
    },
  };
};
