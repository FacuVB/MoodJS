//==========CONSTANTES Y VARIABLES==========//

const Clickbutton = document.querySelectorAll('.boton')
const tbody = document.querySelector('.tbody')
let carrito = []


//==========FUNCIONES Y EVENTOS=============//

//Evento click comprar
Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})

//Crea una nueva instancia item por cada vez que se ejecuta el eveto click de arriba
function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemTitle2 = item.querySelector(".card-title2").textContent;
  const itemPrice = item.querySelector('.price').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    title2: itemTitle2,
    price: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}

//Agregar nuevo item al carrito

function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('inputElemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


//Renderizar carrito

function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <td class="tableProducto">
        <img src=${item.img} alt="" />
    </td>
    <td>
        <h5 class="title">${item.title}</h5>
        <h6 class="artist">${item.title2}</h6>
    </td>
    <td class="tablePrecio"> ${item.price}</td>
    <td class="tableCantidad">
        <input type="number" min="1" value=${item.cantidad} class="inputElemento"
    </td>
    <td>
        <button class="delete btn btn-danger">X</button>
    </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".inputElemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}


//Calculo del total

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.price.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}


//Remomer item del carrito

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

//AUMENTAR O DISMINUIR CATIDAD DE ITEMS DESDE EL CARRITO

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

//Guardar carrito en localStorage

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}


//Verificar si existe un carrito en localStorage

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

//Buscador

$(document).ready(function(){
  $(".btn-menu").click(function(){
    let filtro = $(this).attr("data-filter");
    if (filtro == "todos"){
      $(".card").show(500);
    }else{
      $(".card").not("."+ filtro).hide(500);
      $(".card").filter("."+filtro).show(500);
    }
  })
});

