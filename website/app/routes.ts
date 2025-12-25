import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  // Public routes
  index("pages/home.tsx"),
  route("/about", "pages/about.tsx"),
  route("/contact", "pages/contact.tsx"),
] satisfies RouteConfig;
