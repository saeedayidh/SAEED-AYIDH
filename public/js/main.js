let SITE_DATA = null;

function L(field) {
  if (!field) return '';
  const lang = currentLang();
  return field[lang] || field.ar || field.en || '';
}

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    const lang = currentLang();
    return d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return ''; }
}

function splitRoles(text) {
  if (!text) return [];
  return text
    .split(/[,،]|\s&\s/)
    .map(s => s.trim().replace(/^و(?=\S)/, ''))
    .map(s => s.trim())
    .filter(Boolean);
}

function applyTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}

function applyLang() {
  const lang = currentLang();
  const dir = I18N[lang].dir;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', dir);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.textContent = t('lang_toggle');
}

function toggleTheme() {
  const cur = localStorage.getItem('theme') || 'dark';
  localStorage.setItem('theme', cur === 'dark' ? 'light' : 'dark');
  applyTheme();
}

function toggleLang() {
  const cur = currentLang();
  localStorage.setItem('lang', cur === 'ar' ? 'en' : 'ar');
  applyLang();
  if (SITE_DATA) renderAll(SITE_DATA);
}

async function loadData() {
  const res = await fetch('/api/data');
  return res.json();
}

/* ============================= رندر المحتوى ============================= */

function renderHeader(data) {
  const s = data.settings;
  document.getElementById('siteName').textContent = L(s.siteName);
  document.getElementById('heroName').innerHTML = `<span class="accent">${L(s.siteName)}</span>`;
  document.getElementById('heroTagline').textContent = L(s.tagline);
  document.title = `${L(s.siteName)} | ${L(s.tagline)}`;
  document.getElementById('footerName').textContent = L(s.siteName);
  document.getElementById('footerName2').textContent = L(s.siteName);
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  if (s.logo) {
    document.getElementById('logoImg').src = s.logo;
    document.getElementById('footLogo').src = s.logo;
  }
  if (s.avatar) document.getElementById('heroAvatar').src = s.avatar;

  document.getElementById('aboutTitle').textContent = L(s.aboutTitle);
  const aboutLines = L(s.aboutText).split('\n').filter(Boolean);
  document.getElementById('aboutLead').textContent = aboutLines[0] || '';
  document.getElementById('aboutText').textContent = aboutLines.slice(1).join('\n');

  document.getElementById('statsTitle').textContent = L(s.statsTitle);
  document.getElementById('promoTitle').textContent = L(s.announcementTitle);
  document.getElementById('announcementTitle').textContent = L(s.announcementTitle);
  document.getElementById('announcementText').textContent = L(s.announcementText);
  document.getElementById('pagesTitle').textContent = L(s.pagesTitle);
  document.getElementById('galleryTitle').textContent = L(s.galleryTitle);
  document.getElementById('newsTitle').textContent = L(s.newsTitle);
  document.getElementById('blogTitle').textContent = L(s.blogTitle);
  document.getElementById('contactTitle').textContent = L(s.contactTitle);
  document.getElementById('helpCenterTitle').textContent = L(s.helpCenterName);

  // أسطر شاشة الترحيب
  const lines = L(s.welcomeMessage).split('\n').filter(Boolean);
  ['splashLine1', 'splashLine2', 'splashLine3'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (lines[i]) { el.textContent = lines[i]; el.style.display = ''; }
    else { el.style.display = 'none'; }
  });

  // الشريط المتحرك
  renderMarquee(data);
}

function renderMarquee(data) {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  track.innerHTML = '';
  const roles = splitRoles(L(data.settings.tagline));
  const items = roles.length ? roles : [L(data.settings.siteName)];
  for (let r = 0; r < 2; r++) {
    items.forEach(it => {
      const span = document.createElement('span');
      span.textContent = it;
      track.appendChild(span);
    });
  }
}

function renderRoles(data) {
  const wrap = document.getElementById('rolesList');
  wrap.innerHTML = '';
  const roles = splitRoles(L(data.settings.tagline));
  roles.forEach(r => {
    const span = document.createElement('span');
    span.className = 'role';
    span.textContent = r;
    wrap.appendChild(span);
  });
}

function renderStats(data) {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = '';
  if (!data.stats.length) {
    grid.innerHTML = `<div class="empty-state">-</div>`;
    return;
  }
  data.stats.forEach(stat => {
    const el = document.createElement('div');
    el.className = 'stat-card';
    el.innerHTML = `
      <div class="icon">${stat.icon || '⭐'}</div>
      <div class="value">${stat.value}</div>
      <div class="label">${L(stat.label)}</div>`;
    grid.appendChild(el);
  });
}

