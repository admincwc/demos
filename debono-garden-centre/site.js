const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
const narrow = matchMedia('(max-width:760px)');
function resetMenu() {
  menu.hidden = !narrow.matches;
  nav.hidden = narrow.matches;
  menu.setAttribute('aria-expanded', 'false');
}
resetMenu();
narrow.addEventListener('change', resetMenu);
menu.addEventListener('click', () => {
  nav.hidden = !nav.hidden;
  menu.setAttribute('aria-expanded', String(!nav.hidden));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && narrow.matches && !nav.hidden) {
    resetMenu();
    menu.focus();
  }
});
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.status').textContent = 'Demo complete. Your enquiry stayed in this browser.';
  });
  form.querySelector('button').disabled = false;
});
