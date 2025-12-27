import {
  CTASection,
  DetailsSection,
  HeroSection,
  StatsSection,
  TeamSection,
} from "~/components/about";

export const meta = () => {
  return [
    { title: "درباره ما - Hoshmarket" },
    { name: "description", content: "درباره Hoshmarket بیشتر بدانید" },
  ];
};

export default function About() {
  return (
    <>
      <HeroSection />

      <StatsSection />

      <DetailsSection />

      <TeamSection />

      <CTASection />
    </>
  );
}
