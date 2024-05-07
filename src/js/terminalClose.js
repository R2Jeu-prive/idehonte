function terminalCloseManager(){
    let terminal = document.getElementById("ide-terminal");
    document.getElementById("terminal-close").addEventListener("click", function(){
        terminal.style.transition = "height 0.4s ease-out";
        terminal.style.height = "0px";
        setTimeout(function(){
            terminal.style.transition = "height 0.1s ease-out";
        }, 400);
    })
}
terminalCloseManager();