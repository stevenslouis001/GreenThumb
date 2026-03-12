/*
filename: script.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

/* Array storing all available plants.
   Each object contains information used to update the page */
const plants = [
{
    name: "Snake Plant",
    image: "https://png.pngtree.com/png-clipart/20250108/original/pngtree-stylish-snake-plant-for-indoor-decor-png-image_18954841.png",
    description: "Great for air purification and extremely low maintenance.",
    link: "snakeplant-product.html"
},
{
    name: "Monstera",
    image: "https://png.pngtree.com/png-clipart/20240310/original/pngtree-monstera-deliciosa-monstera-giant-leaf-on-white-pot-air-purification-planthouse-png-image_14550252.png",
    description: "Known for its beautiful split leaves and tropical vibe.",
    link: "monstera-product.html"
},
{
    name: "Peace Lily",
    image: "https://static.vecteezy.com/system/resources/thumbnails/051/680/246/small/a-peace-lily-plant-in-a-white-pot-png.png",
    description: "Excellent air purifier and thrives in low light.",
    link: "peacelily-product.html"
}
];

/* Get references to elements from the HTML document
   so JavaScript can modify them */
const button = document.getElementById("generateBtn");
const image = document.getElementById("plantImage");
const name = document.getElementById("plantName");
const description = document.getElementById("plantDescription");
const productBtn = document.getElementById("productBtn");

/* Stores the plant currently being displayed */
let currentPlant = null;

/* Stores the index of the last plant shown.
   Initialized to -1 since no plant has been shown yet */
let lastIndex = -1;

/* Event listener that runs when the Generate Plant button is clicked */
button.addEventListener("click", () => {

    // Adds the CSS spin class to trigger the rotation animation
    image.classList.add("spin");

    /* Waits 800 milliseconds before showing the new plant.
       This matches the animation duration in the CSS */
    setTimeout(() => {

        let randomIndex;

        /* Generate a random index from the plants array.
           If it matches the last plant shown, keep generating
           until a different plant is selected */
        do {
            randomIndex = Math.floor(Math.random() * plants.length);
        } while (randomIndex === lastIndex);

        // Save this index so the same plant cannot appear next time
        lastIndex = randomIndex;

        // Store the selected plant object
        currentPlant = plants[randomIndex];

        // Update the image source to show the selected plant
        image.src = currentPlant.image;

        // Update the plant name text
        name.textContent = currentPlant.name;

        // Update the plant description text
        description.textContent = currentPlant.description;

        // Remove the spin class so the animation can occur again later
        image.classList.remove("spin");

    }, 800);
});

/* Event listener for the View Product button */
productBtn.addEventListener("click", () => {

    /* If a plant has been generated, navigate to its
       associated product page */
    if(currentPlant){
        window.location.href = currentPlant.link;
    }
});
