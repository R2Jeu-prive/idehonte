function leftResizerManager() {
    let leftResizingStartX;
    let leftResizingStartWidth;
    let leftResizing;
    const ideLeft = document.getElementById("ide-left");
    const resizer = document.getElementById("ide-middle-resizer");
    const h1 = document.querySelector("#ide-menu-icon > h1");
    const icon = document.querySelector("#ide-menu-icon > svg");
    const body = document.getElementsByTagName("body")[0];

    resizer.addEventListener("mousedown", function(e) {
        leftResizingStartX = e.screenX;
        leftResizingStartWidth = ideLeft.offsetWidth;
        leftResizing = true;
        body.classList.add("selection-disabled");
    });

    document.addEventListener("mousemove", function(e) {
        if (leftResizing) {
            const newWidth = Math.max(leftResizingStartWidth - leftResizingStartX + e.screenX, 200);
            ideLeft.style.width = newWidth + "px";
            
            if (newWidth <= 417) {
                h1.style.display = "none";
            } else {
                h1.style.display = "inline";
            }
        }
    });

    document.addEventListener("mouseup", function(e) {
        leftResizing = false;
        body.classList.remove("selection-disabled");
    });
}
leftResizerManager();
