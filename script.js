document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.getElementById('gallery');

  async function caricaGalleria() {
    // Svuota la galleria prima di ricaricare
    gallery.innerHTML = '';

    // Leggi i dati da Google Sheets in formato CSV
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRI6DEc11YtMUXUjD3abMAhxtD6Iojb6Ca1UAAClYzu4UnB-J81YrltciK9ixN-FCeLhGkMz9ftmWz4/pub?output=csv');
    const data = await response.text();

    const lines = data.trim().split('\n');
    lines.shift(); // Rimuove l'intestazione
    const tshirts = lines.map(line => {
      const [id, sold, max] = line.split(',');
      return {
        id: `maglietta${id.trim()}`,
        sold: parseInt(sold.trim()),
        max: parseInt(max.trim())
      };
    });

    function getStatus(sold, max) {
      if (sold >= max) return 'soldout';
      if (sold >= max / 2) return 'In esaurimento';
      return 'Disponibile';
    }

    tshirts.forEach(tshirt => {
      const tshirtDiv = document.createElement('div');
      tshirtDiv.classList.add('tshirt');
      tshirtDiv.id = `${tshirt.id}-wrapper`;

      const img = document.createElement('img');
      let color = Math.random() < 0.5 ? 'bianca' : 'nera';

      const status = getStatus(tshirt.sold, tshirt.max);
      if (status === 'soldout') {
        img.src = `images/${tshirt.id}_soldout.jpg`;
      } else {
        img.src = `images/${tshirt.id}_${color}.jpg`;
      }

      img.alt = `Maglietta ${tshirt.id} ${color}`;
      img.id = tshirt.id;

      const statusDiv = document.createElement('div');
      statusDiv.classList.add('status');
      if (status !== 'soldout') {
        statusDiv.textContent = status;
      }

      tshirtDiv.appendChild(img);
      tshirtDiv.appendChild(statusDiv);
      gallery.appendChild(tshirtDiv);
    });
  }

  // Carica subito all'avvio
  caricaGalleria();

  // Poi ricarica ogni 5 minuti (300.000 millisecondi)
  setInterval(caricaGalleria, 300000);
});