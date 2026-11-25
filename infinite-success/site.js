document.documentElement.classList.add('enhanced');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
const form = document.getElementById('enquiry');
if (form) {
  const method = form.elements.method;
  const status = form.querySelector('[role=status]');
  const button = form.querySelector('[type=submit]');
  const begin = () => { form.elements.started.value = String(Date.now()); };
  const selectReply = () => {
    form.querySelectorAll('[data-reply]').forEach(section => {
      const show = section.dataset.reply === method.value;
      section.hidden = !show;
      const input = section.querySelector('input, textarea');
      input.disabled = !show;
      input.required = show;
    });
  };
  method.addEventListener('change', selectReply);
  if (new URLSearchParams(location.search).get('topic') === 'seminars') form.elements.topic.value = 'Reiki seminars';
  selectReply();
  begin();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    if (form.hasAttribute('data-demo')) {
      status.textContent = 'Your entries are ready. This preview does not send enquiries.';
      return;
    }
    button.disabled = true;
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(form.action, {method:'POST', headers:{Accept:'application/json'}, body:new URLSearchParams(new FormData(form))});
      const result = await response.json();
      status.textContent = result.message || 'Your enquiry could not be sent. Please try again.';
      if (response.ok && result.ok === true) { form.reset(); selectReply(); begin(); }
    } catch {
      status.textContent = 'Delivery could not be confirmed. Your entries are still here. You can also email beverley@infinitesuccess.ca.';
    } finally { button.disabled = false; }
  });
}
