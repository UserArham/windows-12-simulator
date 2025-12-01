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
// Utility: make window draggable
function makeDraggable(win, header) {
  let isDragging = false, offsetX = 0, offsetY = 0;

  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - win.getBoundingClientRect().left;
    offsetY = e.clientY - win.getBoundingClientRect().top;
  });

  window.addEventListener('mousemove', e => {
    if (isDragging) {
      win.style.left = (e.clientX - offsetX) + 'px';
      win.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  window.addEventListener('mouseup', () => isDragging = false);
}

// Open a new window
function openWindow(title, contentGenerator) {
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
  win.appendChild(body);

  contentGenerator(body); // fill content dynamically

  document.getElementById('windows-container').appendChild(win);

  // Close
  header.querySelector('.close-button').addEventListener('click', () => win.remove());

  // Drag
  makeDraggable(win, header);
}

// Apps
const apps = {
  notepad: (body) => {
    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    body.appendChild(textarea);
  },
  calculator: (body) => {
    body.innerHTML = 'Simple Calculator:<br>';
    const input = document.createElement('input');
    input.type = 'text';
    body.appendChild(input);
    const button = document.createElement('button');
    button.innerText = '=';
    body.appendChild(button);
    const result = document.createElement('div');
    body.appendChild(result);

    button.addEventListener('click', () => {
      try {
        result.textContent = eval(input.value);
      } catch {
        result.textContent = 'Error';
      }
    });
  },
  chatbot: (body) => {
    body.innerHTML = '<div id="chat-log" style="height:120px; overflow:auto; border:1px solid #ccc; padding:5px;"></div>';
    const input = document.createElement('input');
    input.style.width = '80%';
    body.appendChild(input);
    const send = document.createElement('button');
    send.innerText = 'Send';
    body.appendChild(send);

    const log = body.querySelector('#chat-log');

    function botReply(text) {
      let reply = "I don't understand.";
      if (text.includes('hello')) reply = "Hello! How are you?";
      if (text.includes('time')) reply = "Current time is " + new Date().toLocaleTimeString();
      return reply;
    }

    send.addEventListener('click', () => {
      const msg = input.value;
      if(!msg) return;
      log.innerHTML += `<div>You: ${msg}</div>`;
      log.innerHTML += `<div>AI: ${botReply(msg.toLowerCase())}</div>`;
      log.scrollTop = log.scrollHeight;
      input.value = '';
    });
  },
  clock: (body) => {
    const clockDiv = document.createElement('div');
    clockDiv.style.fontSize = '24px';
    body.appendChild(clockDiv);
    function updateClock() {
      clockDiv.textContent = new Date().toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
  }
};

// Icon click
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('dblclick', () => {
    const app = icon.dataset.app;
    openWindow(icon.textContent, apps[app]);
  });
});

// Start Menu
const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');

startButton.addEventListener('click', () => {
  startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('.start-app').forEach(item => {
  item.addEventListener('click', () => {
    const app = item.dataset.app;
    openWindow(item.textContent, apps[app]);
    startMenu.style.display = 'none';
  });
});
