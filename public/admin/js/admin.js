let BUNDLE = null;
let ACTIVE_TAB = 'settings';

// ---------- helpers ----------
async function api(path, opts = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: opts.body && !(opts.body instanceof FormData) ? { 'Content-Type': 'application/json' } : undefined,
    ...opts,
    body: opts.body && !(opts.body instanceof FormData) ? JSON.stringify(opts.body) : opts.body
  });
  if (res.status === 401) { showLogin(); throw new Error('unauthorized'); }
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json() : null;
  if (!res.ok) throw new Error((data && data.error) || 'request_failed');
  return data;
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}

function h(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

function escAttr(str) { return String(str == null ? '' : str).replace(/"/g, '&quot;'); }
function escHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  const data = await api('/api/admin/upload', { method: 'POST', body: fd });
  return data.url;
}

// ---------- auth ----------
function showLogin() {
  document.getElementById('loginScreen').hidden = false;
  document.getElementById('dashboard').hidden = true;
}
function showDashboard() {
  document.getElementById('loginScreen').hidden = true;
  document.getElementById('dashboard').hidden = false;
}

async function checkAuth() {
  try {
    await api('/api/admin/me');
    await loadBundle();
    showDashboard();
    renderTab(ACTIVE_TAB);
  } catch { showLogin(); }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const errEl = document.getElementById('loginError');
  errEl.textContent = '';
  try {
    await api('/api/admin/login', { method: 'POST', body: { email: fd.get('email'), password: fd.get('password') } });
    await loadBundle();
    showDashboard();
    renderTab(ACTIVE_TAB);
  } catch { errEl.textContent = 'بيانات الدخول غير صحيحة'; }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await api('/api/admin/logout', { method: 'POST' });
  showLogin();
});

async function loadBundle() {
  BUNDLE = await api('/api/admin/bundle');
  // update view-site link
  const link = document.getElementById('viewSiteLink');
  if (link && BUNDLE.settings && BUNDLE.settings.mainSiteUrl) {
    link.href = BUNDLE.settings.mainSiteUrl;
  }
}

// ---------- nav ----------
document.querySelectorAll('.admin-nav-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-btn[data-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ACTIVE_TAB = btn.dataset.tab;
    document.getElementById('tabTitle').textContent = btn.textContent;
    renderTab(ACTIVE_TAB);
  });
});

function renderTab(tab) {
  const content = document.getElementById('tabContent');
  content.innerHTML = '';
  switch (tab) {
    case 'settings':       return renderSettings(content);
    case 'nav-sections':   return renderNavSections(content);
    case 'stats':          return renderStats(content);
    case 'social':         return renderSocial(content);
    case 'pages':          return renderPages(content);
    case 'footer-pages':   return renderFooterPages(content);
    case 'gallery':        return renderGallery(content);
    case 'news':           return renderNewsOrBlog(content, 'news', false);
    case 'blog':           return renderNewsOrBlog(content, 'blog', true);
    case 'help':           return renderFaq(content, 'help');
    case 'complaint-cats': return renderComplaintCats(content);
    case 'suggestions':    return renderMessages(content, 'suggestion');
    case 'complaints':     return renderMessages(content, 'complaint');
    case 'custom-design':  return renderCustomDesign(content);
    case 'account':        return renderAccount(content);
  }
}

// ---------- bilingual field helper ----------
function biField(label, value, multiline) {
  value = value || { ar: '', en: '' };
  return `
  <div class="field bi-wrap" data-bi="1">
    <label>${label}</label>
    <div class="grid-2">
      <div>
        <label style="font-weight:400;font-size:.75rem">العربية</label>
        ${multiline ? `<textarea data-lang="ar">${escHtml(value.ar)}</textarea>` : `<input type="text" data-lang="ar" value="${escAttr(value.ar)}">`}
      </div>
      <div>
        <label style="font-weight:400;font-size:.75rem">English</label>
        ${multiline ? `<textarea data-lang="en">${escHtml(value.en)}</textarea>` : `<input type="text" data-lang="en" value="${escAttr(value.en)}">`}
      </div>
    </div>
  </div>`;
}

function readBi(scopeEl) {
  return Array.from(scopeEl.querySelectorAll('[data-bi="1"]')).map(w => ({
    ar: w.querySelector('[data-lang="ar"]').value,
    en: w.querySelector('[data-lang="en"]').value
  }));
}