function renderSocial(data) {
  const grid = document.getElementById('socialGrid');
  grid.innerHTML = '';
  data.social.forEach(item => {
    const a = document.createElement('a');
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'social-card spot';
    const brand = typeof socialBrand === 'function' ? socialBrand(item.platform) : '';
    if (brand) a.style.setProperty('--brand', brand);
    a.innerHTML = `
      <div class="ic">${socialIcon(item.platform)}</div>
      <div class="nm">${L(item.name)}</div>`;
    grid.appendChild(a);
  });
  attachSpotlight(grid.querySelectorAll('.social-card'));
}

function renderPages(data) {
  const wrap = document.getElementById('pagesCats');
  wrap.innerHTML = '';
  const groups = {};
  data.pages.forEach(p => {
    const key = L(p.group);
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });
  Object.entries(groups).forEach(([groupName, items]) => {
    const cat = document.createElement('div');
    cat.className = 'cat';
    const ul = document.createElement('ul');
    items.forEach((p, idx) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `<span class="n">${idx + 1}</span><span>${L(p.title)}</span><span class="arrow">↗</span>`;
      li.appendChild(a);
      ul.appendChild(li);
    });
    const head = document.createElement('div');
    head.className = 'cat-title';
    head.innerHTML = `<span class="dot"></span>${groupName}`;
    cat.appendChild(head);
    cat.appendChild(ul);
    wrap.appendChild(cat);
  });
}

function renderGallery(data) {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  if (!data.gallery.length) {
    grid.innerHTML = `<div class="empty-state">${t('gallery_empty')}</div>`;
    return;
  }
  data.gallery.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    const media = item.type === 'video'
      ? `<video src="${item.url}" controls muted></video>`
      : `<img src="${item.url}" alt="${L(item.caption)}" loading="lazy">`;
    const caption = L(item.caption) ? `<div class="caption">${L(item.caption)}</div>` : '';
    el.innerHTML = media + caption;
    grid.appendChild(el);
  });
}

function renderCards(containerId, items, emptyKey) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = '';
  if (!items.length) {
    grid.innerHTML = `<div class="empty-state">${t(emptyKey)}</div>`;
    return;
  }
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'card';
    const img = item.image ? `<img class="card-img" src="${item.image}" alt="">` : '';
    const content = L(item.content) || '';
    const preview = content.length > 160 ? content.slice(0, 160) + '…' : content;
    el.innerHTML = `
      ${img}
      <div class="card-body">
        <div class="card-date">${fmtDate(item.date)}</div>
        <h3>${L(item.title)}</h3>
        <p>${preview}</p>
      </div>`;
    grid.appendChild(el);
  });
}

// ----- شريط التنقل الديناميكي -----
function renderNav(data) {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;
  navLinks.innerHTML = '';
  const sections = data.navSections || [];
  sections.forEach(item => {
    if (item.visible === false) return;
    const a = document.createElement('a');
    a.href = item.href || '#';
    a.textContent = L(item.label);
    navLinks.appendChild(a);
  });
  // إعادة ربط أحداث التمرير للروابط الجديدة
  setupScrollLinks();
}

// ----- الصفحات السفلية في الفوتر -----
function renderFooterPages(data) {
  const container = document.getElementById('footerPages');
  if (!container) return;
  container.innerHTML = '';
  const fps = data.footerPages || [];
  fps.forEach(fp => {
    const a = document.createElement('a');
    a.href = `/p/${fp.slug}`;
    a.textContent = L(fp.name);
    container.appendChild(a);
  });
}

// ----- حقن CSS/JS مخصص -----
function injectCustomDesign(data) {
  const s = data.settings;
  // CSS
  const styleEl = document.getElementById('customCssStyle');
  if (styleEl && s.customCss) styleEl.textContent = s.customCss;
  // JS
  if (s.customJs && s.customJs.trim()) {
    const script = document.createElement('script');
    script.textContent = s.customJs;
    document.body.appendChild(script);
  }
}

// ----- زر واتساب العائم -----
function renderWhatsApp(data) {
  const btn = document.getElementById('waBtn');
  if (!btn) return;
  const url = data.settings.whatsapp || '';
  if (url) {
    btn.href = url;
    btn.hidden = false;
  } else {
    btn.hidden = true;
  }
}

// ----- أقسام الشكاوى -----
function renderComplaintCategories(data) {
  const select = document.getElementById('complaintCategorySelect');
  if (!select) return;
  const cats = data.complaintCategories || [];
  // أبقِ الخيار الأول (placeholder)
  const placeholder = select.querySelector('[value=""]');
  select.innerHTML = '';
  if (placeholder) select.appendChild(placeholder);
  cats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = L(cat.name);
    opt.textContent = L(cat.name);
    select.appendChild(opt);
  });
  // تحديث نص placeholder
  if (placeholder) placeholder.textContent = t('category_placeholder');
}

