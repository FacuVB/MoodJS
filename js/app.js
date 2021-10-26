
//==========CONSTANTES Y VARIABLES==========//

const clickButton = document.querySelectorAll(".boton");
let carrito = [];
const tbody = document.querySelector(".tbody");
const alert = document.querySelector(".alert");

//================FUNCIONES================//
//Evento click comprar
clickButton.forEach((btn) => {
  btn.addEventListener("click", addtoCartItem);
});

//Crea una nueva instancia item por cada vez que se ejecuta el eveto click de arriba
function addtoCartItem(e) {
  const boton = e.target;
  const item = boton.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemTitle2 = item.querySelector(".card-title2").textContent;
  const itemPrice = item.querySelector(".price").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    title2: itemTitle2,
    price: itemPrice,
    img: itemImg,
    cant: 1,
  };

  addItemCart(newItem);
}

//Agregar nuevo item al carrito
function addItemCart(newItem) {
  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const inputElemento = tbody.getElementsByClassName("inputElemento");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cant++;
      const inputValue = inputElemento[i];
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }
  carrito.push(newItem);
  renderCarrito();
}

//Renderizar carrito
function renderCarrito() {
  tbody.innerHTML = ``;
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const content = `
    <td class="tableProducto">
        <img src=${item.img} alt="" />
    </td>
    <td>
        <h5 class="title">${item.title}</h5>
        <h6 class="artist">${item.title2}</h6>
    </td>
    <td class="tablePrecio"> ${item.price}</td>
    <td class="tableCantidad">
        <input type="number" min="1" value=${item.cant} class="inputElemento"
    </td>
    <td>
        <button class="delete btn btn-danger">X</button>
    </td>
     `;
    tr.innerHTML = content;
    tbody.append(tr);
    tr.querySelector(".delete").addEventListener("click", removeItem);
    // tr.querySelector('.inputElemento').addEventListener('change', sumarCantidad)
  });
  carritoTotal();
}

//Calculo del total
function carritoTotal() {
  let total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.price.replace("$", " "));
    total = total + precio * item.cant;
  });

  itemCartTotal.innerHTML = `TOTAL: $${total}`;
  addLocalStorage();
}

//Remomer item del carrito
function removeItem(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".itemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  tr.remove();
  carritoTotal();
}

/* EN PROCESO
 function sumarCantidad(e) {
     const sumaInput = e.target;
     const tr = sumaInput.closest('.itemCarrito');
     const title = tr.querySelector('.album').textContent;
     carrito.forEach(item => {
         if(item.title.trim() === title){
             sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
             item.cant = sumaInput.value;
             totalCarrito()
         }
     })
     console.log(carrito);
 } */

//Guardar carrito en localStorage
function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Verificar si existe un carrito en localStorage
window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};

//Buscador
  $(document).ready(function(){
    $(".btn-menu").click(function(){
      let filtro = $(this).attr("data-filter");
      if (filtro == "todos"){
        $(".card").show(500);
      }else{
        $(".card").not("."+filtro).hide(500);
        $(".card").filter("."+filtro).show(500);
      }
    })
  });

//Sweet Alert
$("#btn1").click(function(){
  Swal.fire(
    'GENIAL!',
    'GRACIAS POR TU COMPRA',
    'success'
  )
})