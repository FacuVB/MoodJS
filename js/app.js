//==========================IMPORTS==========================//

import baseDeDatos from "./musicDB.js";

//==================CONSTANTES Y VARIABLES==================//
const domItems = document.querySelector('.galeria');
const tbody = document.querySelector('.tbody')
let carrito = []
const btnPagar = document.querySelector('#pagar')
const d = document,
$form = d.getElementById('song-search'),
$error = d.querySelector('.error'),
$artist = d.querySelector('.artist'),
$song = d.querySelector('.song');
const btnSwitch = document.querySelector('#switch')
const body = document.querySelector('body')
const tableDark = document.querySelector('#tableDark')
const totalDark = document.querySelector('#tableTotalDark')
const headDark = document.querySelector('#headTableDark')
const infoDark = document.querySelector('#infoDark')
const lyricsDark = document.querySelector('#lyricsDark')

//========================FUNCIONES========================//

//RENDERIZAR LISTA DE PRODUCTOS

function renderizarProductos() {
  baseDeDatos.forEach((info) => {

      // Estructura
      const miNodo = document.createElement('div');
      miNodo.classList.add('box-img');
      miNodo.classList.add( info.genre)
      miNodo.style.width = "18rem";
      miNodo.style.marginRight = "2rem";
      miNodo.style.marginBottom = "2rem";
      miNodo.style.borderRadius = "10px"

      // Body
      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-block');
      miNodoCardBody.style.background = "#b69cd1";
      miNodoCardBody.style.color = "#ffff"
      

      // Titulo
      const miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = info.album;

      const miNodoTitle2 = document.createElement('h6');
      miNodoTitle2.classList.add('card-title2');
      miNodoTitle2.textContent = info.artist;

      // Imagen
      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', info.img);

      // Precio
      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text', 'price');
      miNodoPrecio.textContent = '$' + info.price;

      // Boton 
      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn');
      miNodoBoton.classList.add('boton');
      miNodoBoton.style.backgroundColor = "#422f75";
      miNodoBoton.style.color = "#fffff";
      miNodoBoton.textContent = "Comprar";
      miNodoBoton.style.position = "relative";
      miNodoBoton.style.bottom = "5px"
      miNodoBoton.addEventListener('click', addToCarritoItem);
      
      
   
      // Insertamos cada parte del elemento card
      
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoTitle2)
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      domItems.appendChild(miNodo);
  });
}



//Crea una nueva instancia item por cada vez que se ejecuta el eveto click de arriba
function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.box-img')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemTitle2 = item.querySelector(".card-title2").textContent;
  const itemPrice = item.querySelector('.price').textContent;
  const itemImg = item.querySelector('.img-fluid').src;
  
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


btnPagar.addEventListener('click', () => {
  carrito = []
  renderCarrito()
  Swal.fire({
  icon: 'success',
    title: 'GRACIAS POR TU COMPRA!!!',
     width: 600,
padding: '3em',
background: 'url(../img/gradient.png)',
backdrop: `
  rgba(0,0,123,0.4)
  left top
  no-repeat
`,
customClass: {
    title: 'custom-title-class',
  }
  })
  
})

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

(function(){
	$(document).ready(function(){
		$(".btn-menu").click(function(e){
			e.preventDefault();
			var filtro = $(this).attr("data-filter");

			if (filtro == "todos") {
				$(".box-img").show(500);
			} else {
				$(".box-img").not("."+filtro).hide(500);
				$(".box-img").filter("."+filtro).show(500);
			}
		});

		$("ul li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
	});
}())


$form.addEventListener("submit", async e => {
  e.preventDefault();

  try {
    let artist = e.target.artist.value.toLowerCase(),
    song = e.target.song.value.toLowerCase(),
    $artistTemplate = "",
    $songTemplate = ``,
    artistAPI = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`, 
    songAPI = `https://api.lyrics.ovh/v1/${artist}/${song}`,
    artistFetch = fetch(artistAPI),
    songFetch = fetch(songAPI),
    [artistRes, songRes]=await Promise.all([artistFetch, songFetch]),
    artistData = await artistRes.json(),
    songData = await songRes.json();


     if(artistData.artists === null){
      $artistTemplate = `<h2> No se encontro ${artist}</h2>`
    }else{
      let artist = artistData.artists[0];
      $artistTemplate = `
      <h2 class="artistName">${artist.strArtist}</h2>
					<img class="info" src="${artist.strArtistFanart2}"alt="${artist.strArtist}">
					<b>Members</b>
					<p>${artist.intMembers}</p>
					<b>Country</b>
					<p>${artist.strCountry}</p>
					<b>Genre</b>
					<p>${artist.strGenre}</p>
          <b>Biography</b>
					<p>${artist.strBiographyEN}${artist.strBiographyES}</p>
					<b>Website :</b>
					<a href="http://${artist.strWebsite}" target="_blank"> IR</a>
      `
    }

    if(songData.error){
      $songTemplate =  `<h2> No se encontro ${artist}</h2>`
    }else{
      $songTemplate = `
      <h2>${song}</h2>
      <blockquote>${songData.lyrics}</blockquote>
      `;

    }

    $artist.innerHTML = $artistTemplate
    $song.innerHTML = $songTemplate

  } catch (error) {
    console.log(error);
    let message = error.statusText || "Ocurrio un error";
    $error.innerHTML = `<p> Error ${error.status}: ${message}`;
  }
})

//NIGHT MODE

btnSwitch.addEventListener('click', () => {
  body.classList.toggle('dark');
  tableDark.classList.toggle('table-dark')
  totalDark.classList.toggle('text-white')
  headDark.classList.toggle('text-white')
  infoDark.classList.toggle('text-white')
  lyricsDark.classList.toggle('text-white')
  btnSwitch.classList.toggle('active')
})

renderizarProductos()