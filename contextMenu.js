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

let image;
document.querySelectorAll('.picture').forEach(picture => {
    picture.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        contextMenu.style.left = e.clientX + 'px';
        contextMenu.style.top = e.clientY + 'px';
        contextMenu.style.display = 'block';

        image = e.target.getAttribute('src');
    })
})

document.addEventListener('click', function () {
    contextMenu.style.display = 'none';
});

const myCard = document.createElement('img');
myCard.className = 'myCard';
//Can be optimized!!
const myCardButton = document.getElementById('myCardButton');
myCardButton.addEventListener('click', () => {
    document.querySelectorAll('.myCard').forEach(card => { card.remove(); })
    myCard.src = image;
    let cardName = image.split("/").pop();
    if (cardName.lastIndexOf(".") !== -1) {
        cardName = cardName.substring(0, cardName.lastIndexOf("."));
    };
    myCard.title = cardName;
    console.log(cardName);
    document.body.appendChild(myCard);
})