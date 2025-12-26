import React from "react";
import { Box, Paper, Typography, Button, Divider, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { CircleCheckIcon } from "../icons/IconComponents";

interface Props {
  message?: string;
  onCreateAnother: () => void;
}

const TransferResult: React.FC<Props> = ({ message, onCreateAnother }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.main}10 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 720, width: "100%", px: 2 }}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            background: "#ffffff",
            border: `2px solid ${theme.palette.success.main}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.palette.success.light}40, ${theme.palette.success.main}20)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircleCheckIcon style={{ fontSize: 70, color: theme.palette.success.main }} />
            </Box>
          </Box>

          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
            انتقال با موفقیت ثبت شد
          </Typography>

          {message && (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
              {message}
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexDirection: { xs: "column", sm: "row" } }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleBackToDashboard}
              sx={{
                flex: { xs: "auto", sm: "1" },
                minWidth: 150,
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                color: "#ffffff",
                fontWeight: 600,
                textTransform: "none",
                py: 1.5,
              }}
            >
              بازگشت به داشبورد
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={onCreateAnother}
              sx={{
                flex: { xs: "auto", sm: "1" },
                minWidth: 150,
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                fontWeight: 600,
                textTransform: "none",
                py: 1.5,
                border: `2px solid ${theme.palette.secondary.main}`,
              }}
            >
              انتقال جدید
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TransferResult;
