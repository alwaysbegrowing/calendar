import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { JSONObject } from "superjson/dist/types";

import { locationHiddenFilter, LocationObject } from "@calcom/app-store/locations";
import { WEBAPP_URL } from "@calcom/lib/constants";
import { parseRecurringEvent } from "@calcom/lib/isRecurringEvent";

import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";

import Shell from "@components/Shell";
import SkeletonLoader from "@components/eventtype/SkeletonLoader";

import UserCal, { AvailabilityPageProps } from "./[user]/[type]";

function HomePage(props: AvailabilityPageProps) {
  return (
    <div>
      <Head>
        <title>Home | app.abg.garden</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell
        heading="Home"
        subtitle="View your availability and schedule new sessions"
        customLoader={<SkeletonLoader />}>
        <UserCal {...props} />
      </Shell>
    </div>
  );
}

async function getUserPageProps(context: GetServerSidePropsContext) {
  const { ssgInit } = await import("@server/lib/ssg");
  const ssg = await ssgInit(context);
  const session = await getSession(context);

  console.log(session);

  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/settings/profile" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      away: true,
      plan: true,
      name: true,
      hideBranding: true,
      timeZone: true,
      theme: true,
      weekStart: true,
      brandColor: true,
      darkBrandColor: true,
      eventTypes: {
        select: { id: true },
        // Order by position is important to ensure that the event-type that's enabled is the first in the list because for Free user only first is allowed.
        orderBy: [
          {
            position: "desc",
          },
          {
            id: "asc",
          },
        ],
      },
    },
  });

  if (!user) {
    throw new Error("User seems logged in but cannot be found in the db");
  }

  const eventTypeIds = user.eventTypes.map((e) => e.id);
  const eventType = await prisma.eventType.findUnique({
    where: {
      id: eventTypeIds[1],
    },
    select: {
      title: true,
      slug: true,
      recurringEvent: true,
      length: true,
      locations: true,
      id: true,
      description: true,
      price: true,
      currency: true,
      requiresConfirmation: true,
      schedulingType: true,
      metadata: true,
      seatsPerTimeSlot: true,
      users: {
        select: {
          name: true,
          username: true,
          hideBranding: true,
          brandColor: true,
          darkBrandColor: true,
          theme: true,
          plan: true,
          allowDynamicBooking: true,
          timeZone: true,
        },
      },
    },
  });

  if (!eventType) return { notFound: true };

  const locations = eventType.locations ? (eventType.locations as LocationObject[]) : [];

  const eventTypeObject = Object.assign({}, eventType, {
    metadata: (eventType.metadata || {}) as JSONObject,
    recurringEvent: parseRecurringEvent(eventType.recurringEvent),
    locations: locationHiddenFilter(locations),
    users: eventType.users.map((user) => ({
      name: user.name,
      username: user.username,
      hideBranding: user.hideBranding,
      plan: user.plan,
      timeZone: user.timeZone,
    })),
  });

  const profile = eventType.users[0] || user;

  return {
    props: {
      eventType: eventTypeObject,
      profile: {
        theme: user.theme,
        name: user.name,
        username: user.username,
        hideBranding: user.hideBranding,
        plan: user.plan,
        timeZone: user.timeZone,
        weekStart: user.weekStart,
        brandColor: user.brandColor,
        darkBrandColor: user.darkBrandColor,
        slug: `${profile.username}/${eventType.slug}`,
        image: `${WEBAPP_URL}/${profile.username}/avatar.png`,
      },
      away: user?.away,
      isDynamic: false,
      trpcState: ssg.dehydrate(),
    },
  };
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await getUserPageProps(context);
};

export default HomePage;
