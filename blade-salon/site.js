const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
}

menuButton.addEventListener('click', () => {
  const expanded = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(expanded));
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
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const enquiry = document.querySelector('#enquiry-form');
if (enquiry) {
  const submit = enquiry.querySelector('button[type="submit"]');
  const status = enquiry.querySelector('.form-status');
  const phone = enquiry.querySelector('#phone');
  const name = enquiry.querySelector('#full-name');
  const message = enquiry.querySelector('#message');
  submit.disabled = false;
  enquiry.addEventListener('input', event => {
    event.target.setCustomValidity('');
    status.textContent = '';
  });
  enquiry.addEventListener('submit', event => {
    event.preventDefault();
    if (enquiry.querySelector('#website').value) return;
    if (!name.value.trim()) name.setCustomValidity('Please enter your name.');
    if (!message.value.trim()) message.setCustomValidity('Please enter a message.');
    if (!/^\+?[\d\s().-]+$/.test(phone.value.trim()) || !/^\d{7,15}$/.test(phone.value.replace(/\D/g, ''))) {
      phone.setCustomValidity('Enter your phone number, including the area code.');
    }
    if (enquiry.reportValidity()) {
      status.textContent = 'Your details look complete. To reach the salon, call 519-583-2021.';
    }
  });
}
