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
  cartNumber();
}

// for incremet or decrement cart number indicator
function cartNumber() {
  let count = document.getElementById("count_product");
  let c = 0;
  cart.forEach((p) => c += p.quantity);
  count.innerHTML = c;
  console.log(c);

}
// Exercise 2
//vaciar array del carrito
function cleanCart() {
  cart = [];
  cleanModal();
};

// Eliminar todos los elementos del modal del carito
function cleanModal() {
  let tbody = document.getElementById("cart_list");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  // Eliminar el total
  let total = document.getElementById("total");
  total.innerHTML = 0;
  //actrualizar el cartNumber
  cartNumber();

}

// Exercise 3
function calculateTotal() {
  applyPromotionsCart(); // aplico los descuentos del ejericio 4
  // Calculate total price of the cart using the "cartList" array
  let totalPrice = 0;
  cart.forEach(product => {
    product.subtotal = (product.price * product.quantity);
    totalPrice += product.subtotalWithDiscount > 0 ? product.subtotalWithDiscount : product.subtotal;
  })
  return totalPrice;
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  //   Si l'usuari/ària compra 3 o més ampolles d'oli, el preu del producte es rebaixa un 20%.
  // Quan es compren 10 o més productes per a fer pastissos, el preu del producte es rebaixa un 30%.
  cart.forEach((product) => {
    if (product.offer) {
      if (product.quantity >= product.offer.number) {
        product.subtotalWithDiscount = (
          (product.price - (
            (product.price * product.offer.percent)
            / 100)) * product.quantity);
      } else {
        product.subtotalWithDiscount = 0;
      }
    }
  })
  return cart;
}

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
    <td><buttom class="btn btn-primary btn-3" onclick="remove(${product.id})">Remove</buttom></td>
    <td>${product.subtotalWithDiscount ? product.subtotalWithDiscount.toFixed(2) : product.subtotal.toFixed(2)}</td>
  `;

    // Agregamos la fila al cuerpo de la tabla
    tbody.appendChild(row);
  })
  // Agregamos el total de la compra a la tabla
  let total = document.getElementById("total");
  total.innerHTML = calculateTotal().toFixed(2) == null ? 0 : calculateTotal().toFixed(2);
}

// ** Nivell II **

// Exercise 7
//remover items, restando de a una unidad hasta tener 0 unidades ahi se elimina del array cart el producto


function remove(id) {
  //busco por id el producto y le resto una unidad
  let p = cart.find(p => p.id == id);
  if (p.quantity > 1) {
    p.quantity = p.quantity - 1;
  } else {
    if (p.quantity === 1) {
      //si hay solo una se elimina el producto
      cart = cart.filter(p => p.id !== id);
    }
  };
  //limpio el modal
  cleanModal();
  // re-renderizo el modal
  open_modal();
  //actrualizar el cartNumber
  cartNumber();
};

function open_modal() {
  calculateTotal();
  printCart();
}
