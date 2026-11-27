document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Demo complete. Your details have not been sent.';
}));