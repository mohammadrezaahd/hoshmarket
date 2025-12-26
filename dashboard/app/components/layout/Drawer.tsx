import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Link, useLocation } from "react-router";
import {
  AngleDown,
  AngleUp,
  GalleryIcon,
  GridIcon,
  ImportIcon,
  MenuBars,
  TagIcon,
  TemplateIcon,
} from "../icons/IconComponents";
import React from "react";
import type { FC, ComponentType } from "react";

const drawerWidth = 280;

interface SubMenuItem {
  id: string;
  title: string;
  path: string;
}

interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon: ComponentType<any>;
  expandable?: boolean;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "داشبورد",
    path: "/",
    icon: GridIcon,
  },
  {
    id: "templates",
    title: "قالب ها",
    icon: TemplateIcon,
    expandable: true,
    subItems: [
      {
        id: "templates-list",
        title: "تمام قالب ها",
        path: "/templates/list",
      },
      {
        id: "templates-new",
        title: "افزودن قالب جدید",
        path: "/templates/new",
      },
    ],
  },
  {
    id: "gallery",
    title: "گالری",
    path: "/gallery",
    icon: GalleryIcon,
  },
  {
    id: "products",
    title: "محصولات",
    icon: TagIcon,
    expandable: true,
    subItems: [
      {
        id: "products-list",
        title: "تمام محصولات",
        path: "/products/list",
      },
      {
        id: "products-new",
        title: "افزودن محصول جدید",
        path: "/products/new",
      },
      {
        id: "quick-product",
        title: "ساخت محصول سریع !",
        path: "/products/quick",
      },
    ],
  },
  {
    id: "transfer",
    title: "اننتقال محصول",
    icon: ImportIcon,
    expandable: true,
    subItems: [
      {
        id: "transfers-new",
        title: "انتقال جدید",
        path: "/transfer/new",
      },
      {
        id: "transfers-list",
        title: "تمام محصولات",
        path: "/transfers/list",
      },
    ],
  },
];

interface DrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  desktopCollapsed: boolean;
  handleDesktopToggle: () => void;

  currentDrawerWidth: number;
}

const Drawer = ({
  mobileOpen,
  handleDrawerToggle,
  desktopCollapsed,
  handleDesktopToggle,

  currentDrawerWidth,
}: DrawerProps) => {
  const theme = useTheme();
  const location = useLocation();
  
  // Check if screen size is md or smaller (900px or less)
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Use auto-collapsed mode on md or smaller screens
  const effectiveCollapsed = desktopCollapsed || isMdOrSmaller;

  // Helper function to check if a path is active
  const isPathActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if menu item or its sub-items are active
  const isMenuItemActive = (item: MenuItem) => {
    if (item.path) {
      return isPathActive(item.path);
    }
    if (item.subItems) {
      return item.subItems.some((sub) => isPathActive(sub.path));
    }
    return false;
  };

  // Internal open-state map for expandable items
  const [openState, setOpenState] = React.useState<Record<string, boolean>>({});

  // Toggle a menu by id, respecting collapsed mode
  const toggleMenu = (itemId: string) => {
    if (effectiveCollapsed) return;
    setOpenState((s) => ({ ...s, [itemId]: !s[itemId] }));
  };

  // Keep menus open if any of their subpaths match the current path
  React.useEffect(() => {
    const newState: Record<string, boolean> = { ...openState };
    menuItems.forEach((item) => {
      if (item.subItems) {
        const active = item.subItems.some((sub) =>
          location.pathname.startsWith(sub.path)
        );
        if (active) newState[item.id] = true;
      }
    });
    setOpenState(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const getOpenState = (itemId: string) => {
    return !!openState[itemId];
  };

  const drawer = (
    <Box>
      <Toolbar
        sx={{ justifyContent: effectiveCollapsed ? "center" : "space-between" }}
      >
        {!effectiveCollapsed && (
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            منو
          </Typography>
        )}
        <IconButton
          onClick={handleDesktopToggle}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              marginLeft: effectiveCollapsed ? 0 : "-5px",
              cursor: "pointer",
              ":hover": { color: theme.palette.primary.main },
            },
          }}
        >
          <MenuBars />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const ItemIcon = item.icon;
          const isActive = isMenuItemActive(item);
          const isOpen = getOpenState(item.id);

          return (
            <Box key={item.id}>
              <ListItem disablePadding>
                <ListItemButton
                  component={item.path && !item.expandable ? Link : "div"}
                  to={item.path && !item.expandable ? item.path : undefined}
                  onClick={
                    item.expandable ? () => toggleMenu(item.id) : undefined
                  }
                  sx={{
                    backgroundColor: isActive
                      ? theme.palette.action.selected
                      : "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    margin: "4px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      ml: effectiveCollapsed ? 0 : 1,
                      justifyContent: "center",
                      color: isActive ? theme.palette.primary.main : "inherit",
                    }}
                  >
                    <ItemIcon />
                  </ListItemIcon>
                  {!effectiveCollapsed && (
                    <>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          textAlign: "start",
                          "& .MuiListItemText-primary": {
                            color: isActive
                              ? theme.palette.primary.main
                              : "inherit",
                            fontWeight: isActive ? "bold" : "normal",
                          },
                        }}
                      />
                      {item.expandable &&
                        (isOpen ? (
                          <AngleUp size={15} />
                        ) : (
                          <AngleDown size={15} />
                        ))}
                    </>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Sub Items */}
              {item.expandable && item.subItems && !effectiveCollapsed && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      borderRight: (theme) =>
                        `2px solid ${theme.palette.divider}`,
                      marginRight: "2rem",
                      borderRadius: "0 2px 2px 0",
                    }}
                  >
                    {item.subItems.map((subItem) => {
                      const isSubActive = isPathActive(subItem.path);
                      return (
                        <ListItemButton
                          key={subItem.id}
                          sx={{
                            pl: 4,
                            backgroundColor: isSubActive
                              ? theme.palette.action.selected
                              : "transparent",
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                          }}
                          component={Link}
                          to={subItem.path}
                          onClick={() => {
                            if (mobileOpen) handleDrawerToggle();
                          }}
                        >
                          <ListItemText
                            sx={{
                              textAlign: "start",
                              "& .MuiListItemText-primary": {
                                color: isSubActive
                                  ? theme.palette.primary.main
                                  : "inherit",
                                fontWeight: isSubActive ? "bold" : "normal",
                              },
                            }}
                            primary={subItem.title}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: currentDrawerWidth },
        flexShrink: { sm: 0 },
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <MuiDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            left: "auto",
          },
        }}
        anchor="left"
        PaperProps={{
          sx: {
            right: 0,
            left: "auto",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        {drawer}
      </MuiDrawer>
      <MuiDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: currentDrawerWidth,
            right: 0,
            left: "auto",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: "hidden",
          },
        }}
        anchor="right"
        open
      >
        {drawer}
      </MuiDrawer>
    </Box>
  );
};

export default Drawer;
