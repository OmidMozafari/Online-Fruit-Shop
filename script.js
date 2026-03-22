const productlist = document.getElementById("productList")
const productName = document.getElementById("productName")
const productQuantity = document.getElementById("productQuantity")
const message = document.getElementById("message")
let total = document.getElementById("total")
const finalList = document.getElementById("finalList")
const finalTotalValue = document.getElementById("FinalTotalValue")
const addToCart = document.getElementById("addToCart")
const stopPurchasing = document.getElementById("stopPurchasing")
const small = document.querySelector("#purchasing small")
let currentTotal = 0
const purchaseList = document.getElementById("purchaseList")
const invalidNumberSmall = document.getElementById("invalidNumberError")
let stopPurchasingError = document.getElementById("stopPurchasingError")
let purchaseButtonContainer = document.createElement("div")

let userIcon = document.getElementById("userIcon")

let smallPage = document.getElementById("adminSmallPage")
let adminCode = document.getElementById("adminCode")
let adminPassword = document.getElementById("adminPassword")
let adminSmallPageForm = document.getElementById("adminSmallPage")

let adminCodeSmall = document.getElementById("adminCodeSmall")
let adminPasswordSmall = document.getElementById("adminPasswordSmall")


// show error function
function showProductNameError(){
    small.style.color = "red"
    small.style.visibility = "visible"
}
function showInavlidQuantityError(){
    invalidNumberSmall.style.color = "red"
    invalidNumberSmall.style.visibility = "visible"
}

let products = JSON.parse(localStorage.getItem("products"))

if(!products){
    products = [
        {name: "fig", price: 80},
        {name:"apple", price: 50},   
        {name:"mongo", price: 270},   
        {name:"banana", price: 150},   
        {name:"pear", price: 100},   
        {name:"coconut", price: 350},   
        {name:"melon", price: 50},   
        {name:"peach", price: 70},   
        {name:"strawberry", price: 300},   
        {name:"orange", price: 80},   
    ]

    localStorage.setItem("products", JSON.stringify(products))
}
localStorage.setItem("products", JSON.stringify(products))

let finalProducts = []
for (p of products){
    let upper = p.name.charAt(0).toUpperCase();
    let lower = p.name.slice(1).toLowerCase();
    let finalWord = upper + lower
    p.name = finalWord
    productlist.innerHTML += `
        <li class="productItem">
        <span class="name">${finalWord}</span>
        <span class="price">${p.price}</span>
        <span class="currency">AFN</span>
        </li>`
}


// Adding to cart function
function cartAdding(){
    let totalPrice = 0 


    let choosenProductArray = []

    choosenProduct = productName.value.split(" ");

    for(b of choosenProduct){

        let upperWord = b.charAt(0).toUpperCase()
        let lowerWord = b.slice(1).toLowerCase()
        let finalWord = upperWord + lowerWord

        choosenProductArray.push(finalWord)

    }

    let finalChoosenName = choosenProductArray.join(" ")
    quantity = Number(productQuantity.value)
    
    let found = false
    let moreThanZero = false

    for(c of products){
        if(finalChoosenName === c.name){
            found = true

            if(quantity <= 0){
                showInavlidQuantityError();
            }else{

                invalidNumberSmall.style.visibility = "hidden"
                moreThanZero = true
                totalPrice = c.price * quantity
                currentTotal += totalPrice
                
                total.innerHTML = currentTotal
                purchaseList.innerHTML += `<li> ${finalChoosenName}<span class="pricePurchaseList">${totalPrice}</span></li>`
                // let pricePurchaseList = document.getElementsByClassName("pricePurchaseList")
                // pricePurchaseList[pricePurchaseList.length - 1].innerHTML = totalPrice
                let lastItem = purchaseList.lastElementChild
                
                lastItem.classList.add("highlight")
                
                setTimeout(function(){
                lastItem.classList.remove("highlight")
                }, 800)
            
            productName.value = ""
            productQuantity.value = ""
            }
            
            
        }
    }
    if(!found){
         showProductNameError()

    }else{
        small.style.visibility = "hidden"
    }
}

// function stop purchasing
function stopPurchasingItems(){
    purchaseButtonContainer.setAttribute("id","purchaseButtonContainer" )
    let purchaseNodeList = purchaseList.querySelectorAll("li")
    purchaseNodeList.forEach(element => {
        
        element.setAttribute("class", "finalCartItems")
        
        let btn = document.createElement("button")
        btn.innerText = "❌"
        
        btn.classList.add("removeBtn")

        element.appendChild(btn)
    
        element.classList.add("highlight")

        setTimeout(function(){
                element.classList.remove("highlight")
                }, 800)
        
        finalList.appendChild(element)
        finalList.appendChild(purchaseButtonContainer)
        purchaseButtonContainer.innerHTML = `<button id = "purchaseButton">purchase</button>`
        purchaseButton = document.getElementById("purchaseButton")

        purchaseButton.addEventListener("click", ()=>{
            window.location.href = "paymentPage.html"
        })
        
        
    });
    let previousFinal = Number(finalTotalValue.innerText.split(" ")[0]) || 0
    let newFinal = previousFinal + currentTotal

    
    // finalTotalValue.innerHTML = currentTotal +" "+"AFN"
    finalTotalValue.innerHTML = newFinal + " AFN"
    purchaseList.innerHTML = ""
    currentTotal = 0
    total.innerHTML = 0
    

}
// admin checking function user info icon
function adminPage(){
    
    smallPage.style.visibility = "visible"
    smallPage.style.display = "flex"
    smallPage.style.flexDirection = "column"
}


function adminChecking(){
    let hiddenAdminCode = "Online1"
    let DBadminPassword = "@350350@#"

    let codeValue = adminCode.value
    let passValue = adminPassword.value

    if(codeValue === hiddenAdminCode && passValue === DBadminPassword){
        window.location.href = "addingPage.html"
    }else{
        if(codeValue !== hiddenAdminCode){
            adminCodeSmall.style.display = "block"
        }else{
            adminCodeSmall.style.display = "none"
        }

        if(passValue !== DBadminPassword){
            adminPasswordSmall.style.display = "block"
        }else{
            adminPasswordSmall.style.display = "none"
        }
    }
}


//events section
addToCart.addEventListener("click", cartAdding)

stopPurchasing.addEventListener("click",()=>{
    if(currentTotal <= 0){
        stopPurchasingError.style.color = "red"
        stopPurchasingError.style.visibility = "visible"
        
        setTimeout(() => {
            stopPurchasingError.style.visibility = "hidden"
        }, 2000);
        
    }else{
        stopPurchasingItems()
        stopPurchasingError.style.visibility = "hidden"
    }
} )

finalList.addEventListener("click", function(e){
    if(e.target.classList.contains("removeBtn")){
        const li = e.target.parentElement;
        
        const priceSpan = li.querySelector(".pricePurchaseList");
        
        const itemPrice = Number(priceSpan.innerText); 
        
        currentTotal = Number(finalTotalValue.innerText.split(" ")[0]); // فقط عدد
        currentTotal -= itemPrice;
        
        finalTotalValue.innerText = currentTotal + " AFN";
        
        li.remove();
    }
});

// user icon event section
userIcon.addEventListener("mouseenter", () => {
    smallPage.style.display = "flex"
})

smallPage.addEventListener("mouseleave", () => {
    smallPage.style.display = "none"
})

adminSmallPageForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    adminChecking()
})



