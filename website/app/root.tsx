import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Provider } from "react-redux";

import { ThemeProvider } from "./theme";
import { store } from "./store";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { IconButton, Box, Typography, Button, Container } from "@mui/material";

export const links = () => [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const queryClient = new QueryClient();

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
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                autoHideDuration={3000}
                action={(snackbarId) => (
                  <IconButton
                    size="small"
                    onClick={() => closeSnackbar(snackbarId)}
                    sx={{ color: "white" }}
                  >
                    <span>✕</span>
                  </IconButton>
                )}
              >
                {children}
              </SnackbarProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
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
