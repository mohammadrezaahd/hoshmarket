import {
  Psychology,
  AutoFixHigh,
  Insights,
} from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";

const aiFeatures = [
  {
    icon: <Psychology />,
    title: "تحلیل قبل از ساخت",
    description:
      "هوشیار قبل از تولید، داده‌ها را می‌فهمد. ساختار، دسته‌بندی و الزامات دیجی‌کالا را بررسی می‌کند؛ قبل از اینکه چیزی ساخته شود.",
  },
  {
    icon: <AutoFixHigh />,
    title: "تکمیل هوشمند داده‌های ناقص",
    description:
      "اطلاعات کم دارید؟ هوشیار با ترکیب دانش محصول، ترند بازار و استانداردها، خلاها را پر می‌کند.",
  },
  {
    icon: <Insights />,
    title: "تصمیم‌سازی در لحظه",
    description:
      "در هر مرحله، هوشیار پیشنهاد می‌دهد؛ نه به‌صورت تصادفی، بلکه بر اساس الگوهایی که از هزاران محصول یاد گرفته.",
  },
];

const HoshyarSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 12, md: 18 },
        background:
          "radial-gradient(ellipse at top, #0F172A 0%, #020617 70%)",
        color: "#E5E7EB",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              letterSpacing: "0.25em",
              color: "#38BDF8",
              mb: 2,
            }}
          >
            HOSHYAR AI
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2rem", md: "2.75rem" },
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            هوش مصنوعی‌ای که فقط تولید نمی‌کند
          </Typography>

          <Typography
            sx={{
              maxWidth: 720,
              mx: "auto",
              color: "#94A3B8",
              lineHeight: 1.9,
            }}
          >
            هوشیار بخشی از رابط کاربری نیست.
            <br />
            یک لایه تصمیم‌گیری است که پشت تمام ابزارهای هوش مارکت کار می‌کند.
          </Typography>
        </Box>

        {/* AI Capabilities */}
        <Grid container spacing={6}>
          {aiFeatures.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  height: "100%",
                  p: 4,
                  borderRadius: "1.5rem",
                  background:
                    "linear-gradient(180deg, rgba(30,41,59,0.7), rgba(2,6,23,0.9))",
                  border: "1px solid rgba(148,163,184,0.15)",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#38BDF8",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    color: "#38BDF8",
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(56,189,248,0.05))",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#E5E7EB",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: "#94A3B8",
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Footer Line */}
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography
            sx={{
              color: "#64748B",
              fontSize: "0.9rem",
            }}
          >
            هوشیار همیشه فعال است؛ حتی وقتی متوجه حضورش نیستید.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HoshyarSection;
