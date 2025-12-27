import { Box, Container, Grid, Skeleton } from "@mui/material";

const StatsSkeleton = () => {
  return (
    <Box
      sx={{ py: 6, backgroundColor: "#f8fafc", borderY: "1px solid #e2e8f0" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                }}
              >
                {/* Icon and label skeleton */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width="70%" height={18} />
                </Box>

                {/* Value skeleton */}
                <Skeleton variant="text" height={32} width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSkeleton;
