let submiButton = document.getElementById("submiButton")
let mainPageButton = document.getElementById("mainPageButton")

// submit button of the payment page
submiButton.addEventListener("click", (e)=>{
    e.preventDefault();
    alert("Thanks for purchasing 😊. But it is just a training project not a real one")

})
mainPageButton.addEventListener("click", ()=>{
    window.location.href = "index.html"
})