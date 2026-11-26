(() => {
  document.documentElement.classList.add('js');
  const preview = document.getElementById('preview-pages');
  const pages = preview ? JSON.parse(preview.textContent) : null;
  let previousRoute = '';
  let photos = [], current = 0;
  const dialog = document.getElementById('viewer');
  const showPhoto = (index) => {
    current = (index + photos.length) % photos.length;
    const link = photos[current];
    const photo = dialog.querySelector('img');
    const caption = link.closest('figure').querySelector('figcaption').textContent;
    photo.hidden = false;
    photo.src = link.href;
    photo.alt = caption;
    dialog.querySelector('[data-caption]').textContent = caption;
    dialog.querySelector('[data-counter]').textContent = 'Photo ' + (current + 1) + ' of ' + photos.length;
    dialog.querySelector('[data-original]').href = link.href;
  };
  const fixImage = (image) => {
    if (image.hasAttribute('data-brand')) {
      image.removeAttribute('data-brand');
      image.src = document.body.dataset.paddle;
    } else {
      image.hidden = true;
      const parent = image.closest('.photo');
      if (parent) {
        parent.classList.add('unavailable');
        parent.setAttribute('aria-label', image.alt);
      }
    }
  };
  document.addEventListener('error', e => { if (e.target instanceof HTMLImageElement) fixImage(e.target); },true);
  const setup = () => {
    photos = Array.from(document.querySelectorAll('a[data-photo]'));
    document.querySelectorAll('img').forEach(im => { if (im.complete && !im.naturalWidth && im.src && !im.hidden) fixImage(im); });
  };
  const route = () => {
    if (!pages) { setup(); return; }
    const target = location.hash.startsWith('#page/') ? location.hash.slice(6) : (location.hash === '#main' ? previousRoute || 'home' : 'home');
    const id = Object.prototype.hasOwnProperty.call(pages, target) ? target : 'home';
    if (id === previousRoute) return;
    const moved = !!previousRoute;
    previousRoute = id;
    const entry = pages[id];
    document.getElementById('screen').innerHTML = entry.body;
    document.title = entry.title;
    if (dialog.open) dialog.close();
    setup();
    if (moved) {
      window.scrollTo(0,0);
      const main = document.querySelector('main');
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
  };
  document.addEventListener('click', e => {
    const button = e.target.closest('.menu-toggle');
    if (button) {
      const nav = document.getElementById('primary');
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      return;
    }
    const navLink = e.target.closest('.nav.open a');
    if (navLink) {
      navLink.closest('.nav').classList.remove('open');
      document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    }
    const opener = e.target.closest('a[data-photo]');
    if (opener && dialog && typeof dialog.showModal === 'function' && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      showPhoto(photos.indexOf(opener));
      dialog.showModal();
      dialog.querySelector('[data-close]').focus();
      return;
    }
    if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
    else if (e.target.closest('[data-prev]')) showPhoto(current - 1);
    else if (e.target.closest('[data-next]')) showPhoto(current + 1);
  });
  document.addEventListener('keydown',e => {
    if (dialog.open && ['ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault();
      showPhoto(current + (e.key === 'ArrowRight' ? 1 : -1));
    } else if (e.key === 'Escape') {
      const nav = document.querySelector('.nav.open');
      if (nav) {
        nav.classList.remove('open');
        const button = document.querySelector('.menu-toggle');
        button.setAttribute('aria-expanded','false');
        button.focus();
      }
    }
  });
  if (pages) window.addEventListener('hashchange', route);
  route();
})();
