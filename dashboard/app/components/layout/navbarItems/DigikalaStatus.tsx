import { useCallback, useEffect, useState } from "react";
import { Button, alpha, Skeleton, useTheme } from "@mui/material";
import { useDigikalaInfo } from "~/api/digikalaAuth.api";
import { ApiStatus } from "~/types";
import type { IDigikalaAuthInfo } from "~/types/interfaces/digikalaAuth.interface";

interface DigikalaStatusProps {
  onClick: () => void;
}

const DigikalaStatus = ({ onClick }: DigikalaStatusProps) => {
  const theme = useTheme();
  const { mutateAsync: fetchDigikalaInfo } = useDigikalaInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [registeredStore, setRegisteredStore] =
    useState<IDigikalaAuthInfo | null>(null);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    const response = await fetchDigikalaInfo();

    if (response.status !== ApiStatus.SUCCEEDED) {
      setIsError(true);
      setRegisteredStore(null);
      setIsLoading(false);
      return;
    }
    const firstStore = response.data?.seller_list[0] || null;
    setRegisteredStore(firstStore);
    setIsLoading(false);
  }, [fetchDigikalaInfo]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleClick = () => {
    if (isError) {
      fetchStatus();
      return;
    }

    if (registeredStore) {
      return;
    }

    onClick();
  };

  const label = isError
    ? "خطا در دریافت اطلاعات"
    : registeredStore
      ? `فروشگاه ثبت‌شده: ${registeredStore.seller_name}`
      : "هنوز فروشگاهی ثبت نشده";

  if (isLoading) {
    return (
      <Skeleton
        variant="rounded"
        width={220}
        height={36}
        sx={{
          bgcolor: alpha(theme.palette.common.white, 0.24),
          borderRadius: 1,
        }}
      />
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        textTransform: "none",
        borderColor: alpha(theme.palette.common.white, 0.8),
        color: theme.palette.common.white,
        backgroundColor: alpha(theme.palette.common.white, 0.14),
        px: 2,
        py: 0.5,
        fontSize: "0.875rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        maxWidth: { xs: 220, md: 320 },
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline-block",
        animation: "pulse-border 2s ease-in-out infinite",
        "@keyframes pulse-border": {
          "0%, 100%": {
            borderColor: alpha(theme.palette.common.white, 0.8),
            boxShadow: `0 0 0 0 ${alpha(theme.palette.common.white, 0.35)}`,
          },
          "50%": {
            borderColor: theme.palette.common.white,
            boxShadow: `0 0 0 4px ${alpha(theme.palette.common.white, 0)}`,
          },
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.24),
          borderColor: theme.palette.common.white,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default DigikalaStatus;
