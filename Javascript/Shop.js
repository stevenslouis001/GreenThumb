document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementsByClassName("grid")[0]

    for (let index = 0; index < 15; index++) {
        grid.innerHTML += `
    
        <div class="card">
        <button class="like-btn">♡</button>
        <div class="product-img">
            <img src="../IMGS/plant.jpg" alt="plant1" />
        </div>
        <div class="product-details">
            <p>Plant Name</p>
            <p>Price: $30</p>
        </div>
        <div class="product-options">
            <button class="buy-btn"> Quick Buy </button>
            <button> View </button>
        </div>
        <div class="quick-buy-card">
            <div>Quantity:
                <input type="number" value="1">
            </div>
            <button class = "quick-add-to-cart"> Add to Cart</button>
        </div>
    </div>`        
    }





    const buttons = document.querySelectorAll(".buy-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Quick Buy clicked for card!");
            const card = btn.closest(".card");

            const quickBuy = card.querySelector('.quick-buy-card');
            const addToCartBtn = card.querySelector('.quick-add-to-cart')

            quickBuy.classList.add("visible");

            quickBuy.addEventListener("mouseleave", () => {
                quickBuy.classList.remove("visible");
            }, { once: true }); 

            addToCartBtn.addEventListener("click", () => {
                quickBuy.classList.remove("visible");
            }, { once: true }); 

        });
    });
});