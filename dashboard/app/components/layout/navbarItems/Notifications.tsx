import React from "react";
import { Box, Menu, MenuItem, Divider, Typography } from "@mui/material";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
};

const NotificationsMenu: React.FC<Props> = ({ anchorEl, open, onClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ elevation: 8, sx: { mt: 1.5, minWidth: 320, maxWidth: 400, borderRadius: 2, maxHeight: 400 } }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          اعلان‌ها
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={onClose} sx={{ py: 2, flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: "bold" }}>
          محصول جدید اضافه شد
        </Typography>
        <Typography variant="caption" color="text.secondary">
          2 ساعت پیش
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onClose} sx={{ py: 2, flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: "bold" }}>
          قالب جدید ایجاد شد
        </Typography>
        <Typography variant="caption" color="text.secondary">
          5 ساعت پیش
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onClose} sx={{ py: 2, flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: "bold" }}>
          تصویر جدید آپلود شد
        </Typography>
        <Typography variant="caption" color="text.secondary">
          1 روز پیش
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default NotificationsMenu;