// ================= SETTINGS =================
function renderSettings(content) {
  const s = BUNDLE.settings;
  const panel = h(`<div class="panel">
    <h2>الهوية والنصوص الأساسية</h2>
    <div class="grid-2">
      <div class="field">
        <label>الشعار (Logo)</label>
        <div style="display:flex;align-items:center;gap:10px">
          <img src="${escAttr(s.logo)}" id="logoPreview" style="width:60px;height:60px;object-fit:contain;border:1px solid var(--border);border-radius:8px;background:var(--bg)">
          <input type="file" id="logoFile" accept="image/*">
        </div>
      </div>
      <div class="field">
        <label>الصورة الشخصية (Avatar)</label>
        <div style="display:flex;align-items:center;gap:10px">
          <img src="${escAttr(s.avatar)}" id="avatarPreview" style="width:60px;height:60px;object-fit:cover;border:1px solid var(--border);border-radius:8px;background:var(--bg)">
          <input type="file" id="avatarFile" accept="image/*">
        </div>
      </div>
    </div>
    ${biField('اسم الموقع / الاسم', s.siteName)}
    ${biField('الوصف المختصر (Tagline)', s.tagline)}
    ${biField('رسالة الترحيب (تظهر في النافذة المنبثقة)', s.welcomeMessage, true)}
    ${biField('عنوان: من هو سعيد بن عايض؟', s.aboutTitle)}
    ${biField('نبذة عن سعيد', s.aboutText, true)}

    <h3>قسم حسابات التواصل الاجتماعي</h3>
    ${biField('عنوان القسم', s.announcementTitle)}
    ${biField('النص التعريفي', s.announcementText, true)}

    <h3>عناوين الأقسام</h3>
    ${biField('عنوان قسم الصفحات', s.pagesTitle)}
    ${biField('عنوان قسم الإحصائيات', s.statsTitle)}
    ${biField('عنوان المعرض', s.galleryTitle)}
    ${biField('عنوان الأخبار', s.newsTitle)}
    ${biField('عنوان المدونة', s.blogTitle)}
    ${biField('عنوان قسم التواصل (اقتراحات وشكاوى)', s.contactTitle)}
    ${biField('اسم مركز المساعدة', s.helpCenterName)}

    <h3>التواصل عبر واتساب</h3>
    <div class="field">
      <label>رابط واتساب (wa.me/966XXXXXXXXX أو رابط كامل)</label>
      <input type="text" id="whatsapp" value="${escAttr(s.whatsapp || '')}" placeholder="https://wa.me/966XXXXXXXXX">
      <p class="help-text">سيظهر كزر عائم في الموقع. اتركه فارغاً لإخفائه.</p>
    </div>

    <h3>روابط المواقع</h3>
    <div class="grid-2">
      <div class="field">
        <label>رابط الموقع الرئيسي (لزر «عرض الموقع» هنا)</label>
        <input type="text" id="mainSiteUrl" value="${escAttr(s.mainSiteUrl || '')}" placeholder="https://www.saeedbinayidh.com">
      </div>
      <div class="field">
        <label>رابط مركز المساعدة</label>
        <input type="text" id="helpCenterUrl" value="${escAttr(s.helpCenterUrl || '')}" placeholder="https://www.saeedcenterhelp.com">
      </div>
    </div>

    <h3>إشعارات البريد الإلكتروني للاقتراحات والشكاوى</h3>
    <div class="grid-2">
      <div class="field">
        <label>البريد الإلكتروني لاستقبال الرسائل</label>
        <input type="email" id="notificationEmail" value="${escAttr(s.notificationEmail)}" placeholder="example@email.com">
      </div>
      <div class="field">
        <label>مفتاح Resend API</label>
        <input type="text" id="resendApiKey" value="${escAttr(s.resendApiKey)}" placeholder="re_xxxxxxxx">
      </div>
    </div>
    <div class="field">
      <label>البريد المرسل منه (From)</label>
      <input type="text" id="emailFrom" value="${escAttr(s.emailFrom)}">
    </div>
    <p class="help-text">للحصول على مفتاح Resend مجاناً: أنشئ حساباً على resend.com، فعّل بريدك أو نطاقك، وانسخ مفتاح API هنا. بدون هذا المفتاح لن تُرسل الرسائل بالبريد لكنها ستبقى محفوظة في تبويبَي «الاقتراحات» و«الشكاوى».</p>
    <button class="btn btn-primary" id="saveSettings">حفظ الإعدادات</button>
  </div>`);
  content.appendChild(panel);

  document.getElementById('logoFile').addEventListener('change', async (e) => {
    if (!e.target.files[0]) return;
    const url = await uploadFile(e.target.files[0]);
    document.getElementById('logoPreview').src = url;
    await api('/api/admin/settings', { method: 'PUT', body: { logo: url } });
    BUNDLE.settings.logo = url; toast('تم تحديث الشعار');
  });
  document.getElementById('avatarFile').addEventListener('change', async (e) => {
    if (!e.target.files[0]) return;
    const url = await uploadFile(e.target.files[0]);
    document.getElementById('avatarPreview').src = url;
    await api('/api/admin/settings', { method: 'PUT', body: { avatar: url } });
    BUNDLE.settings.avatar = url; toast('تم تحديث الصورة الشخصية');
  });

  document.getElementById('saveSettings').addEventListener('click', async () => {
    const bi = readBi(panel);
    const keys = ['siteName', 'tagline', 'welcomeMessage', 'aboutTitle', 'aboutText',
      'announcementTitle', 'announcementText', 'pagesTitle', 'statsTitle', 'galleryTitle',
      'newsTitle', 'blogTitle', 'contactTitle', 'helpCenterName'];
    const payload = {};
    keys.forEach((k, i) => payload[k] = bi[i]);
    payload.whatsapp = document.getElementById('whatsapp').value;
    payload.mainSiteUrl = document.getElementById('mainSiteUrl').value;
    payload.helpCenterUrl = document.getElementById('helpCenterUrl').value;
    payload.notificationEmail = document.getElementById('notificationEmail').value;
    payload.resendApiKey = document.getElementById('resendApiKey').value;
    payload.emailFrom = document.getElementById('emailFrom').value;
    const res = await api('/api/admin/settings', { method: 'PUT', body: payload });
    BUNDLE.settings = res.settings;
    // update view-site link
    const siteLink = document.getElementById('viewSiteLink');
    if (siteLink && res.settings.mainSiteUrl) siteLink.href = res.settings.mainSiteUrl;
    toast('تم الحفظ بنجاح');
  });
}

