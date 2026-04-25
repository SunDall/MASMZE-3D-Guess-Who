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

function myCardListener(image, text) {
    const myCardButton = document.getElementById('myCardButton');
    const myCard = document.createElement('img');
    myCard.className = 'myCard';
    myCardButton.addEventListener('click', () => {
        document.querySelectorAll('.myCard').forEach(card => { card.remove(); })
        myCard.src = image;
        myCard.title = text;
        document.body.appendChild(myCard);
    })
}