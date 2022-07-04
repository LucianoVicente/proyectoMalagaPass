
//ARRAY CARRITO 
let carrito;

if (localStorage.getItem("carrito") !=null){

    carrito = JSON.parse(localStorage.getItem("carrito"));
let offCanvasHeader = document.getElementById("offcanvasTopLabel");
    offCanvasHeader.innerHTML = `Tu carrito de compras actual:`;

    renderizarProductos();
}else{

carrito = [];
let offCanvasHeader = document.getElementById("offcanvasTopLabel");
    offCanvasHeader.innerHTML = `Tu carrito de compras está vacío`;
}

//Array cards primera seccion 

const promociones =[

    {   
        img: "./img/5.png",
        descripcion:"Un ahorro increíble",
    },

    {   
        img: "./img/4.png",
        descripcion:"Hasta 10 atracciones y actividades incluidas",
    },

    {   
        img: "./img/2.png",
        descripcion:"Un pase digital para entrar fácilmente",
    },

    {   
        img: "./img/1.png",
        descripcion:"Flexibilidad para decidir sobre la marcha",
    },

    {   
        img: "./img/3.png",
        descripcion:"Garantía de devolución del dinero",
    },


];

//LO MOSTRAMOS EN EL HTML

function imprimirEnHTML (promociones) {
    
    let contenedorPromociones=document.getElementById("cardss");

    //recorremos array y creamos cards

    for (const promocion of promociones) {
        
        //creo el contenedor individual para cada card

        let card = document.createElement("div");

        //agregamos el contenido a la card

        card.innerHTML = `
    
        <div class="card border-0 d-flex flex-column align-items-center carta-promociones" style="width: 12rem;">
            <img src="${promocion.img}" class="card-img-top img-fluid w-50 h-50" alt="...">
            <div class="card-body">
                <p class="card-text text-center">${promocion.descripcion}</p>
            </div>
        </div>
      `;

      contenedorPromociones.appendChild(card);
    }

}

imprimirEnHTML(promociones);

//ARRAY DE ACTIVIDADES 

const actividades=[

    {   
        id:1,
        nombre:"Sunviewpark",
        precio:26,
        img: "./img/sunviewpark.png",
        boton: "Seleccionar",
        id2:1,
    },

    {   
        id:2,
        nombre:"Alcazaba",
        precio:15,
        img: "./img/alcazaba.png",
        boton: "Seleccionar",
        id2:2,
    },

    {   
        id:3,
        nombre:"Caminito del Rey",
        precio:20,
        img: "./img/caminito.png",
        boton: "Seleccionar",
        id2:3,
    },

    {   
        id:4,
        nombre:"Museo Picasso",
        precio:6,
        img: "./img/museo.png",
        boton: "Seleccionar",
        id2:4,
    },

    {   id:5,
        nombre:"Catedral de Málaga",
        precio:5,
        img: "./img/catedral.png",
        boton: "Seleccionar",
        id2:5,
    },

    {   id:6,
        nombre:"Teatro Romano",
        precio:10,
        img: "./img/teatro.png",
        boton: "Seleccionar",
        id2:6,
    },

    {   id:7,
        nombre:"Aqualand",
        precio:26,
        img: "./img/aqualand.png",
        boton: "Seleccionar",
        id2:7,
    },

    {   id:8,
        nombre:"Teleférico Benalmádena",
        precio:25,
        img: "./img/teleferico.png",
        boton: "Seleccionar",
        id2:8,
    },

    {   id:9,
        nombre:"Ronda",
        precio:32,
        img: "./img/ronda.png",
        boton: "Seleccionar",
        id2:9,
    },

    {   id:10,
        nombre:"Bioparc",
        precio:18,
        img: "./img/bioparc.png",
        boton: "Seleccionar",
        id2:10,
    },

];

//CARDS ACTIVIDADES 

