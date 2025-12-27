import { Box, Container, Grid, Skeleton } from "@mui/material";

const FeaturesSkeleton = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: "white" }}>
      <Container maxWidth="lg">
        {/* Header skeleton */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Skeleton variant="text" height={45} sx={{ mb: 2 }} />
          <Skeleton
            variant="text"
            height={24}
            sx={{ mx: "auto", maxWidth: "700px" }}
          />
        </Box>

        {/* Features grid skeleton */}
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid #F3F4F6",
                  borderRadius: "1rem",
                  background: "white",
                }}
              >
                {/* Icon skeleton */}
                <Skeleton
                  variant="rounded"
                  width={56}
                  height={56}
                  sx={{ mb: 3 }}
                />

                {/* Title skeleton */}
                <Skeleton variant="text" height={24} sx={{ mb: 2 }} />

                {/* Description skeleton */}
                <Box>
                  <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
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

export default FeaturesSkeleton;
