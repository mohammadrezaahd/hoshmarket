import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuthStatus } from "~/api/auth.api";
import { safeLocalStorage, isClient } from "~/utils/storage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  if (!isClient()) {
    return null;
  }

  const { isAuthenticated, isLoading, isError, error } = useAuthStatus();

  useEffect(() => {
    if (isError && error) {
      const axiosError = error as any;
      const statusCode = axiosError?.response?.status;

      console.log("🔒 ProtectedRoute Error:", statusCode, axiosError);

      if (statusCode === 401) {
        console.log("❌ 401: توکن نامعتبر - هدایت به صفحه ورود");
        safeLocalStorage.removeItem("access_token");
        setRedirectPath("/auth");
      } else if (statusCode === 422) {
        console.log("⚠️ 422: کاربر register نکرده - هدایت به فرم ثبت‌نام");

        navigate("/auth", {
          state: {
            step: "register",
            needsRegistration: true,
          },
          replace: true,
        });
        return;
      } else {
        console.log("❌ خطای احراز هویت - هدایت به صفحه ورود");
        safeLocalStorage.removeItem("access_token");
        setRedirectPath("/auth");
      }
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="body1" color="text.secondary">
          در حال بررسی دسترسی...
        </Typography>
      </Box>
    );
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
