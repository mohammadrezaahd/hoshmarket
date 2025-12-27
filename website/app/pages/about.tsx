import { lazy, Suspense } from "react";
import {
  CTASection,
  DetailsSection,
  HeroSection,
  StatsSection,
  TeamSection,
} from "~/components/about";
import {
  HeroSkeleton,
  StatsSkeleton,
  DetailsSkeleton,
  TeamSkeleton,
  CTASkeleton,
} from "~/components/skeletons";

export const meta = () => {
  return [
    { title: "درباره ما - Hoshmarket" },
    { name: "description", content: "درباره Hoshmarket بیشتر بدانید" },
  ];
};

export default function About() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<DetailsSkeleton />}>
        <DetailsSection />
      </Suspense>

      <Suspense fallback={<TeamSkeleton />}>
        <TeamSection />
      </Suspense>

      <Suspense fallback={<CTASkeleton />}>
        <CTASection />
      </Suspense>
    </>
  );
}
