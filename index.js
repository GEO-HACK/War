
let deckId
function FetchData(){
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            console.log(deckId)
        })
}

document.getElementById("new-deck").addEventListener('click', FetchData)
document.getElementById("draw-card").addEventListener('click',()=>{
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const cardImage = data.cards.map(card => card.image);
            document.getElementById("card").innerHTML = `
                    <img src="${cardImage[0]}" alt="card image">
                    <img src="${cardImage[1]}" alt="card image">
                    `
        })
})
