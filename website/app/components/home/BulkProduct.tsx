import { Layers } from "@mui/icons-material";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";

/* --- Simple decorative SVG --- */
const SoftFlow = () => (
  <Box
    sx={{
      position: "absolute",
      top: "20%",
      left: "-80px",
      width: 260,
      opacity: 0.15,
      animation: "float 14s ease-in-out infinite",
      "@keyframes float": {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(18px)" },
        "100%": { transform: "translateY(0px)" },
      },
    }}
  >
    <svg viewBox="0 0 300 300" fill="none">
      <path
        d="M30 150 C 90 80, 210 80, 270 150"
        stroke="#0F172A"
        strokeWidth="1"
      />
      <path
        d="M30 170 C 90 100, 210 100, 270 170"
        stroke="#0F172A"
        strokeWidth="1"
      />
    </svg>
  </Box>
);

const BulkProductSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 14, md: 20 },
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* soft visual soul */}
      <SoftFlow />

      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 12 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              mx: "auto",
              mb: 4,
              borderRadius: "14px",
              backgroundColor: "#F1F5F9",
              color: "#0F172A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layers sx={{ fontSize: 30 }} />
          </Box>

          <Typography
            sx={{
              fontSize: { xs: 30, md: 38 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#020617",
              mb: 3,
            }}
          >
            ساخت انبوه محصولات
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: 16,
              lineHeight: 1.9,
              maxWidth: 540,
              mx: "auto",
            }}
          >
            بعضی ابزارها برای سرعت ساخته می‌شوند.
          </Typography>
        </Box>

        {/* Body */}
        <Grid container spacing={7}>
          <Grid size={{ xs: 12 }}>
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 600,
                color: "#0F172A",
                mb: 2,
              }}
            >
              اینجا تولید، یک تصمیم است
            </Typography>

            <Typography
              sx={{
                color: "#475569",
                lineHeight: 1.95,
                fontSize: 15.5,
              }}
            >
              در هوش مارکت، شما محصول نمی‌سازید؛  
              شما <strong>منطق ساخت</strong> را طراحی می‌کنید.  
              قالب‌ها تعریف می‌شوند، ترکیب می‌شوند  
              و سیستم بر اساس آن‌ها محصول تولید می‌کند.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 600,
                color: "#0F172A",
                mb: 2,
              }}
            >
              هیچ چیز کورکورانه منتشر نمی‌شود
            </Typography>

            <Typography
              sx={{
                color: "#475569",
                lineHeight: 1.95,
                fontSize: 15.5,
              }}
            >
              انبوه به معنی بی‌دقتی نیست.  
              خروجی را می‌بینید، بررسی می‌کنید  
              و فقط وقتی مطمئن شدید، اجازه انتشار می‌دهید.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider />
          </Grid>
        </Grid>

        {/* Closing soul line */}
        <Box sx={{ mt: 14, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: 14,
              color: "#94A3B8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Think once. Build many
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BulkProductSection;
