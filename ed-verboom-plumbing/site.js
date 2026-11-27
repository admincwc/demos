document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('[role=status]').textContent = 'Demo complete. Your details have not been sent.';
}));
const viewer = document.querySelector('.viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const photos = Array.from(document.querySelectorAll('.thumbs a'));
  let index = 0;
  function displayPhoto(position) {
    index = (position + photos.length) % photos.length;
    const photo = photos[index];
    const description = photo.querySelector('img').alt;
    viewer.querySelector('img').src = photo.href;
    viewer.querySelector('img').alt = description;
    viewer.querySelector('figcaption').textContent = description;
    viewer.querySelector('.count').textContent = (index + 1) + ' of ' + photos.length;
  }
  photos.forEach((photo, position) => photo.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    displayPhoto(position);
    viewer.showModal();
  }));
  viewer.querySelector('[data-close]').onclick = () => viewer.close();
  viewer.querySelector('[data-prev]').onclick = () => displayPhoto(index - 1);
  viewer.querySelector('[data-next]').onclick = () => displayPhoto(index + 1);
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') displayPhoto(index - 1);
    if (event.key === 'ArrowRight') displayPhoto(index + 1);
  });
}
