import {
  ContentFieldItem,
  WorkFieldItem,
  ServiceItem,
  NewsItem,
  ToolItem,
  PortfolioItem,
  BlogPostItem
} from '../types';

export const siteData = {
  brand: {
    name: 'سعيد بن عايض',
    nameEnglish: 'SAEED BIN AYIDH',
    domain: 'www.saeedbinayidh.com',
    email: 'hello@saeedbinayidh.com',
    whatsapp: '+966500000000',
    bio: 'صانع محتوى ومطور أعمال، أعمل في صناعة المحتوى والتسويق والذكاء الاصطناعي وبناء التجارب والواجهات الرقمية.',
    footerMotto: 'العلامة الرقمية الشخصية لسعيد بن عايض — الابتكار في صناعة المحتوى، تطوير الأعمال والحلول الذكية.',
    socials: {
      x: 'https://x.com',
      instagram: 'https://instagram.com',
      tiktok: 'https://tiktok.com',
      snapchat: 'https://snapchat.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    }
  },

  contentFields: [
    {
      id: 'sheylat',
      slug: 'poems',
      title: 'سعيد بن عايض',
      description: 'محتوى القصائد والشيلات والأعمال الصوتية والمحتوى الشعري المتميز بأعلى جودة إنتاجية.',
      intro: 'مساحة خاصة تحتفي بالأصالة الشعرية، والأداء الصوتي الرفيع، والمحتوى المسموع الذي يلامس المشاعر.',
      image: '/assets/saeed_bin_ayidh_banner.webp',
      categoryTag: 'أعمال صوتية وشعر',
      fullContent: `في مجال القصائد والشيلات، نسعى إلى تقديم تجربة مسموعة استثنائية تمزج بين جمال الكلمة والشعر الأصيل، وبين الهندسة الصوتية والتوزيع الحديث. يتم التعامل مع كل قصيدة وشيلة كعمل فني مستقيل يتم ضبط إيقاعه وتصويره أو إنتاجه برؤية سينمائية تناسب الذائقة العربية.`,
      galleryImages: [
        '/assets/content_sheylat.png',
        '/assets/content_stories.png',
        '/assets/content_vlogs.png'
      ],
      videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'شيلة احترافية سينمائية — إنتاج لسعيد بن عايض'
        }
      ],
      externalLinks: [
        { title: 'استمع للقصائد على ساوند كلاود', url: 'https://soundcloud.com', type: 'external', badge: 'صوتيات' },
        { title: 'مشاهدة الأعمال على يوتيوب', url: 'https://youtube.com', type: 'external', badge: 'فيديو' }
      ],
      socialLinks: [
        { title: 'حساب الشيلات على تيك توك', url: 'https://tiktok.com', type: 'social' }
      ],
      featuredItems: [
        'قصيدة في حب الوطن والحضارة',
        'شيلة فخر الأصالة',
        'جلسات شعرية خاصة'
      ]
    },
    {
      id: 'vlogs',
      slug: 'vlogs',
      title: 'فلوقات سعيد',
      description: 'فلوقات وتجارب وتغطيات ومحتوى يومي وترفيهي يوثق اللحظات بأسلوب سينمائي مبتكر.',
      intro: 'توثيق بصري تفاعلي يأخذ المتابع في رحلة استكشافية بين الفعاليات، التكنولوجيا، والتجارب اليومية الملهمة.',
      image: 'https://gcdn.picsart.com/editing-temp/e8ef5eca-09a1-4efc-8e32-8204aa9b3545.jpeg',
      categoryTag: 'تغطيات وسرد يومي',
      fullContent: `تقدم الفلوقات والتغطيات نظرة كواليس واقعية وممتعة، حيث يتم توثيق المؤتمرات، المعارض، الرحلات الميدانية، وتجارب التكنولوجيا بطريقة مشوقة وسريعة الإيقاع تعتمد على زوايا تصوير حديثة ومونتاج ديناميكي.`,
      galleryImages: [
        '/assets/content_vlogs.png',
        '/assets/client_abaad.png',
        '/assets/client_namoo.png'
      ],
      videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'فلوق كواليس إطلاق المشروع الجديد'
        }
      ],
      externalLinks: [
        { title: 'سلسلة الفلوقات الكاملة على يوتيوب', url: 'https://youtube.com', type: 'external', badge: 'قناة يوتيوب' }
      ],
      featuredItems: [
        'فلوق المؤتمر التقني الدولي',
        'رحلة استكشاف الذكاء الاصطناعي',
        'يوم في حياة مطور أعمال'
      ]
    },
    {
      id: 'stories',
      slug: 'stories',
      title: 'قصص سعيد',
      description: 'قصص سردية ومحتوى قصصي، مع تركيز على القصص المشوقة والمرعبة والروايات الملهمة.',
      intro: 'فن الحبك والرواية، حيث تتحول الكلمات والحكايات إلى مشاهد بصرية وصوتية تأسر الألباب.',
      image: 'https://gcdn.picsart.com/editing-temp/e57c8a31-35c1-41a9-8873-3324534322d3.jpeg',
      categoryTag: 'سرد وروايات',
      fullContent: `صناعة السرد القصصي تعتمد على اختيار القصص المؤثرة، سواء كانت تجارب إنسانية ملهمة، أو حكايات تاريخية، أو قصص تشويق وغموض، وإخراجها بصوت مؤثر ومؤثرات صوتية محيطية توفر اندماجاً كاملاً للمستمع والمشاهد.`,
      galleryImages: [
        '/assets/content_stories.png',
        '/assets/tool_prompts.png',
        '/assets/content_sheylat.png'
      ],
      videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'قصة ملهمة من التاريخ الرقمي'
        }
      ],
      externalLinks: [
        { title: 'مكتبة البودكاست والقصص', url: 'https://spotify.com', type: 'external', badge: 'بودكاست' }
      ],
      featuredItems: [
        'سلسلة قصص النجاح الرقمي',
        'حكايات من الماضي والحاضر',
        'قصص الرعب والغموض'
      ]
    },
    {
      id: 'gaming',
      slug: 'gaming',
      title: 'الألعاب والترفيه',
      description: 'محتوى ألعاب وتجارب وتحديات ومحتوى ترفيهي متعلق بعالم الألعاب والتفاعل الذكي.',
      intro: 'تغطيات وتجارب لأحدث الألعاب، مع تحديات ممتعة، ومراجعات للأجهزة والتقنيات الترفيهية.',
      image: '/assets/content_gaming.png',
      categoryTag: 'ترفيه وتحديات',
      fullContent: `عالم الألعاب التفاعلية يتطلب دمج بين مهارة اللعب والتواصل مع الجمهور، تقديم مراجعات محايدة للألعاب والأجهزة، وإقامة تحديات ومباريات تفاعلية تبني مجتمعاً شغوفاً بالتقنية والترفيه.`,
      galleryImages: [
        '/assets/content_gaming.png',
        '/assets/tool_watch.png',
        '/assets/tool_shortcuts.png'
      ],
      videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'تجربة وتحدي أحدث لعبة تقنية'
        }
      ],
      externalLinks: [
        { title: 'بث مباشر ومقاطع تيك توك', url: 'https://tiktok.com', type: 'external', badge: 'بث مباشر' }
      ],
      featuredItems: [
        'مراجعة شاشات القيمنق',
        'تحدي 24 ساعة في الألعاب',
        'أفضل تجميعات الكمبيوتر'
      ]
    }
  ] as ContentFieldItem[],

  workFields: [
    {
      id: 'digital-marketing',
      title: 'التسويق الرقمي',
      description: 'التخطيط للحملات، صناعة المحتوى التسويقي، تطوير الحضور الرقمي وتنمية العلامات التجارية.',
      iconName: 'TrendingUp'
    },
    {
      id: 'biz-dev',
      title: 'تطوير الأعمال',
      description: 'تطوير الأفكار والمشاريع، بناء الاستراتيجيات، وتحسين المنتجات والخدمات للنمو المستمر.',
      iconName: 'Briefcase'
    },
    {
      id: 'ai-solutions',
      title: 'الذكاء الاصطناعي',
      description: 'استخدام أدوات وحلول الذكاء الاصطناعي لتطوير الأعمال والمحتوى والعمليات التلقائية.',
      iconName: 'Cpu'
    },
    {
      id: 'ui-ux',
      title: 'بناء الواجهات',
      description: 'تصميم وبناء واجهات وتجارب رقمية عصرية ومتحولة للمواقع والتطبيقات.',
      iconName: 'Layout'
    },
    {
      id: 'coverages',
      title: 'التغطيات',
      description: 'تغطية المؤتمرات والفعاليات والمناسبات وتصوير المحتوى الميداني باحترافية عالية.',
      iconName: 'Camera'
    }
  ] as WorkFieldItem[],

  serviceCategories: ['الكل','سعيد ديزاين','سعيد مانجر','سعيد كونتنت','سعيد كلاود'],

  services: [
    { id:'saeed-design-logo', title:'تصميم شعار', description:'تصميم شعار بصري مميز يعكس هوية المشروع ويمنحه حضوراً احترافياً.', longDescription:'خدمة تصميم شعار مخصصة لبناء هوية بصرية واضحة ومميزة للمشروع أو العلامة. يتم تصميم الشعار بما يتناسب مع طبيعة النشاط والجمهور المستهدف، مع الاهتمام بالبساطة والوضوح وقابلية استخدامه في مختلف المنصات الرقمية والتطبيقات البصرية.', price:'250 ر.س', category:'خدمات سعيد ديزاين', features:['تصميم مخصص لطبيعة المشروع','مظهر احترافي وواضح','مناسب للاستخدام الرقمي','قابل للاستخدام على مختلف المقاسات'] },
    { id:'saeed-design-banner', title:'تصميم بنر', description:'تصميم بنر احترافي مناسب للمواقع والمنصات الرقمية والحملات الإعلانية.', longDescription:'تصميم بنر بصري احترافي يخدم الهدف المطلوب سواء للموقع الإلكتروني أو منصات التواصل أو الحملات الرقمية، مع تنظيم النصوص والعناصر البصرية بشكل واضح ومتناسق مع هوية المشروع.', price:'85 ر.س', category:'خدمات سعيد ديزاين', features:['تصميم متناسق مع الهوية','ترتيب احترافي للعناصر','مناسب للمنصة المطلوبة','جاهز للاستخدام والنشر'] },
    { id:'saeed-design-post', title:'تصميم بوست', description:'تصميم منشور بصري مرتب وجذاب للنشر على منصات التواصل الاجتماعي.', longDescription:'تصميم منشور مخصص لمنصات التواصل الاجتماعي يركز على إيصال الرسالة بشكل واضح وجذاب، مع مراعاة هوية الحساب وطبيعة المحتوى والمقاس المناسب للمنصة المستهدفة.', price:'55 ر.س', category:'خدمات سعيد ديزاين', features:['تصميم مخصص للمحتوى','متناسق مع هوية الحساب','مقاس مناسب للمنصة','جاهز للنشر'] },
    { id:'saeed-design-story', title:'تصميم خلفية ستوري', description:'تصميم خلفية ستوري متناسقة وجاهزة للنشر على منصات التواصل الاجتماعي.', longDescription:'تصميم خلفية ستوري بمقاس عمودي مناسب لمنصات التواصل، مع توزيع بصري مرتب للعناصر والحفاظ على وضوح المحتوى وهوية الحساب أو المناسبة.', price:'45 ر.س', category:'خدمات سعيد ديزاين', features:['مقاس مخصص للستوري','تصميم متناسق مع الهوية','تنظيم واضح للعناصر','جاهز للنشر'] },
    { id:'saeed-design-ui', title:'تصميم واجهة مستخدم', description:'تصميم واجهة مستخدم عصرية ومنظمة تركز على وضوح المحتوى وسهولة الاستخدام.', longDescription:'تصميم واجهة مستخدم عصرية للمواقع أو المنصات الرقمية، مع بناء تصور بصري منظم يركز على سهولة الاستخدام ووضوح المحتوى وتسلسل العناصر بما يناسب هوية المشروع وتجربة المستخدم.', price:'1,350 ر.س', category:'خدمات سعيد ديزاين', features:['تصميم واجهة عصرية','تنظيم تجربة المستخدم','توزيع واضح للمحتوى','تصميم متجاوب بصرياً مع الأجهزة'] },
    { id:'saeed-manager-social', title:'إدارة حسابات سوشل ميديا', description:'إدارة وتنظيم حسابات التواصل الاجتماعي ومتابعة النشر والحضور الرقمي.', longDescription:'إدارة حسابات التواصل الاجتماعي بهدف تنظيم الحضور الرقمي واستمرارية النشر ومتابعة المحتوى، مع المحافظة على أسلوب وهوية الحساب وتنظيم العمل اليومي الخاص بالمنصات.', price:'1,700 ر.س', category:'خدمات سعيد مانجر', features:['تنظيم الحسابات والمحتوى','متابعة النشر','المحافظة على هوية الحساب','إدارة الحضور الرقمي'] },
    { id:'saeed-manager-store', title:'إدارة متجر إلكتروني', description:'إدارة وتنظيم المتجر الإلكتروني ومتابعة المحتوى والمنتجات والعمليات اليومية.', longDescription:'إدارة وتنظيم المتجر الإلكتروني ومتابعة عناصره الأساسية، بما يشمل المحتوى والمنتجات والأقسام والعمليات اليومية المرتبطة بإدارة المتجر والحفاظ على ترتيب تجربة العميل.', price:'1,000 ر.س', category:'خدمات سعيد مانجر', features:['تنظيم المنتجات','متابعة أقسام المتجر','إدارة المحتوى','متابعة العمليات الأساسية للمتجر'] },
    { id:'saeed-manager-content-month', title:'إدارة محتوى حساب واحد لمدة شهر', description:'إدارة محتوى حساب واحد لمدة شهر من خلال تنظيم وجدولة ومتابعة المحتوى المنشور.', longDescription:'إدارة محتوى حساب واحد لمدة شهر كامل، مع تنظيم وجدولة المحتوى ومتابعة استمرارية النشر وترتيب المواد بما يتناسب مع طبيعة الحساب والجمهور المستهدف.', price:'950 ر.س', category:'خدمات سعيد مانجر', features:['إدارة لمدة شهر','تنظيم المحتوى','جدولة النشر','متابعة استمرارية الحساب'] },
    { id:'saeed-content-ad-idea', title:'كتابة فكرة إعلان', description:'ابتكار فكرة إعلانية واضحة ومناسبة للمنتج أو الخدمة والهدف من الإعلان.', longDescription:'ابتكار فكرة إعلان مبنية على المنتج أو الخدمة والهدف الإعلاني، مع صياغة تصور واضح للفكرة وطريقة تقديمها بما يساعد على تحويلها إلى إعلان قابل للتنفيذ.', price:'550 ر.س', category:'خدمات سعيد كونتنت', features:['فكرة مخصصة للمنتج أو الخدمة','تحديد اتجاه الإعلان','تصور واضح للتنفيذ','مناسبة للهدف الإعلاني'] },
    { id:'saeed-content-idea', title:'كتابة فكرة محتوى', description:'ابتكار فكرة محتوى مناسبة للمنصة والجمهور والهدف المطلوب من المحتوى.', longDescription:'ابتكار فكرة محتوى مخصصة للحساب أو المشروع بناءً على المنصة والجمهور والهدف، مع تقديم فكرة واضحة قابلة للتحويل إلى محتوى فعلي للنشر.', price:'250 ر.س', category:'خدمات سعيد كونتنت', features:['فكرة مخصصة للحساب','مناسبة للمنصة','مراعاة الجمهور المستهدف','قابلة للتنفيذ والنشر'] },
    { id:'saeed-content-script', title:'كتابة السكربت', description:'كتابة سكربت منظم وجاهز للتنفيذ بما يتناسب مع فكرة وهدف المحتوى.', longDescription:'كتابة سكربت منظم للمحتوى أو الإعلان يحدد تسلسل الفكرة والمشاهد أو النص المطلوب، بحيث يكون واضحاً وجاهزاً للاستخدام أثناء مرحلة التنفيذ والتصوير.', price:'450 ر.س', category:'خدمات سعيد كونتنت', features:['تسلسل واضح للفكرة','تنظيم المشاهد أو النص','مخصص لهدف المحتوى','جاهز للتنفيذ'] },
    { id:'saeed-content-ad-video', title:'تصوير مقطع إعلاني', description:'تصوير مقطع إعلاني بصري يبرز المنتج أو الخدمة بطريقة مناسبة للمنصات الرقمية.', longDescription:'تنفيذ تصوير مقطع إعلاني يركز على إبراز المنتج أو الخدمة بصرياً وفق الفكرة المحددة، مع الاهتمام بتكوين المشاهد وطريقة عرض المحتوى بما يناسب الاستخدام الإعلاني والمنصات الرقمية.', price:'1,350 ر.س', category:'خدمات سعيد كونتنت', features:['تصوير مخصص للإعلان','إبراز المنتج أو الخدمة','تنفيذ المشاهد حسب الفكرة','مناسب للمنصات الرقمية'] },
    { id:'saeed-content-event-coverage', title:'تغطية مؤتمرات أو فعاليات', description:'تغطية ميدانية للمؤتمرات أو الفعاليات وتوثيق أبرز اللحظات والمحتوى.', longDescription:'تغطية وتصوير المؤتمرات أو الفعاليات ميدانياً بهدف توثيق أبرز اللحظات والتفاصيل المهمة وإنتاج مادة بصرية مناسبة للنشر واستخدامها في حسابات الجهة أو المشروع.', price:'370 ر.س', category:'خدمات سعيد كونتنت', features:['تغطية ميدانية','توثيق أبرز اللحظات','تصوير محتوى الفعالية','محتوى مناسب للنشر'] },
    { id:'saeed-cloud-website', title:'برمجة موقع إلكتروني', description:'برمجة موقع إلكتروني متجاوب ومنظم بما يتناسب مع احتياج المشروع ومحتواه.', longDescription:'برمجة وتطوير موقع إلكتروني بواجهة عصرية ومنظمة وفق احتياج المشروع، مع الاهتمام بتجربة الاستخدام وعرض المحتوى بصورة واضحة ودعم التصفح على الجوال والكمبيوتر.', price:'2,300 ر.س', category:'خدمات سعيد كلاود', features:['واجهة عصرية ومنظمة','متجاوب مع الجوال والكمبيوتر','بناء حسب احتياج المشروع','تنظيم واضح للمحتوى والصفحات'] },
    { id:'saeed-cloud-landing', title:'برمجة صفحة هبوط', description:'برمجة صفحة هبوط مركزة لعرض خدمة أو منتج أو حملة بشكل واضح ومتجاوب.', longDescription:'برمجة صفحة هبوط مخصصة لخدمة أو منتج أو حملة، مع ترتيب المحتوى والعناصر بشكل مركز يساعد الزائر على فهم العرض والوصول إلى الإجراء المطلوب بسهولة.', price:'850 ر.س', category:'خدمات سعيد كلاود', features:['صفحة مخصصة للعرض','تصميم متجاوب','ترتيب واضح للمحتوى','تركيز على الإجراء المطلوب'] },
    { id:'saeed-cloud-links', title:'برمجة موقع يجمع روابط حساباتك', description:'برمجة صفحة شخصية تجمع روابط حساباتك ومنصاتك في مكان واحد مرتب وسهل الوصول.', longDescription:'برمجة موقع شخصي مبسط يجمع روابط الحسابات والمنصات في صفحة واحدة منظمة، لتسهيل وصول الجمهور إلى جميع حساباتك من رابط واحد يعمل بشكل مناسب على الجوال والكمبيوتر.', price:'230 ر.س', category:'خدمات سعيد كلاود', features:['جمع الحسابات في رابط واحد','واجهة مرتبة وسهلة','متجاوب مع مختلف الأجهزة','سهولة الوصول إلى المنصات'] }
  ] as ServiceItem[],

  tools: [
    {
      id: 't1',
      slug: 'ai-prompts-library',
      name: 'مكتبة برومبت الذكاء الاصطناعي الاحترافية',
      category: 'البرومبت',
      image: '/assets/tool_prompts.png',
      link: '/tools/ai-prompts-library',
      description: 'مجموعة متكاملة من الأوامر النصية (Prompts) المجهزة خصيصاً لتوليد الصور السينمائية والنصوص الإعلانية.',
      whatItDoes: 'تساعدك المكتبة على كتابة أوامر دقيقة لـ Midjourney و ChatGPT و DALL-E للحصول على مخرجات احترافية في ثوانٍ.',
      howToUse: [
        'اختر التصنيف المطلوب (صور، سيناريو، إعلانات).',
        'انسخ النمط النصي باستخدام زر النسخ السريع.',
        'الصق البرومبت في أداة الذكاء الاصطناعي مع تعديل الكلمات المفتاحية الخاصة بمشروعك.'
      ],
      screenshots: [
        '/assets/tool_prompts.png',
        '/assets/tool_filters.png'
      ],
      downloadUrl: 'https://saeedbinayidh.com/prompts-pack.zip',
      promptText: 'A high-end cinematic studio portrait of a visionary Saudi innovator, warm dramatic lighting, 8k resolution, photorealistic, cinematic red ambient backlight --ar 16:9 --v 6.0',
      requirements: ['حساب في ChatGPT أو Midjourney'],
      compatibility: ['جميع المنصات', 'المتصفح', 'التطبيق'],
      relatedToolsSlugs: ['cinematic-lightroom-filter', 'content-[#1]-shortcut']
    },
    {
      id: 't2',
      slug: 'sba-classic-watchface',
      name: 'واجهة ساعة SBA الكلاسيكية',
      category: 'واجهات الساعات',
      image: '/assets/tool_watch.png',
      link: '/tools/sba-classic-watchface',
      description: 'تصميم راقٍ وعصري لواجهة ساعة Apple Watch بالساعات الرقمية والعنابية اللامعة.',
      whatItDoes: 'تمنح ساعتك مظهرًا فخماً يتوافق مع الهوية العنابية لسعيد بن عايض، مع عرض الوقت، الطقس، والخطوات.',
      howToUse: [
        'حمل ملف الواجهة عبر الرابط المباشر.',
        'افتح الملف على جهاز الآيفون الخاص بك.',
        'اختر إضافة الواجهة لتطبيق Clockology أو Apple Watch.'
      ],
      screenshots: [
        '/assets/tool_watch.png'
      ],
      downloadUrl: 'https://saeedbinayidh.com/sba-watchface.clock',
      watchFaceCompatibility: ['Apple Watch Series 4+', 'Apple Watch Ultra', 'Clockology App'],
      requirements: ['تطبيق Clockology أو iOS 16+'],
      relatedToolsSlugs: ['sba-4k-wallpaper', 'cinematic-lightroom-filter']
    },
    {
      id: 't3',
      slug: 'sba-4k-wallpaper',
      name: 'خلفية الجوال العنابية 4K',
      category: 'خلفيات الجوال',
      image: '/assets/tool_wallpapers.png',
      link: '/tools/sba-4k-wallpaper',
      description: 'خلفيات دقة فائقة 4K بدقة ألوان عنابية وسوداء فائقة الوضوح لكافة أنواع الجوالات.',
      whatItDoes: 'توفر مظهرًا سينمائيًا هادئًا لشاشة القفل والشاشة الرئيسية لجوالك.',
      howToUse: [
        'اضغط على زر التنزيل بالدقة الكاملة 4K.',
        'احفظ الصورة في ألبوم الصور.',
        'عيّن الصورة كخلفية لشاشة القفل أو الرئيسية.'
      ],
      screenshots: [
        '/assets/tool_wallpapers.png'
      ],
      downloadUrl: '/assets/tool_wallpapers.png',
      wallpaperResolution: '3840 x 2160 pixels (4K Ultra HD)',
      compatibility: ['iPhone 15 / 14 / 13 / Pro Max', 'Samsung Galaxy S24 / Ultra', 'Android'],
      relatedToolsSlugs: ['sba-classic-watchface', 'cinematic-lightroom-filter']
    },
    {
      id: 't4',
      slug: 'cinematic-lightroom-filter',
      name: 'فلتر لايت روم السينمائي الداكن',
      category: 'الفلاتر',
      image: '/assets/tool_filters.png',
      link: '/tools/cinematic-lightroom-filter',
      description: 'بريست وفلتر احترافي لتطبيق Lightroom لإعطاء الصور والبورتريه لمسة سوداء وعنابية سينمائية.',
      whatItDoes: 'يضبط درجات الظلال والتنوع اللوني للصور ليمنحها طابعاً درامياً ومحترفاً بنقرة واحدة.',
      howToUse: [
        'تنزيل ملف البريست DNG.',
        'استيراد الصورة في تطبيق Lightroom Mobile.',
        'نسخ الإعدادات وتطبيقها على أي صورة.'
      ],
      screenshots: [
        '/assets/tool_filters.png'
      ],
      downloadUrl: 'https://saeedbinayidh.com/sba-cinematic.dng',
      filterBeforeAfter: {
        before: '/assets/content_vlogs.png',
        after: '/assets/tool_filters.png'
      },
      requirements: ['تطبيق Adobe Lightroom Mobile المجاني'],
      relatedToolsSlugs: ['ai-prompts-library', 'sba-4k-wallpaper']
    },
    {
      id: 't5',
      slug: 'unified-social-page',
      name: 'صفحة الحسابات الموحدة',
      category: 'صفحة حسابات',
      image: '/assets/tool_social.png',
      link: '/tools/unified-social-page',
      description: 'قالب وحل عصري لبناء صفحة هبوط موحدة تضم جميع روابط حساباتك في مكان واحد.',
      whatItDoes: 'تساعد صناع المحتوى على توجيه المتابعين لكافة منصاتهم وتسهيل الاتصال والوصول.',
      howToUse: [
        'معاينة تصميم القالب الموحد.',
        'تعديل الروابط والمعلومات الشخصية.',
        'نشر الصفحة على رابطك الخاص.'
      ],
      screenshots: [
        '/assets/tool_social.png'
      ],
      downloadUrl: 'https://saeedbinayidh.com/social-template.zip',
      compatibility: ['جميع المتصفحات والمنصات'],
      relatedToolsSlugs: ['ai-prompts-library', 'sba-classic-watchface']
    },
    {
      id: 't6',
      slug: 'content-shortcut',
      name: 'اختصار أتمتة حفظ المحتوى وتنسيقه',
      category: 'الاختصارات',
      image: '/assets/tool_shortcuts.png',
      link: '/tools/content-shortcut',
      description: 'اختصار وتطبيق مجاني لآيفون وباد لضغط الصور وحفظ الفيديوهات من منصات المحتوى سريعا.',
      whatItDoes: 'يسرّع عملية حفظ الوسائط وتنسيق النصوص بضغطة زر واحدة من قائمة المشاركة.',
      howToUse: [
        'اضغط رابط تثبيت الاختصار في الآيفون.',
        'وافق على إضافة الاختصار في تطبيق Shortcuts.',
        'استخدم الاختصار مباشرة من أي تطبيق عبر زر المشاركة.'
      ],
      screenshots: [
        '/assets/tool_shortcuts.png'
      ],
      downloadUrl: 'https://icloud.com/shortcuts/sample',
      shortcutSetupGuide: [
        'تأكد من تفعيل الاختصارات غير الموثوقة من إعدادات الآيفون.',
        'انقر فوق رابط التثبيت واضغط إضافة.',
        'اختر الفيديو أو الصورة واضغط مشاركة > اختيار الاختصار.'
      ],
      requirements: ['جهاز iOS 15 أو أحدث'],
      relatedToolsSlugs: ['ai-prompts-library', 'cinematic-lightroom-filter']
    }
  ] as ToolItem[],

  portfolio: [
    {
      id: 'work-namoo',
      slug: 'work-namoo',
      title: 'تطوير واجهة وتجربة منصة نمو التعليمية',
      clientName: 'منصة نمو',
      category: 'التطوير',
      tagline: 'تجربة تعليمية وتفاعلية عصرية لإثراء المحتوى العربي',
      description: 'بناء منصة تعليمية متكاملة وتطوير الهوية الرقمية وتجربة المستثمرين والطلاب.',
      year: '2026',
      logoImage: '/assets/client_namoo.png',
      projectImage: '/assets/client_namoo.png',
      overview: 'كان الهدف من مشروع منصة نمو هو إعادة بناء التجربة الرقمية للطلاب والمدربين، وتصميم واجهة تعليمية جذابة وسريعة تضمن استمرار الطلاب وتفاعلهم مع الدورات.',
      challenge: 'صعوبة الواجهة السابقة وانخفاض معدل استكمال الدورات بسبب صعوبة التصفح وعدم توافق التطبيق مع الأجهزة المختلفة.',
      myRole: 'قائد فريق التكتيك والتطوير وتصميم تجربة المستخدم UI/UX.',
      delivered: [
        'إعادة بناء الواجهة بالكامل باستخدام React و Tailwind CSS',
        'تطوير مشغل فيديو تفاعلي يدعم السرعات المتعددة ومتابعة التقدم',
        'إضافة نظام الشهادات التلقائية والاختبارات التفاعلية',
        'تحسين سرعة التصفح وتوافق الجوال بنسبة 100%'
      ],
      processSteps: [
        { title: '1. دراسة الجمهور', desc: 'تحليل سلوك أكثر من 5,000 طالب ومعرفة نقاط التعثر.' },
        { title: '2. تصميم النماذج الأولية', desc: 'بناء نماذج تفاعلية Wireframes واختبارها مع المستخدمين.' },
        { title: '3. البرمجة والإطلاق', desc: 'تطوير الواجهة بأعلى معايير الأداء والسرعة.' }
      ],
      results: [
        'ارتفاع معدل استكمال الدورات بنسبة 65%',
        'زيادة عدد المشتركين الجدد بنسبة 120% خلال أول 3 أشهر',
        'تقليل سرعة التحميل إلى أقل من 1.2 ثانية'
      ],
      galleryImages: [
        '/assets/client_namoo.png',
        '/assets/client_bayt.png',
        '/assets/client_noqta.png'
      ],
      videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'عرض حالة الدراسة لمشروع منصة نمو'
        }
      ],
      externalLinks: [
        { title: 'زيارة موقع منصة نمو', url: 'https://namoo.com', type: 'external', badge: 'موقع حي' }
      ],
      services: ['بناء الواجهات', 'تطوير الأعمال', 'تجربة المستخدم UI/UX'],
      relatedWorkSlugs: ['work-bayt', 'work-noqta']
    },
    {
      id: 'work-abaad',
      slug: 'work-abaad',
      title: 'تغطية واستراتيجية التسويق لشركة أبعاد',
      clientName: 'شركة أبعاد',
      category: 'التغطيات',
      tagline: 'حملة تسويقية ميدانية ورقمية لتدشين المشاريع العقارية الكبرى',
      description: 'تغطية ميدانية وإدارة الحملة التسويقية الخاصة بتدشين المشاريع العصرية.',
      year: '2026',
      logoImage: '/assets/client_abaad.png',
      projectImage: '/assets/client_abaad.png',
      overview: 'تغطية ميدانية واستراتيجية إنتاج محتوى سينمائي لافتتاح المجمع التجاري والعقاري لشركة أبعاد، وإبراز تفاصيل المعمار والخدمات الممتازة.',
      challenge: 'الحاجة إلى لقطات احترافية وتغطية سريعة للمشروع ونشرها في نفس يوم التدشين لإحداث تأثير انتشار قوي.',
      myRole: 'إخراج التغطية الميدانية، إدارة التصوير، وصناعة الفيديوهات الإعلانية.',
      delivered: [
        'إنتاج 10 مقاطع فيديو قصيرة للمنصات الرقمية',
        'تغطية جوية وميدانية بكاميرات سينمائية',
        'إدارة الحملة الإعلانية على تيك توك وسناب شات'
      ],
      results: [
        'تحقيق أكثر من 2.5 مليون مشاهدة في 48 ساعة',
        'بيع 80% من الوحدات المطروحة في يوم التدشين'
      ],
      galleryImages: [
        '/assets/client_abaad.png',
        '/assets/client_deraah.png'
      ],
      relatedWorkSlugs: ['work-deraah', 'work-masar']
    },
    {
      id: 'work-noqta',
      slug: 'work-noqta',
      title: 'تصميم وبناء متجر نقطة الإلكتروني',
      clientName: 'متجر نقطة',
      category: 'التطوير',
      tagline: 'متجر إلكتروني عصري سريع التحويل عالي الأداء',
      description: 'تصميم واجهة متجر وتجربة شراء سريعة وعالية التحويل للمنتجات.',
      year: '2025',
      logoImage: '/assets/client_noqta.png',
      projectImage: '/assets/client_noqta.png',
      overview: 'بناء وتصميم متجر تجاري لبيع المنتجات التقنية مع التركيز على عملية الدفع السريعة وحث المستهلك على الشراء.',
      challenge: 'تقليل خطوات الشراء وتوفير تجربة تسوق سلسة للجوال.',
      myRole: 'تصميم UI/UX وتطوير المتجر.',
      delivered: [
        'تصميم متجر متجاوب كلياً',
        'ربط بوابات الدفع الإلكترونية السريعة Apple Pay',
        'تحسين سرعة الصفحات ومعدل التحويل'
      ],
      results: [
        'زيادة نسبة التحويل بنسبة 40%',
        'تقليل سلة الشراء المتروكة بنسبة 30%'
      ],
      galleryImages: [
        '/assets/client_noqta.png',
        '/assets/client_bayt.png'
      ],
      relatedWorkSlugs: ['work-namoo', 'work-bayt']
    },
    {
      id: 'work-masar',
      slug: 'work-masar',
      title: 'صناعة واستراتيجية محتوى شركة مسار',
      clientName: 'شركة مسار',
      category: 'المحتوى',
      description: 'صناعة المحتوى التوعوي والإستراتيجي وبناء ثقة الجمهور وصناعة الهوية.',
      year: '2025',
      logoImage: '/assets/client_masar.png',
      projectImage: '/assets/client_masar.png',
      overview: 'صناعة ونشر المحتوى الاستراتيجي لتوضيح خدمات الشركة وبناء مجتمع من العملاء المهتمين.',
      challenge: 'تبسيط المفاهيم المعقدة وتحويلها إلى محتوى تفاعلي سريع الفهم.',
      myRole: 'مستشار المحتوى وإعداد السيناريوهات.',
      delivered: [
        'خطة محتوى شهرية شاملة',
        'إنتاج 20 فيديو توعوي قصير',
        'إدارة التفاعل وإطلاق المسابقات'
      ],
      results: [
        'نمو عدد المتابعين بـ 45,000 متابع محلي',
        'ارتفاع نسبة التفاعل مع منشورات الشركة 3 أضعاف'
      ],
      galleryImages: [
        '/assets/client_masar.png'
      ],
      relatedWorkSlugs: ['work-abaad', 'work-deraah']
    },
    {
      id: 'work-bayt',
      slug: 'work-bayt',
      title: 'تطوير منصة وتطبيق بيت العرب',
      clientName: 'منصة بيت العرب',
      category: 'التطوير',
      description: 'تطوير واجهة مستخدم سريعة وسلسة وتجربة تصفح متقدمة.',
      year: '2025',
      logoImage: '/assets/client_bayt.png',
      projectImage: '/assets/client_bayt.png',
      overview: 'تطوير منصة وتطبيق لعرض العقارات والتصاميم الهندسية برؤية تفاعلية حديثة.',
      challenge: 'عرض الصور عالية الدقة والخرائط دون التأثير على سرعة الموقع.',
      myRole: 'مطور الواجهات الأمامية UI Developer.',
      delivered: [
        'واجهة مستخدم سريعة وخفيفة',
        'محرك بحث وفلاتر عقارية متقدمة',
        'دعم الوضع الداكن والنهاري'
      ],
      results: [
        'زيادة مدة بقاء المستخدم في المنصة إلى 6 دقائق',
        'أكثر من 100 ألف طلب معاينة عبر المنصة'
      ],
      galleryImages: [
        '/assets/client_bayt.png',
        '/assets/client_namoo.png'
      ],
      relatedWorkSlugs: ['work-namoo', 'work-noqta']
    },
    {
      id: 'work-deraah',
      slug: 'work-deraah',
      title: 'تغطية وإعلانات شركة درعة',
      clientName: 'شركة درعة',
      category: 'التسويق',
      description: 'تغطية وحملة تسويقية ميدانية ورقمية لزيادة انتشار العلامة التجارية.',
      year: '2025',
      logoImage: '/assets/client_deraah.png',
      projectImage: '/assets/client_deraah.png',
      overview: 'إشراف وإنتاج حملة إعلانية موسمية لمنتجات العطور والعناية الشخصية.',
      challenge: 'المنافسة القوية في مواسم الأعياد والتخفيضات.',
      myRole: 'إدارة وتوجيه صناعة الإعلانات المرئية.',
      delivered: [
        'إنتاج إعلانات عالية التفاعل',
        'إدارة التسويق عبر المؤثرين',
        'تحليل عوائد الإعلانات المدفوعة'
      ],
      results: [
        'تحقيق أعلى مبيعات موسمية في تاريخ الفرع',
        'زيادة نسبة المبيعات عبر الإنترنت بـ 85%'
      ],
      galleryImages: [
        '/assets/client_deraah.png'
      ],
      relatedWorkSlugs: ['work-abaad', 'work-masar']
    }
  ] as PortfolioItem[],

  blogPosts: [
    {
      id: 'b1',
      slug: 'future-of-ai-content',
      title: 'مستقبل صناعة المحتوى في عصر الذكاء الاصطناعي',
      category: 'صناعة المحتوى والذكاء الاصطناعي',
      date: '25 أغسطس 2026',
      readingTime: '5 دقائق',
      author: 'سعيد بن عايض',
      coverImage: '/assets/content_vlogs.png',
      excerpt: 'كيف تساهم أدوات الذكاء الاصطناعي في تمكين صناع المحتوى وتضاعف الإنتاجية بدلاً من استبدالهم؟',
      contentParagraphs: [
        'شهدت السنوات الأخيرة تحولاً جذرياً في أساليب إنتاج المحتوى الرقمي بفضل الثورة السريعة في أدوات الذكاء الاصطناعي التوليدي مثل ChatGPT و Midjourney وغيرها.',
        'يرى البعض أن هذه الأدوات تشكل تهديداً للإبداع البشري، ولكن الحقيقة العملية أثبتت أن الذكاء الاصطناعي هو المساعد الشغوف والمحرك المساعد الذي يضاعف سرعة صانع المحتوى بنسبة 500%.',
        'عندما يمتلك صانع المحتوى الرؤية الإبداعية والخبرة الميدانية، تصبح أدوات الذكاء الاصطناعي هي اليد التي تنفذ وتسرع إخراج السيناريوهات والصور والمؤثرات بأعلى جودة.'
      ],
      headings: [
        'الذكاء الاصطناعي كمساعد إبداعي لا كبديل',
        'أبرز الأساليب العملية لاستغلال AI في المحتوى',
        'توقعات المستقبليات وصناعة الفيديوهات التفاعلية'
      ],
      galleryImages: [
        '/assets/content_vlogs.png',
        '/assets/tool_prompts.png',
        '/assets/content_stories.png'
      ],
      quotes: [
        'الذكاء الاصطناعي لن يستبدل صانع المحتوى الإبداعي، بل سيكمل قدراته ويجعله يصنع المستحيل في وقت قياسي.'
      ],
      likes: 142,
      dislikes: 3,
      favoritesCount: 89,
      relatedBlogSlugs: ['digital-marketing-strategies-2026', 'ui-ux-design-principles']
    },
    {
      id: 'b2',
      slug: 'digital-marketing-strategies-2026',
      title: 'استراتيجيات التسويق الرقمي الفعالة للعلامات التجارية الشخصية',
      category: 'التسويق وتطوير الأعمال',
      date: '18 أغسطس 2026',
      readingTime: '7 دقائق',
      author: 'سعيد بن عايض',
      coverImage: '/assets/client_namoo.png',
      excerpt: 'أهم الركائز لبناء علامة تجارية شخصية قوية وتوليد ثقة مستدامة مع المتابعين والعملاء.',
      contentParagraphs: [
        'تعد العلامة التجارية الشخصية (Personal Brand) واحدة من أقوى الأصول الرقمية التي يمكن لأي رائد أعمال أو صانع محتوى الاستثمار فيها.',
        'الجمهور في الوقت الحالي لا يشتري المنتجات أو الخدمات فقط، بل يشتري القيم والقصة والخبرة الموثوقة التي يقدمها صاحب العلامة.',
        'الاستمرارية، الصدق في السرد القصصي، وتقديم القيمة الفعالة المجانية هي الأسرار الثلاثة لبناء جمهور مخلص يتفاعل مع مشروعاتك القادمة.'
      ],
      headings: [
        'لماذا تحتاج إلى علامة تجارية شخصية؟',
        'خمس خطوات لبناء استراتيجية تسويق شخصي ناجحة',
        'قياس الأثر وبناء مجتمع مخلص'
      ],
      galleryImages: [
        '/assets/client_namoo.png',
        '/assets/client_abaad.png'
      ],
      quotes: [
        'علامتك التجارية هي ما يقوله الناس عنك في غيابك؛ اجعلها تجسد الجودة والمصداقية.'
      ],
      likes: 98,
      dislikes: 1,
      favoritesCount: 65,
      relatedBlogSlugs: ['future-of-ai-content', 'ui-ux-design-principles']
    },
    {
      id: 'b3',
      slug: 'ui-ux-design-principles',
      title: 'مبادئ تصميم وتطوير الواجهات السريعة والمتحولة',
      category: 'بناء الواجهات والتطبيقات',
      date: '10 أغسطس 2026',
      readingTime: '6 دقائق',
      author: 'سعيد بن عايض',
      coverImage: '/assets/client_bayt.png',
      excerpt: 'كيف تحول تجربة التصفح البسيطة إلى رحلة شراء أو تفاعل مريحة للمستخدم بدون تعقيد.',
      contentParagraphs: [
        'تصميم الواجهات الرقمية (UI/UX) ليس مجرد مظهر جمالي وألوان جذابة، بل هو علم يهدف إلى تسهيل وصول المستخدم لمبتغاه بأقل عدد ممكن من النقرات.',
        'السرعة، الوضوح البصري، احترام اتجاهات القراءة (مثل دعم RTL العربي الاصيل)، وتقليل المشتتات هي العناصر الأهم لنجاح أي موقع أو تطبيق.',
        'في هذا المقال نستعرض النماذج والأدوات الحديثة لبناء واجهات فائقة الاستجابة ترفع معدلات التحويل للخدمات والمتاجر.'
      ],
      headings: [
        'الفرق بين مظهر الواجهة وتجربة الاستخدام',
        'أهمية الدعم الكامل للغة العربية والاتجاه RTL',
        'أدوات تحسين سرعة الأداء'
      ],
      galleryImages: [
        '/assets/client_bayt.png',
        '/assets/client_noqta.png'
      ],
      quotes: [
        'التصميم الجيد هو التصميم الذي يختفي من أمام عين المستخدم ويدعه يصل لمبتغاه فوراً.'
      ],
      likes: 115,
      dislikes: 2,
      favoritesCount: 77,
      relatedBlogSlugs: ['future-of-ai-content', 'digital-marketing-strategies-2026']
    }
  ] as BlogPostItem[]
};
