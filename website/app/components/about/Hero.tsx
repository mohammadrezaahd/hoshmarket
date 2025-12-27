import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";

const HeroSection = () => {
  return (
    <Box sx={{ pt: { xs: 16, md: 20 }, pb: { xs: 10, md: 14 }, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
                  width: "fit-content",
                }}
              >
                <AutoAwesome sx={{ fontSize: 18 }} />
                <span>نسل جدید مدیریت محصولات</span>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.875rem", md: "2.25rem" },
                  lineHeight: 1.2,
                }}
              >
                خلق آینده با قدرت هوش مصنوعی
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  fontWeight: 400,
                  fontSize: "1.125rem",
                  lineHeight: 1.6,
                }}
              >
                ما تیمی از پیشگامان، مهندسان و متخصصان داده هستیم که متعهد به
                توانمندسازی کسب‌وکارها در سراسر جهان برای استفاده موثر از هوش
                مصنوعی می‌باشیم.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1337ec",
                    color: "white",
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#0b25a7",
                    },
                  }}
                >
                  بیشتر بدانید
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#cbd5e1",
                    color: "#475569",
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                    },
                  }}
                >
                  تماشای ویدیو
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                aspectRatio: "16/9",
                borderRadius: 3,
                overflow: "hidden",
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBofD11gCxAlA6CaX6ID_VLaIrmcIJSSyS6rmA6rsaxclhUAmPB4WKC7MBQIdT6cL0k_TTyedV0n2p9olSaAu6zHmlhbr3170axfVuAJlc_dMD1mWF7ccs1bjpsZ4s2EO3dBidQBEqkDo2GjyEMNOMWaXIJUzrVFeyVlfE4UcEf1TgUWTS9Lcwc8kyx8tWX4fRjjb_cld0l-ZhqckZCn4KrW1TGaRP6L13RRtJAoUHOdGQ7Bpo2J0W1SUqyekwUcEYxD9z7SwcbWbM')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: 3,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(19,55,236,0.1) 0%, transparent 100%)",
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
