import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import AppLayout from "~/components/layout/AppLayout";
import { useDigikalaConnect } from "~/api/digikalaAuth.api";
import { ApiStatus } from "~/types";
import type { ApiResponseData } from "~/types";
import type { IDigikalaAuth } from "~/types/interfaces/digikalaAuth.interface";

const DigikalaConnectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync: connectDigikala, isPending } = useDigikalaConnect();

  const [connectResult, setConnectResult] = useState<ApiResponseData<IDigikalaAuth> | null>(null);
  const [countdown, setCountdown] = useState(6);

  const authorizationCode = useMemo(
    () => searchParams.get("authorization_code") || "",
    [searchParams],
  );
  const state = useMemo(() => searchParams.get("state") || "", [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const runConnect = async () => {
      if (!authorizationCode || !state) {
        if (isMounted) {
          setConnectResult({
            status: ApiStatus.FAILED,
            code: 400,
            message: "پارامترهای ورودی دیجیکالا ناقص است.",
          });
        }
        return;
      }

      const response = await connectDigikala({
        authorization_code: authorizationCode,
        state,
      });

      if (isMounted) {
        setConnectResult(response);
      }
    };

    runConnect();

    return () => {
      isMounted = false;
    };
  }, [authorizationCode, state, connectDigikala]);

  useEffect(() => {
    if (!connectResult) {
      return;
    }

    if (countdown <= 0) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [connectResult, countdown, navigate]);

  const isSuccess = connectResult?.status === ApiStatus.SUCCEEDED;

  return (
    <AppLayout title="اتصال دیجیکالا">
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight={700} textAlign="center">
                اتصال حساب دیجیکالا
              </Typography>

              {isPending && (
                <Stack spacing={2}>
                  <Skeleton variant="text" width="60%" height={36} />
                  <Skeleton variant="rounded" height={56} />
                  <Skeleton variant="rounded" height={56} />
                  <Skeleton variant="rounded" height={100} />
                </Stack>
              )}

              {!isPending && connectResult && isSuccess && connectResult.data && (
                <Stack spacing={2}>
                  <Alert severity="success" sx={{ borderRadius: 2 }}>
                    اتصال حساب دیجیکالا با موفقیت انجام شد.
                  </Alert>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      نام فروشنده
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {connectResult.data.seller_name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      شناسه فروشنده
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {connectResult.data.seller_id}
                    </Typography>
                  </Box>
                </Stack>
              )}

              {!isPending && connectResult && !isSuccess && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {connectResult.message || "خطا در اتصال به دیجیکالا"}
                </Alert>
              )}

              {!isPending && connectResult && (
                <Box sx={{ textAlign: "center", pt: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {countdown} ثانیه دیگر به داشبورد منتقل می‌شوید
                  </Typography>

                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={((6 - countdown) / 6) * 100}
                      size={42}
                      thickness={4}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight={700}>
                        {countdown}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </AppLayout>
  );
};

export default DigikalaConnectPage;
