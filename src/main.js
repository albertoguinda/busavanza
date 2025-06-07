import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Inicializamos el mapa centrado en Zaragoza
const map = L.map('map').setView([41.6488, -0.8891], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Función para crear íconos de bus con colores dinámicos
const crearIconoBus = (color) => L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${color}" class="bus-icon">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 4c3.4 0 6 3.64 6 8v5a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-6.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-11 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m12 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m-.76 -9.989l1.068 4.989h2.636c-.313 -2.756 -1.895 -4.82 -3.704 -4.989m-11.24 -.011h-3v3h3zm5 0h-3v3h3zm4.191 0h-2.191v3h2.834z" />
    </svg>
  `,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Lista inicial de buses
const buses = [
  { id: 1, lat: 41.6497, lng: -0.8870, precio: 0.50, linea: ' 23', ruta: [ { lat: 41.6497, lng: -0.8870 }, { lat: 41.6505, lng: -0.8860 }, { lat: 41.6520, lng: -0.8885 }, { lat: 41.6540, lng: -0.8900 }, { lat: 41.6555, lng: -0.8910 }, { lat: 41.6570, lng: -0.8930 } ] },
  { id: 2, lat: 41.6465, lng: -0.8925, precio: 0.50, linea: ' 35', ruta: [ { lat: 41.6465, lng: -0.8925 }, { lat: 41.6450, lng: -0.8910 }, { lat: 41.6435, lng: -0.8900 }, { lat: 41.6420, lng: -0.8890 }, { lat: 41.6410, lng: -0.8875 }, { lat: 41.6405, lng: -0.8855 } ] },
  { id: 3, lat: 41.6522, lng: -0.8844, precio: 0.50, linea: ' C1', ruta: [ { lat: 41.6535, lng: -0.8835 }, { lat: 41.6545, lng: -0.8820 }, { lat: 41.6555, lng: -0.8805 }, { lat: 41.6575, lng: -0.8790 }, { lat: 41.6590, lng: -0.8775 } ] },
  { id: 4, lat: 41.6535, lng: -0.8885, precio: 0.50, linea: ' 12', ruta: [ { lat: 41.6610, lng: -0.8800 }, { lat: 41.6600, lng: -0.8790 }, { lat: 41.6585, lng: -0.8775 }, { lat: 41.6570, lng: -0.8760 }, { lat: 41.6560, lng: -0.8750 } ] },
  { id: 5, lat: 41.6492, lng: -0.8900, precio: 0.50, linea: ' 10', ruta: [ { lat: 41.6470, lng: -0.8905 }, { lat: 41.6450, lng: -0.8915 }, { lat: 41.6435, lng: -0.8925 }, { lat: 41.6420, lng: -0.8935 }, { lat: 41.6405, lng: -0.8945 } ] },
  { id: 6, lat: 41.6460, lng: -0.8910, precio: 0.50, linea: ' 16', ruta: [ { lat: 41.6430, lng: -0.8900 }, { lat: 41.6415, lng: -0.8890 }, { lat: 41.6400, lng: -0.8875 }, { lat: 41.6385, lng: -0.8860 }, { lat: 41.6370, lng: -0.8845 } ] },
  { id: 7, lat: 41.6540, lng: -0.8950, precio: 0.50, linea: ' 40', ruta: [ { lat: 41.6550, lng: -0.8935 }, { lat: 41.6570, lng: -0.8920 }, { lat: 41.6580, lng: -0.8905 }, { lat: 41.6595, lng: -0.8890 }, { lat: 41.6605, lng: -0.8875 } ] },
  { id: 8, lat: 41.6625, lng: -0.8965, precio: 0.50, linea: ' 50', ruta: [ { lat: 41.6635, lng: -0.8950 }, { lat: 41.6650, lng: -0.8940 }, { lat: 41.6665, lng: -0.8925 }, { lat: 41.6680, lng: -0.8910 }, { lat: 41.6695, lng: -0.8895 } ] },
  { id: 9, lat: 41.6710, lng: -0.8795, precio: 0.50, linea: ' 25', ruta: [ { lat: 41.6700, lng: -0.8780 }, { lat: 41.6720, lng: -0.8765 }, { lat: 41.6740, lng: -0.8750 }, { lat: 41.6750, lng: -0.8735 }, { lat: 41.6770, lng: -0.8720 } ] },
  { id: 10, lat: 41.6755, lng: -0.8825, precio: 0.50, linea: ' 72', ruta: [ { lat: 41.6765, lng: -0.8810 }, { lat: 41.6780, lng: -0.8795 }, { lat: 41.6800, lng: -0.8780 }, { lat: 41.6815, lng: -0.8765 }, { lat: 41.6830, lng: -0.8750 } ] },
  { id: 11, lat: 41.670278, lng: -0.871111, precio: 0.50, linea: ' 88', ruta: [ { lat: 41.6705, lng: -0.8700 }, { lat: 41.6710, lng: -0.8690 }, { lat: 41.6720, lng: -0.8680 }, { lat: 41.6730, lng: -0.8670 }, { lat: 41.6740, lng: -0.8660 } ] }
  
];

const markers = {};

// Crear marcadores personalizados para cada bus con su nombre de línea y guardarlos
buses.forEach(bus => {
  const marker = L.marker([bus.lat, bus.lng]).addTo(map).bindPopup(`Autobús ${bus.linea}`);
  markers[bus.id] = marker;
});

async function obtenerCalidadAire() {
  const apiUrl = "https://www.zaragoza.es/sede/servicio/calidad-aire/listado.json";

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    const calidadAirePorBarrio = datos.result.map((barrio) => {
      const observaciones = barrio.observation;

      if (!observaciones || observaciones.length === 0) {
        return {
          barrio: barrio.title,
          direccion: barrio.direccion || "Sin dirección",
          latitud: barrio.latitud,
          longitud: barrio.longitud,
          NO: 0,
          NO2: 0,
          O3: 0,
          "PM2.5": 0,
          PM10: 0,
          mensaje: "No hay datos"
        };
      }

      const mediciones = {};
      for (const obs of observaciones) {
        const magnitud = obs.magnitud;
        if (!(magnitud in mediciones)) {
          mediciones[magnitud] = parseFloat(obs.value);
        }
      }

      return {
        barrio: barrio.title,
        direccion: barrio.direccion || "Sin dirección",
        latitud: barrio.latitud,
        longitud: barrio.longitud,
        NO: mediciones["NO"] || 0,
        NO2: mediciones["NO2"] || 0,
        O3: mediciones["O3"] || 0,
        SO2: mediciones["SO2"] || 0,
        "PM2.5": mediciones["PM2.5"] || 0,
        PM10: mediciones["PM10"] || 0
      };
    });

    console.log("Datos de calidad del aire por barrio:", calidadAirePorBarrio);
    marcarZonasConCalidadAire(calidadAirePorBarrio);

  } catch (error) {
    console.error("Hubo un error al obtener los datos de la API:", error);
  }
}


function getColorNO(valor) {
  if (valor <= 20) return 'green';
  if (valor <= 25) return 'yellow';
  if (valor <= 30) return 'orange';
  return 'red';
}

const zonasCO2 = [
  { lat: 41.675167, lng: -0.887000, barrio: "Actur" },
  { lat: 41.670278, lng: -0.871111, barrio: "El Picarral" },
  { lat: 41.663611, lng: -0.916389, barrio: "Roger de Flor" },
  { lat: 41.674167, lng: -0.864167, barrio: "Jaime Ferran" },
  { lat: 41.635278, lng: -0.893611, barrio: "Renovales" },
  { lat: 41.640278, lng: -0.859722, barrio: "Las Fuentes" },
  { lat: 41.6505, lng: -0.8899, barrio: "Centro" },
  { lat: 41.6550, lng: -0.8820, barrio: "Avda. Soria" }
];

function marcarZonasConCalidadAire(calidadAirePorBarrio) {
  zonasCO2.forEach(zona => {
    const barrioData = calidadAirePorBarrio.find(barrio =>
      barrio.barrio.trim().toLowerCase() === zona.barrio.trim().toLowerCase()
    );

    if (barrioData) {
      const valorNO = barrioData['NO'];
      const valorNO2 = barrioData['NO2'];
      const valorO3 = barrioData['O3'];
      const valorPM2_5 = barrioData['PM2.5'];
      const valorPM10 = barrioData['PM10'];

      const popupText = `
        <strong>Barrio:</strong> ${zona.barrio}<br>
        NO: ${valorNO} ppm<br>
        NO2: ${valorNO2} ppm<br>
        O3: ${valorO3} ppm<br>
        PM2.5: ${valorPM2_5} µg/m³<br>
        PM10: ${valorPM10} µg/m³
      `;

      const color = getColorNO(valorNO);

      L.circle([zona.lat, zona.lng], {
        radius: 400,
        color: color,
        fillColor: color,
        fillOpacity: 0.3
      }).addTo(map).bindPopup(popupText);

      zona.valorNO = valorNO;
    }
  });
}



obtenerCalidadAire();

function estaEnZonaRoja(busLatLng, zonas, umbral) {
  return zonas.some(zona => {
    if (zona.valorNO > umbral) {  // Comprobamos si el valor de NO es mayor que el umbral
      const distancia = map.distance(busLatLng, L.latLng(zona.lat, zona.lng));
      return distancia <= 400; // Dentro del radio de 400 metros
    }
    return false;
  });
}

function moverBuses() {
  buses.forEach(bus => {
    const ruta = bus.ruta;
    const posicionActual = { lat: bus.lat, lng: bus.lng };
    const siguientePosicion = ruta.shift();
    ruta.push(posicionActual);

    bus.lat = siguientePosicion.lat;
    bus.lng = siguientePosicion.lng;

    const busLatLng = L.latLng(bus.lat, bus.lng);
    const umbral = 30;  // Establecemos un umbral de contaminación, como 25 para rojo/naranja

    // Verificar si el bus está en una zona con contaminación superior al umbral
    const enZonaRoja = estaEnZonaRoja(busLatLng, zonasCO2, umbral);

    // Si el bus está en zona roja, cambiar el color del icono a rojo
    const nuevoColor = enZonaRoja ? 'red' : 'blue';
    markers[bus.id].setLatLng([bus.lat, bus.lng]); // Actualizamos la ubicación del marcador
    markers[bus.id].setIcon(crearIconoBus(nuevoColor)); // Actualizamos el icono (rojo o azul)

    bus.descuento = enZonaRoja;

    actualizarInfoSidebar(bus); // Actualizamos el sidebar con la información
  });
}



function actualizarInfoSidebar(bus) {
  const busLineInfo = document.getElementById(`linea-${bus.id}`);
  const precioConDescuento = bus.descuento ? (bus.precio * 0.8).toFixed(2) : bus.precio.toFixed(2);
  const tituloColor = bus.descuento ? 'red' : 'black';
  const puntosRespira = bus.descuento ? '<p id="puntos-respira">+50 Puntos Respira</p>' : '';  // Mostrar los puntos solo si hay descuento

  if (busLineInfo) {
    busLineInfo.innerHTML = `
      <div class="bus-line" id="linea-${bus.id}">
        <h3 style="color: ${tituloColor};">Línea ${bus.linea}</h3>
        ${bus.descuento ? 
          `<p><strong>Precio original:</strong> <span class="original-price">${bus.precio}€</span></p>
          <p><strong>Precio con descuento:</strong> ${precioConDescuento}€</p>` : 
          `<p><strong>Precio:</strong> ${bus.precio} €</p>`
        }
        ${puntosRespira} <!-- Agregar los puntos solo si hay descuento -->
        <button id="show-${bus.id}" class="btn-show">Mostrar bus</button>
      </div>
    `;

    const showBtn = document.getElementById(`show-${bus.id}`);
    if (showBtn) {
      showBtn.addEventListener('click', () => {
        markers[bus.id].setLatLng([bus.lat, bus.lng]); // Actualizamos la ubicación del marcador
        markers[bus.id].openPopup(); // Abre el popup con el nombre del bus
      });
    }
  }
}

// Función para buscar una línea de autobús
function buscarLinea() {
  const searchTerm = document.getElementById('search-bus').value.toLowerCase();
  const filteredBuses = buses.filter(bus => bus.linea.toLowerCase().includes(searchTerm));

  // Actualizar el sidebar solo con las líneas filtradas
  const infoContainer = document.getElementById('bus-info-container');
  infoContainer.innerHTML = '';  // Limpiar contenido anterior

  filteredBuses.forEach(bus => {
    const div = document.createElement('div');
    div.classList.add('bus-line');
    div.id = `linea-${bus.id}`;
    infoContainer.appendChild(div);

    // Llamar a la función que actualiza la información del bus en el sidebar
    actualizarInfoSidebar(bus);
  });

  // Si hay resultados de búsqueda, ocultar el botón "Mostrar todas"
  const showAllBtn = document.getElementById('show-all-btn');
  if (filteredBuses.length > 0) {
    showAllBtn.style.display = 'none';  // Ocultar botón
  } else {
    showAllBtn.style.display = 'block'; // Mostrar botón si no hay resultados
  }
}



// Función para mostrar todas las líneas
function mostrarTodasLineas() {
  const infoContainer = document.getElementById('bus-info-container');
  infoContainer.innerHTML = '';  // Limpiar contenido anterior

  buses.forEach(bus => {
    const div = document.createElement('div');
    div.classList.add('bus-line');
    div.id = `linea-${bus.id}`;
    infoContainer.appendChild(div);

    // Llamar a la función que actualiza la información del bus en el sidebar
    actualizarInfoSidebar(bus);
  });

  // Ocultar el botón "Mostrar todas"
  const showAllBtn = document.getElementById('show-all-btn');
  showAllBtn.style.display = 'none';
}

// Mueve los buses cada 2 segundos
setInterval(moverBuses, 2000);

document.getElementById('search-bus').addEventListener('input', buscarLinea);

document.getElementById('show-all-btn').addEventListener('click', mostrarTodasLineas);


// Llamada inicial para mostrar todas las líneas cuando cargue la página
mostrarTodasLineas();