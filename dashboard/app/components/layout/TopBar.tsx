import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { MenuBars } from "../icons/IconComponents";
import Navbar from "./Navbar";
import DigikalaStatus from "./navbarItems/DigikalaStatus";
import { useNavigate } from "react-router";

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
