import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Skeleton,
  Chip,
  ListItemText,
  useTheme,
  alpha,
  LinearProgress,
} from "@mui/material";
import type { IQueueList } from "~/types/interfaces/queue.interface";
import { QueueStatus } from "~/types/interfaces/queue.interface";
import { getRelativeTime } from "~/utils/timeUtils";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  queueList: IQueueList[];
  loading: boolean;
  navigate: (path: string) => void;
};

const QueueMenu: React.FC<Props> = ({
  anchorEl,
  open,
  onClose,
  queueList,
  loading,
}) => {
  const theme = useTheme();

  const statusColor = (status: string): "success" | "error" | "warning" => {
    switch (status) {
      case QueueStatus.SUCCESS:
        return "success";
      case QueueStatus.FAILED:
        return "error";
      default:
        return "warning";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case QueueStatus.PENDING:
        return "در انتظار";
      case QueueStatus.STARTED:
        return "شروع شده";
      case QueueStatus.PROGRESS:
        return "در حال پردازش";
      case QueueStatus.SUCCESS:
        return "موفق";
      case QueueStatus.FAILED:
        return "ناموفق";
      case QueueStatus.RETRY:
        return "در حال تلاش مجدد";
      case QueueStatus.CANCELED:
        return "لغو شده";
      default:
        return status;
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        elevation: 0,
        sx: {
          mt: 1.5,
          minWidth: 360,
          maxWidth: 520,
          borderRadius: 2,
          maxHeight: 480,
          p: 0,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          صف
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary">
          {loading ? "در حال بارگذاری..." : `${queueList.length} مورد`}
        </Typography>
      </Box>

      <Divider />

      {loading && (
        <Box sx={{ px: 3, py: 2 }}>
          <Skeleton
            variant="rectangular"
            height={48}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
        </Box>
      )}

      {!loading && queueList.length === 0 && (
        <MenuItem
          onClick={onClose}
          sx={{
            py: 3,
            px: 3,
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          <Typography>موردی در صف وجود ندارد</Typography>
        </MenuItem>
      )}

      {!loading &&
        queueList.map((item) => (
          <Box key={item.id}>
            <MenuItem
              sx={{
                py: 1.25,
                px: 2.5,
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                transition: "background-color 120ms",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
                      {item.job_name}
                    </Typography>
                    <Chip
                      label={statusLabel(item.status)}
                      size="small"
                      sx={{
                        height: 24,
                        bgcolor: (theme.palette as any)[
                          statusColor(item.status)
                        ].main,
                        color: (theme.palette as any)[statusColor(item.status)]
                          .contrastText,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {item.short_message || "بدون توضیحات"}
                    </Typography>

                    {/* Progress Bar */}
                    {(item.status === QueueStatus.STARTED ||
                      item.status === QueueStatus.PROGRESS ||
                      item.status === QueueStatus.PENDING ||
                      item.status === QueueStatus.SUCCESS) && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={item.progress}
                          sx={{
                            flex: 1,
                            height: 6,
                            borderRadius: 1,
                            backgroundColor: statusColor(item.status),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 10,
                              backgroundColor: statusColor(item.status),
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ minWidth: 32, textAlign: "left" }}
                        >
                          {item.progress}%
                        </Typography>
                      </Box>
                    )}

                    <Typography variant="caption" color="text.secondary">
                      {item.created_at
                        ? getRelativeTime(
                            typeof item.created_at === "string"
                              ? item.created_at
                              : item.created_at
                          )
                        : "نامشخص"}
                    </Typography>
                  </Box>
                }
              />
            </MenuItem>
            <Divider component="li" />
          </Box>
        ))}
    </Menu>
  );
};

export default QueueMenu;
