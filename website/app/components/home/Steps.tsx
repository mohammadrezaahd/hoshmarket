import { Box, Container, Grid, Typography } from "@mui/material";

const steps = [
  {
    number: "۱",
    title: "وارد کردن لینک محصول",
    description: "لینک محصول مرجع را وارد می‌کنید تا فرآیند شروع شود.",
    borderColor: "#0EA5E9",
  },
  {
    number: "۲",
    title: "استخراج اطلاعات محصول",
    description: "اطلاعات محصول به‌صورت خودکار به هوش مارکت منتقل می‌شود.",
    borderColor: "#14B8A6",
  },
  {
    number: "۳",
    title: "تبدیل هوشمند با هوشیار",
    description: "هوش مصنوعی هوشیار محصول را برای استانداردهای دیجی‌کالا بهینه می‌کند.",
    borderColor: "#A855F7",
  },
  {
    number: "۴",
    title: "ویرایش و انتشار",
    description: "در صورت نیاز ویرایش می‌کنید و سپس محصول را در دیجی‌کالا منتشر می‌کنید.",
    borderColor: "#22C55E",
  },
];

const StepsSection = () => {
  return (
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
            انتقال محصول چگونه کار می‌کند؟
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
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: "#1E293B",
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="h6"
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
  );
};

export default StepsSection;
