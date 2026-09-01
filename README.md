# موقع سعيد بن عايض الرسمي

الموقع الرسمي لـ **سعيد بن عايض | Saeed Bin Ayidh** مع واجهة React/Vite ولوحة تحكم وإعدادات محتوى.

## التشغيل المحلي

```bash
npm install
npm run dev
```

ولتشغيل نسخة الإنتاج بعد البناء:

```bash
npm run build
npm start
```

## إعداد حساب الإدارة

لا توجد أي بيانات دخول افتراضية داخل الكود.

أنشئ ملف `.env` محليًا بالاعتماد على `.env.example` ثم عيّن:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=use-a-strong-unique-password-at-least-12-characters
```

لا ترفع ملف `.env` الحقيقي إلى GitHub ولا تشارك كلمة المرور أو أي API Key أو GitHub Token.

تسجيل الدخول يتم عبر السيرفر، والجلسة تستخدم Cookie من نوع `HttpOnly` مع `SameSite=Strict`، ويضاف `Secure` في بيئة الإنتاج.

## متغيرات البيئة

راجع `.env.example` للمتغيرات المدعومة، ومنها:

- `PORT`
- `NODE_ENV`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `DATA_FILE`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `EMAIL_FROM`

## هيكلة رئيسية

```text
server.js                  # خادم Node وواجهات API
lib/store.js               # تخزين JSON وتجزئة كلمة المرور
lib/sessions.js            # جلسات الإدارة
src/                       # تطبيق React
src/context/CMSContext.tsx # حالة CMS والمصادقة
src/pages/admin/           # صفحات لوحة التحكم
data/data.json             # بيانات الخادم الحالية
public/                    # الأصول العامة
```

## ملاحظات أمنية

- لا توجد كلمة مرور إدارة ثابتة في الواجهة.
- لا يتم استخدام `localStorage` لإثبات تسجيل دخول الإدارة.
- توجد حماية أساسية من كثرة محاولات تسجيل الدخول.
- حساب الإدارة التجريبي القديم يتم تعطيله أثناء الترحيل.
- لا تضع أسرار الإنتاج داخل `data/data.json` أو المستودع العام.

راجع `SECURITY_NOTES.md` للتفاصيل والملاحظات المتبقية قبل اعتماد النظام كـ CMS إنتاجي كامل.
