// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];
var total = 0;
// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array

  if (cart.length === 0) {
    //carro vacío
    products.forEach((product) => {
      if (product.id === id) {
        product.quantity = 1;
        cart.push(product);
      }
    });
    // console.log("carro vacio");
    // console.log(cart);
  } else {
    //carro con productos
    cart.forEach((p) => {
      if (p.id === id) {
        p.quantity = p.quantity + 1;
        // console.log("mismo producto");
        // console.log(cart);
      } else {
        products.forEach((product) => {
          if (product.id === id) {
            product.quantity = 1;
            cart.push(product);
            // console.log("distinto producto");
            // console.log(cart);
          }
        });
      }
    });
  }
  console.log(cart)
  console.log(calculateTotal())
}
// Exercise 2
function cleanCart() {
    cart = [];
    let tbody = document.getElementById("cart_list");    
// Eliminar todos los elementos del tbody
while (tbody.firstChild) {
  tbody.removeChild(tbody.firstChild);
}
// Eliminar el total
let total=document.getElementById("total_price");
total.innerHTML = 0;
}
// Exercise 3
function calculateTotal() {
    applyPromotionsCart(); // aplico los descuentos del ejericio 4
    // Calculate total price of the cart using the "cartList" array
let totalPrice = 0;
cart.forEach( product => {
    product.subtotal = (product.price * product.quantity);
    totalPrice += product.subtotalWithDiscount ? product.subtotalWithDiscount : product.subtotal;
})
return totalPrice;
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
//   Si l'usuari/ària compra 3 o més ampolles d'oli, el preu del producte es rebaixa un 20%.
// Quan es compren 10 o més productes per a fer pastissos, el preu del producte es rebaixa un 30%.
cart.forEach((product) => {
    if(product.offer){
    if (product.quantity >= product.offer.number){
        product.subtotalWithDiscount = (
            (product.price - (
                (product.price * product.offer.percent)
                 / 100)) * product.quantity);
    }
} 
})
return cart;}

// Exercise 5
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom				

cart.forEach((product) => {
    
    // Creamos una nueva fila
    let row = document.createElement("tr");
    // Referenciamos la tabla
  let tbody = document.getElementById("cart_list");
  // Insertamos las celdas con los datos del producto
  row.innerHTML = `
    <th scope="row">${product.name}</th>        
    <td>${product.price}</td>
    <td>${product.quantity}</td>
    <td>${product.subtotalWithDiscount ? product.subtotalWithDiscount.toFixed(2) : product.subtotal.toFixed(2)}</td>
  `;

  // Agregamos la fila al cuerpo de la tabla
  tbody.appendChild(row);
  })
  // Agregamos el total de la compra a la tabla
  let total = document.getElementById("total_price");
  total.innerHTML = calculateTotal().toFixed(2);
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {}

function open_modal() {
  printCart();
}