// ================= NAV SECTIONS =================
function renderNavSections(content) {
  const panel = h(`<div class="panel">
    <h2>أقسام التنقل (شريط القائمة العلوي)</h2>
    <p class="help-text" style="margin-bottom:16px">هذه هي الروابط التي تظهر في القائمة العلوية للموقع. يمكنك إضافة، حذف، تعديل، وإخفاء أي قسم. استخدم href مثل (#home، #about، /help.html، أو رابط خارجي).</p>
    <div id="navList"></div>
    <button class="btn btn-primary" id="addNav" style="margin-top:12px">+ إضافة قسم</button>
  </div>`);
  content.appendChild(panel);
  const list = panel.querySelector('#navList');

  function row(item) {
    const r = h(`<div class="item-row">
      <div class="grid-2">
        <div class="field"><label>الرابط (href)</label><input type="text" data-f="href" value="${escAttr(item.href || '')}"></div>
        <div class="field" style="display:flex;align-items:flex-end;gap:10px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-top:auto;padding-bottom:6px">
            <input type="checkbox" data-f="visible" ${item.visible !== false ? 'checked' : ''}> مرئي في القائمة
          </label>
        </div>
      </div>
      ${biField('اسم القسم', item.label)}
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const href = r.querySelector('[data-f="href"]').value;
      const visible = r.querySelector('[data-f="visible"]').checked;
      const label = readBi(r)[0];
      await api(`/api/admin/navSections/${item.id}`, { method: 'PUT', body: { href, visible, label } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذا القسم من التنقل؟')) return;
      await api(`/api/admin/navSections/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderNavSections(document.getElementById('tabContent'));
    });
    return r;
  }

  (BUNDLE.navSections || []).forEach(item => list.appendChild(row(item)));

  panel.querySelector('#addNav').addEventListener('click', async () => {
    const item = await api('/api/admin/navSections', { method: 'POST', body: { label: { ar: 'قسم جديد', en: 'New Section' }, href: '#', visible: true } });
    BUNDLE.navSections = BUNDLE.navSections || [];
    BUNDLE.navSections.push(item);
    renderNavSections(document.getElementById('tabContent'));
  });
}

// ================= STATS =================
function renderStats(content) {
  const panel = h(`<div class="panel"><h2>الإحصائيات</h2><div id="statsList"></div>
    <button class="btn btn-primary" id="addStat">+ إضافة إحصائية</button></div>`);
  content.appendChild(panel);
  const list = panel.querySelector('#statsList');

  function row(item) {
    const r = h(`<div class="item-row">
      <div class="grid-2">
        <div class="field"><label>الأيقونة (إيموجي)</label><input type="text" data-f="icon" value="${escAttr(item.icon)}"></div>
        <div class="field"><label>القيمة</label><input type="text" data-f="value" value="${escAttr(item.value)}"></div>
      </div>
      ${biField('التسمية', item.label)}
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const icon = r.querySelector('[data-f="icon"]').value;
      const value = r.querySelector('[data-f="value"]').value;
      const label = readBi(r)[0];
      await api(`/api/admin/stats/${item.id}`, { method: 'PUT', body: { icon, value, label } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذه الإحصائية؟')) return;
      await api(`/api/admin/stats/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderStats(document.getElementById('tabContent'));
    });
    return r;
  }

  BUNDLE.stats.forEach(item => list.appendChild(row(item)));
  panel.querySelector('#addStat').addEventListener('click', async () => {
    const item = await api('/api/admin/stats', { method: 'POST', body: { icon: '⭐', value: '0', label: { ar: 'جديد', en: 'New' } } });
    BUNDLE.stats.push(item); renderStats(document.getElementById('tabContent'));
  });
}

