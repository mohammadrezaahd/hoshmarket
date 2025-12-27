import { Box, Container, Grid, Skeleton } from "@mui/material";

const TeamSkeleton = () => {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">
        {/* Header skeleton */}
        <Box sx={{ mb: 6 }}>
          <Skeleton variant="text" height={40} sx={{ mb: 1, width: "200px" }} />
          <Skeleton variant="text" height={24} width="400px" />
        </Box>

        {/* Team members skeleton */}
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Box>
                {/* Image skeleton */}
                <Skeleton
                  variant="rounded"
                  height={400}
                  sx={{ mb: 2, borderRadius: "0.75rem" }}
                />

                {/* Name skeleton */}
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />

                {/* Role skeleton */}
                <Skeleton variant="text" height={18} width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSkeleton;
