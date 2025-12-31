import { ArrowBack, AutoAwesome, PlayCircleFilled } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        pt: { xs: 16, md: 20 },
        pb: { xs: 10, md: 14 },
        overflow: "hidden",
        position: "relative",
        background: "#F8FAFC",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#93C5FD",
          mixBlendMode: "multiply",
          filter: "blur(64px)",
          opacity: 0.3,
          animation: "blob 7s infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: "160px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#67E8F9",
          mixBlendMode: "multiply",
          filter: "blur(64px)",
          opacity: 0.3,
          animation: "blob 7s infinite",
          animationDelay: "2s",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ textAlign: { xs: "center", lg: "right" } }}>
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
                }}
              >
                <AutoAwesome sx={{ fontSize: 18 }} />
                <span>نسل جدید مدیریت محصولات</span>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.25rem", md: "3.75rem" },
                  fontWeight: "900",
                  mb: 3,
                  lineHeight: 1.2,
                  color: "#1E293B",
                }}
              >
                ساخت و مدیریت محصول <br />
                با قدرت{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to left, #0ea5e9, #2563eb)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  هوش مصنوعی
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.125rem",
                  color: "#64748B",
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: "600px",
                }}
              >
                پلتفرمی هوشمند برای ساخت خودکار محصولات، بهینه‌سازی سئو و مدیریت
                یکپارچه فروشگاه شما. بدون نیاز به دانش فنی، فروش خود را متحول
                کنید.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  justifyContent: { xs: "center", lg: "flex-start", gap: 2 },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: "#0EA5E9",
                    color: "white",
                    textTransform: "none",
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    py: 1.5,
                    px: 4,
                    borderRadius: "0.75rem",
                    boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.3)",
                    "&:hover": {
                      background: "#0284C7"
                    },
                  }}
                >
                  شروع ساخت محصول
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#1E293B",
                    borderColor: "#E2E8F0",
                    background: "#FFFFFF",
                    textTransform: "none",
                    fontSize: "1.125rem",
                    fontWeight: "500",
                    py: 1.5,
                    px: 4,
                    borderRadius: "0.75rem",
                    "&:hover": {
                      background: "#F1F5F9",
                    },
                  }}
                >
                  دموی پلتفرم
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Right side illustration */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, #0EA5E9, #14B8A6)",
                  borderRadius: "50%",
                  filter: "blur(64px)",
                  opacity: 0.2,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "1.5rem",
                  p: 4,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                }}
              >
                <Box sx={{ mb: 3, display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#FCA5A5",
                    }}
                  />
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#FBBF24",
                    }}
                  />
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#86EFAC",
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "0.75rem",
                    display: "block",
                    mb: 4,
                  }}
                >
                  AI Processing...
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 6,
                  }}
                >
                  <Box
                    component="img"
                    src="/Hoshmarket.png"
                    alt="AI Platform"
                    sx={{
                      width: 192,
                      height: 192,
                      objectFit: "contain",
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  <Box
                    sx={{
                      mt: 6,
                      background: "white",
                      borderRadius: "0.5rem",
                      p: 2,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      width: "100%",
                      maxWidth: "320px",
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <Box
                      sx={{
                        height: 10,
                        background: "#E5E7EB",
                        borderRadius: "9999px",
                        mb: 2,
                        width: "192px",
                      }}
                    />
                    <Box
                      sx={{
                        height: 8,
                        background: "#E5E7EB",
                        borderRadius: "9999px",
                        mb: 1,
                      }}
                    />
                    <Box
                      sx={{
                        height: 8,
                        background: "#E5E7EB",
                        borderRadius: "9999px",
                        mb: 2,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: -2 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: "#3B82F6",
                            border: "2px solid white",
                            ml: -3,
                          }}
                        />
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: "#10B981",
                            border: "2px solid white",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#0EA5E9",
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                        }}
                      >
                        100% بهینه شده
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
