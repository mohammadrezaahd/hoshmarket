import {
  AutoAwesome,
  Layers,
  SwapHoriz,
  FlashOn,
  SupportAgent
} from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";

const features = [
  {
    icon: <Layers sx={{ fontSize: 36 }} />,
    title: "ساخت محصول انبوه",
    description:
      "با چند کلیک، صدها یا هزاران محصول بسازید. قالب‌های هوشمند ایجاد کنید، آن‌ها را با هم ترکیب کنید و بدون تکرار کار دستی، محصولات جدید را به‌صورت حرفه‌ای تولید نمایید.",
    bgColor: "#EFF6FF",
    color: "#2563EB",
  },
  {
    icon: <SwapHoriz sx={{ fontSize: 36 }} />,
    title: "انتقال محصول",
    description:
      "محصولات خود را از سایت‌ها، فایل‌ها یا سیستم‌های دیگر ایمپورت کنید. هوش مارکت داده‌ها را استانداردسازی می‌کند و مستقیماً برای انتشار در دیجی‌کالا آماده می‌سازد.",
    bgColor: "#F0FDF4",
    color: "#16A34A",
  },
  {
    icon: <FlashOn sx={{ fontSize: 36 }} />,
    title: "ساخت سریع محصول",
    description:
      "برای ترندها و محصولاتی که اطلاعات کمی از آن‌ها دارید. فقط داده‌های اولیه را وارد کنید، هوشیار (AI) باقی مسیر را می‌سازد و محصول نهایی را آماده انتشار می‌کند.",
    bgColor: "#FFF7ED",
    color: "#EA580C",
  },
  {
    icon: <SupportAgent sx={{ fontSize: 36 }} />,
    title: "ادمین اختصاصی",
    description:
      "کارهای خود را به هوش مارکت بسپارید. ادمین اختصاصی، مطابق دستورالعمل و هدف شما، ساخت و مدیریت محصولات را انجام می‌دهد.",
    bgColor: "#F0F9FF",
    color: "#0284C7",
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              fontWeight: 800,
              mb: 2,
              color: "#0F172A",
            }}
          >
            ابزار درست در اختیار شماست
          </Typography>
          <Typography
            sx={{
              color: "#64748B",
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            ابزارهایی جدید، روش‌هایی متفاوت و خروجی‌هایی که فقط اینجا می‌بینید.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "1.25rem",
                  p: 3,
                  border: "1px solid #F1F5F9",
                  transition: "all 0.35s ease",
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow:
                      "0 25px 30px -10px rgba(15, 23, 42, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "auto",
                    height: 56,
                    borderRadius: "0.75rem",
                    backgroundColor: feature.bgColor,
                    color: feature.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h4"
                  sx={{

                    fontWeight: 700,
                    mb: 1.5,
                    color: "#0F172A",
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
