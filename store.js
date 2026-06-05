/* ========================
   GLOBAL DATA
======================== */
let cart = [];
let wishlist = [];

/* ========================
   CART FUNCTIONS (OLD)
======================== */
function addToCart(n, p) {
  cart.push({ n, p });
  alert("Added to cart");
  updateCartCount();
}

function openCart() {
  let box = document.getElementById("cartItems");

  if (!box) return;

  if (cart.length === 0) {
    box.innerHTML = "Cart Empty";
  } else {
    let total = 0;

    box.innerHTML = cart.map((i, index) => {
      total += Number(i.p || 0);

      return `
        <p>
          ${i.n} – $${i.p}
          <button onclick="removeReal(${index})">❌</button>
        </p>`;
    }).join("");

    box.innerHTML += `<hr><b>Total: $${total}</b>`;
  }

  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* ========================
   WISHLIST FUNCTIONS
======================== */
function addToWish(n) {
  wishlist.push(n);
  alert("Added to wishlist");
  updateCartCount();
}

function openWishlist() {
  document.getElementById("wishItems").innerHTML =
    wishlist.join("<br>") || "Empty";

  document.getElementById("wishModal").style.display = "flex";
}

function closeWish() {
  document.getElementById("wishModal").style.display = "none";
}

/* ========================
   REAL CART STORAGE
======================== */

if(localStorage.getItem("realCart")){
  cart = JSON.parse(localStorage.getItem("realCart"));
}

function removeReal(i){
  cart.splice(i,1);
  localStorage.setItem("realCart", JSON.stringify(cart));
  openCart();
  updateCartCount();
}

function updateCartCount(){
  let c = document.getElementById("cartCount");
  let w = document.getElementById("wishCount");

  if(c) c.innerText = cart.length;
  if(w) w.innerText = wishlist.length;
}

/* ========================
   GO TO PAYMENT
======================== */
function goToPayment(){
  window.location = "payment.html";
}

/* ========================
   SEARCH FILTER
======================== */
function searchProducts(id){

 let text = document.getElementById(id).value.toLowerCase();

 document.querySelectorAll(".product-card").forEach(c=>{

   let name = c.innerText.toLowerCase();

   c.style.display =
     name.includes(text) ? "block" : "none";

 });

}

/* ========================
   AVATAR CHAT (YOUR SAME)
======================== */
function askAvatar() {
  const input = document.getElementById("avatarInput");
  const msgBox = document.getElementById("avatarMessages");
  const text = input.value.toLowerCase();

  if (!text) return;

  msgBox.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;

  let reply = getShopReply(text);

  msgBox.innerHTML += `<p><strong>Shopkeeper:</strong> ${reply}</p>`;

  speak(reply);

  input.value = "";
}

function getShopReply(text) {
  if (text.includes("dress"))
    return "Yes! We have beautiful dresses in women's wear section.";

  if (text.includes("men"))
    return "Sure! Check out our Men's Wear category.";

  return "Sorry, I didn’t understand.";
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}

/* ========================
   LOAD
======================== */
window.addEventListener("load", updateCartCount);

