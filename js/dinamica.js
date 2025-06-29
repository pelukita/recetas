document.addEventListener("DOMContentLoaded", cargarRecetas);
const API_URL = "https://685f84acc55df675589e812f.mockapi.io/receta";

document.getElementById("form-receta").addEventListener("submit", function (e) {
  e.preventDefault();
  const receta = {
    nombre: document.getElementById("nombre").value,
    ingredientes: document.getElementById("ingredientes").value,
    hambre: document.getElementById("hambre").value,
    vida: document.getElementById("vida").value,
    armadura: document.getElementById("armadura").value,
  };

  if (document.getElementById("form-receta").dataset.editing) {
    actualizarReceta(receta);
  } else {
    agregarReceta(receta);
  }
});

async function editarReceta(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const receta = await response.json();

    document.getElementById("nombre").value = receta.nombre;
    document.getElementById("ingredientes").value = receta.ingredientes;
    document.getElementById("hambre").value = receta.hambre;
    document.getElementById("vida").value = receta.vida;
    document.getElementById("armadura").value = receta.armadura;

    document.getElementById("form-receta").dataset.editing = id;
    document.querySelector("#form-receta button").textContent =
      "Actualizar Receta";
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Caargar recetas*/
async function cargarRecetas() {
  try {
    const response = await fetch(API_URL);
    const recetas = await response.json();
    mostrarRecetas(recetas);
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Mostrar recetas*/
function mostrarRecetas(recetas) {
  const tbody = document.getElementById("tabla-body");
  tbody.innerHTML = recetas
    .map(
      (receta) => `
    <tr data-id="${receta.id}">
      <td>${receta.nombre}</td>
      <td>${receta.ingredientes}</td>
      <td>${receta.hambre}</td>
      <td>${receta.vida}</td>
      <td>${receta.armadura}</td>
      <td>
        <button onclick="editarReceta('${receta.id}')">Editar</button>
        <button onclick="borrarReceta('${receta.id}')">Eliminar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

/*Agregar Receta*/
async function agregarReceta(receta) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receta),
    });
    cargarRecetas();
    document.getElementById("form-receta").reset();
  } catch (error) {
    console.error("Error:", error);
  }
}

/*Editar Receta*/
async function actualizarReceta(receta) {
  try {
    const id = document.getElementById("form-receta").dataset.editing;
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(receta),
    });

    cargarRecetas();
    document.getElementById("form-receta").reset();
    delete document.getElementById("form-receta").dataset.editing;
    document.querySelector("#form-receta button").textContent =
      "Agregar Receta";
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Eliminar receta */
async function borrarReceta(id) {
  if (confirm("¿Estás seguro de eliminar esta receta?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      cargarRecetas();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
