fetch('../JSON/Products.json')
    .then(res => res.json())
    .then(data => {


        const products = data.products

        const params = new URLSearchParams(window.location.search)
        const id = Number(params.get('id'))


        const addToCartBtn = document.querySelector('.quick-add-to-cart')



        const product = products.find(product => product.id === id)



        const quantity = document.getElementById('item-quantity')
        addToCartBtn.innerText = `Add to Cart ($${(quantity.value * product.price)})`

        quantity.addEventListener("change", () => {
            addToCartBtn.innerText = `Add to Cart ($${(quantity.value * product.price)})`
        })


        const reviews = document.querySelector('.product-reviews')
        const stars = document.createElement("div");
        stars.classList.add('star-row')

        for (let i = 0; i < 5; i++) {
            const star = document.createElement("div");
            star.classList.add('star')
            i < product.rating ? (star.textContent = '★') : (star.textContent = '☆')
            stars.append(star)
        }

        reviews.append(stars)





        const imgs = product.images
        let i = 0;
        const img = document.createElement("img");


        if (imgs.length > 1) {

            const prev = document.createElement("button");
            const next = document.createElement("button");
            const imgButtons = document.querySelector('.image-buttons')

            prev.textContent = "←";
            next.textContent = "→";

            prev.onclick = () => { i = (i - 1 + imgs.length) % imgs.length; img.src = imgs[i]; };
            next.onclick = () => { i = (i + 1) % imgs.length; img.src = imgs[i]; };

            img.src = imgs[0];

            imgButtons.append(prev, next);
        } else {
            img.src = imgs[0];
        }





        document.querySelector('.product-name').innerText = product.name
        document.querySelector('.product-price').innerText = `$ ${product.price}`
        document.querySelector('.product-image').append(img)

        document.querySelector('.product-description').innerText = product.short_description


    })