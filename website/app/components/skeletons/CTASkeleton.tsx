import { Box, Container, Skeleton } from "@mui/material";

const CTASkeleton = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#f1f5f9", position: "relative" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 3,
            p: { xs: 4, md: 8 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Title skeleton */}
          <Skeleton
            variant="text"
            height={50}
            sx={{ mb: 2, mx: "auto", maxWidth: "400px" }}
          />

          {/* Description skeleton */}
          <Skeleton
            variant="text"
            height={24}
            sx={{ mb: 4, mx: "auto", maxWidth: "500px" }}
          />

          {/* Buttons skeleton */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Skeleton variant="rounded" width={150} height={48} />
            <Skeleton variant="rounded" width={150} height={48} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASkeleton;
