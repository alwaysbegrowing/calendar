import { UserPlan } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { JSONObject } from "superjson/dist/types";

import { locationHiddenFilter, LocationObject } from "@calcom/app-store/locations";
import { getWorkingHours } from "@calcom/lib/availability";
import { parseRecurringEvent } from "@calcom/lib/isRecurringEvent";

import getBooking, { GetBookingType } from "@lib/getBooking";
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const slugParam = "everyone";
  const typeParam = "45min";
  const dateParam = null;
  const rescheduleUid = null;

  if (!slugParam || !typeParam) {
    throw new Error(`File is not named [idOrSlug]/[user]`);
  }

  const team = await prisma.team.findFirst({
    where: {
      slug: slugParam,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      eventTypes: {
        where: {
          slug: typeParam,
        },
        select: {
          id: true,
          slug: true,
          users: {
            select: {
              id: true,
              name: true,
              avatar: true,
              username: true,
              timeZone: true,
              hideBranding: true,
              plan: true,
              brandColor: true,
              darkBrandColor: true,
            },
          },
          title: true,
          availability: true,
          description: true,
          length: true,
          schedulingType: true,
          periodType: true,
          periodStartDate: true,
          periodEndDate: true,
          periodDays: true,
          periodCountCalendarDays: true,
          minimumBookingNotice: true,
          beforeEventBuffer: true,
          afterEventBuffer: true,
          recurringEvent: true,
          requiresConfirmation: true,
          locations: true,
          price: true,
          currency: true,
          timeZone: true,
          slotInterval: true,
          metadata: true,
          seatsPerTimeSlot: true,
          schedule: {
            select: {
              timeZone: true,
              availability: true,
            },
          },
        },
      },
    },
  });

  if (!team || team.eventTypes.length != 1) {
    return {
      notFound: true,
    };
  }

  const [eventType] = team.eventTypes;

  const timeZone = eventType.schedule?.timeZone || eventType.timeZone || undefined;

  const workingHours = getWorkingHours(
    {
      timeZone,
    },
    eventType.schedule?.availability || eventType.availability
  );

  eventType.schedule = null;

  const locations = eventType.locations ? (eventType.locations as LocationObject[]) : [];

  const eventTypeObject = Object.assign({}, eventType, {
    metadata: (eventType.metadata || {}) as JSONObject,
    periodStartDate: eventType.periodStartDate?.toString() ?? null,
    periodEndDate: eventType.periodEndDate?.toString() ?? null,
    recurringEvent: parseRecurringEvent(eventType.recurringEvent),
    locations: locationHiddenFilter(locations),
  });

  eventTypeObject.availability = [];

  let booking: GetBookingType | null = null;
  if (rescheduleUid) {
    booking = await getBooking(prisma, rescheduleUid);
  }

  return {
    props: {
      // Team is always pro
      plan: "PRO" as UserPlan,
      profile: {
        name: team.name || team.slug,
        slug: team.slug,
        image: team.logo,
        theme: null as string | null,
        weekStart: "Sunday",
        brandColor: "" /* TODO: Add a way to set a brand color for Teams */,
        darkBrandColor: "" /* TODO: Add a way to set a brand color for Teams */,
      },
      date: dateParam,
      eventType: eventTypeObject,
      workingHours,
      previousPage: context.req.headers.referer ?? null,
      booking,
    },
  };
};

export default HomePage;