function imprimirActividades(actividades) {
    
    let contenedorActividades=document.getElementById("cards-actividades");

    for (const actividad of actividades) {

        let cardActividades = document.createElement("div");

        cardActividades.innerHTML = `
        
                    <div class="card border-0 d-flex flex-column align-items-center" style="width: 15rem;">
                        <img src="${actividad.img}" class="card-img-top carta-actividades-foto w-75 h-75" alt="...">
                        <div class="card-body carta-actividades d-flex flex-column align-items-center">
                            <h5 class="card-title fs-6">${actividad.nombre}</h5>
                            <p class="card-text">${actividad.precio}€</p>
                            <a href="#" class="btn btn-primary" id="btn${actividad.id}">${actividad.boton}</a>
                        </div>
                    </div>
        `;

        contenedorActividades.appendChild(cardActividades);

    }

}

imprimirActividades(actividades);

//OWL CAROUSEL

$('.owl-carousel').owlCarousel({
    loop:false,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

// EVENTOS
    
for (const actividad of actividades) {

let boton = document.getElementById(`btn${actividad.id}`);

boton.onmouseover =()=> {

    boton.className= "btn btn-secondary";
}

boton.onmouseout =()=> {

    boton.className= "btn btn-primary";
}

boton.addEventListener('click', function() {
    agregarAlCarrito(actividad);
});

boton.addEventListener('click', function() {
    renderizarProductos();
});

}

let botonComprar = document.getElementById ('boton-comprarr');
botonComprar.addEventListener('click', function() {
    cierreCompra();

})

//RENDERIZAR PRODUCTOS

function renderizarProductos() {

    let offCanvasBody = document.getElementById("tabla-body");

    for (const carri of carrito) {

    offCanvasBody.innerHTML += (
    `<tr id='fila${carri.id}'>
    <td> ${carri.nombre} </td>
    <td> ${carri.precio}€ </td>
    <td> ${carri.id} </td>
    <td> <i class="fa-solid fa-trash" onclick="eliminar(${carri.id})"></i></td>`)
    }  
    
}

//FUNCION PUSH ACTIVIDADES SELECCIONADAS AL CARRITO 

function agregarAlCarrito(actividadNueva) {
carrito.push(actividadNueva);
Swal.fire(
    `La actividad ${actividadNueva.nombre}`,
    'Ha sido añadida al carrito',
    'success'
  )
console.log(carrito);
localStorage.setItem("carrito",JSON.stringify(carrito));
calcularPrecio();


}

//SUMA PRECIOS TOTALES 

function calcularPrecio (){

const precioTotal = carrito.reduce((acumulador, actividadNueva) => acumulador + actividadNueva.precio, 0) 
console.log(precioTotal);

let mostrarPrecio = document.getElementById ('precio-total');
mostrarPrecio.innerHTML = `<tr>
<td class="fw-bold"> Precio Final</td>
<td class="fw-bold"> ${precioTotal}€ </td>`
}

calcularPrecio();


//OPERADOR TERNARIO

carrito.length <= 5 ? precioTotal  === precioTotal : precioTotal = precioTotal*0.85;

//FUNCION ELIMINAR PRODUCTO DEL CARRITO 

function eliminar(id) {

    let indice= carrito.findIndex(item => item.id==id);
    carrito.splice(indice, 1);
    let fila=document.getElementById (`fila${id}`)
    document.getElementById('tabla-body').removeChild(fila)
    localStorage.setItem("carrito",JSON.stringify(carrito));
    calcularPrecio();
   
}



function cierreCompra () {

   if (carrito.length <= 0) {
    Swal.fire(
        'Error!',
        'Debes seleccionar al menos un producto.',
        'error'
      );
   }

   else {
    Swal.fire({
        title: 'Indícanos los datos de tu pedido',
        html:
    '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
    '<input id="swal-input2" class="swal2-input" placeholder="E-mail">'+
    '<input id="swal-input2" class="swal2-input" placeholder="Teléfono">'+
    '<input id="swal-input2" class="swal2-input" placeholder="Dirección">',
        
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Comprar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Error: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Gracias por tu compra!',
                'Estamos preparando tu pedido.',
                'success'
              );
        }
      })
   }
      
}





