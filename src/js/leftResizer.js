function leftResizerManager(){
    let leftResizingStartX;
    let leftResizingStartWidth;
    let leftResizing;
    let ideLeft = document.getElementById("ide-left");
    let resizer = document.getElementById("ide-middle-resizer");
    let body = document.getElementsByTagName("body")[0];

    resizer.addEventListener("mousedown", function(e){
        leftResizingStartX = e.screenX;
        leftResizingStartWidth = ideLeft.offsetWidth;
        leftResizing = true;
        body.classList.add("selection-disabled");
    });

    document.addEventListener("mousemove", function(e){
        if(leftResizing){
            ideLeft.style.width = Math.max(leftResizingStartWidth - leftResizingStartX + e.screenX, 112) + "px";
        }
    })

    document.addEventListener("mouseup", function(e){
        leftResizing = false;
        body.classList.remove("selection-disabled");
    })
}
leftResizerManager();