//© SunDall, 2026
function playGround() {
    const grid = document.createElement("div");
    grid.className = "grid";
    document.body.appendChild(grid);
}

function playgroundCards(images) {
    images = JSON.parse(images);
    images.forEach(image => {
        const card = document.createElement("div");
        card.className = "card";
        const picture = document.createElement("div");
        picture.className = "picture";

        const img = document.createElement("img");
        img.src = image.url;
        let cardName = image.name.split("/").pop();
        if (cardName.lastIndexOf(".") !== -1) {
            cardName = cardName.substring(0, cardName.lastIndexOf("."));
        };
        const caption = document.createElement("div");
        caption.textContent = cardName;
        caption.className = "imgCaption";

        picture.appendChild(img);
        card.appendChild(picture);
        card.appendChild(caption);
        document.getElementById("playGround").appendChild(card);
        card.addEventListener("click", () => {
            card.classList.toggle("clicked");
            let existingSpan = card.querySelector(".overlay-text");
            if (existingSpan) {
                existingSpan.remove();
            } else {
                let span = document.createElement("span");
                span.textContent = "K.O.";
                span.classList.add("overlay-text");
                card.appendChild(span);
            }
        });
        picture.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            contextMenu.style.left = e.clientX + 'px';
            contextMenu.style.top = e.clientY + 'px';
            contextMenu.style.display = 'block';
            let txt = e.target.closest(".card");
            txt = txt.querySelector(".imgCaption").textContent;
            let img = e.target.getAttribute('src');
            myCardListener(img, txt)
        })
    });
    appearance();
}

function appearance() {
    let settings = JSON.parse(localStorage.getItem("settings"));
    let nominalHeight = 10 * settings.size;
    let nominalWidth = 9 * settings.size;
    document.querySelectorAll(".card").forEach(card => {
        card.style.width = (nominalWidth) + "px";
        card.style.flexBasis = (nominalWidth) + "px";
        card.style.fontSize = (settings.size * 3.5) + "px";
    });
    document.querySelectorAll(".card .picture").forEach(picture => {
        picture.style.height = (nominalHeight) + "px";
        picture.style.width = (nominalWidth) + "px";
    });
    document.querySelectorAll(".card .picture img").forEach(img => {
        if (img.naturalHeight / nominalHeight > img.naturalWidth / nominalWidth) {
            img.style.width = (100) + "%";
        } else {
            img.style.height = (100) + "%";
        }
    });
    document.querySelectorAll(".imgCaption").forEach(element => {
        element.style.fontSize = (settings.size) + "px";
    });
}

window.addEventListener("settingsChanged", (event) => {
    if (event.detail.key === "size") {
        appearance();
    }
});

const images = document.getElementById("imageSet");

playGround();
playgroundCards(images.textContent.trim());