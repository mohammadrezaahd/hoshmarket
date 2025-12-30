import { ArrowBack } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Card,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";

const SocialSection = () => {
  const theme = useTheme();

  const socialMedia = [
    {
      name: "لینکدین",
      label: "Li",
      description: "اتصال حرفه‌ای",
      href: "#",
    },
    {
      name: "توییتر (X)",
      label: "X",
      description: "اخبار لحظه‌ای",
      href: "#",
    },
    {
      name: "اینستاگرام",
      label: "Ig",
      description: "گزارش‌های تصویری",
      href: "#",
    },
  ];

  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Card
        sx={{
          height: "100%",
          bgcolor: theme.palette.primary.main,
          color: "#fff",
          borderRadius: 6,
          p: 4,
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        {/* Background Decorations */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 256,
            height: 256,
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
            filter: "blur(40px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 160,
            height: 160,
            bgcolor: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            transform: "translate(-50%, 50%)",
            filter: "blur(30px)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            شبکه‌های اجتماعی
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            ما را در شبکه‌های اجتماعی دنبال کنید تا از آخرین اخبار و
            تکنولوژی‌های هوش مصنوعی باخبر شوید.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 4,
            }}
          >
            {socialMedia.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.25)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                    "& .arrow-icon": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#fff",
                    color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {social.label}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 700,
                      color: "#fff",
                      fontSize: "0.95rem",
                    }}
                  >
                    {social.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      transition: "color 0.3s",
                      fontSize: "0.8rem",
                    }}
                  >
                    {social.description}
                  </Typography>
                </Box>
                <ArrowBack
                  className="arrow-icon"
                  sx={{
                    opacity: 0,
                    transform: "translateX(-8px)",
                    transition: "all 0.3s",
                    color: "#fff",
                  }}
                />
              </Link>
            ))}
          </Box>

          <Box sx={{ pt: 4, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                mb: 1,
              }}
            >
              ساعات کاری
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.875rem",
                mb: 0.5,
              }}
            >
              <Typography variant="body2">شنبه - چهارشنبه</Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, direction: "ltr" }}
              >
                08:00 - 17:00
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.875rem",
              }}
            >
              <Typography variant="body2">پنجشنبه</Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, direction: "ltr" }}
              >
                08:00 - 13:00
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default SocialSection;
