import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box dir="rtl" sx={{ scrollBehavior: "smooth" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
