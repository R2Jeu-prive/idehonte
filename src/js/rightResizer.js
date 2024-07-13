function rightResizerManager() {
    let rightResizingStartY;
    let rightResizingStartHeight;
    let rightResizing;
    const terminal = document.getElementById("ide-terminal");
    const rightResizer = document.getElementById("ide-right-resizer");
    const body = document.getElementsByTagName("body")[0];
    
    rightResizer.addEventListener("mousedown", function(e) {
        rightResizingStartY = e.screenY;
        rightResizingStartHeight = terminal.offsetHeight;
        rightResizing = true;
        body.classList.add("selection-disabled");
    });

    document.addEventListener("mousemove", function(e) {
        if (rightResizing){
            terminal.style.height = (rightResizingStartHeight + rightResizingStartY - e.screenY) + "px";
        }
    });

    document.addEventListener("mouseup", function(e) {
        rightResizing = false;
        body.classList.remove("selection-disabled");
    });
}
rightResizerManager();