// ================= SOCIAL =================
const PLATFORM_OPTIONS = ['instagram','x','tiktok','jaco','threads','facebook','snapchat','reddit','youtube','whatsapp','whatsapp-channel','telegram','telegram-channel','linkedin','other'];

function renderSocial(content) {
  const panel = h(`<div class="panel"><h2>حسابات التواصل الاجتماعي</h2>
    <p class="help-text" style="margin-bottom:16px">اختر اسم المنصة من القائمة حتى تظهر أيقونتها الرسمية تلقائياً في الموقع.</p>
    <div id="socialList"></div>
    <button class="btn btn-primary" id="addSocial">+ إضافة حساب</button></div>`);
  content.appendChild(panel);
  const list = panel.querySelector('#socialList');

  function row(item) {
    const opts = PLATFORM_OPTIONS.map(p => `<option value="${p}" ${p === item.platform ? 'selected' : ''}>${p}</option>`).join('');
    const r = h(`<div class="item-row">
      <div class="grid-2">
        <div class="field"><label>المنصة (للأيقونة الرسمية)</label><select data-f="platform">${opts}</select></div>
        <div class="field"><label>الرابط</label><input type="text" data-f="url" value="${escAttr(item.url)}"></div>
      </div>
      ${biField('اسم الحساب', item.name)}
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const platform = r.querySelector('[data-f="platform"]').value;
      const url = r.querySelector('[data-f="url"]').value;
      const name = readBi(r)[0];
      await api(`/api/admin/social/${item.id}`, { method: 'PUT', body: { platform, url, name } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذا الحساب؟')) return;
      await api(`/api/admin/social/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderSocial(document.getElementById('tabContent'));
    });
    return r;
  }

  BUNDLE.social.forEach(item => list.appendChild(row(item)));
  panel.querySelector('#addSocial').addEventListener('click', async () => {
    const item = await api('/api/admin/social', { method: 'POST', body: { platform: 'instagram', url: '', name: { ar: 'حساب جديد', en: 'New Account' } } });
    BUNDLE.social.push(item); renderSocial(document.getElementById('tabContent'));
  });
}

// ================= PAGES =================
function renderPages(content) {
  const panel = h(`<div class="panel"><h2>صفحات سعيد بن عايض</h2>
    <p class="help-text" style="margin-bottom:16px">الصفحات تُجمَّع حسب اسم المجموعة. صفحات بنفس المجموعة تظهر معاً.</p>
    <div id="pagesList"></div>
    <button class="btn btn-primary" id="addPage">+ إضافة صفحة</button></div>`);
  content.appendChild(panel);
  const list = panel.querySelector('#pagesList');

  function row(item) {
    const r = h(`<div class="item-row">
      ${biField('اسم المجموعة (مثال: صفحات سعيد)', item.group)}
      ${biField('عنوان الصفحة', item.title)}
      <div class="field"><label>الرابط</label><input type="text" data-f="url" value="${escAttr(item.url)}"></div>
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const bi = readBi(r);
      const url = r.querySelector('[data-f="url"]').value;
      await api(`/api/admin/pages/${item.id}`, { method: 'PUT', body: { group: bi[0], title: bi[1], url } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذه الصفحة؟')) return;
      await api(`/api/admin/pages/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderPages(document.getElementById('tabContent'));
    });
    return r;
  }

  BUNDLE.pages.forEach(item => list.appendChild(row(item)));
  panel.querySelector('#addPage').addEventListener('click', async () => {
    const item = await api('/api/admin/pages', { method: 'POST', body: { group: { ar: 'مجموعة جديدة', en: 'New Group' }, title: { ar: 'صفحة جديدة', en: 'New Page' }, url: '' } });
    BUNDLE.pages.push(item); renderPages(document.getElementById('tabContent'));
  });
}

