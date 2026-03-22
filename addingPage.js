const fruitName = document.getElementById("fruitName")
const fruitPrice = document.getElementById("fruitPrice")
const addProduct = document.getElementById("addProduct")
const removeProduct = document.getElementById("removeProduct")
const mainPage = document.getElementById("mainPage")
let products = JSON.parse(localStorage.getItem("products")) || []


// function section

//add to the list function

function productAdding(){

    let fName = fruitName.value
    let fPrice = Number(fruitPrice.value)

    if(fName === "" || fPrice <= 0){
        alert("Enter valid data")
        return
    }


    let found = products.some(p =>
        p.name.toLowerCase() === fName.toLowerCase()
    )

    if(found){
        alert("Product already exists")
        return
    }


    products.push({
        name: fName,
        price: fPrice
    })

    localStorage.setItem("products", JSON.stringify(products))

    alert("Product added successfully")
}

// function remove from the list

function removeProductFunction() {
    let fName = fruitName.value.trim(); 
    if(fName === "") {
        alert("Please enter a product name to remove");
        return;
    }

    const found = products.some(p => p.name.toLowerCase() === fName.toLowerCase());
    if (!found) {
        alert("Product not found in the list");
        return;
    }

    products = products.filter(p => p.name.toLowerCase() !== fName.toLowerCase());

    localStorage.setItem("products", JSON.stringify(products));

    alert(`Product "${fName}" removed successfully`);
}

// event section 

addProduct.addEventListener("click", productAdding)

removeProduct.addEventListener("click",removeProductFunction )

mainPage.addEventListener("click", ()=>{
    window.location.href = "index.html"
})