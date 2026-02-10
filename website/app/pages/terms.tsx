import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-6">شرایط و مقررات استفاده از خدمات</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-8">
            استفاده از خدمات هوش مارکت به منزله پذیرش کامل قوانین زیر است.
            لطفاً پیش از اتصال حساب دیجی‌کالا، این موارد را با دقت مطالعه نمایید.
          </p>
        </div>

        <div className="space-y-10">
          {/* Section 1 */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">۱. ماهیت خدمات</h2>
            <p className="text-slate-700 leading-8">
              هوش مارکت یک سامانه نرم‌افزاری جهت مدیریت و بهینه‌سازی اطلاعات محصولات
              فروشندگان دیجی‌کالا است. این پلتفرم صرفاً ابزار فنی ارائه می‌دهد و
              مسئولیت تصمیمات تجاری، قیمت‌گذاری، انتشار و مدیریت فروش به عهده
              کاربر می‌باشد.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">۲. فرآیند اتصال به دیجی‌کالا</h2>
            <p className="text-slate-700 leading-8 mb-4">
              برای فعال‌سازی خدمات، کاربر باید از طریق گزینه «اتصال به دیجی‌کالا»
              در پنل هوش مارکت اقدام نماید.
            </p>
            <ol className="list-decimal pr-6 space-y-2 text-slate-700 leading-8">
              <li>کاربر به بخش Service Hub در سامانه seller.digikala هدایت می‌شود.</li>
              <li>کاربر دسترسی لازم را تأیید می‌کند.</li>
              <li>توکن API حساب فروشنده به صورت رسمی برای هوش مارکت ارسال می‌شود.</li>
            </ol>
            <p className="text-slate-700 leading-8 mt-4">
              این دسترسی برای عملکرد صحیح سامانه ضروری است و بدون آن ارائه خدمات
              امکان‌پذیر نخواهد بود. کاربر می‌تواند در هر زمان از طریق دیجی‌کالا
              دسترسی را لغو نماید.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">۳. مسئولیت‌های کاربر</h2>
            <ul className="list-disc pr-6 space-y-2 text-slate-700 leading-8">
              <li>ثبت اطلاعات صحیح و قانونی</li>
              <li>بررسی نهایی محتوای تولیدشده پیش از انتشار</li>
              <li>حفظ امنیت حساب کاربری و دسترسی‌ها</li>
              <li>رعایت کامل قوانین و سیاست‌های دیجی‌کالا</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">۴. محدودیت‌های فنی</h2>
            <p className="text-slate-700 leading-8">
              عملکرد برخی قابلیت‌ها وابسته به محدودیت‌های API دیجی‌کالا، تغییرات
              ساختاری یا سیاست‌های آن پلتفرم و همچنین شرایط فنی خارج از کنترل
              هوش مارکت می‌باشد. در چنین مواردی مسئولیتی متوجه هوش مارکت نخواهد بود.
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">۵. موارد غیرمجاز</h2>
            <p className="text-slate-700 leading-8">
              هرگونه تلاش برای دور زدن محدودیت‌های دیجی‌کالا، استفاده غیرقانونی از
              سامانه، ارسال اطلاعات نادرست یا سوءاستفاده از دسترسی‌ها مجاز نبوده و
              می‌تواند منجر به تعلیق یا مسدودسازی حساب کاربری گردد.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">۶. به‌روزرسانی مقررات</h2>
            <p className="text-slate-700 leading-8">
              هوش مارکت حق دارد در هر زمان نسبت به اصلاح یا به‌روزرسانی این
              مقررات اقدام نماید. ادامه استفاده از خدمات به منزله پذیرش نسخه جدید
              خواهد بود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
