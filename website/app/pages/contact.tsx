import { Container, Typography, Box } from "@mui/material";

export const meta = () => {
  return [
    { title: "تماس با ما - Hoshmarket" },
    { name: "description", content: "با ما تماس بگیرید" },
  ];
};

export default function Contact() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        تماس با ما
      </Typography>
      <Typography variant="body1" paragraph>
        این صفحه تماس با ما است.
      </Typography>
    </Container>
  );
}
