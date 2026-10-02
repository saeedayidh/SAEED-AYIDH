export const creatorTools=[
 {id:'username-generator',ar:'اسم مستخدم',en:'Username',desc:'اسمك ومجالك يلهمان اقتراحات يوزرات مرتبة.',descEn:'Turn your name and niche into clean username ideas.',symbol:'@'},
 {id:'hashtag-generator',ar:'توليد هاشتاق',en:'Generate Hashtag',desc:'اكتب موضوع المحتوى واختر الهاشتاقات المناسبة.',descEn:'Describe your content and select relevant hashtags.',symbol:'#'},
 {id:'image-compressor',ar:'ضغط الصورة',en:'Compress Image',desc:'اضغط صورتك وحدد حجم الملف المطلوب.',descEn:'Compress an image to your desired file size.',symbol:'↓'},
 {id:'qr-generator',ar:'توليد باركود',en:'Generate QR Code',desc:'حوّل رابط حسابك إلى باركود قابل للتنزيل.',descEn:'Create a downloadable QR code for your account link.',symbol:'▦'},
];

const toolOrder=['username-generator','qr-generator','hashtag-generator','image-compressor'];
creatorTools.sort((a,b)=>toolOrder.indexOf(a.id)-toolOrder.indexOf(b.id));
