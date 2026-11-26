const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.mast')) closeMenu();
});
window.matchMedia('(min-width:811px)').addEventListener('change', closeMenu);

const gallery = document.querySelector('.gallery');
if (gallery) {
  const images = Array.from(gallery.querySelectorAll('figure'));
  const controls = document.querySelector('.gallery-controls');
  const filters = Array.from(controls.querySelectorAll('button'));
  const dialog = document.querySelector('dialog');
  const photo = dialog.querySelector('.viewer-img');
  const caption = dialog.querySelector('.viewer-caption');
  const count = dialog.querySelector('.viewer-count');
  let visible = images;
  let active = 0;
  let opener;

  controls.hidden = false;
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      visible = images.filter(item => selected === 'all' || selected === item.dataset.group);
      images.forEach(item => { item.hidden = !visible.includes(item); });
      filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelector('.gallery-status').textContent = visible.length + ' photographs shown';
    });
  });

  function showImage(index) {
    active = (index + visible.length) % visible.length;
    const item = visible[active];
    photo.src = item.querySelector('a').href;
    photo.alt = item.querySelector('img').alt;
    caption.textContent = item.querySelector('figcaption').textContent;
    count.textContent = (active + 1) + ' of ' + visible.length;
  }

  gallery.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    opener = link;
    showImage(visible.indexOf(link.closest('figure')));
    dialog.showModal();
    document.body.classList.add('viewing');
  });
  dialog.querySelector('.previous').addEventListener('click', () => showImage(active - 1));
  dialog.querySelector('.next').addEventListener('click', () => showImage(active + 1));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(active + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(active - 1); }
  });
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewing');
    if (opener) opener.focus({preventScroll:true});
  });
}