// ================= FOOTER PAGES =================
function renderFooterPages(content) {
  const panel = h(`<div class="panel">
    <h2>الصفحات السفلية</h2>
    <p class="help-text" style="margin-bottom:16px">صفحات بسيطة تظهر في أسفل الموقع بجانب الحقوق (مثل: سياسة الخصوصية، المعلومات القانونية). الرابط المختصر (slug) يحدد عنوان الصفحة مثل: /p/privacy</p>
    <h3 style="margin-top:0">إضافة صفحة جديدة</h3>
    <div class="grid-2">
      ${biField('اسم الصفحة', { ar: '', en: '' })}
    </div>
    <div class="field"><label>الرابط المختصر (slug مثل: privacy، legal)</label><input type="text" id="newFpSlug" placeholder="privacy"></div>
    ${biField('المحتوى', { ar: '', en: '' }, true)}
    <button class="btn btn-primary" id="addFp">+ إضافة</button>
  </div>`);
  content.appendChild(panel);

  panel.querySelector('#addFp').addEventListener('click', async () => {
    const bi = readBi(panel);
    const slug = panel.querySelector('#newFpSlug').value.trim().toLowerCase().replace(/\s+/g, '-');
    if (!slug) { toast('أدخل الرابط المختصر (slug)'); return; }
    const item = await api('/api/admin/footerPages', { method: 'POST', body: {
      name: bi[0], slug, content: bi[1]
    }});
    BUNDLE.footerPages = BUNDLE.footerPages || [];
    BUNDLE.footerPages.push(item);
    renderFooterPages(document.getElementById('tabContent'));
    toast('تمت الإضافة');
  });

  const fpList = document.createElement('div');
  content.appendChild(fpList);

  function row(item) {
    const r = h(`<div class="panel" style="margin-top:0;border-top:1px solid var(--border);border-radius:0">
      <div class="grid-2" style="margin-bottom:0">
        ${biField('اسم الصفحة', item.name)}
      </div>
      <div class="field"><label>الرابط المختصر (slug)</label><input type="text" data-f="slug" value="${escAttr(item.slug)}"></div>
      ${biField('المحتوى', item.content || { ar: '', en: '' }, true)}
      <div class="item-actions">
        <a href="/p/${escAttr(item.slug)}" target="_blank" class="btn btn-outline">معاينة ↗</a>
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const bi = readBi(r);
      const slug = r.querySelector('[data-f="slug"]').value.trim().toLowerCase();
      await api(`/api/admin/footerPages/${item.id}`, { method: 'PUT', body: { name: bi[0], slug, content: bi[1] } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذه الصفحة؟')) return;
      await api(`/api/admin/footerPages/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderFooterPages(document.getElementById('tabContent'));
    });
    return r;
  }

  (BUNDLE.footerPages || []).forEach(item => fpList.appendChild(row(item)));
}

// ================= GALLERY =================
function renderGallery(content) {
  const panel = h(`<div class="panel"><h2>معرض الصور والمقاطع</h2>
    <div class="field"><label>إضافة ملف جديد (صورة أو فيديو)</label><input type="file" id="galleryFile" accept="image/*,video/*"></div>
    <div class="field" style="margin-top:12px">
      <label>أو أضف رابط (يوتيوب / صورة / فيديو) — اختياري</label>
      <input type="text" id="galleryUrl" placeholder="https://youtube.com/watch?v=... أو رابط صورة">
      <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
        <select id="galleryUrlType" style="padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;background:var(--panel);color:var(--cream)">
          <option value="image">صورة</option>
          <option value="video">فيديو / يوتيوب</option>
        </select>
        <button class="btn btn-outline" id="addUrlBtn">+ إضافة الرابط</button>
      </div>
    </div>
    <div id="galleryList"></div>
  </div>`);
  content.appendChild(panel);
  const list = panel.querySelector('#galleryList');

  function row(item) {
    let preview = '';
    const ytId = item.url && item.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (ytId) {
      preview = `<iframe src="https://www.youtube.com/embed/${ytId}" class="thumb" style="border:none" allowfullscreen></iframe>`;
    } else if (item.type === 'video') {
      preview = `<video src="${item.url}" class="thumb" muted></video>`;
    } else {
      preview = `<img src="${item.url}" class="thumb">`;
    }
    const r = h(`<div class="item-row">
      <div style="display:flex;gap:12px;align-items:flex-start">${preview}<div style="flex:1">${biField('وصف (اختياري)', item.caption)}</div></div>
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const caption = readBi(r)[0];
      await api(`/api/admin/gallery/${item.id}`, { method: 'PUT', body: { caption } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذا العنصر؟')) return;
      await api(`/api/admin/gallery/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderGallery(document.getElementById('tabContent'));
    });
    return r;
  }

  BUNDLE.gallery.forEach(item => list.appendChild(row(item)));

  // رفع ملف
  panel.querySelector('#galleryFile').addEventListener('change', async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const url = await uploadFile(file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    const item = await api('/api/admin/gallery', { method: 'POST', body: { url, type, caption: { ar: '', en: '' } } });
    BUNDLE.gallery.push(item); renderGallery(document.getElementById('tabContent')); toast('تمت الإضافة');
  });

  // إضافة رابط
  panel.querySelector('#addUrlBtn').addEventListener('click', async () => {
    const url = panel.querySelector('#galleryUrl').value.trim();
    if (!url) return toast('أدخل رابطاً أولاً');
    const type = panel.querySelector('#galleryUrlType').value;
    const item = await api('/api/admin/gallery', { method: 'POST', body: { url, type, caption: { ar: '', en: '' } } });
    BUNDLE.gallery.push(item); renderGallery(document.getElementById('tabContent')); toast('تمت الإضافة');
  });
}

