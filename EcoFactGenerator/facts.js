/*
filename: facts.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

const ecoFacts = [
  {
    text: "As of 2021, The nation’s 5,426 data centers consume roughly 449 million gallons of water per day and 163.7 billion gallons annually.",
    url: "https://www.eesi.org/articles/view/data-centers-and-water-consumption"
  },
  {
    text: "An estimated 33 billion pounds of plastic enter the marine environmnet every year - that's roughly equivalent to dumping two garbage trucks full of plastic into the oceans every minute!",
    url: "https://usa.oceana.org/our-campaigns/plastic/"
  },
  {
    text: "Plastic waste can take anywhere from 20 to 500 years to decompose, and even then, it never fully disappears; it just gets smaller and smaller.",
    url: "https://www.un.org/en/exhibits/exhibit/in-images-plastic-forever"
  },
  {
    text: "A 10% increase in reusable beverage packaging by 2030 could eliminate over 1 trillion single-use plastic bottles and cups and prevent up to 153 billion of these containers from entering Earth's oceans and waterways.",
    url: "https://oceana.org/press-releases/report-switching-to-reusable-packaging-could-eliminate-1-trillion-single-use-plastic-bottles-and-cups/"
  },
  {
    text: "The United States alone uses nearly 50 million plastic water bottles each year.",
    url: "https://projectcleanwater.org/5-reasons-to-opt-for-reusable-water-bottles/"
  },
  {
    text: "Of the plastic water bottles purchased in the United States, only 23% are recycled.",
    url: "https://projectcleanwater.org/5-reasons-to-opt-for-reusable-water-bottles/"
  },
  {
    text: "It is estimated that a $20 reusable water bottle will save you $6,180 in five years.",
    url: "https://projectcleanwater.org/5-reasons-to-opt-for-reusable-water-bottles/"
  }
];

let currentIndex = 0;
const factElement = document.getElementById("factText");
const sourceLink = document.getElementById("sourceLink");
const prevBtn = document.getElementById("prevFact");
const nextBtn = document.getElementById("nextFact");

/* ... (keep your ecoFacts array and variable declarations) ... */

function displayFact(index) {
    factElement.classList.add("fade-out");

    setTimeout(() => {
        if (index >= ecoFacts.length) currentIndex = 0;
        else if (index < 0) currentIndex = ecoFacts.length - 1;
        else currentIndex = index;

        factElement.textContent = ecoFacts[currentIndex].text;
        sourceLink.href = ecoFacts[currentIndex].url;

        factElement.classList.remove("fade-out");
    }, 500);
}

// 1. AUTO-SCROLL: Moves to next fact every 7 seconds
let autoScroll = setInterval(() => {
    displayFact(currentIndex + 1);
}, 7000);

// Reset timer if user clicks a button (optional but better UX)
function resetTimer() {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
        displayFact(currentIndex + 1);
    }, 7000);
}

prevBtn.addEventListener("click", () => {
    displayFact(currentIndex - 1);
    resetTimer();
});

nextBtn.addEventListener("click", () => {
    displayFact(currentIndex + 1);
    resetTimer();
});

// 2. START WITH A FACT: Call this immediately
displayFact(0);
