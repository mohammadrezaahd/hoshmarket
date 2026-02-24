import React from "react";
import { Box, Container, Typography } from "@mui/material";

const WhyHoshMarket: React.FC = () => {
  return (
    <Box sx={{ py: 14, background: "#111827" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} mb={4}>
          هوش مارکت — نسل جدید انتشار و بهینه‌سازی محصول
        </Typography>

        <Typography sx={{ opacity: 0.8, lineHeight: 2 }}>
          ما با استفاده از هوش مصنوعی نسل جدید، فرآیند تولید محتوا،
          بهینه‌سازی عنوان، توضیحات، قیمت‌گذاری و انتشار محصول در دیجی‌کالا
          را کاملاً هوشمند کرده‌ایم.
          <br /><br />
          خروجی دقیق‌تر، سریع‌تر و حرفه‌ای‌تر — با تمرکز مستقیم بر افزایش فروش.
        </Typography>
      </Container>
    </Box>
  );
};

export default WhyHoshMarket;