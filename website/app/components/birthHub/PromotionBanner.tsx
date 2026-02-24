import React from "react";
import { Box, Container, Typography } from "@mui/material";

const PromotionBanner: React.FC = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg,#6C5CE7,#A29BFE)",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={800} mb={3}>
          تخفیف ویژه جشن تولد — تا 50٪
        </Typography>

        <Typography>
          به مناسبت یک‌سالگی سرویس‌هاب و لانچ رسمی هوش مارکت،
          تمام سرویس‌ها با حداقل 20٪ و حداکثر 50٪ تخفیف ارائه می‌شوند.
          این فرصت فقط ۱۴ روز فعال است.
        </Typography>
      </Container>
    </Box>
  );
};

export default PromotionBanner;