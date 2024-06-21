function settingsLoader() {
    const settingsMenu = document.getElementById("settings");
    const settingsButton = document.getElementById("button-settings");

    settingsButton.addEventListener("click", (event) => {
        settingsMenu.style.display = settingsMenu.style.display == "flex" ? "none" : "flex";
    });
}
settingsLoader();

function setTheme() {
    const theme = document.getElementById("theme").value;
}
