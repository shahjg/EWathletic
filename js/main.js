/* ================================================================
   EW ATHLETICS — Main JS
   ================================================================ */
document.addEventListener('DOMContentLoaded', function() {

    // --- HEADER SCROLL ---
    var hdr = document.getElementById('hdr');
    if (hdr) window.addEventListener('scroll', function() { hdr.classList.toggle('scrolled', window.scrollY > 10); });

    // --- MOBILE MENU ---
    var ham = document.getElementById('ham');
    var mob = document.getElementById('mob');
    if (ham && mob) {
        ham.addEventListener('click', function() { this.classList.toggle('active'); mob.classList.toggle('active'); });
        document.addEventListener('click', function(e) { if (!mob.contains(e.target) && !ham.contains(e.target)) { ham.classList.remove('active'); mob.classList.remove('active'); } });
    }

    // --- SEARCH OVERLAY ---
    var searchBtn = document.getElementById('searchBtn');
    var searchOv = document.getElementById('searchOv');
    var searchClose = document.getElementById('searchClose');
    if (searchBtn && searchOv) {
        searchBtn.addEventListener('click', function() { searchOv.classList.add('active'); setTimeout(function() { var inp = searchOv.querySelector('input'); if (inp) inp.focus(); }, 100); });
        if (searchClose) searchClose.addEventListener('click', function() { searchOv.classList.remove('active'); });
        searchOv.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') searchOv.classList.remove('active'); });
    }

    // --- SCROLL REVEAL ---
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        reveals.forEach(function(el) { el.classList.add('hidden'); });
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); e.target.classList.remove('hidden'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        reveals.forEach(function(el) { obs.observe(el); });
    }

    // --- PARTICLES ---
    var pc = document.getElementById('particles');
    if (pc) { for (var i = 0; i < 35; i++) { var d = document.createElement('div'); d.className = 'p'; d.style.top = ((i * 2.3 + 8) % 85 + 8) + '%'; d.style.left = ((i * 2.7 + 3) % 92 + 4) + '%'; d.style.animationDelay = (i * .2) + 's'; d.style.animationDuration = (i * .6 + 22) + 's'; pc.appendChild(d); } }

    // --- FAQ ---
    document.querySelectorAll('.faq-q').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.closest('.faq-item');
            var was = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
            if (!was) item.classList.add('active');
        });
    });

    // --- CONTACT FORM ---
    var cf = document.getElementById('contactForm');
    if (cf) cf.addEventListener('submit', function(e) { e.preventDefault(); alert('Message sent! We will get back to you within 24 hours.'); this.reset(); });

    // --- NEWSLETTER ---
    var nf = document.getElementById('nlForm');
    if (nf) nf.addEventListener('submit', function(e) { e.preventDefault(); alert('Thanks for subscribing!'); this.reset(); });

    // --- GALLERY FILTERS ---
    document.querySelectorAll('.gf').forEach(function(b) {
        b.addEventListener('click', function() {
            document.querySelectorAll('.gf').forEach(function(x) { x.classList.remove('active'); });
            this.classList.add('active');
            var f = this.dataset.filter;
            document.querySelectorAll('.gi').forEach(function(item) { item.style.display = (f === 'all' || item.dataset.cat === f) ? 'block' : 'none'; });
        });
    });

    // --- LIGHTBOX ---
    var lb = document.getElementById('lb');
    if (lb) {
        document.querySelectorAll('.gi').forEach(function(item) {
            item.addEventListener('click', function() {
                var img = this.querySelector('img');
                var ov = this.querySelector('.gi-ov');
                document.getElementById('lbImg').src = img.src;
                if (ov) {
                    var s = ov.querySelector('strong'); var sp = ov.querySelector('span');
                    document.getElementById('lbTitle').textContent = s ? s.textContent : '';
                    document.getElementById('lbDesc').textContent = sp ? sp.textContent : '';
                }
                lb.classList.add('active');
            });
        });
        var lbClose = document.getElementById('lbClose');
        if (lbClose) lbClose.addEventListener('click', function() { lb.classList.remove('active'); });
        lb.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    }
});
