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
  icon?: ComponentType<any>;
  important?: boolean;
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
  {
    id: "quick-product",
    title: "ساخت محصول سریع !",
    path: "/products/quick",
    important: true,
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
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("lg"));

  // Collapse only when desktopCollapsed is true and we're NOT on small screens.
  // On mobile (isMdOrSmaller) we want the temporary drawer to show full items.
  const collapsed = desktopCollapsed && !isMdOrSmaller;

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
    // Prevent toggling only when desktop is explicitly collapsed.
    if (collapsed) return;
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
        sx={{ justifyContent: collapsed ? "center" : "space-between" }}
      >
        {!collapsed && (
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
              marginLeft: collapsed ? 0 : "-5px",
              cursor: "pointer",
              ":hover": { color: theme.palette.primary.main },
            },
          }}
        >
          <MenuBars />
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                    backgroundColor: item.important
                      ? theme.palette.primary.main
                      : isActive && !item.important
                        ? theme.palette.action.selected
                        : "transparent",
                    color: item.important
                      ? theme.palette.common.white
                      : "inherit",
                    borderRadius: item.important ? 2 : 0,
                    border: item.important
                      ? `1px solid ${theme.palette.primary.main}`
                      : "none",
                    px: item.important ? 2.5 : 1,
                    py: item.important ? 0.7 : 0,
                    margin: item.important ? "10px 8px" : "4px",
                    boxShadow: item.important
                      ? "0 6px 18px rgba(16,24,40,0.06)"
                      : "none",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    transition: "all 150ms ease",
                    "&:hover": {
                      // Hover: become bordered / transparent and show primary text
                      backgroundColor: item.important
                        ? "transparent"
                        : theme.palette.action.hover,
                      color: item.important
                        ? theme.palette.common.black
                        : undefined,
                      boxShadow: item.important
                        ? "0 4px 12px rgba(16,24,40,0.04)"
                        : undefined,
                    },
                    "&:hover .MuiListItemText-primary": {
                      color: item.important
                        ? theme.palette.common.black
                        : undefined,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: ItemIcon ? "auto" : 0,
                      ml: collapsed ? 0 : 1,
                      justifyContent: "center",
                      color: isActive ? theme.palette.primary.main : "inherit",
                      // keep icon space compact when there is no icon
                      width: ItemIcon ? undefined : 0,
                      overflow: "hidden",
                    }}
                  >
                    {ItemIcon ? <ItemIcon /> : null}
                  </ListItemIcon>
                  {!collapsed && (
                    <>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          textAlign: "start",
                          ml: item.important ? 1 : 0,
                          "& .MuiListItemText-primary": {
                            // Ensure important items always show white text (overrides theme changes)
                            color: item.important
                              ? theme.palette.common.white
                              : isActive
                                ? theme.palette.primary.main
                                : "inherit",
                            fontWeight: item.important ? 700 : isActive ? 700 : 500,
                            whiteSpace: "nowrap",
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
              {item.expandable && item.subItems && !collapsed && (
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
