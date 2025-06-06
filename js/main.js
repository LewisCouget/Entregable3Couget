document.addEventListener("DOMContentLoaded", function () {
  // Llamar a products.json
  /* let productos = [];
  fetch("../data/products.json")
    .then((resp) => resp.json())
    .then((data) => {
      productos = data;
      addProduct(productos);
    }); */

  const saludo = document.getElementById("saludo");
  const texoInicio = document.getElementById("textoInicio");
  const inputsBotones = document.getElementById("inputsBotones");
  const botonGuardar = document.getElementById("botonGuardar");
  const botonEliminar = document.getElementById("botonEliminar");
  const nombreInput = document.querySelector('input[placeholder="Nombre"]');
  const apellidoInput = document.querySelector('input[placeholder="Apellido"]');
  const emailInput = document.querySelector('input[placeholder="E-mail"]');

  function inputOff() {
    inputsBotones.style.display = "none";
    botonEliminar.style.display = "block";
  }

  function inputOn() {
    inputsBotones.style.display = "block";
    botonEliminar.style.display = "none";
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

      // inputsBotones.style.display = "none";
      // botonEliminar.style.display = "block";
      inputOff();

      const datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
      };

      localStorage.setItem("registroUsuario", JSON.stringify(datosUsuario));
      saludo.textContent = `Bienvenido a nuesta pagina!`;
      texoInicio.textContent = `Gracias por registrarse ${nombre} ${apellido}!`;

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

  // Recuperar el dato del usuario y mostrar u ocultar
  const nombreGuardado = localStorage.getItem("registroUsuario");

  if (nombreGuardado) {
    const usuarioRecuperado = JSON.parse(nombreGuardado);
    saludo.textContent = `Hola! ${usuarioRecuperado.nombre} ${usuarioRecuperado.apellido}!`;
    texoInicio.textContent = `Gracias por volver a nuestra pagina! 😊`;
    // inputsBotones.style.display = "none";
    // botonEliminar.style.display = "block";
    inputOff();
  } else {
    // inputsBotones.style.display = "block";
    // botonEliminar.style.display = "none";
    inputOn();
  }

  // Eliminar Datos Del Usuario 🚀
  if (botonEliminar) {
    botonEliminar.addEventListener("click", function () {
      localStorage.removeItem("registroUsuario");
      saludo.textContent = `Bienvenido!`;
      texoInicio.textContent = `Porfavor registrese!`;
      // inputsBotones.style.display = "block";
      // botonEliminar.style.display = "none";
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
  /* const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; */
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
