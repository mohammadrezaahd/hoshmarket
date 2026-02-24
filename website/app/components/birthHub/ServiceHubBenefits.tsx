import { Box, Container, Grid, Typography } from "@mui/material";

/* --- Luxury minimal SVG --- */
const LuxuryWave = () => (
  <Box
    sx={{
      position: "absolute",
      top: "-60px",
      right: "-80px",
      width: 420,
      opacity: 0.08,
      pointerEvents: "none",
    }}
  >
    <svg viewBox="0 0 400 200" fill="none">
      <path
        d="M0 120 C 100 40, 300 40, 400 120"
        stroke="#0F172A"
        strokeWidth="1"
      />
      <path
        d="M0 150 C 120 70, 280 70, 400 150"
        stroke="#0F172A"
        strokeWidth="1"
      />
    </svg>
  </Box>
);

const ExclusiveAdminsSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 5 },
        background: "linear-gradient(180deg, #4d0f9eff, #0B0F19)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryWave />

      <Container maxWidth="lg">
        <Box
            sx={{
            maxWidth: 720,
            mx: "auto",        // ← وسط افقی کل بلاک
            textAlign: "center", // ← سنتر تمام متن‌ها
            mb: 8,
            }}
        >
            <Typography
            sx={{
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#bcbdbeff",
                mb: 3,
            }}
            >
            Digikala Service Hub
            </Typography>

            <Typography
            variant="h3"
            sx={{
                fontSize: { xs: 32, md: 40 },
                fontWeight: 600,
                letterSpacing: "-0.015em",
                mb: 2,
                background: "linear-gradient(120deg, #a996eeff, #ffffff, #973cd4ff)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientMove 1.5s ease-in-out infinite",
                "@keyframes gradientMove": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
                },
            }}
            >
            سرویس هاب برای کسب‌وکارهای هوشمند
            </Typography>

            <Typography
            sx={{
                fontSize: { xs: 28, md: 32 },
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "#c5c5c7ff",
                mb: 4,
            }}
            >
            پیشرفت شما وابسته به انتخاب شماست
            </Typography>

            <Typography
            sx={{
                fontSize: 16,
                color: "#bebebeff",
                lineHeight: 1.9,
                maxWidth: 560,
                mx: "auto",  // ← سنتر پاراگراف محدود
                mb: 3,
            }}
            >
            سرویس‌هاب زیرساخت رشد حرفه‌ای فروشندگان دیجی‌کالاست.
            فروشندگانی که این مسیر را انتخاب می‌کنند،
            سریع‌تر دیده می‌شوندو سریع‌تر رشد می‌کنند
            </Typography>

            <Typography
            sx={{
                fontSize: 16,
                color: "#ffffff",
                lineHeight: 1.9,
                maxWidth: 560,
                mx: "auto",
            }}
            >
        هوش مارکت این فرآیند را با هوش مصنوعی نسل جدید
        در انتشار، بهینه‌سازی و ساخت محصول تسریع می‌کند
        تا مسیر رشد شما کوتاه‌تر و حرفه‌ای‌تر شود.
            </Typography>
        </Box>
        </Container>
    </Box>
  );
};

export default ExclusiveAdminsSection;