// ================= NEWS / BLOG =================
function renderNewsOrBlog(content, collection, hasSlug) {
  const title = collection === 'news' ? 'أخبار سعيد' : 'المدونة';
  const panel = h(`<div class="panel"><h2>${title} - إضافة جديد</h2>
    <div class="field"><label>صورة (اختياري)</label><input type="file" id="newImage" accept="image/*"></div>
    ${biField('العنوان', { ar: '', en: '' })}
    ${biField('المحتوى', { ar: '', en: '' }, true)}
    ${!hasSlug ? `<div class="field"><label>رابط خارجي (اختياري)</label><input type="text" id="newLink" placeholder="https://..."></div>` : ''}
    ${hasSlug ? `<div class="field"><label>الرابط المختصر (slug)</label><input type="text" id="newSlug" placeholder="my-post"></div>` : ''}
    <button class="btn btn-primary" id="addItem">+ إضافة</button>
  </div>`);
  content.appendChild(panel);
  const list = document.createElement('div');
  content.appendChild(list);
  let newImageUrl = '';

  panel.querySelector('#newImage').addEventListener('change', async (e) => {
    if (!e.target.files[0]) return;
    newImageUrl = await uploadFile(e.target.files[0]); toast('تم رفع الصورة');
  });

  panel.querySelector('#addItem').addEventListener('click', async () => {
    const bi = readBi(panel);
    const payload = { title: bi[0], content: bi[1], image: newImageUrl, date: new Date().toISOString() };
    if (!hasSlug && panel.querySelector('#newLink')) payload.link = panel.querySelector('#newLink').value.trim();
    if (hasSlug) payload.slug = panel.querySelector('#newSlug').value || ('post-' + Date.now());
    const item = await api(`/api/admin/${collection}`, { method: 'POST', body: payload });
    BUNDLE[collection].push(item);
    renderNewsOrBlog(document.getElementById('tabContent'), collection, hasSlug); toast('تمت الإضافة');
  });

  function row(item) {
    const r = h(`<div class="panel">
      <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">
        ${item.image ? `<img src="${item.image}" class="thumb" style="width:90px;height:90px">` : ''}
        <div style="flex:1;min-width:220px">
          ${biField('العنوان', item.title)}
          ${biField('المحتوى', item.content, true)}
          ${hasSlug ? `<div class="field"><label>slug</label><input type="text" data-f="slug" value="${escAttr(item.slug || '')}"></div>` : ''}
          ${!hasSlug ? `<div class="field"><label>رابط خارجي (اختياري)</label><input type="text" data-f="link" value="${escAttr(item.link || '')}" placeholder="https://..."></div>` : ''}
          <div class="field"><label>التاريخ</label><input type="date" data-f="date" value="${(item.date || '').slice(0,10)}"></div>
          <div class="field"><label>تغيير الصورة</label><input type="file" data-f="image" accept="image/*"></div>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    let newImg = null;
    r.querySelector('[data-f="image"]').addEventListener('change', async (e) => {
      if (!e.target.files[0]) return;
      newImg = await uploadFile(e.target.files[0]); toast('تم رفع الصورة (اضغط حفظ)');
    });
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const bi = readBi(r);
      const payload = { title: bi[0], content: bi[1] };
      const dateVal = r.querySelector('[data-f="date"]').value;
      if (dateVal) payload.date = new Date(dateVal).toISOString();
      if (hasSlug) payload.slug = r.querySelector('[data-f="slug"]').value;
      if (!hasSlug && r.querySelector('[data-f="link"]')) payload.link = r.querySelector('[data-f="link"]').value.trim();
      if (newImg) payload.image = newImg;
      await api(`/api/admin/${collection}/${item.id}`, { method: 'PUT', body: payload });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذا العنصر؟')) return;
      await api(`/api/admin/${collection}/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderNewsOrBlog(document.getElementById('tabContent'), collection, hasSlug);
    });
    return r;
  }

  BUNDLE[collection].slice().sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(item => list.appendChild(row(item)));
}

// ================= FAQ / HELP CENTER =================
function renderFaq(content, category) {
  const title = 'مركز المساعدة (سعيد سنترهلب) — الأسئلة والأجوبة';
  const panel = h(`<div class="panel"><h2>${title} - إضافة جديد</h2>
    ${biField('السؤال', { ar: '', en: '' })}
    ${biField('الإجابة', { ar: '', en: '' }, true)}
    <button class="btn btn-primary" id="addFaq">+ إضافة</button>
  </div>`);
  content.appendChild(panel);
  const list = document.createElement('div');
  content.appendChild(list);

  panel.querySelector('#addFaq').addEventListener('click', async () => {
    const bi = readBi(panel);
    const item = await api('/api/admin/faq', { method: 'POST', body: { category, question: bi[0], answer: bi[1] } });
    BUNDLE.faq.push(item);
    renderFaq(document.getElementById('tabContent'), category); toast('تمت الإضافة');
  });

  function row(item) {
    const r = h(`<div class="item-row">
      ${biField('السؤال', item.question)}
      ${biField('الإجابة', item.answer, true)}
      <div class="item-actions">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const bi = readBi(r);
      await api(`/api/admin/faq/${item.id}`, { method: 'PUT', body: { question: bi[0], answer: bi[1] } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذا السؤال؟')) return;
      await api(`/api/admin/faq/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderFaq(document.getElementById('tabContent'), category);
    });
    return r;
  }

  BUNDLE.faq.filter(f => f.category === category).forEach(item => list.appendChild(row(item)));
}

