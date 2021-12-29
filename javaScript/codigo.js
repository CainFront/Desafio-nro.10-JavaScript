// Declaracion de Variables

let carrito = document.getElementById("carrito");
let platillos = document.getElementById("lista-platillos");
let listaPlatillos = document.querySelector("#lista-carrito tbody");
let vaciarCarritoBtn = document.getElementById("borrar-carrito");

// Declarar todos los Escuchadores
cargarEventListeners();

function cargarEventListeners() {
  platillos.addEventListener("click", comprarPlatillo);

  carrito.addEventListener("click", eliminarPlatillo);

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

// Accion añadir al carrito
function comprarPlatillo(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const platillo = e.target.parentElement.parentElement;
    leerDatosPlatillo(platillo);
  }
}

// Declaro la funcion que uso arriba, que lee la informacion
function leerDatosPlatillo(platillo) {
  const infoPlatillo = {
    imagen: platillo.querySelector("img").src,
    titulo: platillo.querySelector("h4").textContent,
    precio: platillo.querySelector(".precio span").textContent,
    id: platillo.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoPlatillo);
}

// Funcion para mostrar lo seleccionado en el carrito
function insertarCarrito(platillo) {
  const row = document.createElement("tr");
  row.innerHTML = `
       <td>
           <img src="${platillo.imagen}" width=100>
       </td>
       <td>${platillo.titulo}</td>
       <td>${platillo.precio}</td>
       <td>
        <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
       </td>
    `;
  listaPlatillos.appendChild(row);
  guardarPlatilloLocalStorage(platillo);
}

// Para eliminar el Plato del carrito
function eliminarPlatillo(e) {
  e.preventDefault();

  let platillo, platilloId;

  if (e.target.classList.contains("borrar-platillo")) {
    e.target.parentElement.parentElement.remove();
    platillo = e.target.parentElement.parentElement;
    platilloId = platillo.querySelector("a").getAttribute("data-id");
  }
  eliminarPlatilloLocalStorage(platilloId);
}

//Opcion de borrar con Btn
function vaciarCarrito() {
  while (listaPlatillos.firstChild) {
    listaPlatillos.removeChild(listaPlatillos.firstChild);
  }
  vaciarLocalStorage();

  return false;
}

/*===================================
          LOCAL STORAGE
=================================== */

// Guardar los Platillos en el Local Storage
function guardarPlatilloLocalStorage(platillo) {
  let platillos;

  platillos = obtenerPlatillosLocalStorage();
  platillos.push(platillo);

  localStorage.setItem("platillos", JSON.stringify(platillos));
}

// Comprobar si hay platillos en el local storage
function obtenerPlatillosLocalStorage() {
  let platillosLS;

  if (localStorage.getItem("platillos") === null) {
    platillosLS = [];
  } else {
    platillosLS = JSON.parse(localStorage.getItem("platillos"));
  }
  return platillosLS;
}

// Para leer el local storage
function leerLocalStorage() {
  let platillosLS;

  platillosLS = obtenerPlatillosLocalStorage();

  platillosLS.forEach(function (platillo) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
        `;
    listaPlatillos.appendChild(row);
  });
}

// Para borrarlo del storage
function eliminarPlatilloLocalStorage(platillo) {
  let platillosLS;
  platillosLS = obtenerPlatillosLocalStorage();

  platillosLS.forEach(function (platilloLS, index) {
    if (platilloLS.id === platillo) {
      platillosLS.splice(index, 1);
    }
  });

  localStorage.setItem("platillos", JSON.stringify(platillosLS));
}

function vaciarLocalStorage() {
  localStorage.clear();
}

/*=================================================================
            CONFIGURACION DE HTML "CONFIRMACION"
==================================================================*/
// Variable de Carrito/Formulario
let iniciar = document.getElementById("iniciar-compra");

iniciar.addEventListener("click", function () {
  window.open(
    "../secciones/confirmacion.html",
    "Diseño Web",
    "width=500, height=800"
  );
});

function confirmar() {
  let inputEmail = document.getElementById("EmailInput");
  let inputEnvio = document.getElementById("EnvioInput");
  let inputTexto = document.getElementById("MensajeInput");
  localStorage.setItem("email", inputEmail.value);
  localStorage.setItem("envio", inputEnvio.value);
  localStorage.setItem("descripcion", inputTexto.value);
}
