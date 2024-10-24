const flipCard = document.getElementsByClassName('flip-card')[0]
const flipCardInners = Array.from(document.getElementsByClassName('flip-card-inner'))
const flipCardInner = document.getElementsByClassName('flip-card-inner')[0]
const score = Array.from(document.getElementsByClassName('score'))
const comboScore = document.getElementsByClassName('comboScore')[0]
const combo = document.getElementsByClassName('combo')[0]
const arrow = document.getElementsByClassName('arrow')[0]
const cards = document.getElementsByClassName('cards')[0]
const endButtons = document.getElementsByClassName('endButtons')[0]
const winnerText = document.getElementsByClassName('winnerText')[0]
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
                    flipCardInners.splice(flipCardInners.indexOf(selectedCard[0]), 1)
                    flipCardInners.splice(flipCardInners.indexOf(flipCardInner), 1)
                    if (flipCardInners.length === 0) {
                        const scorePlayer = +score[0].textContent;
                        const scoreBot = +score[1].textContent;
                        if (scorePlayer > scoreBot) {
                            winnerText.textContent = "You are the Winner!"
                        } else if (scorePlayer < scoreBot) {
                            winnerText.textContent = "Bot is the Winner!"
                            document.getElementsByClassName('winnerText')[0].style.color = "brown"
                        } else {
                            winnerText.textContent = "Draw!"
                            document.getElementsByClassName('winnerText')[0].style.color = "azure"
                        }
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
                    handleComputerTurn();
                    arrow.style.rotate = arrowSide[turn];
                }, 600)
            }
        } else {
            selectedCard = [flipCardInner , flipCardBackImage.src];
        }

        combo.style.display = comboScore.textContent < 2 ? "none" : "block"
    } 
};


let sameTurn = 0;
const handleComputerTurn = () => {
    if (flipCardInners.length === 0) return;

    lockBoard = true;

    const randomIndices = sameTurn >= 2 ? getTwoSameCards() : getTwoRandomCards();
    const firstCard = flipCardInners[randomIndices[0]];
    const secondCard = flipCardInners[randomIndices[1]];

    setTimeout(() => {
        firstCard.style.transform = "rotateY(180deg)";
        const firstBackImage = firstCard.querySelector(".flip-card-back-image").src;

        setTimeout(() => {
            secondCard.style.transform = "rotateY(180deg)";
            const secondBackImage = secondCard.querySelector(".flip-card-back-image").src;

            if (firstBackImage === secondBackImage) {
                setTimeout(() => {
                    firstCard.style.visibility = "hidden";
                    secondCard.style.visibility = "hidden";
                    flipCardInners.splice(flipCardInners.indexOf(firstCard), 1);
                    flipCardInners.splice(flipCardInners.indexOf(secondCard), 1);
                    comboScore.textContent = +comboScore.textContent + 1;
                    score[turn].textContent = +score[turn].textContent + comboScore.textContent * 20;
                    if (flipCardInners.length === 0) {
                        const scorePlayer = +score[0].textContent;
                        const scoreBot = +score[1].textContent;
                        if (scorePlayer > scoreBot) {
                            winnerText.textContent = "You are the Winner!"
                        } else if (scorePlayer < scoreBot) {
                            winnerText.textContent = "Bot is the Winner!"
                            document.getElementsByClassName('winnerText')[0].style.color = "brown"
                        } else {
                            winnerText.textContent = "Draw!"
                            document.getElementsByClassName('winnerText')[0].style.color = "azure"
                        }
                        endButtons.style.display = "block";
                        cards.style.display = "none"
                        document.body.style.height = "90vh"
                        arrow.style.display = "none";
                    }
                    handleComputerTurn();
                }, 500);
            } else {
                setTimeout(() => {
                    firstCard.style.transform = "rotateY(0deg)";
                    secondCard.style.transform = "rotateY(0deg)";
                    turn = +!turn; 
                    comboScore.textContent = 0;
                    combo.style.display = "none";
                    arrow.style.rotate = arrowSide[turn];
                    lockBoard = false; 
                }, 1000); 
            }
        }, 1000); 
    }, 1000); 

    combo.style.display = comboScore.textContent < 2 ? "none" : "block"     
};

const getTwoRandomCards = () => {
    let firstIndex = Math.floor(Math.random() * flipCardInners.length);
    let secondIndex;
    do {
        secondIndex = Math.floor(Math.random() * flipCardInners.length);
    } while (firstIndex === secondIndex); 
    sameTurn++;
    return [firstIndex, secondIndex];
};

const getTwoSameCards = () => {
    let firstIndex = Math.floor(Math.random() * flipCardInners.length);
    let firstCardImage = flipCardInners[firstIndex].querySelector(".flip-card-back-image").src;
    let secondIndex;
    let secondCardImage;
    do {
        secondIndex = Math.floor(Math.random() * flipCardInners.length);
        secondCardImage = flipCardInners[secondIndex].querySelector(".flip-card-back-image").src;
    } while (firstIndex === secondIndex ||  secondCardImage !== firstCardImage); 
    sameTurn = 0;
    return [firstIndex, secondIndex];
}