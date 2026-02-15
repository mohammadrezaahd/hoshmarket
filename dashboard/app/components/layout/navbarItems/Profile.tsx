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
      sx={{
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Arrow */}
      <Box
        sx={{
          position: "absolute",
          top: -6,
          left: 20,
          width: 12,
          height: 12,
          bgcolor: "background.paper",
          transform: "rotate(45deg)",
          border: "1px solid",
          borderColor: "divider",
          borderRight: "none",
          borderBottom: "none",
        }}
      />

      {/* Profile Info */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {currentUser?.first_name?.[0]?.toUpperCase() ||
              currentUser?.email?.[0]?.toUpperCase() ||
              "U"}
          </Avatar>
          <Box sx={{ minWidth: 0, overflow: "hidden" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentUser?.first_name && currentUser?.last_name
                ? `${currentUser.first_name} ${currentUser.last_name}`
                : "کاربر محترم"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.75rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentUser?.email || currentUser?.phone || "بدون اطلاعات"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <MenuItem
        onClick={() => handleNavigation("/profile")}
        sx={{ py: 1.25, px: 2 }}
      >
        <ListItemIcon>
          <AccountIcon size={20} />
        </ListItemIcon>
        <Typography>پروفایل من</Typography>
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigation("/settings")}
        sx={{ py: 1.25, px: 2 }}
      >
        <ListItemIcon>
          <SettingsIcon size={20} />
        </ListItemIcon>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>تنظیمات</Typography>
          <Chip label="به زودی" size="small" color="default" />
        </Box>
      </MenuItem>

      <MenuItem
        onClick={() => handleNavigation("/security")}
        sx={{ py: 1.25, px: 2 }}
      >
        <ListItemIcon>
          <ShieldIcon size={20} />
        </ListItemIcon>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>امنیت و حریم خصوصی</Typography>
          <Chip label="به زودی" size="small" color="default" />
        </Box>
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      <MenuItem
        onClick={handleLogout}
        disabled={isLoggingOut}
        sx={{ py: 1.25, px: 2, mb: 1, color: theme.palette.error.main }}
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
