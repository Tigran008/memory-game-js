const flipCard = document.getElementsByClassName('flip-card')[0]
const flipCardInner = document.getElementsByClassName('flip-card-inner')[0]
const score = Array.from(document.getElementsByClassName('score'))
const comboScore = document.getElementsByClassName('comboScore')[0]
const combo = document.getElementsByClassName('combo')[0]
const arrow = document.getElementsByClassName('arrow')[0]
const winner = document.getElementsByClassName('winner')[0]
const cards = document.getElementsByClassName('cards')[0]
const endButtons = document.getElementsByClassName('endButtons')[0]
const flipCardBackImages = Array.from(document.getElementsByClassName('flip-card-back-image'))

let images = ["/images/csharp.png", "/images/c++.png", "/images/css.png", 
                "/images/html.png", "/images/java.png", "/images/javascript.png", 
                "/images/php.png", "/images/python.png", "/images/sql.png", "/images/node.png",
                "/images/ruby.png", "/images/react.png"
            ]


images = images.concat(images)
window.addEventListener("load", function () {
    let j = 0
    while (images.length) {
        let x = Math.floor(Math.random() * images.length)
        flipCardBackImages[j++].src = images.splice(x, 1)[0]
    }
}); 

let selectedCard = null;
let lockBoard = false;
const arrowSide = ["180deg", "360deg"]
let turn = 0;
let cardsCount = 0;
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
                score[turn].textContent = +score[turn].textContent + comboScore.textContent * 20
                setTimeout(() => {
                    flipCardInner.style.visibility = "hidden"
                    selectedCard[0].style.visibility = "hidden"
                    cardsCount += 2;
                    if (cardsCount === flipCardBackImages.length) {
                        winner.textContent = +score[0].textContent > +score[1].textContent ? "Player1" : "Player2";
                        endButtons.style.display = "block";
                        cards.style.display = "none"
                        document.body.style.height = "90vh"
                        arrow.style.display = "none";
                    }
                    selectedCard = null;
                    lockBoard = false
                }, 500)
            } else {
                setTimeout(() => {
                    selectedCard[0].style.transform = "rotateY(0deg)";
                    flipCardInner.style.transform = "rotateY(0deg)";
                    comboScore.textContent = 0;
                    combo.style.display = "none"; 
                    selectedCard = null;
                    lockBoard = false;
                    turn = +!turn;
                    arrow.style.rotate = arrowSide[turn];
                }, 600)
            }
        } else {
            selectedCard = [flipCardInner , flipCardBackImage.src];
        }

        combo.style.display = comboScore.textContent < 2 ? "none" : "block"
    } 
};