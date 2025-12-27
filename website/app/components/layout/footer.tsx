import {
  AlternateEmail,
  CameraAlt,
  Email,
  LocationCity,
  Phone,
  Telegram,
} from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "white",
        borderTop: "1px solid #E5E7EB",
        pt: 8,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <img
                  src="/Hoshmarket.png"
                  alt="Hoshmarket"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1E293B",
                }}
              >
                هوش مارکت
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              سریع‌ترین راه برای ساخت محصولات با کیفیت و بهینه شده برای موتورهای
              جستجو.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                component="a"
                href="#"
                sx={{
                  color: "#9CA3AF",
                  transition: "color 0.3s",
                  "&:hover": { color: "#0EA5E9" },
                }}
              >
                <Telegram />
              </Box>
              <Box
                component="a"
                href="#"
                sx={{
                  color: "#9CA3AF",
                  transition: "color 0.3s",
                  "&:hover": { color: "#0EA5E9" },
                }}
              >
                <CameraAlt />
              </Box>
              <Box
                component="a"
                href="#"
                sx={{
                  color: "#9CA3AF",
                  transition: "color 0.3s",
                  "&:hover": { color: "#0EA5E9" },
                }}
              >
                <AlternateEmail />
              </Box>
            </Box>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#1E293B",
                mb: 2,
              }}
            >
              دسترسی سریع
            </Typography>
            <Stack spacing={1}>
              {[
                { label: "خانه", href: "#" },
                { label: "درباره ما", href: "#" },
                { label: "تعرفه‌ها", href: "#" },
                { label: "بلاگ", href: "#" },
              ].map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "#64748B",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    fontSize: "0.875rem",
                    p: 0,
                    "&:hover": {
                      color: "#0EA5E9",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#1E293B",
                mb: 2,
              }}
            >
              قوانین
            </Typography>
            <Stack spacing={1}>
              {[
                { label: "حریم خصوصی", href: "#" },
                { label: "شرایط استفاده", href: "#" },
                { label: "سوالات متداول", href: "#" },
              ].map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "#64748B",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    fontSize: "0.875rem",
                    p: 0,
                    "&:hover": {
                      color: "#0EA5E9",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#1E293B",
                mb: 2,
              }}
            >
              ارتباط با ما
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationCity
                  sx={{
                    color: "#0EA5E9",
                    fontSize: 20,
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                  }}
                >
                  تهران، خیابان آزادی، برج فناوری
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone
                  sx={{
                    color: "#0EA5E9",
                    fontSize: 20,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    direction: "ltr",
                    textAlign: "left",
                  }}
                >
                  021-12345678
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email
                  sx={{
                    color: "#0EA5E9",
                    fontSize: 20,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                  }}
                >
                  info@aiproduct.ir
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box
          sx={{
            borderTop: "1px solid #F3F4F6",
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            color: "#64748B",
            fontSize: "0.875rem",
          }}
        >
          <Typography variant="body2">© 1404 تمامی حقوق محفوظ است.</Typography>
          <Typography variant="body2">طراحی شده با ❤️</Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
