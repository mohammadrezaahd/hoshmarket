import { Box, Container, Grid, Skeleton } from "@mui/material";

const StepsSkeleton = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: "#F8FAFC" }}>
      <Container maxWidth="lg">
        {/* Header skeleton */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Skeleton variant="text" height={45} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={24} sx={{ maxWidth: "400px", mx: "auto" }} />
        </Box>

        {/* Steps skeleton */}
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* Number skeleton */}
                <Skeleton
                  variant="circular"
                  width={64}
                  height={64}
                  sx={{ mb: 3 }}
                />

                {/* Title skeleton */}
                <Skeleton
                  variant="text"
                  height={24}
                  sx={{ mb: 1, width: "100%" }}
                />

                {/* Description skeleton */}
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={16} width="80%" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StepsSkeleton;
