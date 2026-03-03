(function() {
    var cur = 1;
    var prods = {
        soccer: ['Jersey', 'Shorts', 'Full Kit', 'Goalkeeper Kit', 'Training Wear', 'Warm-ups'],
        basketball: ['Jersey', 'Shorts', 'Full Kit', 'Warm-ups', 'Shooting Shirts'],
        cricket: ['Whites', 'Coloured Kit', 'Training Wear', 'Sweaters', 'Trousers'],
        football: ['Jersey', 'Pants', 'Full Kit', 'Practice Jersey', 'Warm-ups'],
        volleyball: ['Jersey', 'Shorts', 'Full Kit', 'Warm-ups', 'Libero Kit'],
        baseball: ['Jersey', 'Pants', 'Full Kit', 'Warm-ups', 'Cap', 'Custom'],
        apparel: ['Hoodies', 'T-Shirts', 'Track Suits', 'Jackets', 'Polo Shirts', 'Scrub Top', 'Scrub Bottom', 'Full Scrub Set', 'Lab Coat', 'Custom'],
        other: ['Jersey', 'Shorts', 'Full Kit', 'T-Shirts', 'Hoodies', 'Track Suits', 'Custom']
    };

    document.addEventListener('DOMContentLoaded', function() {

        // --- AUTO-SELECT FROM URL ---
        var params = new URLSearchParams(window.location.search);
        var urlSport = params.get('sport');
        if (urlSport && prods[urlSport]) {
            var card = document.querySelector('.sc[data-sport="' + urlSport + '"]');
            if (card) {
                card.classList.add('sel');
                document.getElementById('selSport').value = urlSport;
                var sec = document.getElementById('prodSec');
                var sel = document.getElementById('prodType');
                var items = prods[urlSport];
                sel.innerHTML = '<option value="">Select product type</option>';
                items.forEach(function(p) { sel.innerHTML += '<option value="' + p + '">' + p + '</option>'; });
                sec.style.display = 'block';
                // Smooth scroll to form
                setTimeout(function() {
                    var el = document.querySelector('.quote-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
        // Sport cards
        document.querySelectorAll('.sc').forEach(function(c) {
            c.addEventListener('click', function() {
                document.querySelectorAll('.sc').forEach(function(x) { x.classList.remove('sel'); });
                this.classList.add('sel');
                document.getElementById('selSport').value = this.dataset.sport;
                var sec = document.getElementById('prodSec');
                var sel = document.getElementById('prodType');
                var items = prods[this.dataset.sport] || prods.other;
                sel.innerHTML = '<option value="">Select product type</option>';
                items.forEach(function(p) { sel.innerHTML += '<option value="' + p + '">' + p + '</option>'; });
                sec.style.display = 'block';

                // Show/hide clothing details based on sport
                var clothingStep = document.querySelector('.clothing-note');
                if (clothingStep) {
                    clothingStep.style.display = (this.dataset.sport === 'scrubs') ? 'block' : 'none';
                }
            });
        });

        // Qty
        var qi = document.getElementById('qty');
        document.querySelector('.qty-b.mi').addEventListener('click', function() { var v = parseInt(qi.value) || 10; if (v > 10) qi.value = v - 1; upCount(); });
        document.querySelector('.qty-b.pl').addEventListener('click', function() { var v = parseInt(qi.value) || 10; qi.value = v + 1; upCount(); });
        qi.addEventListener('change', upCount);

        // Option cards
        document.querySelectorAll('.oc').forEach(function(g) {
            g.querySelectorAll('.oc-item').forEach(function(c) {
                c.addEventListener('click', function() {
                    g.querySelectorAll('.oc-item').forEach(function(x) { x.classList.remove('sel'); });
                    this.classList.add('sel');
                    var h = g.parentElement.querySelector('input[type="hidden"]');
                    if (h) h.value = this.dataset.val;
                    if (this.dataset.val === 'upload') { var fu = document.getElementById('fuSec'); if (fu) fu.style.display = 'block'; }
                    else if (g.parentElement.querySelector('#logoOpt')) { var fu = document.getElementById('fuSec'); if (fu) fu.style.display = 'none'; }
                });
            });
        });

        // Player fields
        document.getElementById('autoBtn').addEventListener('click', function() {
            var n = parseInt(qi.value) || 10;
            var c = document.getElementById('pfContainer');
            c.innerHTML = '';
            for (var i = 1; i <= n; i++) addPF(i);
        });
        document.getElementById('addPBtn').addEventListener('click', function() { addPF(document.querySelectorAll('.pf').length + 1); });

        // Nav
        document.querySelectorAll('.btn-next').forEach(function(b) { b.addEventListener('click', function() { go(cur + 1); }); });
        document.querySelectorAll('.btn-back').forEach(function(b) { b.addEventListener('click', function() { go(cur - 1); }); });
        document.querySelectorAll('.btn-edit').forEach(function(b) { b.addEventListener('click', function() { go(parseInt(this.dataset.step)); }); });

        // Submit
        document.getElementById('quoteForm').addEventListener('submit', function(e) {
            e.preventDefault();
            this.style.display = 'none';
            document.querySelector('.prog-bar').style.display = 'none';
            document.getElementById('successMsg').style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        upCount();
    });

    function upCount() { var el = document.getElementById('autoCount'); if (el) el.textContent = document.getElementById('qty').value || '10'; }

    function addPF(n) {
        var c = document.getElementById('pfContainer');
        var d = document.createElement('div'); d.className = 'pf';
        d.innerHTML = '<input type="text" placeholder="Player ' + n + ' Name"><input type="text" placeholder="#" style="max-width:60px"><input type="text" placeholder="Size" style="max-width:70px"><button type="button" class="btn-rm" onclick="this.parentElement.remove()">×</button>';
        c.appendChild(d);
    }

    function go(s) {
        if (s < 1 || s > 5) return;
        if (s === 5) popReview();
        document.querySelectorAll('.fs').forEach(function(x) { x.classList.remove('active'); });
        document.querySelector('.fs[data-step="' + s + '"]').classList.add('active');
        document.querySelectorAll('.ps').forEach(function(x) {
            var n = parseInt(x.dataset.step); x.classList.remove('active', 'done');
            if (n === s) x.classList.add('active'); else if (n < s) x.classList.add('done');
        });
        document.getElementById('progFill').style.width = (s * 20) + '%';
        cur = s;
        window.scrollTo({ top: document.querySelector('.quote-section').offsetTop - 80, behavior: 'smooth' });
    }

    function popReview() {
        var sc = document.querySelector('.sc.sel');
        var $ = function(id) { return document.getElementById(id); };
        $('rvSport').textContent = sc ? sc.querySelector('span').textContent : '-';
        $('rvProduct').textContent = $('prodType').value || '-';
        $('rvQty').textContent = $('qty').value || '-';
        $('rvSleeve').textContent = $('sleeveVal').value || '-';
        $('rvBottom').textContent = $('bottomVal').value || '-';
        $('rvCollar').textContent = $('collarVal').value || '-';
        $('rvTeam').textContent = $('teamName').value || '-';
        $('rvColors').textContent = $('primColor').value + ' / ' + $('secColor').value;
        $('rvLogo').textContent = $('logoOpt').value || '-';
        $('rvName').textContent = $('cName').value || '-';
        $('rvEmail').textContent = $('cEmail').value || '-';
        $('rvPhone').textContent = $('cPhone').value || '-';
    }
})();
