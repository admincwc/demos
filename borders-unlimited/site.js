const menu = document.querySelector('.menu');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', event => {
  if (!event.target.closest('.drop')) document.querySelector('.drop').open = false;
  if (!event.target.closest('header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const services = document.querySelector('.drop');
  if (services.open) {
    services.open = false;
    services.querySelector('summary').focus();
  } else if (nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
const switches = document.querySelectorAll('[data-photo]');
switches.forEach(button => button.addEventListener('click', () => {
  const img = document.querySelector('.hero-image');
  img.src = button.dataset.photo;
  img.alt = button.dataset.alt;
  document.querySelector('#hero-caption').textContent = button.dataset.caption;
  switches.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
}));
const dialog = document.querySelector('#lightbox');
if (dialog) {
  document.querySelectorAll('[data-enlarge]').forEach(button => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      const large = dialog.querySelector('img');
      large.src = img.currentSrc || img.src;
      large.alt = img.alt;
      dialog.querySelector('#lightbox-title').textContent = button.dataset.title;
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
}
const more = document.querySelector('#show-more');
if (more) {
  const pictures = Array.from(document.querySelectorAll('.gallery-photo'));
  const tabs = document.querySelectorAll('[data-filter]');
  let filter = 'all';
  let visible = 12;
  function refresh() {
    const matches = pictures.filter(item => filter === 'all' || item.dataset.kind === filter);
    const shown = new Set(matches.slice(0, visible));
    pictures.forEach(item => item.hidden = !shown.has(item));
    more.hidden = visible >= matches.length;
    document.querySelector('#gal-count').textContent = shown.size + ' of ' + matches.length + ' photos';
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.filter === filter)));
  }
  tabs.forEach(tab => tab.addEventListener('click', () => {
    filter = tab.dataset.filter;
    visible = 12;
    refresh();
  }));
  more.addEventListener('click', () => {
    const current = new Set(pictures.filter(item => !item.hidden));
    visible += 12;
    refresh();
    pictures.find(item => !item.hidden && !current.has(item))?.focus();
  });
  refresh();
}
const form = document.querySelector('#quote-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.result').textContent = 'Your details are ready. This demo keeps them in your browser. Call 519-427-4121 to arrange an estimate.';
  });
  form.querySelector('button[type=submit]').disabled = false;
  form.addEventListener('input', () => form.querySelector('.result').textContent = '');
}
