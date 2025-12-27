import { lazy, Suspense } from "react";

import { FeaturesSection, HeroSection, StepsSection } from "~/components/home";

const TestimonialsSection = lazy(
  () => import("~/components/home/Testimonials")
);

const LandingPage = () => {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <StepsSection />

      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
    </>
  );
};

export default LandingPage;
