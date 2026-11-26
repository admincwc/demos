'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#mainnav');
function setMenu(open) {
  nav.classList.toggle('show', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});
const heroPhoto = document.querySelector('.hero-photo');
const heroControls = document.querySelectorAll('[data-view]');
heroControls.forEach(button => button.addEventListener('click', () => {
  heroPhoto.src = button.dataset.view;
  heroPhoto.alt = button.dataset.alt;
  document.querySelector('.hero-caption').textContent = button.dataset.caption;
  heroControls.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
}));
const filters = document.querySelector('.filterbar');
if (filters) {
  filters.hidden = false;
  const buttons = filters.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let count = 0;
    cards.forEach(card => {
      card.hidden = Boolean(category && card.dataset.category !== category);
      if (!card.hidden) count++;
    });
    buttons.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    document.querySelector('[data-filter-count]').textContent = count + ' systems shown';
  }));
}
document.querySelectorAll('[data-demo]').forEach(form => {
  const review = form.querySelector('.formfeedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const title = document.createElement('h3');
    title.textContent = 'Inquiry preview';
    const message = document.createElement('p');
    message.textContent = 'These details are ready to review. This demo has not sent an inquiry.';
    const summary = document.createElement('dl');
    Array.from(form.elements).forEach(field => {
      if (!field.name || !field.value.trim() || (field.type === 'checkbox' && !field.checked)) return;
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      const label = field.closest('label');
      const fieldLabel = Array.from(label?.childNodes || []).filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim();
      term.textContent = (field.type === 'checkbox' ? field.closest('fieldset')?.querySelector('legend')?.textContent : fieldLabel || field.name).replace(' (required)', '');
      definition.textContent = field.value;
      summary.append(term, definition);
    });
    review.replaceChildren(title, message, summary);
    review.focus();
  });
  form.addEventListener('input', () => { if (review.childNodes.length) review.replaceChildren(); });
  form.querySelector('[type=submit]').disabled = false;
});
