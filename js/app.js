const API_URL = "https://68bb0de884055bce63f10549.mockapi.io/api/v1/dispositivos_IoT";
const form = document.getElementById("statusForm");
const tabla = document.getElementById("tablaRegistros");
const ultimoStatus = document.getElementById("ultimoStatus");

// 📌 Obtener IP pública del cliente
async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    return "Desconocida";
  }
}

// 📌 Enviar nuevo registro
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("status").value;
  const ip = await getIP();
  const date = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

  const nuevoRegistro = {
    name: "Dispositivo IoT",
    status,
    ip,
    date
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoRegistro)
  });

  form.reset();
  cargarRegistros();
});

// 📌 Cargar últimos registros
async function cargarRegistros() {
  const res = await fetch(API_URL);
  const data = await res.json();

  // Ordenar por fecha descendente y tomar los últimos 5
  const ultimos = data.slice(-5).reverse();

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

// 📌 Inicializar
cargarRegistros();
