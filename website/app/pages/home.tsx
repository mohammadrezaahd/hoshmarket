import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  Stack,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import SearchIcon from "@mui/icons-material/Search";
import HubIcon from "@mui/icons-material/Hub";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

export default function LandingPage() {
  return (
    <Box>
      {/* NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyUmV3_-mp3jiR5Tlz6aYL98XbW89AJK0Ay4bjajN9q_e9Jy2iFP8S05_RTFOolURqfIi7JfxHkUkWvltyfq7WniRr6TsrkpXhWhRzYyFD2ADzXA9Z9Dw2hJYu_ARdruQtdQRFhUjVm07IxBYYHPHvepdy1b_JWJcrilkYmuTGSGFp9HwLL2GTztIVWb5GMQVVzoZTS2UUB5MfEuvbIIF8uitHOHv2f5FUL1BbJvhRkd6aaOqjhD0r1RdSOJ6P5adD6QZFMIc2mVk"
                sx={{ bgcolor: "primary.main", width: 40, height: 40 }}
              />
              <Typography fontWeight={800} fontSize={22}>
                آی‌پروداکت
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={4}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {["درباره ما", "تماس با ما", "تعرفه‌ها"].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  boxShadow: "0 10px 30px rgba(59,130,246,.3)",
                }}
              >
                شروع کنید
              </Button>
              <IconButton sx={{ display: { md: "none" } }}>
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* HERO */}
      <Box sx={{ pt: 18, pb: 12 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
              <Stack
                spacing={4}
                alignItems={{ xs: "center", lg: "flex-start" }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    bgcolor: "#eff6ff",
                    px: 2,
                    py: 0.5,
                    borderRadius: 10,
                    border: "1px solid #dbeafe",
                  }}
                >
                  <AutoAwesomeIcon color="primary" fontSize="small" />
                  <Typography fontSize={14} fontWeight={600} color="primary">
                    نسل جدید مدیریت محصولات
                  </Typography>
                </Stack>

                <Typography
                  variant="h2"
                  fontWeight={900}
                  textAlign={{ xs: "center", lg: "right" }}
                >
                  ساخت و مدیریت محصول
                  <br />
                  با قدرت{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>
                    هوش مصنوعی
                  </Box>
                </Typography>

                <Typography
                  color="text.secondary"
                  maxWidth={520}
                  textAlign={{ xs: "center", lg: "right" }}
                >
                  پلتفرمی هوشمند برای ساخت خودکار محصولات، بهینه‌سازی سئو و
                  مدیریت یکپارچه فروشگاه شما.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{ px: 4, py: 1.5, borderRadius: 3 }}
                  >
                    شروع ساخت محصول
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ px: 4, py: 1.5, borderRadius: 3 }}
                  >
                    دموی پلتفرم
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* MOCKUP */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: "blur(16px)",
                }}
              >
                <Stack spacing={4} alignItems="center">
                  <Typography fontSize={12} color="text.secondary">
                    AI Processing...
                  </Typography>
                  <Box
                    component="img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdcHolecl3-5S3i7Y1a2quibiHtKzRuB2bYl64uemS7k3pVfZAyYcXOKU2WdvtSeW9luYWOnDTWGD5lg4MarJaBpqsU02eadEWKUc_HJOj28-KD3UEHWjeowr-PSU91fUW2K4DeFCnl8COCDwrM2VS2l2GZnMp6qY_llq9dzNXvXjqFHiDfEzKOurFH8eb7j4cTVjrxRCCH3DTDCh5aTVUaZ-0Z_r2AB16uyAVqBUbUoQNBpj2R9zoA9-9KqhUSkWmEVaRRQN_FQY"
                    sx={{ width: 200 }}
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box sx={{ py: 12, bgcolor: "#fff" }}>
        <Container maxWidth="xl">
          <Stack spacing={2} textAlign="center" mb={8}>
            <Typography variant="h4" fontWeight={800}>
              ویژگی‌های کلیدی پلتفرم
            </Typography>
            <Typography color="text.secondary">
              همه ابزارها در یک پلتفرم یکپارچه
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {[
              {
                icon: <BoltIcon />,
                title: "ساخت سریع",
                desc: "تولید خودکار محتوا",
              },
              {
                icon: <SearchIcon />,
                title: "سئو هوشمند",
                desc: "افزایش ورودی گوگل",
              },
              {
                icon: <HubIcon />,
                title: "سورس‌های مختلف",
                desc: "CSV، لینک، API",
              },
              {
                icon: <Inventory2Icon />,
                title: "مدیریت انبوه",
                desc: "هزاران محصول همزمان",
              },
            ].map((f) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={f.title}>
                <Card sx={{ p: 3, borderRadius: 4, height: "100%" }}>
                  <Stack spacing={2}>
                    <Avatar
                      sx={{ bgcolor: "primary.light", color: "primary.main" }}
                    >
                      {f.icon}
                    </Avatar>
                    <Typography fontWeight={700}>{f.title}</Typography>
                    <Typography color="text.secondary" fontSize={14}>
                      {f.desc}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS */}
      <Box sx={{ py: 12, bgcolor: "#eff6ff" }}>
        <Container maxWidth="xl">
          <Typography variant="h4" fontWeight={800} textAlign="center" mb={6}>
            نظرات کاربران
          </Typography>

          <Grid container spacing={4}>
            {[
              { name: "رضا محمدی", rate: 5 },
              { name: "سارا کریمی", rate: 4.5 },
              { name: "علی حسینی", rate: 5 },
            ].map((u) => (
              <Grid size={{ xs: 12, md: 4 }} key={u.name}>
                <Card sx={{ p: 3, borderRadius: 4 }}>
                  <Stack spacing={2}>
                    <Typography fontWeight={700}>{u.name}</Typography>
                    <Stack direction="row">
                      {[1, 2, 3, 4, 5].map((i) =>
                        i <= u.rate ? (
                          <StarIcon key={i} color="warning" fontSize="small" />
                        ) : (
                          <StarHalfIcon
                            key={i}
                            color="warning"
                            fontSize="small"
                          />
                        )
                      )}
                    </Stack>
                    <Typography color="text.secondary" fontSize={14}>
                      تجربه عالی از استفاده از پلتفرم
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ bgcolor: "#fff", borderTop: "1px solid #e5e7eb", py: 6 }}>
        <Container maxWidth="xl">
          <Typography textAlign="center" color="text.secondary" fontSize={14}>
            © ۱۴۰۲ تمامی حقوق محفوظ است.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
