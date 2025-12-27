import { CheckCircle, Domain, Group, Storage } from "@mui/icons-material";
import { Box, Card, Container, Grid, Typography } from "@mui/material";

const StatsSection = () => {
  const stats = [
    {
      label: "کاربران فعال",
      value: "50k+",
      icon: <Group />,
    },
    {
      label: "داده‌های پردازش‌شده",
      value: "10PB",
      icon: <Storage />,
    },
    {
      label: "دقت نتایج",
      value: "99.9%",
      icon: <CheckCircle />,
    },
    {
      label: "شرکت‌های بزرگ",
      value: "500+",
      icon: <Domain />,
    },
  ];

  return (
    <Box
      sx={{ py: 6, backgroundColor: "#f8fafc", borderY: "1px solid #e2e8f0" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(19, 55, 236, 0.3)",
                    boxShadow: 2,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      color: "#1337ec",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                    color: "#1e293b",
                  }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