// ================= COMPLAINT CATEGORIES =================
function renderComplaintCats(content) {
  const panel = h(`<div class="panel">
    <h2>أقسام الشكاوى</h2>
    <p class="help-text" style="margin-bottom:16px">المستخدم يختار قسماً من هذه القائمة عند تقديم الشكوى (اختيار إجباري).</p>
    <div id="catList"></div>
    <div style="display:flex;gap:10px;margin-top:12px;align-items:flex-end">
      <div class="field" style="margin:0;flex:1"><label>اسم القسم بالعربية</label><input type="text" id="newCatAr" placeholder="مثال: تقني"></div>
      <div class="field" style="margin:0;flex:1"><label>اسم القسم بالإنجليزية</label><input type="text" id="newCatEn" placeholder="e.g. Technical"></div>
      <button class="btn btn-primary" id="addCat" style="white-space:nowrap">+ إضافة</button>
    </div>
  </div>`);
  content.appendChild(panel);
  const list = panel.querySelector('#catList');

  function row(item) {
    const r = h(`<div class="item-row" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <div class="field" style="margin:0;flex:1"><label>العربية</label><input type="text" data-lang="ar" value="${escAttr(item.name.ar)}"></div>
      <div class="field" style="margin:0;flex:1"><label>English</label><input type="text" data-lang="en" value="${escAttr(item.name.en || '')}"></div>
      <div class="item-actions" style="margin:0">
        <button class="btn btn-outline save-btn">حفظ</button>
        <button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button>
      </div>
    </div>`);
    r.querySelector('.save-btn').addEventListener('click', async () => {
      const name = { ar: r.querySelector('[data-lang="ar"]').value, en: r.querySelector('[data-lang="en"]').value };
      await api(`/api/admin/complaintCategories/${item.id}`, { method: 'PUT', body: { name } });
      toast('تم الحفظ'); await loadBundle();
    });
    r.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذا القسم؟')) return;
      await api(`/api/admin/complaintCategories/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderComplaintCats(document.getElementById('tabContent'));
    });
    return r;
  }

  (BUNDLE.complaintCategories || []).forEach(item => list.appendChild(row(item)));

  panel.querySelector('#addCat').addEventListener('click', async () => {
    const ar = panel.querySelector('#newCatAr').value.trim();
    const en = panel.querySelector('#newCatEn').value.trim();
    if (!ar) { toast('أدخل اسم القسم بالعربية'); return; }
    const item = await api('/api/admin/complaintCategories', { method: 'POST', body: { name: { ar, en: en || ar } } });
    BUNDLE.complaintCategories = BUNDLE.complaintCategories || [];
    BUNDLE.complaintCategories.push(item);
    renderComplaintCats(document.getElementById('tabContent')); toast('تمت الإضافة');
  });
}

// ================= MESSAGES (suggestions / complaints) =================
function renderMessages(content, type) {
  const isComplaint = type === 'complaint';
  const title = isComplaint ? 'الشكاوى الواردة' : 'الاقتراحات الواردة';
  const items = (BUNDLE.messages || [])
    .filter(m => m.type === type)
    .sort((a,b) => new Date(b.date) - new Date(a.date));

  const cols = isComplaint
    ? '<th>القسم</th><th>الاسم</th><th>البريد</th><th>الرسالة</th><th>المرفق</th><th>التاريخ</th><th>الحالة</th><th></th>'
    : '<th>الاسم</th><th>البريد</th><th>الرسالة</th><th>المرفق</th><th>التاريخ</th><th>الحالة</th><th></th>';

  const panel = h(`<div class="panel"><h2>${title}</h2>
    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:12px">${items.length} رسالة</p>
    <div class="table-wrap"><table class="admin-table">
      <thead><tr>${cols}</tr></thead>
      <tbody id="msgBody"></tbody>
    </table></div></div>`);
  content.appendChild(panel);
  const tbody = panel.querySelector('#msgBody');

  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="${isComplaint ? 8 : 7}" style="text-align:center;color:var(--text-muted)">لا توجد رسائل</td></tr>`;
    return;
  }

  items.forEach(item => {
    const catCell = isComplaint ? `<td>${escHtml(item.complaintCategory || '-')}</td>` : '';
    const attachCell = item.attachmentUrl
      ? `<td><a href="${escAttr(item.attachmentUrl)}" target="_blank" rel="noopener noreferrer" style="color:var(--red)">📎 فتح</a></td>`
      : `<td style="color:var(--text-muted)">—</td>`;
    const tr = h(`<tr>
      ${catCell}
      <td>${escHtml(item.name) || '-'}</td>
      <td>${escHtml(item.email) || '-'}</td>
      <td style="max-width:260px;white-space:pre-wrap">${escHtml(item.message)}</td>
      ${attachCell}
      <td style="white-space:nowrap">${new Date(item.date).toLocaleString('ar-SA')}</td>
      <td><span class="badge ${item.read ? 'read' : 'unread'}" style="cursor:pointer" data-toggle>${item.read ? 'مقروءة' : 'غير مقروءة'}</span></td>
      <td><button class="btn btn-outline del-btn" style="color:var(--red);border-color:var(--red)">حذف</button></td>
    </tr>`);
    tr.querySelector('[data-toggle]').addEventListener('click', async () => {
      await api(`/api/admin/messages/${item.id}`, { method: 'PUT', body: { read: !item.read } });
      await loadBundle(); renderMessages(document.getElementById('tabContent'), type);
    });
    tr.querySelector('.del-btn').addEventListener('click', async () => {
      if (!confirm('حذف هذه الرسالة؟')) return;
      await api(`/api/admin/messages/${item.id}`, { method: 'DELETE' });
      await loadBundle(); renderMessages(document.getElementById('tabContent'), type);
    });
    tbody.appendChild(tr);
  });
}

// ================= CUSTOM DESIGN =================
function renderCustomDesign(content) {
  const s = BUNDLE.settings;
  const panel = h(`<div class="panel">
    <h2>التصميم المخصص (CSS / JS)</h2>
    <p class="help-text" style="margin-bottom:16px">يمكنك تعديل مظهر الموقع وتحريكاته باستخدام CSS و JavaScript مخصص. سيُضاف الكود تلقائياً في الصفحة الرئيسية.</p>
    <div class="field">
      <label>CSS مخصص</label>
      <textarea id="customCss" style="font-family:monospace;font-size:.82rem;min-height:180px;direction:ltr;text-align:left">${escHtml(s.customCss || '')}</textarea>
      <p class="help-text">مثال: <code>:root { --red: #ff5500; }</code> أو تغيير خط الموقع.</p>
    </div>
    <div class="field">
      <label>JavaScript مخصص</label>
      <textarea id="customJs" style="font-family:monospace;font-size:.82rem;min-height:120px;direction:ltr;text-align:left">${escHtml(s.customJs || '')}</textarea>
      <p class="help-text">تنبيه: أي كود خاطئ هنا قد يؤثر على أداء الموقع.</p>
    </div>
    <button class="btn btn-primary" id="saveDesign">حفظ التصميم</button>
  </div>`);
  content.appendChild(panel);

  panel.querySelector('#saveDesign').addEventListener('click', async () => {
    const customCss = panel.querySelector('#customCss').value;
    const customJs = panel.querySelector('#customJs').value;
    const res = await api('/api/admin/settings', { method: 'PUT', body: { customCss, customJs } });
    BUNDLE.settings = res.settings;
    toast('تم حفظ التصميم بنجاح');
  });
}

// ================= ACCOUNT =================
function renderAccount(content) {
  const panel = h(`<div class="panel"><h2>إعدادات الحساب</h2>
    <p class="help-text">البريد الحالي: <b>${escHtml(BUNDLE.admin.email)}</b></p>
    <div class="field"><label>كلمة المرور الحالية</label><input type="password" id="curPass" required></div>
    <div class="field"><label>بريد إلكتروني جديد (اختياري)</label><input type="email" id="newEmail" placeholder="${escAttr(BUNDLE.admin.email)}"></div>
    <div class="field"><label>كلمة مرور جديدة (اختياري)</label><input type="password" id="newPass"></div>
    <button class="btn btn-primary" id="saveAccount">حفظ التغييرات</button>
    <div class="form-msg" id="accountMsg"></div>
  </div>`);
  content.appendChild(panel);

  panel.querySelector('#saveAccount').addEventListener('click', async () => {
    const msg = panel.querySelector('#accountMsg');
    msg.textContent = ''; msg.className = 'form-msg';
    try {
      const body = { currentPassword: panel.querySelector('#curPass').value };
      const newEmail = panel.querySelector('#newEmail').value;
      const newPass = panel.querySelector('#newPass').value;
      if (newEmail) body.newEmail = newEmail;
      if (newPass) body.newPassword = newPass;
      const res = await api('/api/admin/credentials', { method: 'PUT', body });
      BUNDLE.admin.email = res.email;
      msg.textContent = 'تم تحديث بيانات الحساب بنجاح';
      msg.classList.add('success');
      panel.querySelector('#curPass').value = '';
      panel.querySelector('#newPass').value = '';
    } catch {
      msg.textContent = 'كلمة المرور الحالية غير صحيحة';
      msg.classList.add('error');
    }
  });
}

checkAuth();
