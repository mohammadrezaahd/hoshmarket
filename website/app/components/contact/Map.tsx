import { Box, Grid, useTheme } from "@mui/material";

const MapSection = () => {
  const theme = useTheme();

  return (
    <Grid size={{ xs: 12, lg: 8 }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 6,
          overflow: "hidden",
          height: { xs: 300, md: 500 },
          border: `4px solid ${
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "#fff"
          }`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 25px 50px rgba(0,0,0,0.5)"
              : "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38706.71128203012!2d51.331233145745244!3d35.70705321121386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfe05732c2e91%3A0xfcbec017befd15f4!2sAzadi%20Tower!5e0!3m2!1sen!2sde!4v1767114459957!5m2!1sen!2sde"
          sx={{
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
    </Grid>
  );
};

export default MapSection;
