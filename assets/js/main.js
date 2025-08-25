/* Main JS - modularized and namespaced as `RH` (Renata Hejduk site) */
const RH = (function () {
    const state = { lang: 'en', mode: document.documentElement.classList.contains('mode-built') ? 'built' : 'blueprint' };

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
            viewer_prev: "Prev", viewer_next: "Next", viewer_close: "Close", viewer_na: "Not available yet",
            viewer_title: "Preview", viewer_viz: "— Visualizations", viewer_rys: "— Drawing", viewer_schem: "— Schematics",
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
            viewer_prev: "Poprzedni", viewer_next: "Następny", viewer_close: "Zamknij", viewer_na: "Jeszcze niedostępne",
            viewer_title: "Podgląd", viewer_viz: "— Wizualizacje", viewer_rys: "— Rysunek", viewer_schem: "— Rysunki",
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
        const viewer = document.getElementById('viewer'); const body = document.getElementById('viewerBody'); const title = document.getElementById('viewerTitle'); const note = document.getElementById('viewerNote'); const leftZone = document.querySelector('.viewer-zone.left'); const rightZone = document.querySelector('.viewer-zone.right'); const closeBtn = document.getElementById('viewerClose'); if (!viewer || !body) return; let items = [], idx = 0, currentLoading = null;

        async function renderPDFToContainer(url) {
            try { if (currentLoading && currentLoading.destroy) currentLoading.destroy(); } catch (e) { }
            body.innerHTML = ''; note.style.display = 'none';
            if (!window['pdfjsLib']) {
                const iframe = document.createElement('iframe');
                iframe.src = encodeURI(url); iframe.title = 'PDF'; iframe.loading = 'lazy'; body.appendChild(iframe); return;
            }
            const pdfjsLib = window['pdfjsLib'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
            const loadingTask = pdfjsLib.getDocument(encodeURI(url));
            currentLoading = loadingTask;
            try {
                const pdf = await loadingTask.promise;
                for (let p = 1; p <= pdf.numPages; p++) {
                    const page = await pdf.getPage(p);
                    const baseViewport = page.getViewport({ scale: 1 });
                    const containerWidth = Math.max(300, body.clientWidth || (window.innerWidth * 0.9));
                    const dpr = window.devicePixelRatio || 1;
                    const desiredScale = Math.min(1.6, (containerWidth / baseViewport.width) * dpr);
                    const viewport = page.getViewport({ scale: desiredScale });
                    const canvas = document.createElement('canvas');
                    canvas.style.display = 'block';
                    canvas.style.width = '100%';
                    canvas.style.height = 'auto';
                    const context = canvas.getContext('2d');
                    canvas.width = Math.floor(viewport.width);
                    canvas.height = Math.floor(viewport.height);
                    await page.render({ canvasContext: context, viewport }).promise;
                    body.appendChild(canvas);
                }
                body.scrollTop = 0;
            } catch (err) {
                body.innerHTML = '';
                const iframe = document.createElement('iframe');
                iframe.src = encodeURI(url); iframe.title = 'PDF'; iframe.loading = 'lazy'; body.appendChild(iframe);
            }
        }

        function showItem(i) {
            if (!items || items.length === 0) {
                body.innerHTML = '';
                note.style.display = '';
                return;
            }
            idx = (i + items.length) % items.length;
            const it = items[idx];
            if (it.type === 'img') {
                currentLoading = null;
                body.innerHTML = '';
                note.style.display = 'none';
                const img = document.createElement('img');
                img.src = encodeURI(it.src);
                img.alt = it.alt || '';
                img.loading = 'lazy';
                body.appendChild(img);
            } else if (it.type === 'pdf') {
                renderPDFToContainer(it.src);
            }
        }

        function openViewer(list, projectTitle) {
            items = list || []; idx = 0;
            if (title) title.textContent = projectTitle || 'Preview';
            const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en';
            if (!items || items.length === 0) {
                body.innerHTML = '<p class="unavailable">' + ((i18n[lang] && i18n[lang].viewer_na) || 'Not available') + '</p>';
                note.style.display = 'none';
                viewer.classList.add('active');
                viewer.setAttribute('aria-hidden', 'false');
                return;
            }
            showItem(0);
            viewer.classList.add('active');
            viewer.setAttribute('aria-hidden', 'false');
        }

        function closeViewer() {
            viewer.classList.remove('active');
            viewer.setAttribute('aria-hidden', 'true');
            items = [];
            body.innerHTML = '';
            try { if (currentLoading && currentLoading.destroy) currentLoading.destroy(); } catch (e) { }
        }

        // interactions
        if (leftZone) leftZone.addEventListener('click', (e) => { e.stopPropagation(); if (items && items.length) showItem(idx - 1); });
        if (rightZone) rightZone.addEventListener('click', (e) => { e.stopPropagation(); if (items && items.length) showItem(idx + 1); });
        if (closeBtn) closeBtn.addEventListener('click', closeViewer);
        // clicking outside (on backdrop) closes
        viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });

        // keyboard navigation
        document.addEventListener('keydown', function kHandler(e) {
            if (!viewer.classList.contains('active')) return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); if (items && items.length) showItem(idx - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); if (items && items.length) showItem(idx + 1); }
            if (e.key === 'Escape') { e.preventDefault(); closeViewer(); }
        });

        // wire up project nodes
        document.querySelectorAll('.proj').forEach(p => {
            p.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const titleText = (p.querySelector('h3') || {}).textContent || '';
                const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en';
                const raw = p.getAttribute('data-' + action) || '';
                const parts = raw.split('|').map(s => s.trim()).filter(Boolean);
                const list = parts.map(src => ({ type: src.toLowerCase().endsWith('.pdf') ? 'pdf' : 'img', src, alt: titleText }));
                openViewer(list, titleText + ' ' + ((i18n[lang] && i18n[lang]['viewer_' + action]) || ''));
            }));
        });
    }

    /* ===== Defensive language cleanup (duplicates) ===== */
    function initLangCleanup() { ['lang-en', 'lang-pl'].forEach(id => { const nodes = document.querySelectorAll('#' + id); if (nodes.length > 1) { for (let i = nodes.length - 1; i > 0; i--) nodes[i].remove(); } }); function updateLangVisibility() { const mobile = window.matchMedia('(max-width:720px)').matches;['lang-en', 'lang-pl'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = mobile ? 'none' : 'inline-block'; }); const compact = document.getElementById('langToggle'); if (compact) compact.style.display = mobile ? 'inline-block' : 'none'; } updateLangVisibility(); window.addEventListener('resize', updateLangVisibility); }

    /* ===== Init all ===== */
    async function init() {
        // attach global handlers
        const en = document.getElementById('lang-en'); const pl = document.getElementById('lang-pl'); const langToggle = document.getElementById('langToggle'); if (en) en.addEventListener('click', () => setLang('en')); if (pl) pl.addEventListener('click', () => setLang('pl')); if (langToggle) langToggle.addEventListener('click', toggleLang);
        const enterBtn = document.getElementById('enter'); if (enterBtn) enterBtn.addEventListener('click', toggleMode);
        const enterHeader = document.getElementById('enterHeader'); if (enterHeader) enterHeader.addEventListener('click', toggleMode);
        const modeToggle = document.getElementById('modeToggle'); if (modeToggle) modeToggle.addEventListener('click', toggleMode);

        document.getElementById('contactForm') && (document.getElementById('contactForm').onsubmit = mailtoSubmit);

        initMobileNav(); initReveal(); initSliders(); initLangCleanup();

        // render projects first so the viewer can attach to generated nodes
        try { await renderProjects(); } catch (err) { console.warn('Projects failed to load', err); }
        // initialize viewer after projects exist
        initViewer();

        // set initial UI state
        applyI18n(state.lang); setMode(state.mode);

        // small defensive fallback
        if (window.innerWidth <= 600) { document.querySelectorAll('.proj-actions .btn').forEach(b => { b.style.flex = '1 1 100%'; b.style.maxWidth = '100%'; b.style.minWidth = '0'; }); }
    }

    /* ===== Projects renderer ===== */
    async function renderProjects() {
        const containerTo = document.getElementById('toBeRealizedList');
        const containerReal = document.getElementById('realizedList');
        if (!containerTo || !containerReal) return;
        containerTo.innerHTML = '';
        containerReal.innerHTML = '';
        let data = [];
        try {
            const res = await fetch('data/projects.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
        } catch (err) {
            console.warn('Could not fetch projects.json', err);
            // graceful fallback: leave placeholders
            containerTo.innerHTML = '<p class="muted">Projects unavailable locally. Serve over HTTP to view.</p>';
            containerReal.innerHTML = '';
            return;
        }

        const lang = document.documentElement.lang === 'pl' ? 'pl' : 'en';

        data.forEach(p => {
            const el = document.createElement('article');
            el.className = 'proj card reveal';
            el.setAttribute('data-id', p.id || '');
            // preview column
            const previewCol = document.createElement('div');
            previewCol.className = 'proj-preview';
            (p.preview || []).slice(0, 2).forEach(src => {
                const img = document.createElement('img');
                img.src = src; img.alt = p['title_' + lang] || p.title_en || '';
                img.loading = 'lazy'; previewCol.appendChild(img);
            });

            const grid = document.createElement('div'); grid.className = 'proj-grid';
            const content = document.createElement('div');
            const h = document.createElement('h3'); h.textContent = p['title_' + lang] || p.title_en || '';
            const desc = document.createElement('p'); desc.className = 'proj-desc'; desc.textContent = p['description_' + lang] || p.description_en || '';
            const actions = document.createElement('div'); actions.className = 'proj-actions';
            const viz = document.createElement('button'); viz.className = 'btn'; viz.setAttribute('data-action', 'viz'); viz.textContent = (lang === 'pl') ? 'Wizualizacje' : 'Visualizations';
            const rys = document.createElement('button'); rys.className = 'btn'; rys.setAttribute('data-action', 'rys'); rys.textContent = (lang === 'pl') ? 'Rysunek' : 'Drawing';
            const schem = document.createElement('button'); schem.className = 'btn'; schem.setAttribute('data-action', 'schem'); schem.textContent = (lang === 'pl') ? 'Rysunki' : 'Schematics';
            // disable buttons when the arrays are empty and add helpful titles
            if (!p.viz || !p.viz.length) { viz.disabled = true; viz.setAttribute('aria-disabled', 'true'); viz.title = (lang === 'pl') ? 'Wizualizacje niedostępne' : 'Visualizations not available'; }
            if (!p.rys || !p.rys.length) { rys.disabled = true; rys.setAttribute('aria-disabled', 'true'); rys.title = (lang === 'pl') ? 'Rysunek niedostępny' : 'Drawing not available'; }
            if (!p.schem || !p.schem.length) { schem.disabled = true; schem.setAttribute('aria-disabled', 'true'); schem.title = (lang === 'pl') ? 'Rysunki niedostępne' : 'Schematics not available'; }
            actions.appendChild(viz); actions.appendChild(rys); actions.appendChild(schem);

            content.appendChild(h); content.appendChild(desc); content.appendChild(actions);
            grid.appendChild(previewCol); grid.appendChild(content);

            const meta = document.createElement('div'); meta.className = 'proj-meta';
            const note = document.createElement('span'); note.textContent = p['note_' + lang] || p.note_en || '';
            meta.appendChild(note);

            el.appendChild(grid); el.appendChild(meta);

            // data attributes used by viewer
            el.setAttribute('data-viz', (p.viz || []).join('|'));
            el.setAttribute('data-rys', (p.rys || []).join('|'));
            el.setAttribute('data-schem', (p.schem || []).join('|'));

            // if realized, show badge and overlay style
            if (p.status === 'realized') {
                const badge = document.createElement('span');
                badge.className = 'badge-completed';
                badge.textContent = (lang === 'pl') ? 'Zrealizowano' : 'Completed';
                el.appendChild(badge);
                // hide the standard action buttons and add a single friendly CTA (not covering the whole card)
                actions.style.display = 'none';
                const overlay = document.createElement('button');
                overlay.className = 'media-cta real';
                overlay.type = 'button';
                overlay.textContent = (lang === 'pl') ? 'Zobacz zdjęcia' : 'View pictures';
                overlay.setAttribute('data-action', 'viz');
                overlay.setAttribute('aria-label', overlay.textContent);
                overlay.tabIndex = 0;
                overlay.addEventListener('click', () => {
                    const b = el.querySelector('[data-action="viz"]'); if (b) b.click();
                });
                overlay.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); overlay.click(); } });
                el.appendChild(overlay);
            }

            // append to proper group
            if (p.status === 'realized') containerReal.appendChild(el); else containerTo.appendChild(el);
        });

        // re-run reveal observer on new nodes
        document.querySelectorAll('.reveal').forEach(el => el.classList.remove('revealed'));
        setTimeout(initReveal, 60);
    }

    return { init, setLang, setMode, toggleMode };
})();

// init on DOM ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', RH.init); else RH.init();
