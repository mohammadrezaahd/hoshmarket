import { SupportAgent } from "@mui/icons-material";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        textAlign: "center",
        py: { xs: 6, md: 10 },
      }}
    >
      <Chip
        icon={<SupportAgent />}
        label="پشتیبانی ۲۴ ساعته"
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          fontWeight: "bold",
          fontSize: "0.875rem",
          py: 2.5,
          px: 2,
          "& .MuiChip-icon": {
            ml: 1,
            mr: 0,
            color: theme.palette.primary.main,
          },
        }}
      />

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", md: "3.5rem" },
          fontWeight: 900,
          lineHeight: 1.2,
          letterSpacing: "-0.033em",
        }}
      >
        راه‌های{" "}
        <Box
          component="span"
          sx={{
            position: "relative",
            display: "inline-block",
            color: theme.palette.primary.main,
          }}
        >
          ارتباطی
          <Box
            component="svg"
            sx={{
              position: "absolute",
              width: "100%",
              height: 12,
              bottom: -4,
              left: 0,
              color: alpha(theme.palette.primary.main, 0.2),
            }}
            preserveAspectRatio="none"
            viewBox="0 0 100 10"
          >
            <path
              d="M0 5 Q 50 10 100 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
            />
          </Box>
        </Box>{" "}
        با ما
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", md: "1.25rem" },
          color: theme.palette.mode === "dark" ? "grey.400" : "#4c599a",
          lineHeight: 1.8,
          maxWidth: 900,
        }}
      >
        تیم ما آماده شنیدن نظرات، پیشنهادات و پاسخگویی به سوالات شماست. ما اینجا
        هستیم تا تجربه شما را بهبود ببخشیم و به شما در مسیر استفاده از هوش
        مصنوعی کمک کنیم.
      </Typography>
    </Box>
  );
};

export default HeroSection;
