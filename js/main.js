// Validar 🚀
function validarInputs(nombre, apellido, email) {
  const nameSurnameValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+$/;
  if (nombre.trim() === "" || apellido.trim() === "" || email.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "¡Campos Incompletos!",
      text: "Por favor, completa todos los campos para registrarte.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return false;
  } else if (
    !nameSurnameValid.test(nombre) ||
    !nameSurnameValid.test(apellido)
  ) {
    Swal.fire({
      icon: "error",
      title: "¡Error de tipos!",
      text: "El nombre solo puede contener letras, espacios y guiones.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return false;
  }

  if (!email.includes("@gmail.com")) {
    Swal.fire({
      icon: "error",
      title: "¡Email Inválido!",
      text: "Por favor, ingresa una dirección de correo electrónico válida.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return false;
  }
  return true;
}
// Validar 🚀

// Llamar a products.json🚀
const productList = "../data/products.json";

let productos = [];
function getAllProducts() {
  fetch(productList)
    .then((resp) => resp.json())
    .then((data) => {
      productos = data;
      addProduct(productos);
    });
}
// Llamar a products.json🚀

//Añadir cartas🚀
function addProduct(data) {
  const cardsContainer = document.getElementById("cardsGrid");
  cardsContainer.innerHTML = "";
  data.forEach((product) => {
    const cardHTML = `<div class="card" style="max-width: 100%">
  <img src="${product.img}" class="card-img-top" alt="${product.name}">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">Categoria: ${product.category}</p>
    <button onclick="agregarProductos(${product.id}) "class="botonCarrito">Agregar</a>
  </div>
</div>`;
    cardsContainer.innerHTML += cardHTML;
  });
}
//Añadir cartas🚀

// Agregar productos al carrito🚀
const carrito = [];
function agregarProductos(id) {
  const productoEnCatalogo = productos.find((producto) => producto.id === id);

  if (productoEnCatalogo) {
    const productoExistenteEnCarrito = carrito.find(
      (itemDelCarrito) => itemDelCarrito.id === id
    );
    if (productoExistenteEnCarrito) {
      productoExistenteEnCarrito.cantidad++;
    } else carrito.push({ ...productoEnCatalogo, cantidad: 1 });
  }
  localStorage.setItem("ListaCarrito", JSON.stringify(carrito));
}
// Agregar productos al carrito🚀

//Añadir cartas🚀
let isFirstRegistrationThisSession = false;
function updateUI(uiState) {
  const saludo = document.getElementById("saludo");
  const textoInicio = document.getElementById("textoInicio");
  const inputsBotones = document.getElementById("inputsBotones");
  const botonEliminar = document.getElementById("botonEliminar");
  const showProductsBtn = document.getElementById("showProductsBtn");
  const carShopBtn = document.getElementById("carShopBtn");
  const cardsGrid = document.getElementById("cardsGrid");

  switch (uiState) {
    case "registrado":
      if (inputsBotones) inputsBotones.style.display = "none";
      if (botonEliminar) botonEliminar.style.display = "block";
      if (showProductsBtn) showProductsBtn.style.display = "block";
      if (carShopBtn) carShopBtn.style.display = "block";
      if (cardsGrid) cardsGrid.style.display = "none";

      break;
    case "noRegistrado":
      if (inputsBotones) inputsBotones.style.display = "block";
      if (botonEliminar) botonEliminar.style.display = "none";
      if (showProductsBtn) showProductsBtn.style.display = "none";
      if (carShopBtn) carShopBtn.style.display = "none";
      if (cardsGrid) cardsGrid.style.display = "none";

      saludo.textContent = `Bienvenido!`;
      textoInicio.textContent = `Por favor, regístrate!`;
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const saludo = document.getElementById("saludo");
  const textoInicio = document.getElementById("textoInicio");
  const botonGuardar = document.getElementById("botonGuardar");
  const botonEliminar = document.getElementById("botonEliminar");

  const nombreInput = document.querySelector('input[placeholder="Nombre"]');
  const apellidoInput = document.querySelector('input[placeholder="Apellido"]');
  const emailInput = document.querySelector('input[placeholder="E-mail"]');

  navBar();

  // Recuperar el dato del usuario 🚀

  const showProductsBtn = document.getElementById("showProductsBtn");
  const carShopBtn = document.getElementById("carShopBtn");
  const cardsGrid = document.getElementById("cardsGrid");

  const nombreGuardado = localStorage.getItem("registroUsuario");
  if (nombreGuardado) {
    updateUI("registrado");
    const usuarioRecuperado = JSON.parse(nombreGuardado);
    saludo.textContent = `¡Hola! ${usuarioRecuperado.nombre} ${usuarioRecuperado.apellido}!`;
    textoInicio.textContent = `¡Gracias por volver a nuestra página! 😊`;
    isFirstRegistrationThisSession = false;
  } else {
    updateUI("noRegistrado");
    isFirstRegistrationThisSession = true;
  }
  // Recuperar el dato del usuario 🚀

  if (showProductsBtn) {
    showProductsBtn.addEventListener("click", function () {
      if (cardsGrid.style.display === "none") {
        cardsGrid.style.display = "grid";
        getAllProducts();
        showProductsBtn.textContent = "Ocultar Productos";
      } else {
        cardsGrid.style.display = "none";
        showProductsBtn.textContent = "Mostrar Productos";
      }
    });
  }

  if (carShopBtn) {
    carShopBtn.addEventListener("click", function () {
      window.location.href = "carrito.html";
    });
  }

  // Guardar Datos Del Usuario🚀
  if (botonGuardar) {
    botonGuardar.addEventListener("click", function () {
      const nombre = nombreInput.value;
      const apellido = apellidoInput.value;
      const email = emailInput.value;

      if (!validarInputs(nombre, apellido, email)) {
        return;
      }

      const datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
      };

      localStorage.setItem("registroUsuario", JSON.stringify(datosUsuario));

      if (isFirstRegistrationThisSession) {
        saludo.textContent = `Bienvenido a nuesta pagina!`;
        textoInicio.textContent = `Gracias por registrarse ${nombre} ${apellido}!`;
        isFirstRegistrationThisSession = false;
      }
      updateUI("registrado");
      //sweet
      Swal.fire({
        icon: "success",
        title: "¡Registro Guardado!",
        text: "Tus datos han sido guardados exitosamente!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      nombreInput.value = "";
      apellidoInput.value = "";
      emailInput.value = "";
    });
  }
  // Guardar Datos Del Usuario🚀

  // Eliminar Datos Del Usuario 🚀
  if (botonEliminar) {
    botonEliminar.addEventListener("click", function () {
      localStorage.removeItem("registroUsuario");
      updateUI("noRegistrado");
      isFirstRegistrationThisSession = true;

      //sweet
      Swal.fire({
        icon: "warning",
        title: "¡Registro Borrado!",
        text: "Tus datos han sido borrados exitosamente!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    });
  }
  // Eliminar Datos Del Usuario 🚀
});
