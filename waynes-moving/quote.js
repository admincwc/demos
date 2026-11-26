const form = document.querySelector('#quote');
const review = document.querySelector('#review');
form.addEventListener('input', () => { review.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  const list = review.querySelector('dl');
  list.replaceChildren();
  for (const label of form.querySelectorAll('label')) {
    const field = label.querySelector('input, textarea');
    if (!field.value.trim()) continue;
    const term = document.createElement('dt');
    term.textContent = label.firstChild.textContent;
    const value = document.createElement('dd');
    value.textContent = field.value;
    list.append(term, value);
  }
  review.hidden = false;
  review.focus();
});
