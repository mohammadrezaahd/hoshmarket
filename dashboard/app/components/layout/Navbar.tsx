import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Badge,
  Button,
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
import { useProfile, useCredit } from "~/api/profile.api";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  setUser,
  clearUser,
  setUserSubscription,
} from "~/store/slices/userSlice";
import { useSnackbar } from "notistack";
import { useQueueCount, useQueueListSocket } from "~/api/queue.api";
import { useRefreshQueueCount } from "~/hooks/useRefreshQueueCount";
import {
  useNotifList,
  useReadNotif,
  useReadNotifAll,
  useNotifCountSocket,
} from "~/api/notification.api";
import { ProfileMenu, QueueMenu, NotificationsMenu } from "./navbarItems";
import type { INotifList } from "~/types/interfaces/notification.interface";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [queueAnchorEl, setQueueAnchorEl] = useState<null | HTMLElement>(null);
  const [notifList, setNotifList] = useState<INotifList[]>([]);
  const [isPulsing, setIsPulsing] = useState(false);

  const currentUser = useAppSelector((state) => state.user.currentUser);

  const { data: userData, isSuccess } = useProfile();
  const { data: creditData, isSuccess: isCreditSuccess } = useCredit();
  const { data: queueCount } = useQueueCount();
  const { mutateAsync: fetchNotifications, isPending: isLoadingNotifications } =
    useNotifList();
  const { mutateAsync: markAsRead } = useReadNotif();
  const { mutateAsync: markAllAsRead } = useReadNotifAll();
  const { unreadCount } = useNotifCountSocket(true);
  const refreshQueueCount = useRefreshQueueCount();

  useEffect(() => {
    console.log(unreadCount);
  }, [unreadCount]);

  useEffect(() => {
    if (isSuccess && userData?.data) {
      // preserve existing subscription on store when updating profile
      const merged = {
        ...userData.data,
        subscription: (currentUser as any)?.subscription ?? userData.data.subscription ?? null,
      };
      dispatch(setUser(merged));
    }
  }, [isSuccess, userData, dispatch]);

  useEffect(() => {
    if (isCreditSuccess && creditData?.data) {
      dispatch(setUserSubscription(creditData.data));
    }
  }, [isCreditSuccess, creditData, dispatch]);

  // Track previous unread count for detecting new notifications
  const prevUnreadCountRef = React.useRef<number>(unreadCount);

  useEffect(() => {
    const prevCount = prevUnreadCountRef.current;

    // Check if count increased (new notification arrived)
    if (unreadCount > prevCount && prevCount !== 0) {
      // Trigger pulse animation
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);

      // Send browser push notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("نوتیفیکیشن جدید", {
          body: `شما ${unreadCount} نوتیفیکیشن خوانده نشده دارید`,
          icon: "/source_logo/logo-256.png",
        });
      } else if (
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        // Request permission if not yet requested
        Notification.requestPermission();
      }
    }

    prevUnreadCountRef.current = unreadCount;
  }, [unreadCount]);

  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenuOpen = async (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);

    // Fetch notifications when dropdown opens
    try {
      const response = await fetchNotifications({});
      if (response?.data?.list) {
        setNotifList(response.data.list);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
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

  const handleMarkAsRead = async (notifId: number) => {
    try {
      await markAsRead(notifId);
      // Refetch notifications after marking as read
      const response = await fetchNotifications({});
      if (response?.data?.list) {
        setNotifList(response.data.list);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      enqueueSnackbar("خطا در علامت‌گذاری نوتیفیکیشن", { variant: "error" });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      // Refetch notifications after marking all as read
      const response = await fetchNotifications({});
      if (response?.data?.list) {
        setNotifList(response.data.list);
      }
      enqueueSnackbar("همه نوتیفیکیشن‌ها خوانده شدند", { variant: "success" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      enqueueSnackbar("خطا در علامت‌گذاری همه نوتیفیکیشن‌ها", {
        variant: "error",
      });
    }
  };

  const handleQueueClose = () => {
    setQueueAnchorEl(null);
    refreshQueueCount();
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
            position: "relative",
            "&::before": isPulsing
              ? {
                  content: '""',
                  position: "absolute",
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  borderRadius: "50%",
                  border: `2px solid ${theme.palette.error.main}`,
                  animation: "pulse 1.5s ease-in-out",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.95)",
                      opacity: 1,
                    },
                    "50%": {
                      transform: "scale(1.1)",
                      opacity: 0.5,
                    },
                    "100%": {
                      transform: "scale(1.3)",
                      opacity: 0,
                    },
                  },
                }
              : {},
          }}
        >
          <Badge
            badgeContent={unreadCount > 0 ? unreadCount : null}
            color="error"
            max={99}
          >
            <NotificationIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Help */}
      {/* <Tooltip title="راهنما" arrow>
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
      </Tooltip> */}

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
            color="error"
            max={99}
          >
            <QueueIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Profile */}
      <Tooltip title="پروفایل" arrow>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Subscription status button */}
          {(() => {
            const credit = currentUser?.subscription?.ai_credit ?? 0;
            const active = credit > 0;

            return (
              <Button
                size="small"
                onClick={() => navigate("/pricing")}
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: active
                    ? theme.palette.success?.main || "#00B894"
                    : theme.palette.error?.main || "#D63031",
                  color: theme.palette.success?.contrastText || "#fff",
                  px: 1.25,
                  py: 0.5,
                  minWidth: 80,
                  "&:hover": {
                    backgroundColor: active
                      ? theme.palette.success?.dark || undefined
                      : theme.palette.error?.dark || undefined,
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: active ? "white" : "white",
                    boxShadow: `0 0 0 6px ${active ? alpha(theme.palette.success.main, 0.12) : alpha(theme.palette.error.main, 0.12)}`,
                  }}
                />
                {active ? "فعال" : "غیرفعال"}
              </Button>
            );
          })()}

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
        </Box>
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
        notifList={notifList}
        loading={isLoadingNotifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </Box>
  );
};

export default Navbar;
