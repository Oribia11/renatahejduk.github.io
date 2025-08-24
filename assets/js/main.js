/* Main JS - modularized and namespaced as `RH` (Renata Hejduk site) */
const RH = (function () {
    const state = { lang: 'en', mode: document.documentElement.classList.contains('mode-built') ? 'built' : 'blueprint' };
    // reference to the viewer open function (assigned in initViewer)
    let openViewerRef = null;

    /* ===== i18n ===== */
    const i18n = {
        en: {
            nav_home: "Home", nav_about: "About", nav_portfolio: "Portfolio", nav_services: "Services", nav_contact: "Contact",
            hero_headline: "Designing timeless homes for modern living",
            hero_sub: "From blueprint to atmosphere — vintage elegance refined for contemporary life.",
            cta_consult: "Book a consultation", cta_calendly: "Open Calendly", enter_btn: "ENTER THE SPACE",
            mode_enter: "ENTER SPACES", mode_back: "RETURN TO SCHEMATICS",
            about_title: "About",
            bio_1: "Hi, I’m Renata. I used to be a Marketing Officer, but my real passion has always been shaping spaces. Now I’m stepping fully into architecture as an independent junior architect, blending storytelling with design.",
            bio_2: "My favorite projects bring together vintage elegance with modern living — creating homes that feel both timeless and personal.",
            portfolio_title: "Portfolio", portfolio_intro: "Two projects that show the blend: vintage geometry + modern calm.",
            projA_title: "Projekt A — Mieszkanie jednoosobowe", projA_note: "Renovation — brass lines, arched openings, integrated storage.",
            projB_title: "Projekt B — Kuchnia (wizualizacje)", projB_note: "Concept studies: tone-on-tone palettes, curved millwork, and light.",
            projA_desc: "One-person apartment for a theatre actor. Art Deco style.",
            projB_desc: "Redesign of my own living room and kitchen. Hoping to realize soon.",
            btn_viz: "View visualizations",
            btn_schem: "View schematics",
            btn_real: "Real pictures",
            viewer_prev: "Prev", viewer_next: "Next", viewer_close: "Close", viewer_na: "Not available yet",
            viewer_title: "Preview", viewer_viz: "— Visualizations", viewer_schem: "— Schematics",
            placeholder_name: "Your name",
            placeholder_email: "you@example.com",
            placeholder_message: "Tell me about your project...",
            services_title: "Services — Work with Me", services_intro: "From quick consultations to full residential transformations.",
            svc1_title: "Design Consultation", svc1_text: "A focused session to review your space, style, and priorities. Clear next steps within 48 hours.",
            svc2_title: "Concept & Visualization", svc2_text: "Moodboards, material palettes, and 3D visuals that bring the story of your home to life.",
            svc3_title: "Plans & Guidance", svc3_text: "Architectural plans, finishes, and on-call advice during implementation.",
            contact_title: "Contact", form_name: "Name", form_email: "Email", form_message: "Message", form_send: "Send", contact_or: "or", contact_follow: "Follow"
        },
        pl: {
            nav_home: "Start", nav_about: "O mnie", nav_portfolio: "Portfolio", nav_services: "Oferta", nav_contact: "Kontakt",
            hero_headline: "Projektuję ponadczasowe domy dla współczesnego życia",
            hero_sub: "Od planu do atmosfery — elegancja vintage dopracowana dla współczesności.",
            cta_consult: "Umów konsultację", cta_calendly: "Otwórz Calendly", enter_btn: "WEJDŹ DO PRZESTRZENI",
            mode_enter: "WEJDŹ DO PRZESTRZENI", mode_back: "WRÓĆ DO SCHEMATU",
            about_title: "O mnie",
            bio_1: "Cześć, jestem Renata. Przez lata pracowałam w marketingu, ale moją prawdziwą pasją zawsze było kształtowanie przestrzeni. Teraz w pełni poświęcam się architekturze jako niezależna architektka, łącząc modern z vintage.",
            bio_2: "Najbardziej lubię projekty, które łączą elegancję vintage ze współczesnym życiem — tworząc domy ponadczasowe i osobiste.",
            portfolio_title: "Portfolio", portfolio_intro: "Dwa projekty łączące geometrię vintage ze spokojem nowoczesności.",
            projA_title: "Projekt A — Mieszkanie jednoosobowe", projA_note: "Renowacja mieszkania w Warszawie — mosiężne linie, łukowe przejścia i zabudowy.",
            projB_title: "Projekt B — Kuchnia (wizualizacje)", projB_note: "Studia koncepcyjne: ton-w-ton, miękkie łuki i światło.",
            projA_desc: "Mieszkanie jednoosobowe dla aktora teatralnego. Styl Art Deco.",
            projB_desc: "Redesign mojego wlasnego salonu i kuchni. Mam nadzieje ze niedlugo wejdzie w zycie.",
            btn_viz: "Zobacz wizualizacje",
            btn_schem: "Zobacz rysunki",
            btn_real: "Zdjęcia — jak wyszło",
            viewer_prev: "Poprzedni", viewer_next: "Następny", viewer_close: "Zamknij", viewer_na: "Jeszcze niedostępne",
            viewer_title: "Podgląd", viewer_viz: "— Wizualizacje", viewer_schem: "— Rysunki",
            placeholder_name: "Twoje imię i nazwisko",
            placeholder_email: "ty@example.com",
            placeholder_message: "Opowiedz o swoim projekcie...",
            services_title: "Oferta — Współpraca", services_intro: "Od krótkich konsultacji po pełne metamorfozy mieszkań.",
            svc1_title: "Konsultacja projektowa", svc1_text: "Skoncentrowane spotkanie o Twojej przestrzeni, stylu i priorytetach. Jasne kroki w 48 godzin.",
            svc2_title: "Koncepcja i wizualizacje", svc2_text: "Moodboardy, palety materiałów i wizualizacje 3D opowiadające historię domu.",
            svc3_title: "Rysunki i doradztwo", svc3_text: "Rysunki, wykończenia i wsparcie w trakcie realizacji.",
            contact_title: "Kontakt", form_name: "Imię i nazwisko", form_email: "E-mail", form_message: "Wiadomość", form_send: "Wyślij", contact_or: "albo", contact_follow: "Śledź"
        }
    };

    function applyI18n(lang) {
        document.documentElement.lang = (lang === 'pl') ? 'pl' : 'en';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const k = el.getAttribute('data-i18n'); if (i18n[lang] && i18n[lang][k]) el.textContent = i18n[lang][k];
        });
        // placeholders
        const nameEl = document.getElementById('name'); if (nameEl) nameEl.placeholder = (i18n[lang] && i18n[lang].placeholder_name) || '';
        const emailEl = document.getElementById('email'); if (emailEl) emailEl.placeholder = (i18n[lang] && i18n[lang].placeholder_email) || '';
        const msgEl = document.getElementById('msg'); if (msgEl) msgEl.placeholder = (i18n[lang] && i18n[lang].placeholder_message) || '';
        const vTitle = document.getElementById('viewerTitle'); if (vTitle && i18n[lang] && i18n[lang].viewer_title) vTitle.textContent = i18n[lang].viewer_title;
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-pl').classList.toggle('active', lang === 'pl');
        const langToggleBtn = document.getElementById('langToggle'); if (langToggleBtn) langToggleBtn.textContent = (lang === 'pl') ? 'PL' : 'EN';
    }

    function setLang(lang) { state.lang = lang; applyI18n(lang); setMode(state.mode); }

    function toggleLang() { setLang(state.lang === 'pl' ? 'en' : 'pl'); }

    /* ===== Mode (blueprint / built) ===== */
    function setMode(mode) {
        state.mode = mode;
        if (mode === 'built') { document.documentElement.classList.remove('mode-blueprint'); document.documentElement.classList.add('mode-built'); }
        else { document.documentElement.classList.remove('mode-built'); document.documentElement.classList.add('mode-blueprint'); }
        const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en';
        const enterBtn = document.getElementById('enter');
        const headerBtn = document.getElementById('modeToggle');
        if (enterBtn) enterBtn.textContent = (mode === 'built') ? (i18n[lang].mode_back || 'RETURN TO SCHEMATICS') : (i18n[lang].mode_enter || 'ENTER THE SPACE');
        if (headerBtn) headerBtn.textContent = (mode === 'built') ? (i18n[lang].mode_back || 'RETURN') : (i18n[lang].mode_enter || 'SCHEMATIC');
        if (enterBtn) enterBtn.setAttribute('aria-pressed', mode === 'built' ? 'true' : 'false');
    }
    function toggleMode() { setMode(state.mode === 'built' ? 'blueprint' : 'built'); }

    /* ===== Mobile nav ===== */
    function initMobileNav() { const btn = document.getElementById('mobileMenuBtn'); const nav = document.querySelector('nav[aria-label="Primary"]'); if (!btn || !nav) return; btn.addEventListener('click', () => { const open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); })); }

    /* ===== Reveal on scroll ===== */
    function initReveal() { const io = new IntersectionObserver((es) => { es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target) } }) }, { threshold: .12 }); document.querySelectorAll('.reveal').forEach(el => io.observe(el)); }

    /* ===== Sliders ===== */
    function initSliders() { document.querySelectorAll('.slider').forEach(sl => { const track = sl.querySelector('.slides'); const slides = sl.querySelectorAll('.slide'); const prog = sl.querySelector('.prog'); if (!track) return; let idx = 0, timer = null, anim = null, dur = 4500; const prefersCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches; const allowAutoplay = !prefersCoarse; const set = () => track.style.transform = `translateX(${-idx * 100}%)`; const play = () => { if (!allowAutoplay) return; stop(); if (prog) prog.style.width = '0%'; anim = prog && prog.animate ? prog.animate([{ width: '0%' }, { width: '100%' }], { duration: dur, easing: 'linear' }) : null; timer = setTimeout(() => { idx = (idx + 1) % slides.length; set(); play(); }, dur); }; const stop = () => { clearTimeout(timer); if (anim) anim.cancel(); }; const next = sl.querySelector('.next'); const prev = sl.querySelector('.prev'); if (next) next.onclick = () => { idx = (idx + 1) % slides.length; set(); play(); }; if (prev) prev.onclick = () => { idx = (idx - 1 + slides.length) % slides.length; set(); play(); }; sl.addEventListener('mouseenter', stop); sl.addEventListener('mouseleave', play); let sx = 0, dx = 0; track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop() }, { passive: true }); track.addEventListener('touchmove', e => { dx = e.touches[0].clientX - sx }, { passive: true }); track.addEventListener('touchend', () => { if (Math.abs(dx) > 40) { idx = (idx + (dx < 0 ? 1 : -1) + slides.length) % slides.length; set(); } dx = 0; play(); }); set(); play(); }); }

    /* ===== Mailto helper ===== */
    function mailtoSubmit(e) { e.preventDefault(); const name = document.getElementById('name').value.trim(); const email = document.getElementById('email').value.trim(); const msg = document.getElementById('msg').value.trim(); const subject = encodeURIComponent("New inquiry from " + name); const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`); window.location.href = `mailto:renata.hejduk@wp.pl?subject=${subject}&body=${body}`; return false; }

    /* ===== Project viewer (PDF+images) ===== */
    function initViewer() {
        const viewer = document.getElementById('viewer'); const body = document.getElementById('viewerBody'); const title = document.getElementById('viewerTitle'); const note = document.getElementById('viewerNote'); const prevBtn = document.getElementById('viewerPrev'); const nextBtn = document.getElementById('viewerNext'); const closeBtn = document.getElementById('viewerClose'); if (!viewer || !body) return; let items = [], idx = 0, currentLoading = null;
        async function renderPDFToContainer(url) { try { if (currentLoading && currentLoading.destroy) currentLoading.destroy(); } catch (e) { } body.innerHTML = ''; note.style.display = 'none'; if (!window['pdfjsLib']) { const iframe = document.createElement('iframe'); iframe.src = encodeURI(url); iframe.title = 'PDF'; iframe.loading = 'lazy'; body.appendChild(iframe); return; } const pdfjsLib = window['pdfjsLib']; pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'; const loadingTask = pdfjsLib.getDocument(encodeURI(url)); currentLoading = loadingTask; try { const pdf = await loadingTask.promise; for (let p = 1; p <= pdf.numPages; p++) { const page = await pdf.getPage(p); const baseViewport = page.getViewport({ scale: 1 }); const containerWidth = Math.max(300, body.clientWidth || (window.innerWidth * 0.9)); const dpr = window.devicePixelRatio || 1; const desiredScale = Math.min(1.6, (containerWidth / baseViewport.width) * dpr); const viewport = page.getViewport({ scale: desiredScale }); const canvas = document.createElement('canvas'); canvas.style.display = 'block'; canvas.style.width = '100%'; canvas.style.height = 'auto'; const context = canvas.getContext('2d'); canvas.width = Math.floor(viewport.width); canvas.height = Math.floor(viewport.height); await page.render({ canvasContext: context, viewport }).promise; body.appendChild(canvas); } body.scrollTop = 0; } catch (err) { body.innerHTML = ''; const iframe = document.createElement('iframe'); iframe.src = encodeURI(url); iframe.title = 'PDF'; iframe.loading = 'lazy'; body.appendChild(iframe); } }
        function showItem(i) { if (!items || items.length === 0) { body.innerHTML = ''; note.style.display = ''; prevBtn.disabled = true; nextBtn.disabled = true; return } idx = (i + items.length) % items.length; const it = items[idx]; prevBtn.disabled = items.length <= 1; nextBtn.disabled = items.length <= 1; if (it.type === 'img') { currentLoading = null; body.innerHTML = ''; note.style.display = 'none'; const img = document.createElement('img'); img.src = encodeURI(it.src); img.alt = it.alt || ''; img.loading = 'lazy'; body.appendChild(img); } else if (it.type === 'pdf') { renderPDFToContainer(it.src); } }
    function openViewer(list, projectTitle) { items = list; idx = 0; if (title) title.textContent = projectTitle || 'Preview'; if (!items || items.length === 0) { body.innerHTML = ''; note.style.display = ''; } else showItem(0); viewer.classList.add('active'); viewer.setAttribute('aria-hidden', 'false'); }
    function closeViewer() { viewer.classList.remove('active'); viewer.setAttribute('aria-hidden', 'true'); }
    // expose to outer scope so other modules (renderProjects) can open the viewer
    openViewerRef = openViewer;
        if (prevBtn) prevBtn.addEventListener('click', () => showItem(idx - 1)); if (nextBtn) nextBtn.addEventListener('click', () => showItem(idx + 1)); if (closeBtn) closeBtn.addEventListener('click', closeViewer); viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
        document.querySelectorAll('.proj').forEach(p => { p.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', () => { const action = btn.getAttribute('data-action'); const titleText = (p.querySelector('h3') || {}).textContent || ''; if (action === 'viz') { const raw = p.getAttribute('data-viz') || ''; const parts = raw.split('|').map(s => s.trim()).filter(Boolean); const list = parts.map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: titleText })); const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en'; openViewer(list, titleText + ' ' + ((i18n[lang] && i18n[lang].viewer_viz) || '— Visualizations')); } else if (action === 'schem') { const raw = p.getAttribute('data-schem') || ''; const parts = raw.split('|').map(s => s.trim()).filter(Boolean); if (!parts.length) { const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en'; openViewer([], titleText + ' ' + ((i18n[lang] && i18n[lang].viewer_schem) || '— Schematics')); return; } const list = parts.map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: titleText })); const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en'; openViewer(list, titleText + ' ' + ((i18n[lang] && i18n[lang].viewer_schem) || '— Schematics')); } })); });
    }

    /* ===== Fullscreen collage for visualizations ===== */
    async function openCollage(items, projectTitle) {
        // create overlay
        const overlay = document.createElement('div'); overlay.className = 'collage-fullscreen';
        const inner = document.createElement('div'); inner.className = 'collage-inner card';
        const closeBtn = document.createElement('button'); closeBtn.className = 'btn collage-close'; closeBtn.type = 'button'; closeBtn.textContent = 'Close';
        const titleEl = document.createElement('strong'); titleEl.style.display = 'block'; titleEl.style.marginBottom = '12px'; titleEl.style.color = 'var(--bone)'; titleEl.textContent = projectTitle || '';
        const grid = document.createElement('div'); grid.className = 'collage-grid';
        inner.appendChild(titleEl);
        inner.appendChild(grid);
        overlay.appendChild(inner);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        // lock scroll
        const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';

        // close handler
        function close() { document.body.style.overflow = prevOverflow; overlay.remove(); window.removeEventListener('keydown', onKey); }
        closeBtn.addEventListener('click', close);
        function onKey(e) { if (e.key === 'Escape') close(); }
        window.addEventListener('keydown', onKey);

        // render items: images directly, PDFs via pdf.js when available (render pages sequentially)
        for (const it of items) {
            if (!it || !it.src) continue;
            if (it.type === 'img') {
                const img = document.createElement('img'); img.src = it.src; img.alt = it.alt || ''; img.loading = 'lazy'; grid.appendChild(img);
            } else if (it.type === 'pdf') {
                if (window.pdfjsLib) {
                    try {
                        const pdfjsLib = window.pdfjsLib;
                        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
                        const loadingTask = pdfjsLib.getDocument(encodeURI(it.src));
                        const pdf = await loadingTask.promise;
                        for (let p = 1; p <= pdf.numPages; p++) {
                            const page = await pdf.getPage(p);
                            const viewport = page.getViewport({ scale: 1 });
                            // create canvas and scale to fit grid column width
                            const canvas = document.createElement('canvas'); const context = canvas.getContext('2d');
                            // temporarily render at 1x then let CSS scale width to 100%
                            canvas.width = Math.floor(viewport.width); canvas.height = Math.floor(viewport.height);
                            await page.render({ canvasContext: context, viewport }).promise;
                            grid.appendChild(canvas);
                        }
                    } catch (err) {
                        // fallback iframe
                        const iframe = document.createElement('iframe'); iframe.src = encodeURI(it.src); iframe.title = it.alt || 'PDF'; iframe.loading = 'lazy'; grid.appendChild(iframe);
                    }
                } else {
                    const iframe = document.createElement('iframe'); iframe.src = encodeURI(it.src); iframe.title = it.alt || 'PDF'; iframe.loading = 'lazy'; grid.appendChild(iframe);
                }
            }
        }
    }

    /* ===== Projects renderer (data-driven) ===== */
    async function renderProjects() {
        const container = document.getElementById('projectsList');
        if (!container) return;
        container.innerHTML = '<div class="note">Loading projects…</div>';
        try {
            const res = await fetch('data/projects.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to load projects');
            const data = await res.json();
            const projects = data.projects || [];
            if (!projects.length) { container.innerHTML = '<div class="note">No projects yet.</div>'; return; }

            // build grid container
            container.innerHTML = '';
            const grid = document.createElement('div'); grid.className = 'projects-grid projects-list';
            container.appendChild(grid);

            projects.forEach(p => {
                const art = document.createElement('article');
                art.className = 'proj card';
                art.setAttribute('data-id', p.id || '');

                const inner = document.createElement('div'); inner.className = 'proj-card-inner';

                // media column
                const media = document.createElement('div'); media.className = 'proj-media';
                const previewSrc = (p.preview && p.preview.length) ? p.preview[0] : (p.visualizations && p.visualizations[0]) || '';
                if (previewSrc) {
                    const img = document.createElement('img'); img.src = previewSrc; img.alt = p.title || ''; img.loading = 'lazy'; media.appendChild(img);
                } else {
                    const placeholder = document.createElement('div'); placeholder.className = 'proj-media-empty'; placeholder.textContent = (i18n[state.lang] && i18n[state.lang].viewer_na) || 'Not available yet'; media.appendChild(placeholder);
                }
                // media CTA (open visualizations)
                const mediaBtn = document.createElement('button'); mediaBtn.className = 'media-cta btn ghost'; mediaBtn.type = 'button'; mediaBtn.setAttribute('aria-label', (i18n[state.lang] && i18n[state.lang].btn_viz) || 'View visualizations'); mediaBtn.textContent = (i18n[state.lang] && i18n[state.lang].btn_viz) || 'View visualizations';
                media.appendChild(mediaBtn);

                // info column
                const info = document.createElement('div'); info.className = 'proj-info';
                const h = document.createElement('h3'); h.textContent = p.title || ''; info.appendChild(h);
                if (p.description) { const desc = document.createElement('p'); desc.className = 'proj-desc'; desc.textContent = p.description; info.appendChild(desc); }

                const meta = document.createElement('div'); meta.className = 'proj-meta';
                if (p.note) { const note = document.createElement('div'); note.className = 'badge'; note.textContent = p.note; meta.appendChild(note); }
                if (p.tags && p.tags.length) {
                    const tags = document.createElement('div'); tags.className = 'proj-tags'; p.tags.slice(0,4).forEach(t => { const s = document.createElement('span'); s.className = 'badge'; s.textContent = t; tags.appendChild(s); }); meta.appendChild(tags);
                }
                info.appendChild(meta);

                const actions = document.createElement('div'); actions.className = 'proj-actions';
                const vizBtn = document.createElement('button'); vizBtn.type = 'button'; vizBtn.className = 'btn primary'; vizBtn.textContent = (i18n[state.lang] && i18n[state.lang].btn_viz) ? i18n[state.lang].btn_viz : 'View visualizations'; vizBtn.setAttribute('data-action', 'viz');
                const realBtn = document.createElement('button'); realBtn.type = 'button'; realBtn.className = 'btn secondary'; realBtn.textContent = (i18n[state.lang] && i18n[state.lang].btn_real) ? i18n[state.lang].btn_real : 'Real pictures'; realBtn.setAttribute('data-action', 'real');
                const schemBtn = document.createElement('button'); schemBtn.type = 'button'; schemBtn.className = 'btn ghost'; schemBtn.textContent = (i18n[state.lang] && i18n[state.lang].btn_schem) ? i18n[state.lang].btn_schem : 'View schematics'; schemBtn.setAttribute('data-action', 'schem');
                actions.appendChild(vizBtn); actions.appendChild(realBtn); actions.appendChild(schemBtn);
                info.appendChild(actions);

                inner.appendChild(media); inner.appendChild(info); art.appendChild(inner);
                grid.appendChild(art);

                // wire interactions
                mediaBtn.addEventListener('click', () => {
                    const list = (p.visualizations || []).map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: p.title }));
                    openCollage(list, p.title + ' ' + ((i18n[state.lang] && i18n[state.lang].viewer_viz) || '\u2014 Visualizations'));
                });
                vizBtn.addEventListener('click', () => {
                    const list = (p.visualizations || []).map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: p.title }));
                    openCollage(list, p.title + ' ' + ((i18n[state.lang] && i18n[state.lang].viewer_viz) || '\u2014 Visualizations'));
                });

                // Real pictures: prefer explicit `real` field, then previews, then image-only visualizations
                realBtn.addEventListener('click', () => {
                    let sources = (p.real && p.real.length) ? p.real.slice() : [];
                    if (!sources.length && p.preview && p.preview.length) sources = p.preview.slice();
                    if (!sources.length && p.visualizations && p.visualizations.length) sources = p.visualizations.filter(s => /\.(jpe?g|png|gif|webp)$/i.test(s));
                    const list = sources.map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: p.title }));
                    if (list.length) openCollage(list, p.title + ' ' + ((i18n[state.lang] && i18n[state.lang].btn_real) || 'Real pictures'));
                    else {
                        const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en';
                        if (openViewerRef) openViewerRef([], p.title + ' ' + ((i18n[lang] && i18n[lang].viewer_title) || 'Preview'));
                    }
                });

                schemBtn.addEventListener('click', () => {
                    const list = (p.schematics || []).map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: p.title }));
                    const title = p.title + ' ' + ((i18n[state.lang] && i18n[state.lang].viewer_schem) || '\u2014 Schematics');
                    if (openViewerRef) openViewerRef(list, title); else console.warn('Viewer not ready');
                });

            });

            // delegation fallback – keep for robustness
            grid.addEventListener('click', (ev) => {
                const btn = ev.target.closest && ev.target.closest('button[data-action]');
                if (!btn || !grid.contains(btn)) return;
                const action = btn.getAttribute('data-action');
                const article = btn.closest('article.proj');
                const pid = article && article.getAttribute('data-id');
                const proj = projects.find(x => x.id === pid);
                if (!proj) return;
                if (action === 'viz') {
                    const list = (proj.visualizations || []).map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: proj.title }));
                    openCollage(list, proj.title + ' ' + ((i18n[state.lang] && i18n[state.lang].viewer_viz) || '\u2014 Visualizations'));
                } else if (action === 'real') {
                    let sources = (proj.real && proj.real.length) ? proj.real.slice() : [];
                    if (!sources.length && proj.preview && proj.preview.length) sources = proj.preview.slice();
                    if (!sources.length && proj.visualizations && proj.visualizations.length) sources = proj.visualizations.filter(s => /\.(jpe?g|png|gif|webp)$/i.test(s));
                    const list = sources.map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: proj.title }));
                    if (list.length) openCollage(list, proj.title + ' ' + ((i18n[state.lang] && i18n[state.lang].btn_real) || 'Real pictures'));
                    else if (openViewerRef) openViewerRef([], proj.title + ' ' + ((i18n[state.lang] && i18n[state.lang].viewer_title) || 'Preview'));
                } else if (action === 'schem') {
                    const list = (proj.schematics || []).map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: proj.title }));
                    const title = proj.title + ' ' + ((i18n[state.lang] && i18n[state.lang].viewer_schem) || '\u2014 Schematics');
                    if (openViewerRef) openViewerRef(list, title); else console.warn('Viewer not ready', { action, pid });
                }
            });
        } catch (err) {
            container.innerHTML = '<div class="note">Failed to load projects.</div>';
            console.error(err);
        }
    }

    /* ===== Defensive language cleanup (duplicates) ===== */
    function initLangCleanup() { ['lang-en', 'lang-pl'].forEach(id => { const nodes = document.querySelectorAll('#' + id); if (nodes.length > 1) { for (let i = nodes.length - 1; i > 0; i--) nodes[i].remove(); } }); function updateLangVisibility() { const mobile = window.matchMedia('(max-width:720px)').matches;['lang-en', 'lang-pl'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = mobile ? 'none' : 'inline-block'; }); const compact = document.getElementById('langToggle'); if (compact) compact.style.display = mobile ? 'inline-block' : 'none'; } updateLangVisibility(); window.addEventListener('resize', updateLangVisibility); }

    /* ===== Init all ===== */
    function init() {
        // attach global handlers
        const en = document.getElementById('lang-en'); const pl = document.getElementById('lang-pl'); const langToggle = document.getElementById('langToggle'); if (en) en.addEventListener('click', () => setLang('en')); if (pl) pl.addEventListener('click', () => setLang('pl')); if (langToggle) langToggle.addEventListener('click', toggleLang);
        const enterBtn = document.getElementById('enter'); if (enterBtn) enterBtn.addEventListener('click', toggleMode);
        const enterHeader = document.getElementById('enterHeader'); if (enterHeader) enterHeader.addEventListener('click', toggleMode);
        const modeToggle = document.getElementById('modeToggle'); if (modeToggle) modeToggle.addEventListener('click', toggleMode);

        document.getElementById('contactForm') && (document.getElementById('contactForm').onsubmit = mailtoSubmit);

    initMobileNav(); initReveal(); initSliders(); initViewer(); initLangCleanup(); renderProjects();

        // set initial UI state
        applyI18n(state.lang); setMode(state.mode);

        // small defensive fallback
        if (window.innerWidth <= 600) { document.querySelectorAll('.proj-actions .btn').forEach(b => { b.style.flex = '1 1 100%'; b.style.maxWidth = '100%'; b.style.minWidth = '0'; }); }
    }

    return { init, setLang, setMode, toggleMode };
})();

// init on DOM ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', RH.init); else RH.init();
