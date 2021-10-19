const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const productContainer = document.getElementById("productContainer")
const totalPriceContainer = document.getElementById("totalPriceContainer")
const shoppingCartContainer = document.getElementById("shoppingCartContainer")
const filterContainer = document.getElementById("filterContainer")

let shoppingCart = []
let products = []

function getDataFromUrl() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      products = data
      filterFunctionInput()
      renderProductList(products)
    })
}

function isFilterValid(filterOption) {
  if (isNaN(filterOption)) {
    return false
  }
  if (filterOption < 0 || filterOption > 5) {
    return false
  }
  return true
}

function renderProductList(products, filterRankingInput = "") {
  const filteredList = filterProductList(products, filterRankingInput)
  if (filteredList) {
    resetProducts()

    Array.from(filteredList).forEach((productItem) => {
      renderProductItem(productItem)
    })
  }
}

function filterProductList(products, filterRankingInput) {
  // If we dont recieve any input value.
  if (!filterRankingInput) {
    return products
  }

  // If we recieve an input value.
  const filterOption = parseFloat(filterRankingInput.replace(",", "."))
  if (isFilterValid(filterOption)) {
    return products.filter((p) => p.rating >= filterOption)
  }

  // If we recieve an invalid input value
  alert("You entered an invalid filter option")
  return undefined
}

function renderProductItem(productItem) {
  const productWrapper = document.createElement("div")
  productWrapper.append(createName(productItem))
  productWrapper.append(createImage(productItem))
  productWrapper.append(createDescription(productItem))
  productWrapper.append(createPrice(productItem))
  productWrapper.append(createRating(productItem))
  productWrapper.append(createStock(productItem))
  productWrapper.append(createButton(productItem))
  productContainer.append(productWrapper)
}

function createDescription(productItem) {
  const desctription = document.createElement("p")
  desctription.innerText = productItem.description
  return desctription
}

function createButton(productItem) {
  const button = document.createElement("button")
  button.innerText = "Köp"

  button.addEventListener("click", function () {
    createShoppingCartList(productItem)
    createTotalSpent()
  })

  return button
}

function createImage(productItem) {
  const image = document.createElement("img")
  image.src = productItem.images[0].src.small
  image.style.width = "60%"
  image.alt = productItem.images[0].alt

  image.addEventListener("click", function () {
    createShoppingCartList(productItem)
    createTotalSpent()
  })

  return image
}

function createName(productItem) {
  const name = document.createElement("h1")
  name.innerText = productItem.name
  return name
}

function createPrice(productItem) {
  const price = document.createElement("p")
  price.innerText = `Pris: ${productItem.price} kr`
  return price
}

function createRating(productItem) {
  const rating = document.createElement("p")
  rating.innerText = `Ranking: ${productItem.rating}`
  return rating
}

function createStock(productItem) {
  const stock = document.createElement("p")
  stock.innerText = `I lager: ${productItem.stock}`
  return stock
}

function createTotalSpent(sum) {
  totalPriceContainer.innerText = ""
  const totalSpent = document.createElement("h3")
  const line = document.createElement("hr")
  totalSpent.innerText = `Total pris: ${createTotalSum(sum)}kr`

  totalPriceContainer.append(totalSpent)
  totalPriceContainer.append(line)
}

function createTotalSum() {
  let sum = 0
  // for (let i = 0; i < shoppingCart.length; i++) {
  //   sum += shoppingCart[i].price
  // }
  shoppingCart.forEach((s) => (sum += s.price))
  return sum
}

function createShoppingCartList(productItem) {
  const productName = productItem.name
  const productPrice = productItem.price
  shoppingCart.push({ name: `${productName}`, price: productPrice })
  createShoppingCartItem()
}

function createShoppingCartItem() {
  shoppingCartContainer.innerText = ""
  const shoppingCartName = document.createElement("h2")
  shoppingCartName.innerText = "Varukorgen:"
  shoppingCartContainer.append(shoppingCartName)
  const line = document.createElement("hr")

  shoppingCart.forEach((item) => {
    const shoppingCartItem = document.createElement("h3")
    shoppingCartItem.innerText = `${item.name}  -  ${item.price}kr`
    shoppingCartContainer.append(shoppingCartItem)
  })

  shoppingCartContainer.append(line)
}

function filterFunctionInput(filterItem) {
  filterContainer.prepend(createFilterInput(filterItem))
  filterContainer.append(createFilterButton(filterItem))
}

function createFilterInput() {
  const filterInput = document.createElement("input")
  filterInput.placeholder = "Filtrera mellan 1-5"
  filterInput.id = "filterInput"
  return filterInput
}

function createFilterButton() {
  const filterButton = document.createElement("button")
  filterButton.innerText = "Filtrera"

  filterButton.addEventListener("click", function () {
    const filterInputValue = document.getElementById("filterInput").value
    renderProductList(products, filterInputValue)
  })
  return filterButton
}

function resetProducts() {
  productContainer.innerText = ""
}
