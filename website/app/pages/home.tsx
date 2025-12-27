import { lazy, Suspense } from "react";

import { FeaturesSection, HeroSection, StepsSection } from "~/components/home";
import {
  HeroSkeleton,
  FeaturesSkeleton,
  StepsSkeleton,
  TestimonialsSkeleton,
} from "~/components/skeletons";

const TestimonialsSection = lazy(
  () => import("~/components/home/Testimonials")
);

const LandingPage = () => {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<FeaturesSkeleton />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<StepsSkeleton />}>
        <StepsSection />
      </Suspense>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
    </>
  );
};

export default LandingPage; 
