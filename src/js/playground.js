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
        const target = event.explicitOriginalTarget["getBoundingClientRect"] != undefined ? event.explicitOriginalTarget : event.explicitOriginalTarget.parentNode;
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
    
    // document.addEventListener("wheel", event => {
    //     const scroll = event.wheelDeltaY;
    //     zoom += scroll / 60;
    //     zoom = clamp(3, zoom, 50);

    //     body.style.backgroundSize = `${zoom}px ${zoom}px`;
    // });
}
playgroundHandler();
