const toggle = document.querySelector('#toggle');
const nav = document.querySelector('#nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}
toggle.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
for (const input of document.querySelectorAll('input[type=date]')) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  input.min = today.toISOString().slice(0, 10);
}
for (const form of document.forms) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('[role=status]').textContent = 'Demo complete. Your details stayed in this browser. Call 519-756-5484 to reach The Sherwood.';
  });
}
