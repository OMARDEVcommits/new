  (function(){
      const root = document.documentElement;
      const toggle = document.getElementById('themeToggle');
      const ICON = document.getElementById('iconSvg');

      // helper: apply theme and update aria
      function applyTheme(theme){
        if(theme === 'dark'){
          root.setAttribute('data-theme','dark');
          toggle.setAttribute('aria-pressed','true');
        } else {
          root.removeAttribute('data-theme');
          toggle.setAttribute('aria-pressed','false');
        }
      }

      // 1) load saved preference
      const saved = localStorage.getItem('theme'); // 'dark' or 'light' or null
      if(saved){
        applyTheme(saved);
      } else {
        // 2) fall back to system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(prefersDark) applyTheme('dark');
      }

      // quick visual flip effect: rotate icon
      function flashIcon() {
        ICON.style.transition = 'transform 140ms ease';
        ICON.style.transform = 'rotate(20deg) scale(0.98)';
        requestAnimationFrame(()=> {
          setTimeout(()=> { ICON.style.transform = ''; }, 120);
        });
      }

      // toggle handler
      toggle.addEventListener('click', ()=>{
        const isDark = root.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
        flashIcon();
      });

      // keyboard-friendly: space/enter work automatically on button
      // Also keep the button label in sync if system preference changes
      if(window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          const saved = localStorage.getItem('theme');
          if(!saved){
            applyTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
    })();