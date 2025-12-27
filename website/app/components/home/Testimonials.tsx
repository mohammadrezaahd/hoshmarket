import { Box, Container, Rating, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TestimonialsSection = () => {
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
    {
      name: "فاطمه احمدی",
      rating: 5,
      comment:
        "بهترین ابزار برای کسب‌وکار آنلاین. مشتریان من خیلی بیشتر راضی‌اند از سرعت و کارایی.",
      avatar: "https://via.placeholder.com/48",
    },
    {
      name: "محمد علی رضایی",
      rating: 4.5,
      comment:
        "تیم پشتیبانی فوق‌العاده باشه. هر سوالی داشتم فوری پاسخ دادن.",
      avatar: "https://via.placeholder.com/48",
    },
    {
      name: "نیلوفر نوری",
      rating: 5,
      comment:
        "طراحی خیلی حرفه‌ای و کاربر‌پسند. هم من و هم کاربرانم خیلی راضی‌ایم.",
      avatar: "https://via.placeholder.com/48",
    },
    {
      name: "حسن شریفی",
      rating: 4.5,
      comment:
        "قیمت خیلی رقابتی هست نسبت به امکانات. بدون شک بهترین انتخاب برای کسب‌وکار.",
      avatar: "https://via.placeholder.com/48",
    },
    {
      name: "زهرا یزدانی",
      rating: 5,
      comment:
        "مشتریان جدید رو خیلی راحت‌تر پیدا میکنم. بازارکردن خیلی ساده شده.",
      avatar: "https://via.placeholder.com/48",
    },
  ];

  return (
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

        <Box sx={{ width: "100%", px: { xs: 2, md: 0 } }}>
          <Swiper
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={20}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1.4,
                spaceBetween: 16,
                centeredSlides: true,
                initialSlide: 0,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
              },
            }}
            style={{
              paddingBottom: "20px",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                style={{ height: "auto" }}
              >
                {({ isActive, isPrev, isNext }) => (
                  <Box
                    sx={{
                      background: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "1rem",
                      p: 4,
                      height: "100%",
                      transition: "all 0.3s ease",
                      transform: isActive 
                        ? "scale(1)" 
                        : "scale(0.85)",
                      opacity: isActive ? 1 : 0.7,
                      boxShadow: isActive
                        ? "0 10px 40px rgba(0, 0, 0, 0.1)"
                        : "0 4px 12px rgba(0, 0, 0, 0.05)",
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
                            fontWeight: isActive ? "bold" : "600",
                            color: "#1E293B",
                            fontSize: isActive ? "1rem" : "0.95rem",
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
                        fontSize: isActive ? "0.95rem" : "0.9rem",
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                  </Box>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
