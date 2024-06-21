function terminalCloseManager() {
    const terminal = document.getElementById("ide-terminal");
    document.getElementById("button-close-terminal").addEventListener("click", function() {
        terminal.style.transition = "height 0.2s ease-out";
        terminal.style.height = "0px";
        setTimeout(function() {
            terminal.style.transition = "height 0.0s ease-out";
        }, 400);
    });
}
terminalCloseManager();
