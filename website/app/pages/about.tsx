import { Container, Typography, Box } from "@mui/material";

export const meta = () => {
  return [
    { title: "درباره ما - Hoshmarket" },
    { name: "description", content: "درباره Hoshmarket بیشتر بدانید" },
  ];
};

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        درباره ما
      </Typography>
      <Typography variant="body1" paragraph>
        این صفحه درباره ما است.
      </Typography>
    </Container>
  );
}
