import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Skeleton,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { CircleCheckIcon } from "~/components/icons/IconComponents";
import type {
  INotifList,
  NotifyType,
} from "~/types/interfaces/notification.interface";
import { getRelativeTime } from "~/utils/timeUtils";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  notifList: INotifList[];
  loading: boolean;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
};

const getNotifColor = (type: NotifyType) => {
  switch (type) {
    case "ERROR":
      return "error.main";
    case "SUCCESS":
      return "success.main";
    case "WARNING":
      return "warning.main";
    case "INFO":
    default:
      return "info.main";
  }
};

const NotificationsMenu: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  notifList,
  loading,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const handleMarkAsRead = (notifId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(notifId);
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAllAsRead();
  };

  const hasUnreadNotifs = notifList.some((notif) => notif.status === "UNREAD");

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
          minWidth: 320,
          maxWidth: 400,
          borderRadius: 2,
          maxHeight: 400,
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          اعلان‌ها
        </Typography>
        {hasUnreadNotifs && !loading && (
          <Button
            size="small"
            onClick={handleMarkAllAsRead}
            sx={{
              textTransform: "none",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            خواندن همه
          </Button>
        )}
      </Box>
      <Divider />
      {loading ? (
        <Box sx={{ px: 2, py: 2 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Skeleton variant="text" width="70%" height={24} />
              <Skeleton
                variant="text"
                width="50%"
                height={20}
                sx={{ mt: 0.5 }}
              />
            </Box>
          ))}
        </Box>
      ) : notifList.length === 0 ? (
        <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            اعلان جدیدی وجود ندارد
          </Typography>
        </Box>
      ) : (
        notifList.map((notif, index) => (
          <React.Fragment key={notif.id}>
            {index > 0 && <Divider />}
            <MenuItem
              onClick={onClose}
              sx={{
                py: 2,
                px: 2,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                backgroundColor:
                  notif.status === "READ" ? "action.hover" : "transparent",
                opacity: notif.status === "READ" ? 0.6 : 1,
                position: "relative",
                textDecoration:
                  notif.status === "READ" ? "line-through" : "none",
                "&:hover": {
                  opacity: notif.status === "READ" ? 0.7 : 1,
                },
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontWeight: notif.status === "UNREAD" ? "bold" : "normal",
                  }}
                >
                  {notif.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: getNotifColor(notif.type),
                      fontWeight: "medium",
                    }}
                  >
                    {notif.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • {getRelativeTime(notif.created_at)}
                  </Typography>
                </Box>
              </Box>
              {notif.status === "UNREAD" && (
                <Tooltip title="علامت خوانده شده" arrow>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMarkAsRead(notif.id, e)}
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                  >
                    <CircleCheckIcon size="small" />
                  </IconButton>
                </Tooltip>
              )}
            </MenuItem>
          </React.Fragment>
        ))
      )}
    </Menu>
  );
};

export default NotificationsMenu;
