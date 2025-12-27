import { Diamond, Flag, Visibility } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";

const DetailsSection = () => {
  const philosophy = [
    {
      title: "ماموریت ما",
      description:
        "در دسترس‌، قابل‌فهم و عملی‌کردن هوش مصنوعی پیشرفته برای هر سازمانی که به دنبال رشد است.",
      icon: <Flag />,
    },
    {
      title: "چشم‌انداز ما",
      description:
        "جهانی که در آن تصمیم‌گیری‌های داده‌محور به انسان‌ها قدرت می‌دهد تا پیچیده‌ترین چالش‌های جهانی را حل کنند.",
      icon: <Visibility />,
    },
    {
      title: "ارزش‌های ما",
      description:
        "شفافیت مطلق، امنیت غیرقابل‌مذاکره و نوآوری مستمر در هر آنچه که می‌سازیم.",
      icon: <Diamond />,
    },
  ];

  return (
    <Box sx={{ py: 12, backgroundColor: "#f1f5f9" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              mb: 2,
              color: "#1e293b",
            }}
          >
            فلسفه ما
          </Typography>
          <Typography
            sx={{
              color: "#64748b",
              fontSize: "1.125rem",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            متعهد به هوش مصنوعی اخلاقی و نوآوری پایدار برای آینده‌ای روشن‌تر.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {philosophy.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(19, 55, 236, 0.5)",
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "rgba(19, 55, 236, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#1337ec",
                    fontSize: 28,
                    transition: "background-color 0.3s ease",
                  }}
                  className="philosophy-icon"
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: "#1e293b",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailsSection;
