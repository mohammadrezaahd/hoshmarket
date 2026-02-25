import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CountdownTimer from "./CountdownTimer";

const HeroSection: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const rotateDeg = Math.max(-15, -5 - offsetY * 0.01);
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 12, md: 18 },
        backgroundColor: "#4d0f9eff",
        overflow: "hidden",
      }}
    >
      {/* 🔥 Fire Parallax Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left:"10%",
            width: "100%",
            height: "200%",
            display: "flex",
            justifyContent: "space-around",
            fontSize: { xs: 240, md: 240 },
            opacity: 0.6,
            filter: "blur(10px)",
            transform: `translateY(${offsetY * 0.55}px)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <Box>🎈</Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left:"10%",
            width: "100%",
            height: "200%",
            display: "flex",
            justifyContent: "space-around",
            fontSize: { xs: 240, md: 240 },
            opacity: 0.7,
            filter: "blur(10px)",
            transform: `translateY(${offsetY * 0.25}px) rotate(-45deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          <Box>🔥</Box>
        </Box>
      </Box>

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

      <Container
        maxWidth="lg"
        sx={{ position: "relative", textAlign: "center", zIndex: 2 }}
      >
        {/* Logos Side by Side */}
        <Box
          sx={{
            mb: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box
            component="img"
            src="https://hosh-media.hoshmarket.com/digikala_white_logo.png"
            alt="Digikala Logo"
            sx={{
              height: { xs: 100, md: 100 },
              animation: "float 4s ease-in-out infinite",
              "@keyframes float": {
                "0%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-8px)" },
                "100%": { transform: "translateY(0px)" },
              },
            }}
          />

          <Box
            component="img"
            src="https://hosh-media.hoshmarket.com/Hoshmarket-icon2.png"
            alt="Hoshmarket Logo"
            sx={{
              height: { xs: 100, md: 100 },
              animation: "float2 4s ease-in-out infinite",
              "@keyframes float2": {
                "0%": { transform: "translateY(-6px)" },
                "50%": { transform: "translateY(6px)" },
                "100%": { transform: "translateY(-6px)" },
              },
            }}
          />
        </Box>

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
          همزمان با این رویداد،{" "}
          <Box
            component="span"
            sx={{ color: "#ffffff", fontWeight: 700 }}
          >
            هوش مارکت
          </Box>{" "}
          با نسل جدید هوش مصنوعی{" "}
          <Box
            component="span"
            sx={{ color: "#ffffff", fontWeight: 700 }}
          >
            لانچ شد
          </Box>
          .
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
              fontSize:18,
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