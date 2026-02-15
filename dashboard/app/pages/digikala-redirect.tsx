import { useEffect } from "react";
import { Box, CircularProgress, Typography, Paper, Container } from "@mui/material";
import { BusinessIcon } from "~/components/icons/IconComponents";
import { useDigikalaRedirect } from "~/api/digikalaAuth.api";
import { useSnackbar } from "notistack";

const DigikalaRedirectPage = () => {
  const { mutateAsync: redirectToDigikala, isPending, isSuccess, data } = useDigikalaRedirect();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Call the API when component mounts
    const initiateRedirect = async () => {
      try {
        await redirectToDigikala();
      } catch (error: any) {
        console.error("Error getting Digikala redirect URL:", error);
        enqueueSnackbar("خطا در دریافت لینک انتقال به دیجیکالا", { variant: "error" });
      }
    };

    initiateRedirect();
  }, []);

  useEffect(() => {
    // Redirect to the URL when data is available
    if (isSuccess && data?.data?.url) {
      enqueueSnackbar("در حال انتقال به دیجیکالا...", { variant: "success" });
      
      // Redirect to Digikala after a short delay
      setTimeout(() => {
        if (data?.data?.url) {
          window.location.href = data.data.url;
        }
      }, 500);
    }
  }, [isSuccess, data, enqueueSnackbar]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            borderRadius: 3,
            width: "100%",
          }}
        >
          {/* Icon with animation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "primary.light",
              animation: isPending ? "pulse 1.5s ease-in-out infinite" : "none",
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.05)",
                  opacity: 0.8,
                },
              },
            }}
          >
            <BusinessIcon size={48} color="primary" />
          </Box>

          {/* Loading spinner */}
          <CircularProgress
            size={50}
            thickness={4}
            sx={{
              color: "primary.main",
            }}
          />

          {/* Title */}
          <Typography
            variant="h5"
            component="h1"
            fontWeight={700}
            textAlign="center"
            color="text.primary"
          >
            {isPending && "در حال اتصال به دیجیکالا..."}
            {isSuccess && "در حال انتقال به دیجیکالا..."}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ maxWidth: 400 }}
          >
            لطفاً کمی صبر کنید. در حال هدایت شما به صفحه احراز هویت دیجیکالا هستیم.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DigikalaRedirectPage;
