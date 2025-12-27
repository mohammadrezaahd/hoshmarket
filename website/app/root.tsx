import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ThemeProvider } from "./theme";
import "./app.css";

import { Box, Typography, Button, Container } from "@mui/material";

export const links = () => [
  { rel: "icon", href: "/Hoshmarket.ico", type: "image/x-icon" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" gutterBottom>
            صفحه مورد نظر یافت نشد
          </Typography>
          <Button href="/" sx={{ mt: 2 }}>
            بازگشت به صفحه اصلی
          </Button>
        </Container>
      );
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h1" component="h1" gutterBottom color="error">
        خطا
      </Typography>
      <Typography variant="h5" gutterBottom>
        متأسفانه مشکلی پیش آمده است
      </Typography>
      <Box
        sx={{
          mt: 2,
          p: 2,
          bgcolor: "grey.100",
          borderRadius: 1,
          textAlign: "left",
        }}
      >
        <Typography variant="body2" component="pre">
          {error.message}
        </Typography>
      </Box>
      <Button href="/" sx={{ mt: 2 }}>
        بازگشت به صفحه اصلی
      </Button>
    </Container>
  );
}
