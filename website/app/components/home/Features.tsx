import { Bolt, Hub, Inventory2, Search } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";

const features = [
  {
    icon: <Bolt sx={{ fontSize: 40 }} />,
    title: "ساخت خودکار و سریع",
    description:
      "تولید توضیحات، مشخصات و تصاویر محصول در کمتر از چند ثانیه با هوش مصنوعی پیشرفته.",
    bgColor: "#EFF6FF",
    color: "#0EA5E9",
  },
  {
    icon: <Search sx={{ fontSize: 40, color: "#16A34A" }} />,
    title: "بهینه‌سازی سئو",
    description:
      "تولید محتوای کاملاً سئو شده بر اساس جدیدترین الگوریتم‌های گوگل برای افزایش ورودی ارگانیک.",
    bgColor: "#F0FDF4",
    color: "#16A34A",
  },
  {
    icon: <Hub sx={{ fontSize: 40, color: "#A855F7" }} />,
    title: "سورس‌های مختلف",
    description:
      "امکان ایمپورت داده از فایل‌های CSV، لینک وب‌سایت‌های دیگر و یا اتصال مستقیم API.",
    bgColor: "#FAF5FF",
    color: "#A855F7",
  },
  {
    icon: <Inventory2 sx={{ fontSize: 40, color: "#EA580C" }} />,
    title: "مدیریت انبوه",
    description:
      "ساخت و ویرایش هزاران محصول به صورت همزمان با ابزارهای مدیریت گروهی قدرتمند.",
    bgColor: "#FFF7ED",
    color: "#EA580C",
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              fontWeight: "bold",
              mb: 2,
              color: "#1E293B",
            }}
          >
            ویژگی‌های کلیدی پلتفرم
          </Typography>
          <Typography
            sx={{
              color: "#64748B",
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            ما تمام ابزارهای لازم برای ساخت، مدیریت و رشد فروشگاه اینترنتی شما
            را در یک پلتفرم یکپارچه جمع کرده‌ایم.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card
                sx={{
                  background: "white",
                  border: "1px solid #F3F4F6",
                  borderRadius: "1rem",
                  p: 3,
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    background: feature.bgColor,
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: feature.color,
                    mb: 3,
                    transition: "transform 0.3s ease",
                    "$card:hover &": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#1E293B",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    lineHeight: 1.6,
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
