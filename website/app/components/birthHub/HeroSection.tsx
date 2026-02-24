import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CountdownTimer from "./CountdownTimer";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 12, md: 18 },
        backgroundColor: "#4d0f9eff",
        overflow: "hidden",
      }}
    >
      {/* Gradient Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(109,40,217,0.5) 0%, rgba(10,15,28,0) 70%)",
          filter: "blur(120px)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            color: "#F8FAFC",
            mb: 3,
            letterSpacing: -1,
          }}
        >
          جشن یک‌سالگی سرویس‌هاب دیجی‌کالا
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#d0b8fcff",
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          همزمان با این رویداد، هوش مارکت با نسل جدید هوش مصنوعی
         لانچ شد.
        </Typography>

        <Box sx={{ mt: 6 }}>
          <CountdownTimer />
        </Box>

        <Stack direction="row" justifyContent="center" sx={{ mt: 6 }}>
          <Button
            variant="contained"
            href="https://pro.hoshmarket.com/pricing?utm_source=birth_campaign&utm_medium=final_cta&utm_campaign=birth_campaign"
            sx={{
              px: 6,
              py: 2,
              fontWeight: 700,
              borderRadius: 3,
              background: "linear-gradient(135deg,#6D28D9,#9333EA)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.27)",
            }}
          >
            دریافت تخفیف ویژه
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;