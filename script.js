// Very basic “open notepad window” logic
document.getElementById('notepad-icon').addEventListener('dblclick', () => {
  openWindow('Notepad', 'This is a basic notepad window.');
});

function openWindow(title, content) {
  const win = document.createElement('div');
  win.classList.add('window');
  win.style.top = '100px';
  win.style.left = '100px';

  const header = document.createElement('div');
  header.classList.add('window-header');
  header.innerHTML = `<span>${title}</span> <span class="close-button">✖️</span>`;
  win.appendChild(header);

  const body = document.createElement('div');
  body.classList.add('window-content');
  body.textContent = content;
  win.appendChild(body);

  document.getElementById('windows-container').appendChild(win);

  // Close logic
  header.querySelector('.close-button').addEventListener('click', () => {
    win.remove();
  });

  // Drag logic
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - win.getBoundingClientRect().left;
    offsetY = e.clientY - win.getBoundingClientRect().top;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
}
