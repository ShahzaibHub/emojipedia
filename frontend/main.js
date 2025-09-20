// Debounce helper to reduce API calls on typing
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

async function loadEmojis(search = '') {
  try {
    const res = await fetch(`http://localhost:3000/api/emojis?search=${encodeURIComponent(search)}`);
    const emojis = await res.json();
    const grid = document.getElementById('emoji-grid');
    grid.innerHTML = '';
    
    emojis.forEach(e => {
      const div = document.createElement('div');
      div.classList.add('emoji');
      div.textContent = e.emoji;
      div.style.backgroundColor = e.color_tag || '#fff'; // optional color tag
      div.onclick = () => showPopup(e);
      grid.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading emojis:', err);
  }
}

function showPopup(e) {
  const popup = document.getElementById('popup');
  popup.innerHTML = `
    <div style="font-size:2.5rem; margin-bottom:10px;">${e.emoji}</div>
    <h2>${e.name}</h2>
    <p><strong>Category:</strong> ${e.category}</p>
    <p><strong>Description:</strong> ${e.description}</p>
    <p><strong>Aliases:</strong> ${e.aliases.join(', ')}</p>
    <p><strong>Example:</strong> ${e.example}</p>
    <p><strong>Mood:</strong> ${e.mood}</p>
  `;
  popup.style.opacity = 0;
  popup.style.display = 'block';
  
  // Fade-in animation
  let op = 0;
  const timer = setInterval(() => {
    if(op >= 1) clearInterval(timer);
    popup.style.opacity = op;
    op += 0.1;
  }, 20);
}

// Search with debounce
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(e => loadEmojis(e.target.value), 300));

// Initial load
loadEmojis();

