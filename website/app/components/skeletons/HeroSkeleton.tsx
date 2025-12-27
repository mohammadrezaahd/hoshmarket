import { Box, Container, Grid, Skeleton } from "@mui/material";

const HeroSkeleton = () => {
  return (
    <Box sx={{ pt: { xs: 16, md: 20 }, pb: { xs: 10, md: 14 }, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Badge skeleton */}
              <Skeleton
                variant="rounded"
                width={220}
                height={32}
                sx={{ borderRadius: "9999px" }}
              />

              {/* Title skeleton */}
              <Box>
                <Skeleton variant="text" height={50} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={50} />
              </Box>

              {/* Description skeleton */}
              <Box>
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} width="80%" />
              </Box>

              {/* Buttons skeleton */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={48}
                />
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={48}
                />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              variant="rounded"
              height={400}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSkeleton;
