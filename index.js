
const BASE_URL = "http://localhost:3000/players"
const cardsContainer = document.getElementById("cards-container")

getCards()

function getCards(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(function (cardsArray){
        cardsArray.forEach(function(cards){
            renderCards(cards)
        })
    })
}

const playerForm = document.querySelector("#form-container")


function renderCards(cards){
    const playerCard = document.createElement('div')
    playerCard.id = cards.id
    playerCard.className = "player-cards"

    const playerImg = document.createElement('img')
    playerImg.src = cards.image
    playerImg.alt = cards.name

    const likeBttn = document.createElement("button")
    likeBttn.className = "like-bttn"
    likeBttn.textContent = "♥"
    likeBttn.addEventListener("click", () => lightUpButton());

    const deleteBttn = document.createElement("button");
    deleteBttn.className = "delete-bttn";
    deleteBttn.textContent = "Delete";
    deleteBttn.addEventListener("click", () => deletePlayer(playerCard));

    const playerInfo = document.createElement('div')
    playerInfo.id = "info"

    const playerName = document.createElement('h4')
    playerName.textContent = cards.name

    const playerNumber = document.createElement('h4')
    playerNumber.textContent = `Number: ${cards.number}`
    
    const playerTeam = document.createElement('h4')
    playerTeam.textContent = cards.team

    const createButton = document.createElement('button')
    createButton.className = "info-bttn"
    createButton.textContent = "Player Info"

    playerCard.append(playerImg, likeBttn, createButton, playerInfo, deleteBttn)
    playerInfo.append(playerName, playerNumber, playerTeam)
    cardsContainer.appendChild(playerCard)

    const button = document.querySelector('button') // player info button
    const cardsInfo = document.getElementById('info') // info displayed by button
    let cardsInfoVisible = "hidden" // info default state of hidden

    function toggleInfo() { // function to toggle info as hidden or visible
        cardsInfoVisible = cardsInfoVisible === "hidden" ? cardsInfoVisible = "visible" : cardsInfoVisible = "hidden";
        cardsInfo.style.visibility = cardsInfoVisible
    }

    button.onclick = toggleInfo

}

function lightUpButton(){
    // funtion for light up the like buttom after it clicked
}

function deletePlayer(playerCard){
    playerCard.remove();

}

function createNewCard(event) {
    event.preventDefault();
    const newPlayer = document.querySelector("#player-input").value;
    const newTeam = document.querySelector("#team-input").value;
    const newNumber = document.querySelector("#number-input").value;
    const newImg = document.querySelector("#image-input").value;
    
    const newPlayerCard = {
      name: newPlayer,
      number: newNumber,
      team: newTeam,
      img: newImg
    };
    renderCards(newPlayerCard);
    playerForm.reset();
}

playerForm.addEventListener("submit", createNewCard)