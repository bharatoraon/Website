
mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhcmF0b3Jhb24iLCJhIjoiY21nd2l3eDNpMGl6cTJrc2lpa2I1czgybyJ9.K_ICeJ0NzQi4bPLGgmF9Yw'; // Replace with your Mapbox token

// Create a clean Mapbox map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [78.35, 17.45],
  zoom: 12
});

// Remove labels and text for a clean background
map.on('style.load', () => {
  const layers = map.getStyle().layers;
  for (const layer of layers) {
    if (layer.type === 'symbol' || layer.type === 'text' || layer.id.includes('label')) {
      map.removeLayer(layer.id);
    }
  }
});

// Dark / Light Mode Toggle

const toggle = document.getElementById('toggleMode');
let darkMode = false;

toggle.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark');
  toggle.textContent = darkMode ? '🌙' : '☀';
  map.setStyle(darkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11');

  // Change homepage logo based on mode
  const logo = document.querySelector('.logo-main');
  if (darkMode) {
    logo.src = 'assets/buildsoc_logo_light.svg'; // ✅ your light version
  } else {
    logo.src = 'assets/buildsoc_logo.svg'; // ✅ original version
  }

  // Re-clean map after reload
  map.once('style.load', () => {
    const layers = map.getStyle().layers;
    for (const layer of layers) {
      if (layer.type === 'symbol' || layer.type === 'text' || layer.id.includes('label')) {
        map.removeLayer(layer.id);
      }
    }
  });
});

// Navigation Between Sections
const links = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('.overlay, .home-viewport');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    sections.forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
