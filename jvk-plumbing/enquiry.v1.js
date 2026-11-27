for (const form of document.querySelectorAll('[data-preview-form]')) {
  const status = form.querySelector('[role="status"]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Demo complete. Your entries passed validation. No request was sent to JVK.';
  });
  form.addEventListener('input', () => { status.textContent = ''; });
  form.querySelector('button[type="submit"]').disabled = false;
}
