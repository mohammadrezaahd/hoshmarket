import { Email, LocationOn, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const InfoSection = () => {
  const theme = useTheme();

  const contactCards = [
    {
      icon: <Phone sx={{ fontSize: 30 }} />,
      title: "تماس تلفنی",
      description: "برای مشاوره فوری با کارشناسان ما تماس بگیرید.",
      value: "+98 21 1234 5678",
      href: "tel:+982112345678",
      detail: "شنبه تا چهارشنبه، ۸ صبح تا ۵ عصر",
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      icon: <Email sx={{ fontSize: 30 }} />,
      title: "پست الکترونیک",
      description: "برای همکاری‌های سازمانی و پشتیبانی فنی ایمیل بزنید.",
      value: "contact@ai-platform.ir",
      href: "mailto:contact@ai-platform.ir",
      detail: "میانگین زمان پاسخگویی: کمتر از ۲ ساعت",
      color: "#9333ea",
      bgColor: alpha("#9333ea", 0.1),
    },
    {
      icon: <LocationOn sx={{ fontSize: 30 }} />,
      title: "مراجعه حضوری",
      description: "مشتاق دیدار شما در دفتر مرکزی شرکت هستیم.",
      value: "تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱، برج فناوری هوشمند",
      href: "#",
      detail: "مسیر یابی در نقشه",
      color: "#10b981",
      bgColor: alpha("#10b981", 0.1),
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      {contactCards.map((card, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={index}>
          <Card
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "100%",
              borderRadius: 4,
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "#e7e9f3"
              }`,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "none"
                  : "0 10px 40px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 20px 50px ${alpha(card.color, 0.15)}`,
              },
            }}
          >
            {/* Background Icon */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 2,
                opacity: 0.1,
                color: card.color,
                fontSize: "5rem",
                transition: "opacity 0.3s",
                ".MuiCard-root:hover &": {
                  opacity: 0.2,
                },
              }}
            >
              {card.icon}
            </Box>

            <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: card.bgColor,
                    color: card.color,
                    borderRadius: 3,
                    transition: "transform 0.3s",
                    ".MuiCard-root:hover &": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {card.icon}
                </Avatar>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "grey.400" : "grey.600",
                      mb: 2,
                    }}
                  >
                    {card.description}
                  </Typography>
                  <Link
                    href={card.href}
                    underline="hover"
                    sx={{
                      fontSize: index === 2 ? "1rem" : "1.5rem",
                      fontWeight: 900,
                      color: card.color,
                      display: "block",
                      mb: 1,
                      wordBreak: "break-word",
                    }}
                  >
                    {card.value}
                  </Link>
                  <Typography variant="caption" sx={{ color: "grey.500" }}>
                    {card.detail}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoSection;
