import { Container, Typography, Button, Box } from "@mui/material";

export const meta = () => {
  return [
    { title: "صفحه اصلی - Hoshmarket" },
    { name: "description", content: "خوش آمدید به Hoshmarket" },
  ];
};

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          خوش آمدید به Hoshmarket
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          پلتفرم جامع فروش آنلاین
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" size="large" sx={{ mx: 1 }}>
            شروع کنید
          </Button>
          <Button variant="outlined" size="large" sx={{ mx: 1 }}>
            بیشتر بدانید
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
