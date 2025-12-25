import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router";
import Drawer from "./Drawer";
import MainContent from "./MainContent";
import AppBar from "./TopBar";
import PageTransition from "./PageTransition";

const drawerWidth = 280;
const collapsedDrawerWidth = 64;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Per-menu open state is now handled inside `Drawer` so we don't need separate state here
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  // Menu open state is handled inside Drawer; Layout no longer manages per-menu open flags.

  const currentDrawerWidth = desktopCollapsed
    ? collapsedDrawerWidth
    : drawerWidth;

  // Helper function to check if any child path is active
  const isChildPathActive = (parentPath: string) => {
    return location.pathname.startsWith(parentPath + "/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopToggle = () => {
    setDesktopCollapsed(!desktopCollapsed);
    // وقتی منو جمع می‌شود، زیرمنوها را ببندیم
    if (!desktopCollapsed) {
      // NOTE: menu open/close is handled inside Drawer now; nothing to close here.
      // per-menu state is now handled in Drawer
    }
  };

  // Per-item click handlers removed — toggling is handled in Drawer now.

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        currentDrawerWidth={currentDrawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        title={title}
      />

      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        desktopCollapsed={desktopCollapsed}
        handleDesktopToggle={handleDesktopToggle}
        currentDrawerWidth={currentDrawerWidth}
      />

      <MainContent currentDrawerWidth={currentDrawerWidth}>
        <PageTransition>{children}</PageTransition>
      </MainContent>
    </Box>
  );
};

export default Layout;
