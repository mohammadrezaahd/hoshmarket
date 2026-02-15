import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  // Public routes (غیر محافظت شده)
  route("/auth", "pages/auth.tsx"),
  route("/restricted", "pages/restricted.tsx"),

  // Protected routes (محافظت شده)
  layout("pages/protected-layout.tsx", [
    index("pages/dashboard.tsx"),
    route("digikala-redirect", "pages/digikala-redirect.tsx"),
    route("digikala_auth/connect", "pages/digikala-connect.tsx"),
    route("templates/new", "pages/templates/new.tsx"),
    route("templates/list", "pages/templates/list.tsx"),
    route("templates/edit", "pages/templates/edit.tsx"),
    route("gallery", "pages/gallery.tsx"),
    route("products/new", "pages/products/new.tsx"),
    route("products/quick", "pages/products/quick.tsx"),
    route("products/list", "pages/products/list.tsx"),
    route("products/edit/:id", "pages/products/edit.tsx"),
    route("ticketing", "pages/Ticketing/index.tsx"),
    route("pricing", "pages/pricing/pricing.tsx"),
    route("pricing/invoice", "pages/pricing/trxStatus.tsx"),
    route("transfer/new", "pages/transfer/new.tsx"),
    route("transfers/list", "pages/transfer/list.tsx"),
    route("test", "pages/test.tsx"),
    // Coming Soon Pages
    route("profile", "pages/profile.tsx"),
    route("settings", "pages/settings.tsx"),
    route("security", "pages/security.tsx"),
    route("help", "pages/help.tsx"),
    route("transportation", "pages/transportation.tsx"),
  ]),
] satisfies RouteConfig;
