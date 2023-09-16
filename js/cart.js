var sum = 0;
var cartProducts = [];
if (localStorage.getItem("cartProducts") == null) {
  var cartProducts = [];
}
else {
  var cartProducts = JSON.parse(localStorage.getItem("cartProducts"))
}
function showItems() {
  var productDetails = "";
  for (var i = 0; i < cartProducts.length; i++) {
    productDetails += `
    <div class="media p-4 d-flex mb-3">
            <img src="${cartProducts[i].image}" class="me-3" style="width:20%" alt="...">
            <div>
                <div class="media-body ms-5">
                    <h4 class="fw-bolder">Price $ : <span class="text-info">${cartProducts[i].price}</h4>
                    <p class="lh-lg  text-black">${cartProducts[i].description}</p>
                    <div class="media-body-content">
                        <p class="fw-bold">Title :</p>
                        <p class="px-1 text-black fw-bolder">${cartProducts[i].title}</p>
                    </div>
                    <div class="media-body-content">
                        <p class="fw-bold">Category :</p>
                        <p class="px-1 text-black fw-bolder">${cartProducts[i].category}</p>
                    </div>
                    <div class="media-body-links">
                        <a class="btn btn-warning link-delete p-3" onclick="deleteItem(${i})">delete</a>
                    </div>
                </div>
            </div>
    </div>
    `;
  }
  document.getElementById("cartItemDetails").innerHTML = productDetails;
  document.getElementById("totalPrice").innerHTML = sum.toFixed(2);
}
function sumPrice() {
  if (Array.isArray(cartProducts)) {
    cartProducts.forEach(item => sum += item.price);
  }
  else {
    sum = cartProducts.price
  }
}
sumPrice()
var currentCartCount = JSON.parse(localStorage.getItem("cartCount"));
document.getElementById("cartCount").innerHTML = currentCartCount;
function deleteItem(index) {
  var deleted= cartProducts.splice(index, 1);
  console.log(deleted[0].price)
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
  currentCartCount--
  localStorage.setItem("cartCount", JSON.stringify(currentCartCount))
  document.getElementById("cartCount").innerHTML = currentCartCount;
  sum-=deleted[0].price
  showItems()
}
showItems();
function backToTopy(){
  location.href="#top"
}
function showLogOut() {
  var isLogIn = JSON.parse(localStorage.getItem("isLogIn"))
  if (isLogIn == true) {
    document.getElementById("logOutBtn").classList.remove("d-none")
    document.getElementById("logBtn").classList.add("d-none")
  }
}
showLogOut()

 function logOut() {
  localStorage.removeItem("isLogIn")
  document.getElementById("logBtn").classList.remove("d-none")
  document.getElementById("logOutBtn").classList.add("d-none")
  localStorage.removeItem("cartProducts")
  currentCartCount=0
  localStorage.setItem("cartCount", JSON.stringify(currentCartCount))
}