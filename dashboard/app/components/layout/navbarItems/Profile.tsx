import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  SettingsIcon,
  LogoutIcon,
  AccountIcon,
  ShieldIcon,
} from "../../icons/IconComponents";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  currentUser: any;
  handleNavigation: (path: string) => void;
  isLoggingOut: boolean;
  handleLogout: () => Promise<void> | void;
};

const ProfileMenu: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  currentUser,
  handleNavigation,
  isLoggingOut,
  handleLogout,
}) => {
  const theme = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        elevation: 8,
        sx: {
          mt: 1.5,
          minWidth: 240,
          borderRadius: 2,
          overflow: "visible",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 20,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {currentUser?.first_name?.[0]?.toUpperCase() ||
              currentUser?.email?.[0]?.toUpperCase() ||
              "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {currentUser?.first_name && currentUser?.last_name
                ? `${currentUser.first_name} ${currentUser.last_name}`
                : "کاربر محترم"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              {currentUser?.email || currentUser?.phone || "بدون اطلاعات"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <MenuItem
        onClick={() => handleNavigation("/profile")}
        sx={{
          py: 1.5,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <ListItemIcon>
          <AccountIcon size={20} />
        </ListItemIcon>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography>پروفایل من</Typography>
        </Box>
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigation("/settings")}
        sx={{
          py: 1.5,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <ListItemIcon>
          <SettingsIcon size={20} />
        </ListItemIcon>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography>تنظیمات</Typography>
          <Chip label="به زودی" size="small" color="primary" />
        </Box>
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigation("/security")}
        sx={{
          py: 1.5,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <ListItemIcon>
          <ShieldIcon size={20} />
        </ListItemIcon>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography>امنیت و حریم خصوصی</Typography>
          <Chip label="به زودی" size="small" color="primary" />
        </Box>
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigation("/pricing")}
        sx={{
          py: 1.5,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography>اشتراک فعال ندارید</Typography>
          <Chip label="برای خرید اشتراک" size="small" color="warning" />
        </Box>
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      <MenuItem
        onClick={handleLogout}
        disabled={isLoggingOut}
        sx={{
          py: 1.5,
          color: theme.palette.error.main,
          "&:hover": { backgroundColor: alpha(theme.palette.error.main, 0.08) },
        }}
      >
        <ListItemIcon>
          <LogoutIcon size={20} color="error" />
        </ListItemIcon>
        <Typography>
          {isLoggingOut ? "در حال خروج..." : "خروج از حساب"}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
