import { Container, Grid, useTheme } from "@mui/material";
import {
  FAQSection,
  HeroSection,
  InfoSection,
  MapSection,
  SocialSection,
} from "~/components/contact";

export const meta = () => {
  return [
    { title: "تماس با ما - Hoshmarket" },
    { name: "description", content: "با ما تماس بگیرید" },
  ];
};

export default function Contact() {
  const theme = useTheme();

  return (
    <Container
      sx={{ position: "relative", zIndex: 1, pt: { xs: 6, md: 10 }, pb: 8 }}
    >
      <HeroSection />

      <InfoSection />

      {/* Map & Social Media Section */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <MapSection />
        <SocialSection />
      </Grid>

      <FAQSection />
    </Container>
  );
}
