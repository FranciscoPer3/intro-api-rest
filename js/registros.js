const API_URL = "https://68bb0de884055bce63f10549.mockapi.io/api/v1/dispositivos_IoT";
const tabla = document.getElementById("tablaRegistros");
const ultimoStatus = document.getElementById("ultimoStatus");

// 📌 Cargar últimos registros (10)
async function cargarRegistros() {
  const res = await fetch(API_URL);
  const data = await res.json();

  // Tomar los últimos 10, ordenados descendentes
  const ultimos = data.slice(-10).reverse();

  tabla.innerHTML = "";
  ultimos.forEach(registro => {
    tabla.innerHTML += `
      <tr>
        <td>${registro.id}</td>
        <td>${registro.name}</td>
        <td>${registro.status}</td>
        <td>${registro.ip}</td>
        <td>${registro.date}</td>
      </tr>
    `;
  });

  if (ultimos.length > 0) {
    ultimoStatus.innerHTML = `Último estado: <strong>${ultimos[0].status}</strong>`;
  }
}

// 📌 Polling cada 2 segundos
setInterval(cargarRegistros, 2000);

// Inicializar
cargarRegistros();
