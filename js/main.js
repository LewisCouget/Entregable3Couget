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
    <a href="#" class="btn btn-primary">Agregar</a>
  </div>
</div>`;
    cardsContainer.innerHTML += cardHTML;
  });
}

function seeProducts(nombreGuardado) {
  if (nombreGuardado) {
    showProducts.addEventListener("click", function () {
      getAllProducts();
    });
  } else {
    inputOn();
  }
}

//Añadir cartas🚀

document.addEventListener("DOMContentLoaded", function () {
  const saludo = document.getElementById("saludo");
  const texoInicio = document.getElementById("textoInicio");
  const inputsBotones = document.getElementById("inputsBotones");
  const botonGuardar = document.getElementById("botonGuardar");
  const botonEliminar = document.getElementById("botonEliminar");
  const showProducts = document.getElementById("showProducts");
  const carShop = document.getElementById("carShop");
  const nombreInput = document.querySelector('input[placeholder="Nombre"]');
  const apellidoInput = document.querySelector('input[placeholder="Apellido"]');
  const emailInput = document.querySelector('input[placeholder="E-mail"]');
  const cardsGrid = document.getElementById("cardsGrid");

  // Ocultar o mostrar inputs y botones🚀
  function inputOff() {
    if (inputsBotones) inputsBotones.style.display = "none";
    if (botonEliminar) botonEliminar.style.display = "block";
    if (showProducts) showProducts.style.display = "block";
    if (carShop) carShop.style.display = "block";
    if (cardsGrid) cardsGrid.style.display = "none";
  }

  function inputOn() {
    if (inputsBotones) inputsBotones.style.display = "block";
    if (botonEliminar) botonEliminar.style.display = "none";
    if (showProducts) showProducts.style.display = "none";
    if (carShop) carShop.style.display = "none";
    if (cardsGrid) cardsGrid.style.display = "none";
  }

  if (showProducts) {
    showProducts.addEventListener("click", function () {
      if (cardsGrid) cardsGrid.style.display = "grid";
      getAllProducts();
    });
  }

  if (carShop) {
    carShop.addEventListener("click", function () {
      window.location.href = "carrito.html";
    });
  }
  if (botonGuardar) {
    // Ocultar o mostrar inputs y botones🚀

    // Guardar Datos Del Usuario🚀
    botonGuardar.addEventListener("click", function () {
      const nombre = nombreInput.value;
      const apellido = apellidoInput.value;
      const email = emailInput.value;

      if (!validarInputs(nombre, apellido, email)) {
        return;
      }
      inputOff();

      const datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
      };

      localStorage.setItem("registroUsuario", JSON.stringify(datosUsuario));
      saludo.textContent = `Bienvenido a nuesta pagina!`;
      texoInicio.textContent = `Gracias por registrarse ${nombre} ${apellido}!`;
      inputOff();
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

      // Para Limpiar los inputs
      nombreInput.value = "";
      apellidoInput.value = "";
      emailInput.value = "";
    });
  }
  // Guardar Datos Del Usuario🚀

  // Recuperar el dato del usuario 🚀
  const nombreGuardado = localStorage.getItem("registroUsuario");

  if (nombreGuardado) {
    seeProducts(nombreGuardado);
    const usuarioRecuperado = JSON.parse(nombreGuardado);
    saludo.textContent = `Hola! ${usuarioRecuperado.nombre} ${usuarioRecuperado.apellido}!`;
    texoInicio.textContent = `Gracias por volver a nuestra pagina! 😊`;
    inputOff();
  } else {
    inputOn();
  }
  // Recuperar el dato del usuario 🚀

  // Eliminar Datos Del Usuario 🚀
  if (botonEliminar) {
    botonEliminar.addEventListener("click", function () {
      localStorage.removeItem("registroUsuario");
      saludo.textContent = `Bienvenido!`;
      texoInicio.textContent = `Porfavor registrese!`;
      inputOn();

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
