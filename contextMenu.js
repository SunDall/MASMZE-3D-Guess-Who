//© SunDall, 2026
const contextMenu = document.createElement('div');
contextMenu.class = 'contextMenu';
contextMenu.id = 'contextMenu';
contextMenu.innerHTML = `
    <ul>
        <li id="myCardButton">Set As My Card</li>
    </ul>
`;
document.body.appendChild(contextMenu);
document.addEventListener('click', function () {
    contextMenu.style.display = 'none';
});

function myCardListener(image) {
    const myCardButton = document.getElementById('myCardButton');
    const myCard = document.createElement('img');
    myCard.className = 'myCard';
    myCardButton.addEventListener('click', () => {
        document.querySelectorAll('.myCard').forEach(card => { card.remove(); })
        myCard.src = image;
        let cardName = image.split("/").pop();
        if (cardName.lastIndexOf(".") !== -1) {
            cardName = cardName.substring(0, cardName.lastIndexOf("."));
        };
        myCard.title = cardName;
        document.body.appendChild(myCard);
    })
}