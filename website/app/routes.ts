import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout/index.tsx", [
    index("pages/home.tsx"),
    route("/about", "pages/about.tsx"),
    route("/contact", "pages/contact.tsx"),
    route("/terms", "pages/terms.tsx"),
  ]),
] satisfies RouteConfig;
