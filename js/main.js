var itemProduct = document.getElementById("itemProduct");
var lightContainerItem = document.getElementById("lightContainerItem");
var lightBoxItem = document.getElementById("lightBoxItem");
var cartItem = document.getElementById("cartItem");
var allProducts = [];
async function getProducts(url) {
  const response = await fetch(`${url}`);
  const finalResult = await response.json();
  allProducts = finalResult;
  showProducts();
}
getProducts('https://fakestoreapi.com/products')
function showProducts() {
  for (var i = 0; i < allProducts.length; i++) {
    itemProduct.innerHTML += ` <div class="col-md-3 p-3 my-2 hover-item " >
    <div class="productDetails  p-4  d-flex flex-column justify-content-center align-items-center p-4 " onclick="getDetails(${allProducts[i].id})">
    <img src="${allProducts[i].image}" alt=""  class="img-product py-2 "/>
      <h6 class="text-center py-4">${allProducts[i].title}</h6>
      <h4 class="text-indent py-1">Price $ : <span class="text-info">${allProducts[i].price}</span> </h4>
    </div>
    <button class="btn btn-warning py-2 w-100" onclick="addToCart(${allProducts[i].id})">Add To Cart</button>
  </div>`;
  }
  document.getElementById("cartCount").innerHTML = JSON.parse(cartCount);
}
async function getDetails(details) {
  const response = await fetch(`https://fakestoreapi.com/products/${details}`);
  const finalResult = await response.json();
  console.log(finalResult)
  lightContainerItem.style.visibility = "visible";
  lightContainerItem.style.zIndex = "999";
  lightBoxItem.innerHTML = `  <div class="container-fluid position-relative">
  <i class="fa-solid fa-square-xmark fa-3x position-absolute top-0 end-0 me-3 mt-2"
  onclick="closelightBoxItem()"></i>
  <div class = " w-100 h-100  d-flex justify-content-center align-items-center px-3">
    <div class="col-md-7 d-flex flex-column justify-content-center align-items-center ms-2 overflow-hidden ">
      <h3 class="text-center fw-bolder py-2"> ${finalResult.title}</h3>
      <h5 class="text-center fw-bolder text-white-25  py-2">${finalResult.category}</h5>
      <p class="text-black text-indent py-2 lh-lg">${finalResult.description}</p>
  <div class="d-flex justify-content-evenly w-75 my-2">
  <div class="rating">${generateStarRating(finalResult.rating.rate)}</div>
  <h4 class="text-center">Price $ : <span class="text-info">${finalResult.price}</span> </h4>
  </div>
    </div>
    <div class="col-md-5 ms-3 d-flex justify-content-center ">
    <img src="${finalResult.image}" alt="" class="w-75">
  </div>
  </div>
</div>`;
}
function closelightBoxItem() {
  lightContainerItem.style.visibility = "hidden";
}

function getElectronics() {
  itemProduct.innerHTML = "";
  getProducts("https://fakestoreapi.com/products/category/electronics");
}
function getClothes(clothesType) {
  itemProduct.innerHTML = "";
  getProducts(`https://fakestoreapi.com/products/category/${clothesType}`);
}
function removeElements() {
  itemProduct.innerHTML = "";
}

function generateStarRating(numberOfRatings) {

  const maxRating = 5;

  const fullStar = '<i class="fas fa-star text-warning my-2"></i>';

  const emptyStar = '<i class="far fa-star"></i>';

  let starsHTML = '';

  const fullStars = Math.floor(numberOfRatings);

  const emptyStars = maxRating - fullStars;

  for (let i = 0; i < fullStars; i++) {

    starsHTML += fullStar;

  }

  for (let i = 0; i < emptyStars; i++) {

    starsHTML += emptyStar;

  }
  return starsHTML;
}
async function getCart(details) {
  const response = await fetch(`https://fakestoreapi.com/products/${details}`);
  const finalResult = await response.json();
  console.log(finalResult)
  cartItem.innerHTML += `  <div class="container-fluid position-relative">
  <i class="fa-solid fa-square-xmark fa-3x position-absolute top-0 end-0 me-1 mt-1"
  onclick="closelightBoxItem()"></i>
  <div class = " w-100 h-100  d-flex justify-content-center align-items-center px-3">
    <div class="col-md-7 d-flex flex-column justify-content-center align-items-center ms-2 ">
      <h3 class="text-center fw-bolder py-2"> ${finalResult.title}</h3>
      <h5 class="text-center fw-bolder text-white-25  py-2">${finalResult.category}</h5>
      <p class="text-black text-indent py-2 lh-lg">${finalResult.description}</p>
  <div class="d-flex justify-content-evenly w-75 my-2">
  <div class="rating">${generateStarRating(finalResult.rating.rate)}</div>
  <h4 class="text-center">Price $ : <span class="text-info">${finalResult.price}</span> </h4>
  </div>
    </div>
    <div class="col-md-5 ms-3 d-flex justify-content-center ">
    <img src="${finalResult.image}" alt="" class="w-50">
  </div>
  </div>
</div>`;
}

// add to cart
var cartCount = 0;
var cartProducts = []
if (localStorage.getItem("cartProducts") == null) {
  var cartProducts = [];
}
else {
  var cartProducts = JSON.parse(localStorage.getItem("cartProducts"))
}
if (localStorage.getItem("cartCount") == null) {
  var cartCount = 0;
}
else {
  var cartCount = JSON.parse(localStorage.getItem("cartCount"))
}
function addToCart(productId) {
  var product = allProducts.find(function (item) {
    return item.id === productId;
  });
  if (product) {
    cartProducts.push(product);
    cartCount++;
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
    localStorage.setItem("cartCount", JSON.stringify(cartCount))
    console.log(JSON.parse(localStorage.getItem("cartProducts")))
    console.log(cartProducts);
    updateCartCount();
  }
}
function updateCartCount() {
  document.getElementById("cartCount").innerHTML = JSON.parse(cartCount);
}
function searchIn() {
  let searchValue = document.getElementById("searchInput").value
  let foundResultTitle = allProducts.filter(function (obj) { return obj.title.toLowerCase().includes(searchValue) })
  let foundResultDescription = allProducts.filter(function (obj) { return obj.description.toLowerCase().includes(searchValue) })
  let foundResultArr = [...foundResultTitle, ...foundResultDescription]
  foundResult = foundResultArr.filter((item, index) => foundResultArr.indexOf(item) === index);
  itemProduct.innerHTML = ""
  for (var i = 0; i < foundResult.length; i++) {
    itemProduct.innerHTML += ` <div class="col-md-3 p-3 my-2 hover-item " >
        <div class="productDetails  p-4  d-flex flex-column justify-content-center align-items-center p-4 " onclick="getDetails(${foundResult[i].id})">
        <img src="${foundResult[i].image}" alt=""  class="img-product py-2 "/>
          <h6 class="text-center py-4">${foundResult[i].title}</h6>
          <h4 class="text-indent py-1">Price $ : <span class="text-info">${foundResult[i].price}</span> </h4>
        </div>
        <button class="btn btn-warning py-2 w-100" onclick="getCart(${foundResult[i].id})">Add To Cart</button>
      </div>`;
  }
} function backToTopy() {
  location.href = "#top";
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
  localStorage.removeItem("cartCount")
  cartCount=0
  updateCartCount()
}