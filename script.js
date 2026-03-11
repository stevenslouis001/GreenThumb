/*
filename: script.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

const plants = [
{
    name: "Snake Plant",
    image: "snakeplant.jpeg",
    description: "Great for air purification and extremely low maintenance.",
    link: "snakeplant-product.html"
},
{
    name: "Monstera",
    image: "images/monstera.png",
    description: "Known for its beautiful split leaves and tropical vibe.",
    link: "monstera-product.html"
},
{
    name: "Peace Lily",
    image: "images/peacelily.png",
    description: "Excellent air purifier and thrives in low light.",
    link: "peacelily-product.html"
}
];

const button = document.getElementById("generateBtn");
const image = document.getElementById("plantImage");
const name = document.getElementById("plantName");
const description = document.getElementById("plantDescription");
const productBtn = document.getElementById("productBtn");

let currentPlant = null;

button.addEventListener("click", () => {

    image.classList.add("spin");

    setTimeout(() => {

        const randomIndex = Math.floor(Math.random() * plants.length);
        currentPlant = plants[randomIndex];

        image.src = currentPlant.image;
        name.textContent = currentPlant.name;
        description.textContent = currentPlant.description;

        image.classList.remove("spin");

    }, 800);
});

productBtn.addEventListener("click", () => {
    if(currentPlant){
        window.location.href = currentPlant.link;
    }
});
