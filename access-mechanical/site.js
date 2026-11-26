document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menubtn');
const navigation = document.getElementById('main-nav');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') === 'false'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 851px)').addEventListener('change', () => setMenu(false));

const equipment = document.querySelectorAll('.equipment-list details');
const photo = document.querySelector('.equipment-image');
const caption = document.querySelector('.equipment-figure figcaption');
equipment.forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    equipment.forEach(other => { if (other !== item && other.open) other.open = false; });
    const reference = item.querySelector('.mobile-equipment');
    photo.src = reference.getAttribute('src');
    photo.alt = reference.alt;
    caption.textContent = item.dataset.caption;
  });
});

const form = document.querySelector('.enquiry form');
if (form) {
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('button[type="submit"]');
  form.elements.started.value = String(Date.now());
  form.hidden = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (form.dataset.mode === 'preview') {
      status.textContent = 'Your enquiry is ready. This preview has not sent your message.';
      return;
    }
    submit.disabled = true;
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const result = await response.json();
      status.textContent = result.message;
      if (response.ok && result.ok) {
        form.reset();
        form.elements.started.value = String(Date.now());
      }
    } catch {
      status.textContent = 'Delivery could not be confirmed. Please call 519-429-3515 or email the office.';
    } finally {
      submit.disabled = false;
    }
  });
}
