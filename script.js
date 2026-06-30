
    document.addEventListener('DOMContentLoaded', () => {
      // Header scroll state
      const header = document.querySelector('.site-header');
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
      onScroll();
      window.addEventListener('scroll', onScroll, {passive:true});

      // Mobile nav toggle
      const toggle = document.querySelector('.nav-toggle');
      const mobileNav = document.getElementById('mobile-nav');
      toggle.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        toggle.classList.toggle('active', open);
      });
      mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.classList.remove('active');
      }));

      // Scroll reveal
      const reveals = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
      }, {threshold:0.15});
      reveals.forEach(el => io.observe(el));

      // Stat count-up
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const statNums = document.querySelectorAll('.stat-num');
      const animateStat = (el) => {
        const target = parseFloat(el.dataset.target);
        if (prefersReduced){ el.textContent = target; return; }
        const dur = 1400;
        const start = performance.now();
        const ease = t => 1 - Math.pow(1-t,3);
        const tick = (now) => {
          const p = Math.min((now-start)/dur, 1);
          el.textContent = Math.round(target*ease(p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const statGrid = document.querySelector('.stat-grid');
      if (statGrid){
        const statIo = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting){ statNums.forEach(animateStat); statIo.disconnect(); }
          });
        }, {threshold:0.4});
        statIo.observe(statGrid);
      }

      // Contact form -> mailto
      const form = document.getElementById('contact-form');
      if (form){
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = form.name.value.trim();
          const email = form.email.value.trim();
          const message = form.message.value.trim();
          const subject = encodeURIComponent(`Project inquiry from ${name}`);
          const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
          window.location.href = `mailto:[email protected]?subject=${subject}&body=${body}`;
        });
      }
    });
  