const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
for (const form of document.forms) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('[role=status]').textContent = form.closest('#pickup')
      ? 'Demo complete. No pickup was scheduled.'
      : 'Demo complete. Your inquiry has not been sent.';
  });
  form.querySelector('[type=submit]').disabled = false;
}
