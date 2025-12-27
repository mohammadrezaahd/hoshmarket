import { Box, Button, Container, Paper, Typography } from "@mui/material";

const CTASection = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: "#f1f5f9",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            background: "linear-gradient(135deg, #1337ec 0%, #0b25a7 100%)",
            borderRadius: 3,
            p: { xs: 4, md: 8 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          {/* Background blur effect */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
              }}
            >
              آماده‌اید آینده را بسازید؟
            </Typography>

            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1.125rem",
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              به صدها شرکتی بپیوندید که از پلتفرم ما برای تبدیل داده‌ها به
              تصمیمات هوشمند استفاده می‌کنند.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#1337ec",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                }}
              >
                شروع نسخه آزمایشی
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "rgba(11, 37, 167, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                تماس با فروش
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTASection;
