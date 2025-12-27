import { Box, Container, Skeleton } from "@mui/material";

const TestimonialsSkeleton = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: "#F0F9FF" }}>
      <Container maxWidth="lg">
        {/* Title skeleton */}
        <Skeleton
          variant="text"
          height={45}
          sx={{ mb: 8, mx: "auto", maxWidth: "300px" }}
        />

        {/* Carousel skeleton */}
        <Box sx={{ width: "100%", px: { xs: 2, md: 0 } }}>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
            {[1, 2, 3].map((index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 calc(33.333% - 20px)",
                  maxWidth: "380px",
                  minWidth: "280px",
                }}
              >
                <Skeleton
                  variant="rounded"
                  height={280}
                  sx={{ borderRadius: "1rem" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSkeleton;
