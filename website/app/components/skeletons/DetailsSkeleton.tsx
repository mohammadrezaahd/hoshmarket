import { Box, Container, Grid, Skeleton } from "@mui/material";

const DetailsSkeleton = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: "#f1f5f9" }}>
      <Container maxWidth="lg">
        {/* Header skeleton */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Skeleton
            variant="text"
            height={45}
            sx={{ mb: 2, mx: "auto", maxWidth: "300px" }}
          />
          <Skeleton
            variant="text"
            height={24}
            sx={{ mx: "auto", maxWidth: "500px" }}
          />
        </Box>

        {/* Cards skeleton */}
        <Grid container spacing={3}>
          {[1, 2, 3].map((index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.75rem",
                }}
              >
                {/* Icon skeleton */}
                <Skeleton
                  variant="circular"
                  width={48}
                  height={48}
                  sx={{ mb: 2 }}
                />

                {/* Title skeleton */}
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />

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

export default DetailsSkeleton;
