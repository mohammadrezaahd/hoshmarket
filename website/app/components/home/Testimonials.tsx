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
        py: { xs: 18, md: 24 },
        background: "linear-gradient(180deg, #FFFFFF, #F8FAFC)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LuxuryWave />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ maxWidth: 720, mb: 14 }}>
          <Typography
            sx={{
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#64748B",
              mb: 3,
            }}
          >
            Exclusive service
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 32, md: 40 },
              fontWeight: 600,
              letterSpacing: "-0.015em",
              mb: 1,

              /* Gradient text */
              background: "linear-gradient(120deg, #312E81, #2563EB, #312E81)",

              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",

              /* Animation */
              animation: "gradientMove 1.5s ease-in-out infinite",

              "@keyframes gradientMove": {
                "0%": {
                  backgroundPosition: "0% 50%",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                },
                "100%": {
                  backgroundPosition: "0% 50%",
                },
              },
            }}
          >
            ادمین اختصاصی،
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 32, md: 40 },
              fontWeight: 400,
              letterSpacing: "-0.015em",
              color: "#020617",
              mb: 4,
            }}
          >
            برای زمانی که کیفیت مهم است
          </Typography>



          <Typography
            sx={{
              fontSize: 16,
              color: "#475569",
              lineHeight: 1.9,
              maxWidth: 560,
            }}
          >
            این قابلیت برای کسب‌وکارهایی طراحی شده که
            ساخت محصول را به تیم، تجربه و فرآیند می‌سپارند;
            نه به شانس.
          </Typography>
        </Box>

        {/* Glass Cards */}
        <Grid container spacing={6}>
          {[
            {
              title: "تصمیم‌محور",
              text: "محصول بر اساس منطق بازار و مدل فروش شما ساخته می‌شود.",
            },
            {
              title: "سریع اما کنترل‌شده",
              text: "اتوماسیون سرعت را می‌آورد، ادمین کیفیت را حفظ می‌کند.",
            },
            {
              title: "مقیاس‌پذیر",
              text: "فرآیندی پایدار برای زمانی که تعداد محصولات بالا می‌رود.",
            },
          ].map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  p: 4.5,
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow:
                    "0 20px 40px rgba(15,23,42,0.05)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#020617",
                    mb: 1.5,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14.5,
                    color: "#475569",
                    lineHeight: 1.9,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Signature */}
        <Box sx={{ mt: 16 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#94A3B8",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Managed with precision
          </Typography>
        </Box>
        {/* Call CTA */}
        <Box
          sx={{
            mt: 14,
            p: 4,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(15,23,42,0.08)",
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              color: "#475569",
              lineHeight: 1.9,
            }}
          >
            برای فعال‌سازی ادمین اختصاصی و بررسی نیاز کسب‌وکار شما تماس بگیرید
          </Typography>

          <Box
            component="a"
            href="tel:02182803484"
            sx={{
              direction: "ltr",
              textDecoration: "none",
              px: 4,
              py: 1.8,
              borderRadius: "999px",
              background: "#020617",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "#0F172A",
                transform: "translateY(-1px)",
              },
            }}
          >
            021 - 8280&nbsp;&nbsp;3484
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default ExclusiveAdminsSection;
