const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const figureLinks = document.querySelectorAll('[data-figure-preview]');
if (figureLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const viewer = document.createElement('dialog');
  viewer.className = 'figure-dialog';
  viewer.setAttribute('aria-labelledby', 'figure-viewer-title');
  viewer.innerHTML = '<div class="figure-dialog-header"><h2 id="figure-viewer-title">Hierarchical multimodal Transformer</h2><form method="dialog"><button type="submit" autofocus>Close</button></form></div><img /><a target="_blank" rel="noopener noreferrer">Open original image to zoom ↗</a>';
  const enlargedImage = viewer.querySelector('img');
  const originalLink = viewer.querySelector('a');
  document.body.appendChild(viewer);

  figureLinks.forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      enlargedImage.src = link.href;
      enlargedImage.alt = link.querySelector('img').alt;
      originalLink.href = link.href;
      viewer.showModal();
    });
  });

  viewer.addEventListener('click', event => {
    const bounds = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      viewer.close();
    }
  });
}
