const WHATSAPP_NUMBER = "919038614052"; // Change this if your A1 MART WhatsApp number is different.

const products = [
  {code:"A1001", name:"Multipurpose Kitchen Organizer", price:299, cat:"Home & Kitchen", icon:"🧺"},
  {code:"A1002", name:"Handy Storage Box", price:249, cat:"Home & Kitchen", icon:"📦"},
  {code:"A1003", name:"Cleaning Brush Set", price:199, cat:"Home & Kitchen", icon:"🧹"},
  {code:"A1004", name:"Reusable Water Bottle", price:249, cat:"Daily Use", icon:"🧴"},
  {code:"A1005", name:"Daily Utility Basket", price:229, cat:"Daily Use", icon:"🛍️"},
  {code:"A1006", name:"Home Cleaning Gloves", price:149, cat:"Home & Kitchen", icon:"🧤"},
  {code:"A1007", name:"Foldable Shopping Bag", price:129, cat:"Daily Use", icon:"👜"},
  {code:"A1008", name:"Decorative Plant Pot", price:199, cat:"Home & Kitchen", icon:"🪴"}
];

let cart = [];

function money(n){ return "₹" + n.toLocaleString("en-IN"); }

function renderProducts(list=products){
  const grid=document.getElementById("productGrid");
  grid.innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <div class="product-code">ITEM CODE: ${p.code}</div>
        <h3>${p.name}</h3>
        <div class="product-cat">${p.cat}</div>
        <div class="price">${money(p.price)}</div>
        <button class="add" onclick="addToCart('${p.code}')">Add to Cart</button>
      </div>
    </article>`).join("");
}

function filterProducts(cat){
  document.getElementById("categoryFilter").value=cat;
  renderProducts(cat==="All" ? products : products.filter(p=>p.cat===cat));
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

function addToCart(code){
  const p=products.find(x=>x.code===code);
  const item=cart.find(x=>x.code===code);
  if(item) item.qty++;
  else cart.push({...p,qty:1});
  updateCart();
}

function removeFromCart(code){
  cart=cart.filter(x=>x.code!==code);
  updateCart();
}

function updateCart(){
  const count = cart.reduce((a,x)=>a+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  const mobileCount=document.getElementById("cartCountMobile");
  if(mobileCount) mobileCount.textContent=count;
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.</div>';document.getElementById("cartTotal").textContent="₹0";return;}
  box.innerHTML=cart.map(x=>`
    <div class="cart-row">
      <div><b>${x.name}</b><br><small>${x.code} × ${x.qty}</small></div>
      <div><b>${money(x.price*x.qty)}</b><br><button class="remove" onclick="removeFromCart('${x.code}')">Remove</button></div>
    </div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}

function openCart(){document.getElementById("cartModal").classList.add("show");updateCart();}
function closeCart(e){if(!e || e.target.id==="cartModal")document.getElementById("cartModal").classList.remove("show");}

function orderOnWhatsApp(){
  if(!cart.length){alert("Please add a product first.");return;}
  let msg="Hello A1 MART! I want to place an order:%0A%0A";
  cart.forEach(x=>msg+=`• ${x.name} (${x.code}) × ${x.qty} = ${money(x.price*x.qty)}%0A`);
  const total=cart.reduce((a,x)=>a+x.price*x.qty,0);
  msg+=`%0A*Total: ${money(total)}*%0A%0AName:%0AAddress:%0APhone:`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,"_blank");
}

renderProducts();
updateCart();
