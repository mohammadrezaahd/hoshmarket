# Hoshmarket Website

وب‌سایت عمومی Hoshmarket ساخته شده با React Router v7

## تکنولوژی‌ها

- 🚀 **React Router v7** - فریمورک React با SSR
- ⚡️ **Vite** - ابزار بیلد سریع
- 🎨 **Material-UI (MUI)** - کامپوننت‌های UI
- 🎯 **TypeScript** - Type safety
- 🌈 **Tailwind CSS v4** - استایل‌دهی
- 🔄 **Redux Toolkit** - مدیریت state
- 📡 **React Query** - مدیریت داده‌های سرور

## نصب

نصب dependencies:

```bash
npm install
```

## اجرا در حالت Development

اجرای سرور development با HMR:

```bash
npm run dev
```

برنامه در آدرس `http://localhost:5173` در دسترس خواهد بود.

## بیلد برای Production

ساخت بیلد production:

```bash
npm run build
```

## اجرا در Production

پس از بیلد، اجرای سرور:

```bash
npm run start
```

## استقرار با Docker

بیلد و اجرای Docker:

```bash
docker build -t hoshmarket-website .
docker run -p 3000:3000 hoshmarket-website
```

## ساختار پروژه

```
website/
├── app/
│   ├── pages/          # صفحات اپلیکیشن
│   ├── components/     # کامپوننت‌های قابل استفاده مجدد
│   ├── theme/          # تنظیمات MUI theme
│   ├── store/          # Redux store
│   ├── root.tsx        # Root component
│   ├── routes.ts       # تعریف route‌ها
│   └── app.css         # استایل‌های global
├── public/             # فایل‌های استاتیک
└── package.json
```

## Scripts

- `npm run dev` - اجرای development server
- `npm run build` - بیلد برای production
- `npm run start` - اجرای production server
- `npm run typecheck` - بررسی TypeScript

## لایسنس

Private
