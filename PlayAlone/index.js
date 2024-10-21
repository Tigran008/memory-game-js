const flipCard = document.getElementsByClassName('flip-card')[0]
const flipCardInner = document.getElementsByClassName('flip-card-inner')[0]
const score = document.getElementsByClassName('score')[0]
const comboScore = document.getElementsByClassName('comboScore')[0]
const combo = document.getElementsByClassName('combo')[0]
let flipCardBackImages = document.getElementsByClassName('flip-card-back-image')

let images = ["/images/csharp.png", "/images/c++.png", "/images/css.png", 
                "/images/html.png", "/images/java.png", "/images/javascript.png", 
                "/images/php.png", "/images/python.png", "/images/sql.png"]


images = images.concat(images)

window.addEventListener("load", function () {
    flipCardBackImages = Array.from(flipCardBackImages);
    let j = 0
    while (images.length) {
        let x = Math.floor(Math.random() * images.length)
        flipCardBackImages[j++].src = images.splice(x, 1)[0]
    }
}); 

let selectedCard = null;
let lockBoard = false;
const flipCardFace = (event) => {

    if(lockBoard) return;

    const flipCardInner = event.currentTarget.querySelector(".flip-card-inner");
    const flipCardBackImage = event.currentTarget.querySelector(".flip-card-back-image")

    if (!flipCardInner.style.transform || flipCardInner.style.transform === "rotateY(0deg)") {
        flipCardInner.style.transform = "rotateY(180deg)";
        if (selectedCard) {
            lockBoard = true;
            if (selectedCard[1] === flipCardBackImage.src) {
                comboScore.textContent = +comboScore.textContent + 1;
                score.textContent = +score.textContent + comboScore.textContent * 20
                setTimeout(() => {
                    flipCardInner.style.visibility = "hidden"
                    selectedCard[0].style.visibility = "hidden"
                    selectedCard = null;
                    lockBoard = false
                }, 500)
            } else {
                setTimeout(() => {
                    selectedCard[0].style.transform = "rotateY(0deg)";
                    flipCardInner.style.transform = "rotateY(0deg)";
                    comboScore.textContent = 0;
                    selectedCard = null;
                    lockBoard = false;
                }, 600)
            }
        } else {
            selectedCard = [flipCardInner , flipCardBackImage.src];
        }

        console.log(comboScore);

        if (comboScore.textContent >= 2) {
            combo.style.display = "block";
        } else {
            combo.style.display = "none";
        }
    } 
};