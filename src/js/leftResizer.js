function leftResizerManager(){
    let leftResizingStartX;
    let leftResizingStartWidth;
    let leftResizing;
    let ideLeft = document.getElementById("ide-left");
    let resizer = document.getElementById("ide-middle-resizer");
    let h1 = document.querySelector("#ide-menu-icon > h1");
    let icon = document.querySelector("#ide-menu-icon > svg");
    let body = document.getElementsByTagName("body")[0];

    resizer.addEventListener("mousedown", function(e){
        leftResizingStartX = e.screenX;
        leftResizingStartWidth = ideLeft.offsetWidth;
        leftResizing = true;
        body.classList.add("selection-disabled");
    });

    document.addEventListener("mousemove", function(e){
        if (leftResizing){
            let newWidth = Math.max(leftResizingStartWidth - leftResizingStartX + e.screenX, 116);
            ideLeft.style.width = newWidth + "px";
            
            console.log(newWidth);
            if (newWidth <= 292) {
                h1.style.display = "none";
            } else {
                h1.style.display = "inline";
            }

            if (newWidth <= 156) {
                icon.style.display = "none";
            } else {
                icon.style.display = "block";
            }
        }
    });

    document.addEventListener("mouseup", function(e){
        leftResizing = false;
        body.classList.remove("selection-disabled");
    });
}
leftResizerManager();