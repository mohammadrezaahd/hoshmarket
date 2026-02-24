import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

const FinalCTA: React.FC = () => {
  return (
    <Box sx={{ py: 14, textAlign: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h4" fontWeight={800} mb={4}>
          آماده‌ای فروش خود را چند برابر کنی؟
        </Typography>

        <Button
          variant="contained"
          size="large"
          href="https://pro.hoshmarket.com?utm_source=birth_campaign&utm_medium=final_cta&utm_campaign=birth_campaign"
          sx={{
            px: 6,
            py: 1.8,
            fontWeight: 700,
            background: "linear-gradient(135deg,#6C5CE0,#B090F0)",
          }}
        >
          همین حالا ثبت‌نام کن
        </Button>
      </Container>
    </Box>
  );
};

export default FinalCTA;