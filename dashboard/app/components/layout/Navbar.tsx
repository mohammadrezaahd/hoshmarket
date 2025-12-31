import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Badge,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";

import {
  NotificationIcon,
  HelpIcon,
  SupportIcon,
  QueueIcon,
} from "../icons/IconComponents";

import { useNavigate } from "react-router";
import { useLogout } from "~/api/auth.api";
import { useProfile } from "~/api/profile.api";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setUser, clearUser } from "~/store/slices/userSlice";
import { useSnackbar } from "notistack";
import { useQueueCount, useQueueListSocket } from "~/api/queue.api";
import { ProfileMenu, QueueMenu, NotificationsMenu } from "./navbarItems";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [queueAnchorEl, setQueueAnchorEl] = useState<null | HTMLElement>(null);

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const { data: userData, isSuccess } = useProfile();
  const { data: queueCount } = useQueueCount();

  useEffect(() => {
    if (isSuccess && userData?.data) {
      dispatch(setUser(userData.data));
    }
  }, [isSuccess, userData, dispatch]);

  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleQueueMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setQueueAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleQueueClose = () => {
    setQueueAnchorEl(null);
  };

  // use centralized socket hook for queue list while dropdown is open
  const { queueList, loading } = useQueueListSocket(Boolean(queueAnchorEl));
  useEffect(() => {
    console.log(queueList);
  }, [queueList]);
  // use socket hook for queue count
  // const { queueCount } = useQueueCountSocket(true);

  const handleLogout = async () => {
    handleMenuClose();

    try {
      enqueueSnackbar("در حال خروج از حساب کاربری...", { variant: "info" });
      await logout();

      // پاک کردن اطلاعات کاربر از store
      dispatch(clearUser());

      enqueueSnackbar("با موفقیت از حساب خارج شدید", { variant: "success" });

      // هدایت به صفحه ورود
      setTimeout(() => {
        navigate("/auth", { replace: true });
      }, 500);
    } catch (error: any) {
      console.error("Logout error:", error);
      enqueueSnackbar("خطا در خروج از حساب کاربری", { variant: "error" });
    }
  };

  const handleNavigation = (path: string) => {
    handleMenuClose();
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Notifications */}
      <Tooltip title="اعلان‌ها" arrow>
        <IconButton
          onClick={handleNotifMenuOpen}
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <Badge badgeContent={3} color="error">
            <NotificationIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Help */}
      <Tooltip title="راهنما" arrow>
        <IconButton
          onClick={() => navigate("/help")}
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <HelpIcon />
        </IconButton>
      </Tooltip>

      {/* Support */}
      <Tooltip title="پشتیبانی" arrow>
        <IconButton
          onClick={() => navigate("/ticketing")}
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <SupportIcon />
        </IconButton>
      </Tooltip>

      {/* Queue */}
      <Tooltip title="صف" arrow>
        <IconButton
          onClick={handleQueueMenuOpen}
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <Badge
            badgeContent={
              queueCount?.data?.count && queueCount?.data?.count > 0
                ? queueCount.data.count
                : null
            }
            color="primary"
            max={99}
          >
            <QueueIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Profile */}
      <Tooltip title="پروفایل" arrow>
        <IconButton
          onClick={handleProfileMenuOpen}
          sx={{
            ml: 1,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {currentUser?.first_name?.[0]?.toUpperCase() ||
              currentUser?.email?.[0]?.toUpperCase() ||
              "U"}
          </Avatar>
        </IconButton>
      </Tooltip>

      {/* Profile Menu */}
      <ProfileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        currentUser={currentUser}
        handleNavigation={handleNavigation}
        isLoggingOut={isLoggingOut}
        handleLogout={handleLogout}
      />

      {/* Queue Menu */}
      <QueueMenu
        anchorEl={queueAnchorEl}
        open={Boolean(queueAnchorEl)}
        onClose={handleQueueClose}
        queueList={queueList}
        loading={loading}
        navigate={(path: string) => navigate(path)}
      />

      {/* Notifications Menu */}
      <NotificationsMenu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={handleNotifClose}
      />
    </Box>
  );
};

export default Navbar;