function renderAll(data) {
  renderHeader(data);
  renderNav(data);
  renderRoles(data);
  renderStats(data);
  renderSocial(data);
  renderPages(data);
  renderGallery(data);
  renderCards('newsGrid', data.news, 'news_empty');
  renderCards('blogGrid', data.blog, 'blog_empty');
  renderFooterPages(data);
  renderWhatsApp(data);
  renderComplaintCategories(data);
  injectCustomDesign(data);
}

/* ============================= نموذج التواصل ============================= */

function setupContactForms() {
  const map = [
    { formId: 'suggestionForm', msgId: 'suggestionMsg', type: 'suggestion' },
    { formId: 'complaintForm', msgId: 'complaintMsg', type: 'complaint' }
  ];
  map.forEach(({ formId, msgId, type }) => {
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      msg.className = 'form-msg';
      const fd = new FormData(form);
      const payload = {
        type,
        name: fd.get('name') || '',
        email: fd.get('email') || '',
        message: fd.get('message') || ''
      };
      if (type === 'complaint') {
        payload.complaintCategory = fd.get('complaintCategory') || '';
      }
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('failed');
        msg.textContent = t('send_success');
        msg.classList.add('success');
        form.reset();
      } catch {
        msg.textContent = t('send_error');
        msg.classList.add('error');
      }
    });
  });
}

/* ============================= شاشة الترحيب ============================= */

function setupSplash() {
  const splash = document.getElementById('splash');
  const enterBtn = document.getElementById('enterBtn');
  const seen = sessionStorage.getItem('welcomed');
  if (seen) {
    splash.classList.add('skip');
    return;
  }
  const close = () => {
    splash.classList.add('gone');
    sessionStorage.setItem('welcomed', '1');
    setTimeout(() => splash.remove(), 1100);
  };
  enterBtn.addEventListener('click', close);
}

/* ============================= تفاعلات الواجهة ============================= */

function setupCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let active = false;
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    if (!active) { active = true; document.body.classList.add('has-cursor'); }
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest && e.target.closest('a, button, .role, .cat li a, input, textarea, select, label')) {
      ring.classList.add('big');
    }
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest && e.target.closest('a, button, .role, .cat li a, input, textarea, select, label')) {
      ring.classList.remove('big');
    }
  });
}

function setupScrollLinks() {
  // ربط الروابط النشطة في شريط التنقل (يُستدعى بعد renderNav)
  const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function markActive() {
    let current = sections[0];
    const probe = window.scrollY + window.innerHeight * 0.3;
    sections.forEach(sec => { if (sec.offsetTop <= probe) current = sec; });
    navLinks.forEach(a => {
      const match = current && a.getAttribute('href') === '#' + current.id;
      a.classList.toggle('active', !!match);
    });
  }

  window._markNavActive = markActive;
  markActive();
}

function setupScrollEffects() {
  const progress = document.getElementById('progress');
  const nav = document.getElementById('nav');
  const toTop = document.getElementById('toTop');

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
    if (window._markNavActive) window._markNavActive();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => obs.observe(el));
}

function attachSpotlight(nodeList) {
  nodeList.forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });
}

function setupSpotlight() {
  attachSpotlight(document.querySelectorAll('.spot'));
}

function setupTilt() {
  const frame = document.getElementById('coverFrame');
  const shine = document.getElementById('coverShine');
  if (!frame) return;
  frame.addEventListener('pointermove', (e) => {
    const rect = frame.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -12;
    const ry = (px - 0.5) * 12;
    frame.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (shine) {
      shine.style.setProperty('--sx', (px * 100) + '%');
      shine.style.setProperty('--sy', (py * 100) + '%');
    }
  });
  frame.addEventListener('pointerleave', () => {
    frame.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

function setupMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
}

/* ============================= بدء التشغيل ============================= */

async function init() {
  applyTheme();
  applyLang();

  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('langBtn').addEventListener('click', toggleLang);

  setupSplash();
  setupCursor();
  setupScrollEffects();
  setupReveal();
  setupSpotlight();
  setupTilt();
  setupMobileMenu();

  try {
    SITE_DATA = await loadData();
    renderAll(SITE_DATA);
  } catch (err) {
    console.error('Failed to load site data', err);
  }

  setupContactForms();
}

document.addEventListener('DOMContentLoaded', init);
