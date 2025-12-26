import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
  TextField,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AutoAwesome,
  Bolt,
  Search,
  Hub,
  Inventory2,
  PlayCircleFilled,
  ArrowBack,
  Menu,
  LocationCity,
  Phone,
  Email,
  Telegram,
  CameraAlt,
  AlternateEmail,
  Star,
} from "@mui/icons-material";
import { useRef } from "react";

export default function LandingPage() {
  ``;
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

  const steps = [
    {
      number: "۱",
      title: "وارد کردن اطلاعات",
      description: "نام محصول یا لینک مرجع را وارد کنید.",
      borderColor: "#0EA5E9",
    },
    {
      number: "۲",
      title: "پردازش هوشمند",
      description: "هوش مصنوعی محتوا را تولید می‌کند.",
      borderColor: "#14B8A6",
    },
    {
      number: "۳",
      title: "بهینه‌سازی سئو",
      description: "کلمات کلیدی و متاتگ‌ها تنظیم می‌شوند.",
      borderColor: "#A855F7",
    },
    {
      number: "۴",
      title: "خروجی نهایی",
      description: "محصول آماده انتشار در دیجی‌کالا یا سایت شماست.",
      borderColor: "#22C55E",
    },
  ];

  const testimonials = [
    {
      name: "رضا محمدی",
      rating: 5,
      comment:
        "سرعت کار من رو ۱۰ برابر کرده. قبلا برای هر محصول نیم ساعت وقت میذاشتم، الان تو چند ثانیه تمومه.",
      avatar: "https://via.placeholder.com/48",
    },
    {
      name: "سارا کریمی",
      rating: 4.5,
      comment:
        "بخش سئو فوق‌العاده‌ست. ورودی گوگل سایتم بعد از استفاده از این ابزار رشد چشمگیری داشته.",
      avatar: "https://via.placeholder.com/48",
    },
    {
      name: "علی حسینی",
      rating: 5,
      comment:
        "برای مدیریت فروشگاه‌های بزرگ عالیه. ایمپورت اکسل خیلی دقیق کار میکنه و خطا نداره.",
      avatar: "https://via.placeholder.com/48",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 16, md: 20 },
          pb: { xs: 10, md: 14 },
          overflow: "hidden",
          position: "relative",
          background: "#F8FAFC",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#93C5FD",
            mixBlendMode: "multiply",
            filter: "blur(64px)",
            opacity: 0.3,
            animation: "blob 7s infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: "160px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#67E8F9",
            mixBlendMode: "multiply",
            filter: "blur(64px)",
            opacity: 0.3,
            animation: "blob 7s infinite",
            animationDelay: "2s",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box sx={{ textAlign: { xs: "center", lg: "right" } }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: "9999px",
                    background: "#EFF6FF",
                    color: "#0EA5E9",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    border: "1px solid #BFDBFE",
                    mb: 3,
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 18 }} />
                  <span>نسل جدید مدیریت محصولات</span>
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2.25rem", md: "3.75rem" },
                    fontWeight: "900",
                    mb: 3,
                    lineHeight: 1.2,
                    color: "#1E293B",
                  }}
                >
                  ساخت و مدیریت محصول <br />
                  با قدرت{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(to left, #0ea5e9, #2563eb)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    هوش مصنوعی
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.125rem",
                    color: "#64748B",
                    mb: 4,
                    lineHeight: 1.6,
                    maxWidth: "600px",
                  }}
                >
                  پلتفرمی هوشمند برای ساخت خودکار محصولات، بهینه‌سازی سئو و
                  مدیریت یکپارچه فروشگاه شما. بدون نیاز به دانش فنی، فروش خود را
                  متحول کنید.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ justifyContent: { xs: "center", lg: "flex-start" } }}
                >
                  <Button
                    variant="contained"
                    endIcon={<ArrowBack />}
                    sx={{
                      background: "#0EA5E9",
                      color: "white",
                      textTransform: "none",
                      fontSize: "1.125rem",
                      fontWeight: "bold",
                      py: 1.5,
                      px: 4,
                      borderRadius: "0.75rem",
                      boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.3)",
                      "&:hover": {
                        background: "#0284C7",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    شروع ساخت محصول
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<PlayCircleFilled />}
                    sx={{
                      color: "#1E293B",
                      borderColor: "#E2E8F0",
                      background: "#FFFFFF",
                      textTransform: "none",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      py: 1.5,
                      px: 4,
                      borderRadius: "0.75rem",
                      "&:hover": {
                        background: "#F1F5F9",
                      },
                    }}
                  >
                    دموی پلتفرم
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* Right side illustration */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, #0EA5E9, #14B8A6)",
                    borderRadius: "50%",
                    filter: "blur(64px)",
                    opacity: 0.2,
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "1.5rem",
                    p: 4,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                  }}
                >
                  <Box sx={{ mb: 3, display: "flex", gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#FCA5A5",
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#FBBF24",
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#86EFAC",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: "0.75rem",
                      display: "block",
                      mb: 4,
                    }}
                  >
                    AI Processing...
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 6,
                    }}
                  >
                    <Box
                      component="img"
                      src="/Hoshmarket.png"
                      alt="AI Platform"
                      sx={{
                        width: 192,
                        height: 192,
                        objectFit: "contain",
                        animation:
                          "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                      }}
                    />
                    <Box
                      sx={{
                        mt: 6,
                        background: "white",
                        borderRadius: "0.5rem",
                        p: 2,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        maxWidth: "320px",
                        border: "1px solid #F3F4F6",
                      }}
                    >
                      <Box
                        sx={{
                          height: 10,
                          background: "#E5E7EB",
                          borderRadius: "9999px",
                          mb: 2,
                          width: "192px",
                        }}
                      />
                      <Box
                        sx={{
                          height: 8,
                          background: "#E5E7EB",
                          borderRadius: "9999px",
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          height: 8,
                          background: "#E5E7EB",
                          borderRadius: "9999px",
                          mb: 2,
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: -2 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: "#3B82F6",
                              border: "2px solid white",
                              ml: -3,
                            }}
                          />
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: "#10B981",
                              border: "2px solid white",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#0EA5E9",
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                          }}
                        >
                          100% بهینه شده
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
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

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 10, md: 14 }, background: "#F8FAFC" }}>
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
              چگونه کار می‌کند؟
            </Typography>
            <Typography sx={{ color: "#64748B" }}>
              فقط در ۴ مرحله ساده، محصول خود را آماده فروش کنید
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "white",
                      border: `4px solid ${step.borderColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: step.borderColor,
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "#1E293B",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      px: 1,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 10, md: 14 }, background: "#F0F9FF" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              fontWeight: "bold",
              textAlign: "center",
              mb: 8,
              color: "#1E293B",
            }}
          >
            نظرات کاربران
          </Typography>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    background: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "1rem",
                    p: 4,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "#1E293B",
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        size="small"
                        sx={{
                          color: "#FBBF24",
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      lineHeight: 1.6,
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
