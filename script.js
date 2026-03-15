const productlist = document.getElementById("productList")
const productName = document.getElementById("productName")
const productQuantity = document.getElementById("productQuantity")
const message = document.getElementById("message")
const total = document.getElementById("total")
const finalList = document.getElementById("finalList")
const finalTotal = document.getElementById("finalTotal")

let products = [
    {name: "milk", price: 35},
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

