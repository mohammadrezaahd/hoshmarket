import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { MenuBars } from "../icons/IconComponents";
import Navbar from "./Navbar";
import DigikalaStatus from "./navbarItems/DigikalaStatus";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/store/hooks";

interface AppBarProps {
  currentDrawerWidth: number;
  handleDrawerToggle: () => void;
  title?: string;
}

const TopBar = ({
  currentDrawerWidth,
  handleDrawerToggle,
  title = "پنل مدیریت",
}: AppBarProps) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleDigikalaConnect = () => {
    navigate("/digikala-redirect");
  };

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
        mr: { sm: `${currentDrawerWidth}px` },
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 2, display: { sm: "none" } }}
        >
          <MenuBars />
        </IconButton>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>

          <DigikalaStatus onClick={handleDigikalaConnect} />

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 2,
              px: 1.25,
              py: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ color: "common.white", fontWeight: 600 }}>
              {currentUser?.subscription
                ? currentUser.subscription.ai_model_title
                : "اشتراک فعال ندارید"}
            </Typography>

            {currentUser?.subscription ? (
              <Chip
                label={`${currentUser.subscription.ai_credit} کردیت`}
                size="small"
                color="success"
              />
            ) : (
              <Chip label="برای خرید اشتراک" size="small" color="warning" />
            )}
          </Box>
        </Box>

        {/* Navbar - Desktop & Mobile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Navbar />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default TopBar;
