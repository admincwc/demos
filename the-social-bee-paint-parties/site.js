const menu = document.querySelector('.menu');
const nav = document.getElementById('main-nav');
document.documentElement.classList.add('js');
function toggleMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
}
menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    toggleMenu(false);
    menu.focus();
  }
});
const form = document.getElementById('party-form');
if (form) {
  const type = document.getElementById('party-type');
  const selection = new URLSearchParams(location.search).get('party');
  if (Array.from(type.options).some(option => option.value === selection)) type.value = selection;
  const status = document.getElementById('form-status');
  function preview() {
    if (!form.reportValidity()) return;
    const summary = document.querySelector('.preview-facts');
    summary.replaceChildren();
    const labels = {name:'Name', email:'Email', phone:'Phone', party:'Party type', date:'Preferred date', town:'Town or venue', message:'About the group'};
    for (const [field, value] of new FormData(form)) {
      const display = field === 'party' && value ? type.selectedOptions[0].textContent : value.trim();
      if (!display) continue;
      const term = document.createElement('dt');
      const detail = document.createElement('dd');
      term.textContent = labels[field];
      detail.textContent = display;
      summary.append(term, detail);
    }
    document.getElementById('inquiry-preview').hidden = false;
    status.hidden = false;
    status.textContent = 'Your inquiry is ready to review. This demo keeps it on this page. To discuss your date, contact Lorraine at 226-206-0119.';
  }
  document.getElementById('check-inquiry').addEventListener('click', preview);
  form.addEventListener('submit', event => { event.preventDefault(); preview(); });
  form.addEventListener('input', () => { status.hidden = true; document.getElementById('inquiry-preview').hidden = true; });
}
if (Date.now() >= Date.parse('2026-12-09T00:00:00-05:00')) {
  document.querySelectorAll('[data-upcoming]').forEach(item => { item.hidden = true; });
  document.querySelectorAll('[data-after-event]').forEach(item => { item.hidden = false; });
}
