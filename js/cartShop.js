let carrito = JSON.parse(localStorage.getItem("ListaCarrito")) || [];
function displayCartItems() {
  const cartItemsList = document.getElementById("listaDeCarrito");
  const cartTotalSpan = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById("empty-cart-message");

  cartItemsList.innerHTML = "";

  let totalGeneral = 0;
  if (carrito.length === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }

  carrito.forEach((product) => {
    const price = parseFloat(product.price);
    const cantidad = parseFloat(product.cantidad);
    const itemTotal = price * cantidad;
    totalGeneral += itemTotal;
    const listHTML = `
      <li class="list-group-item d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center">
              <img src="${product.img}" class="img-thumbnail me-3" alt="${
      product.name
    }" style="width: 70px; height: 70px; object-fit: cover;">
              <div>
                  <h5 class="mb-1">${product.name}</h5>
                  <small class="text-muted">Cantidad: ${cantidad}</small> <br>
                  <small class="text-muted">Precio: $USD${price.toFixed(
                    2
                  )}</small>
              </div>
          </div>
          <div class="text-end">
              <span class="badge bg-success rounded-pill me-2">Subtotal: $USD${itemTotal.toFixed(
                2
              )}</span>
              <button class="btn btn-sm btn-danger remove-from-cart-btn" data-product-id="${
                product.id
              }">X</button>
          </div>
      </li>`;
    cartItemsList.innerHTML += listHTML;
  });
  cartTotalSpan.textContent = totalGeneral.toFixed(2);
}

function removeFromCart(productId) {
  carrito = carrito.filter((item) => item.id != productId);
  localStorage.setItem("ListaCarrito", JSON.stringify(carrito));
  displayCartItems();
  Swal.fire({
    icon: "info",
    title: "Producto Eliminado",
    text: "El producto ha sido retirado del carrito.",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
}
function clearCart() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los productos de tu carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, vaciar carrito",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("ListaCarrito");
      carrito = [];
      displayCartItems();
      Swal.fire("¡Vaciado!", "Tu carrito ha sido vaciado.", "success");
    }
  });
}

// Cargar el carrito desde localStorage y mostrar
function loadCartAndDisplay() {
  carrito = JSON.parse(localStorage.getItem("ListaCarrito")) || [];
  displayCartItems();
}

document.addEventListener("DOMContentLoaded", function () {
  navBar();
  displayCartItems();
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (carrito.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Carrito Vacío",
          text: "No puedes finalizar la compra con el carrito vacío.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Compra Finalizada!",
          text: "Gracias por tu compra. Pronto recibirás tus productos.",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          clearCart();
          window.location.href = "index.html";
        });
      }
    });
  }

  const cartItemsListForDelegation = document.getElementById("listaDeCarrito");
  if (cartItemsListForDelegation) {
    cartItemsListForDelegation.addEventListener("click", function (event) {
      const removeButton = event.target.closest(".remove-from-cart-btn");
      if (removeButton) {
        const productId = removeButton.dataset.productId;
        removeFromCart(productId);
      }
    });
  }
});
