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
      title: 'القصائد والشيلات',
      description: 'محتوى القصائد والشيلات والأعمال الصوتية والمحتوى الشعري المتميز بأعلى جودة إنتاجية.',
      intro: 'مساحة خاصة تحتفي بالأصالة الشعرية، والأداء الصوتي الرفيع، والمحتوى المسموع الذي يلامس المشاعر.',
      image: '/assets/content_sheylat.png',
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
      title: 'الفلوقات والتغطيات',
      description: 'فلوقات وتجارب وتغطيات ومحتوى يومي وترفيهي يوثق اللحظات بأسلوب سينمائي مبتكر.',
      intro: 'توثيق بصري تفاعلي يأخذ المتابع في رحلة استكشافية بين الفعاليات، التكنولوجيا، والتجارب اليومية الملهمة.',
      image: '/assets/content_vlogs.png',
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
      title: 'القصص والسرد',
      description: 'قصص سردية ومحتوى قصصي، مع تركيز على القصص المشوقة والمرعبة والروايات الملهمة.',
      intro: 'فن الحبك والرواية، حيث تتحول الكلمات والحكايات إلى مشاهد بصرية وصوتية تأسر الألباب.',
      image: '/assets/content_stories.png',
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

  serviceCategories: [
    'الكل',
    'صناعة المحتوى',
    'التسويق الرقمي',
    'تطوير الأعمال',
    'بناء الواجهات والتطبيقات',
    'التصوير والتغطيات',
    'الذكاء الاصطناعي'
  ],

  services: [
    {
      id: 'content-creation',
      title: 'صناعة المحتوى المرئي والصوتي',
      description: 'إنتاج إبداعي سينمائي شامل للفيديوهات والمقاطع القصيرة والصوتيات المتميزة.',
      price: '1,500 ر.س',
      category: 'صناعة المحتوى',
      image: '/assets/content_vlogs.png',
      features: [
        'إعداد السيناريو والهيكلة الإبداعية',
        'تصوير عالي الجودة بدقة 4K',
        'مونتاج ومؤثرات صوتية محترفة',
        'تحسين أبعاد الفيديو لكافة المنصات'
      ]
    },
    {
      id: 'content-management',
      title: 'إدارة المحتوى والحسابات الرقمية',
      description: 'إدارة وتخطيط وجدولة الحضور الرقمي الشامل للحسابات والمشاريع التجارية.',
      price: '3,000 ر.س / شهرياً',
      category: 'صناعة المحتوى',
      image: '/assets/content_stories.png',
      features: [
        'جدولة ونشر المحتوى اليومي',
        'إدارة التفاعل والردود',
        'تحليل الأداء والتقارير الشهرية',
        'استراتيجية نمو المتابعين'
      ]
    },
    {
      id: 'digital-marketing-service',
      title: 'التسويق الرقمي والحملات الإعلانية',
      description: 'تخطيط وإطلاق الحملات الإعلانية المدفوعة والعضوية لزيادة انتشار العلامة التجارية.',
      price: '2,500 ر.س',
      category: 'التسويق الرقمي',
      image: '/assets/client_deraah.png',
      features: [
        'استهداف الجمهور بدقة متناهية',
        'كتابة نصوص إعلانية عالية التحويل',
        'تحسين معدلات الشراء والتفاعل',
        'تقارير تحليلية شاملة للميزانية'
      ]
    },
    {
      id: 'biz-dev-service',
      title: 'استشارات وتطوير الأعمال',
      description: 'بناء استراتيجيات التوسع وتطوير الأفكار واستدامة نمو الخدمات والمنتجات.',
      price: '2,000 ر.س',
      category: 'تطوير الأعمال',
      image: '/assets/client_namoo.png',
      features: [
        'تحليل النموذج التجاري الحالي',
        'اكتشاف فرص النمو وتوسيع المبيعات',
        'تحسين كفاءة فريق العمل',
        'جلسات استشارية فردية ومتابعة'
      ]
    },
    {
      id: 'web-ui-building',
      title: 'تصميم وبناء واجهات المواقع',
      description: 'تصميم وتطوير مواقع إلكترونية عصرية متجاوبة بالكامل فائقة السرعة.',
      price: '4,500 ر.س',
      category: 'بناء الواجهات والتطبيقات',
      image: '/assets/client_bayt.png',
      features: [
        'تصميم واجهة متجاوبة بالكامل',
        'دعم اللغة العربية والإنجليزية وتغيير النمط',
        'سرعة استجابة فائقة وتوافق SEO',
        'لوحة تحكم سهلة لإدارة المحتوى'
      ]
    },
    {
      id: 'app-ui-design',
      title: 'بناء وتصميم واجهات التطبيقات',
      description: 'تصميم تجربة مستخدم UI/UX فريدة وسلسة لتطبيقات الجوال الذكية.',
      price: '5,000 ر.س',
      category: 'بناء الواجهات والتطبيقات',
      image: '/assets/client_noqta.png',
      features: [
        'دراسة وبناء تجربة المستخدم UX',
        'واجهات عصرية أنيقة UI',
        'تسليم كافة ملفات التصميم التفاعلية',
        'نماذج محاكاة وشاشات مكتملة'
      ]
    },
    {
      id: 'events-coverage',
      title: 'التغطيات والتصوير الميداني',
      description: 'تغطية الفعاليات والمؤتمرات الكبرى والمناسبات وتصوير المحتوى الميداني.',
      price: '3,500 ر.س',
      category: 'التصوير والتغطيات',
      image: '/assets/client_abaad.png',
      features: [
        'تغطية ميدانية كاملة بالعدسات الحديثة',
        'إنتاج فيديوهات ملخصة سريعة للمنصات',
        'لقاءات سريعة وإبراز الشركاء',
        'تسليم المواد الخام عالية الجودة'
      ]
    },
    {
      id: 'ai-tools-integration',
      title: 'دمج وتطبيق حلول الذكاء الاصطناعي',
      description: 'تطبيق أدوات الذكاء الاصطناعي لرفع كفاءة إنتاج المحتوى والأتمتة.',
      price: '1,800 ر.س',
      category: 'الذكاء الاصطناعي',
      image: '/assets/tool_prompts.png',
      features: [
        'أتمتة توليد النصوص والصور',
        'بناء مكتبة البرومبت الخاصة بالمشروع',
        'تدريب الفريق على أدوات AI الذكية',
        'تسريع وتيرة العمل بـ 5 أضعاف'
      ]
    }
  ] as ServiceItem[],

  news: [
    {
      id: 'news-1',
      slug: 'launching-new-platform',
      title: 'إطلاق مشروع سعيد الرقمي الجديد وتحديث المنظومة بالكامل',
      excerpt: 'تم بحمد الله إطلاق التحديث الشامل وتطوير واجهة الأعمال الرقمية لسعيد بن عايض بحلول حديثة.',
      date: '28 أغسطس 2026',
      category: 'إطلاق مشروع جديد',
      image: '/assets/content_vlogs.png',
      contentParagraphs: [
        'يسرنا الإعلان عن إطلاق التحديث الشامل للمنظومة الرقمية الخاصة بسعيد بن عايض، والتي تضم إعادة هيكلة كاملة للمميزات والخدمات والأدوات التفاعلية.',
        'تم بناء المنظومة باستخدام أحدث تقنيات الويب السريعة والواجهات التفاعلية المصممة خصيصاً لتوفير تجربة مستخدم سلسة وفائقة المرونة.',
        'تشمل المنظومة الجديدة أقساماً مخصصة لأخبار سعيد، أدوات سعيد، خدمات التطوير والتسويق، ومكتبة شاملة للحلول الرقمية المجانية والمدفوعة.'
      ],
      headings: [
        'رؤية المنظومة الرقمية الجديدة',
        'أبرز المميزات والخدمات المتاحة',
        'الخطط المستقبلية والتوسع'
      ],
      galleryImages: [
        '/assets/content_vlogs.png',
        '/assets/client_namoo.png',
        '/assets/tool_prompts.png'
      ],
      videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          title: 'فيديو الإطلاق الرسمي للتحديث الشامل'
        }
      ],
      externalLinks: [
        { title: 'زيارة الصفحة الرئيسية للمنظومة', url: '/', type: 'external', badge: 'المنظومة' }
      ],
      sourceLinks: [
        { title: 'البيان الصحفي الرسمي', url: 'https://saeedbinayidh.com/press', type: 'external' }
      ],
      relatedNewsSlugs: ['tech-conference-coverage', 'namoo-strategic-partnership']
    },
    {
      id: 'news-2',
      slug: 'tech-conference-coverage',
      title: 'تغطية ميدانية خاصة لمؤتمر التقنية والابتكار الرقمي',
      excerpt: 'مشاركة سعيد بن عايض في تغطية أحدث الابتكارات وحلول الذكاء الاصطناعي بالمنطقة.',
      date: '15 أغسطس 2026',
      category: 'تغطية فعالية',
      image: '/assets/content_stories.png',
      contentParagraphs: [
        'شارك سعيد بن عايض في التغطية الميدانية الشاملة لمؤتمر التقنية والابتكار الرقمي، حيث تم تسليط الضوء على أحدث تحولات الذكاء الاصطناعي وصناعة المحتوى.',
        'تضمنت التغطية لقاءات خاصة مع رواد الأعمال والرؤساء التنفيذيين لأبرز الشركات التقنية، بالإضافة إلى مراجعات مباشرة للأجهزة والحلول المبتكرة.',
        'يمكنكم مشاهدة الملخص الكامل والتغطيات الميدانية عبر قناتنا وشبكات التواصل الاجتماعي.'
      ],
      headings: [
        'أبرز محطات المؤتمر',
        'لقاءات خاصة مع رواد التقنية',
        'توصيات المستقبل الرقمي'
      ],
      galleryImages: [
        '/assets/content_stories.png',
        '/assets/client_abaad.png',
        '/assets/content_gaming.png'
      ],
      relatedNewsSlugs: ['launching-new-platform', 'namoo-strategic-partnership']
    },
    {
      id: 'news-3',
      slug: 'namoo-strategic-partnership',
      title: 'إعلان التعاون الاستراتيجي مع منصة نمو التعليمية',
      excerpt: 'شراكة جديدة تهدف لتطوير تجربة المستخدم وبناء محتوى تعليمي تفاعلي استثنائي.',
      date: '02 أغسطس 2026',
      category: 'إعلان تعاون',
      image: '/assets/client_namoo.png',
      contentParagraphs: [
        'أعلنت منصة نمو التعليمية بالتعاون مع سعيد بن عايض عن توقيع اتفاقية تعاون استراتيجي لتطوير الهوية الرقمية وتجربة المستثمرين والطلاب.',
        'تستهدف الشراكة تقديم دورات وورش عمل متقدمة في صناعة المحتوى، التسويق الرقمي، وتطبيق أدوات الذكاء الاصطناعي في قطاع التعليم.',
        'تأتي هذه الخطوة في إطار سعي الطرفين لتقديم محتوى عربي عالي الجودة يلبي تطلعات الشباب العربي في المجال الرقمي.'
      ],
      headings: [
        'أهداف الشراكة الاستراتيجية',
        'البرامج والورش التدريبية القادمة'
      ],
      galleryImages: [
        '/assets/client_namoo.png',
        '/assets/client_bayt.png'
      ],
      relatedNewsSlugs: ['launching-new-platform', 'ai-prompts-library-launch']
    },
    {
      id: 'news-4',
      slug: 'ai-prompts-library-launch',
      title: 'إطلاق مكتبة البرومبت الاحترافية للذكاء الاصطناعي',
      excerpt: 'مجموعة برومبت مخصصة لتصاميم الصور والنصوص لمساعدة صناع المحتوى والمطورين.',
      date: '20 يوليو 2026',
      category: 'إطلاق خدمة',
      image: '/assets/tool_prompts.png',
      contentParagraphs: [
        'تم إطلاق مكتبة البرومبت الاحترافية المصممة بعناية لمساعدة صناع المحتوى، المصممين، والمطورين على استخراج أفضل النتائج من أدوات الذكاء الاصطناعي.',
        'تتضمن المكتبة أوامر نصية جاهزة ومجربة لتوليد الصور السينمائية، كتابة السيناريوهات الإعلانية، وتطوير كود البرمجة بشكل أسرع.',
        'المكتبة متاحة مجاناً لجميع زوار موقع سعيد بن عايض مع تحديثات أسبوعية مستمرة.'
      ],
      headings: [
        'ما هي مكتبة البرومبت الاحترافية؟',
        'كيف تستفيد من الأوامر النصية؟'
      ],
      galleryImages: [
        '/assets/tool_prompts.png',
        '/assets/tool_filters.png'
      ],
      relatedNewsSlugs: ['launching-new-platform', 'namoo-strategic-partnership']
    }
  ] as NewsItem[],

  toolsCategories: [
    'الكل',
    'البرومبت',
    'واجهات الساعات',
    'خلفيات الجوال',
    'الفلاتر',
    'الاختصارات',
    'صفحة حسابات'
  ],

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
