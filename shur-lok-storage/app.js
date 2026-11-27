(() => {
  const selected = new URLSearchParams(location.search).get('unit');
  for (const form of document.querySelectorAll('[data-preview]')) {
    const unit = form.querySelector('[data-unit]');
    if (selected && unit) {
      const option = Array.from(unit.options).findIndex(opt => opt.value === selected);
      if (option > 0) unit.selectedIndex = option;
    }
    const button = form.querySelector('button');
    form.addEventListener('submit', e => e.preventDefault());
    button.addEventListener('click', () => {
      if (form.reportValidity()) form.querySelector('[role=status]').textContent = 'This is a website demo. No information was sent or saved.';
    });
  }
})();
