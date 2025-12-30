import { Help } from "@mui/icons-material";
import { Box, Button, Card, Typography, useTheme } from "@mui/material";

const FAQSection = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "grey.50",
        borderRadius: 6,
        p: { xs: 4, md: 6 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 4,
          background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}, transparent)`,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        سوالات متداول
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.mode === "dark" ? "grey.300" : "grey.600",
          maxWidth: 800,
          mx: "auto",
          mb: 4,
          lineHeight: 1.8,
        }}
      >
        شاید پاسخ سوال شما در بخش سوالات متداول موجود باشد. قبل از تماس، نگاهی
        به این بخش بیندازید تا سریع‌تر به نتیجه برسید.
      </Typography>
      <Button
        variant="outlined"
        size="large"
        startIcon={<Help />}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          fontWeight: 700,
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.2)"
              : "grey.300",
          color: theme.palette.mode === "dark" ? "#fff" : "grey.900",
          bgcolor:
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
          transition: "all 0.3s",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "grey.50",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        مشاهده سوالات متداول
      </Button>
    </Card>
  );
};

export default FAQSection;
