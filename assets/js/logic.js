// Preserved & Required Dark Mode Toggle Logic 

(function () {
    const saved = localStorage.getItem('app-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = saved === 'dark' ? 'dark_mode' : 'light_mode';
})();
document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app-theme', next);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = next === 'dark' ? 'dark_mode' : 'light_mode';
});


// Preserved & Required Ripple Effect Logic 

function addRipple(el, e) {
    const r = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `position:absolute;width:${size}px;height:${size}px;
              left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;
              background:currentColor;opacity:.12;border-radius:50%;transform:scale(0);
              animation:ripple-expand 600ms var(--md-sys-motion-easing-standard) forwards;
              pointer-events:none;`;
    el.appendChild(r);
    setTimeout(() => r.remove(), 600);
}
document.querySelectorAll('button, .btn').forEach(btn => {
    btn.addEventListener('click', e => {
        if (!btn.disabled) addRipple(btn, e);
    });
});
