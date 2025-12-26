import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "~/theme";

const Header = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigationItems = [
    { label: "درباره ما", href: "#" },
    { label: "تماس با ما", href: "#" },
    { label: "تعرفه ها", href: "#" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        color: "#1E293B",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#0EA5E9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Typography variant="h6">ا</Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.05em",
              color: "#1E293B",
            }}
          >
            آی‌پروداکت
          </Typography>
        </Box>

        {!isMobile && (
          <Stack direction="row" spacing={3}>
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                sx={{
                  color: "#1E293B",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#0EA5E9",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        )}

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {!isMobile && (
            <Button
              variant="contained"
              sx={{
                background: "#0EA5E9",
                color: "white",
                textTransform: "none",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                padding: "0.625rem 1.25rem",
                "&:hover": {
                  background: "#0284C7",
                  transform: "scale(1.05)",
                },
              }}
            >
              شروع کنید
            </Button>
          )}
          {isMobile && <MenuItem sx={{ fontSize: 28 }} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
