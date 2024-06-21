let mouseX;
let mouseY;

function clamp(min, value, max) {
    return Math.min(Math.max(min, value), max);
}

function playgroundHandler() {
    const playground = document.getElementById("ide-playground");
    const body = document.getElementsByTagName("body")[0];
    let zoom = 14;
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    document.addEventListener("contextmenu", event => {
        event.preventDefault();
    });

    document.addEventListener("mousedown", event => {
        const target = event.target;
        if (event.button == 2 && collide(target, playground)) {
            dragging = true;
        }
    });

    document.addEventListener("mouseup", event => {
        dragging = false;
    });

    document.addEventListener("mousemove", event => {
        mouseX = event.screenX;
        mouseY = event.screenY;

        if (dragging) {
            offsetX += event.movementX;
            offsetX %= zoom;
            offsetY += event.movementY;
            offsetY %= zoom;

            body.style.backgroundPositionX = `${offsetX}px`;
            body.style.backgroundPositionY = `${offsetY}px`;

            for (const [blockId, block] of Object.entries(Block.all)) {
                if (!block.isInShop) {
                    block.moveBy(event.movementX, event.movementY);
                }
            }
        }
    });
    
    const playButton = document.getElementById("button-run");
    document.addEventListener("keydown", event => {
        if (event.key == "Enter") {
            playButton.classList.add("animate");
            setTimeout(() => {
                playButton.classList.remove("animate");
            }, 300);
            playButton.click();
        }
    });
}
playgroundHandler();
