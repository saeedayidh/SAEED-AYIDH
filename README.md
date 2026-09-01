# موقع سعيد بن عايض الرسمي

الموقع الرسمي لـ **سعيد بن عايض | Saeed Bin Ayidh** مع واجهة React/Vite ولوحة تحكم وخادم Node API.

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

لا توجد أي بيانات دخول افتراضية داخل الكود. أنشئ ملف `.env` محليًا بالاعتماد على `.env.example` ثم عيّن قيمًا خاصة بك:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=use-a-strong-unique-password-at-least-12-characters
SESSION_SECRET=use-a-long-random-secret-value
DATA_FILE=./data/data.json
CMS_DATA_FILE=./data/cms.json
```

لا ترفع ملف `.env` الحقيقي إلى GitHub ولا تشارك كلمة المرور أو أي API Key أو GitHub Token.

تسجيل الدخول يتم عبر السيرفر، والجلسة تستخدم Cookie موقعة من نوع `HttpOnly` مع `SameSite=Strict`، ويضاف `Secure` في بيئة الإنتاج.

## تخزين لوحة التحكم

محتوى لوحة التحكم لم يعد يعتمد على `localStorage` كمصدر دائم. القراءة والحفظ يتمان من خلال API الخادم، والاقتراحات/الرسائل تحفظ على الخادم ولا تظهر في واجهة CMS العامة.

إذا كان الاستضافة تستخدم نظام ملفات مؤقتًا (مثل إعداد Render بدون Persistent Disk)، يجب توجيه `DATA_FILE` و`CMS_DATA_FILE` إلى قرص دائم أو استخدام قاعدة بيانات؛ وإلا يمكن فقد تعديلات وقت التشغيل بعد إعادة النشر.

## هيكلة رئيسية

```text
server.js                  # خادم Node وواجهات API والحماية
lib/store.js               # بيانات الإدارة وتجزئة كلمة المرور
lib/sessions.js            # جلسات موقعة Stateless
lib/cms-store.js           # تخزين CMS على الخادم
src/                       # تطبيق React
src/context/CMSContext.tsx # حالة CMS والمصادقة والمزامنة مع API
src/pages/admin/           # صفحات لوحة التحكم
data/data.json             # بيانات الخادم غير السرية الحالية
public/                    # الأصول العامة
```

## فحوصات

GitHub Actions يشغل تثبيت الاعتماديات وفحص TypeScript وبناء Vite عند الدفع إلى `main`. راجع `SECURITY_NOTES.md` للتفاصيل الأمنية ومتطلبات الإنتاج.
