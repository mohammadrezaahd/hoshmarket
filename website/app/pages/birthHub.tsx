import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/birthHub/HeroSection";
import ServiceHubBenefits from "../components/birthHub/ServiceHubBenefits";
import FinalCTA from "../components/birthHub/FinalCTA";
export const meta = () => {
  return [
    { title: "هوش مارکت | یک سالگی سرویس‌هاب دیجی‌کالا" },
    { name: "description", content: "هوش مارکت" },
  ];
};
const BirthCampaignLanding: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#0B0F19", color: "white", overflow: "hidden" }}>
      <HeroSection />
      <ServiceHubBenefits />
      <FinalCTA />
    </Box>
  );
};

export default BirthCampaignLanding;