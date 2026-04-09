document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementsByClassName("grid")[0]

    try {
        const res = await fetch('../JSON/Products.json')
        const data = await res.json()
        const products = data.products

        products.forEach((product) => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
        <button class="like-btn">♡</button>
        <div class="product-img">
            <img src="${product.images[0]}" />
        </div>
        <div class="product-details">
            <p>${product.name}</p>
            <p>Price: ${product.price}</p>
        </div>
        <div class="product-options">
            <button class="buy-btn"> Quick Buy </button>
            <button class="view-btn"> View </button>
        </div>
        <div class="quick-buy-card">
            <div>Quantity:
                <input type="number" value="1" min="1" max="5">
            </div>
            <button class="quick-add-to-cart"> Add to Cart</button>
        </div>`


            const likeBtn = card.querySelector('.like-btn')
            const quickBuyCard = card.querySelector('.quick-buy-card')
            const quickBuyBtn = card.querySelector('.buy-btn')
            const viewBtn = card.querySelector('.view-btn')
            const addToCartBtn = card.querySelector('.quick-add-to-cart')




            likeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
            })


            quickBuyBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                quickBuyCard.classList.add("visible")
            })

            quickBuyCard.addEventListener("mouseleave", () => {
                quickBuyCard.classList.remove("visible")
            })

            quickBuyCard.addEventListener("click", (e) => {
                e.stopPropagation();
            })

            addToCartBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const quantity = card.querySelector('input').value
                console.log(`Added ${quantity} of ${product.name} to cart`)
                quickBuyCard.classList.remove("visible")
            })

            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = `Product.html?id=${product.id}`
            })
            card.addEventListener('click', (e) => {
                window.location.href = `Product.html?id=${product.id}`


            },)

            grid.appendChild(card)
        })
    } catch (err) {
        console.log('failed to load products', err)
    }
})