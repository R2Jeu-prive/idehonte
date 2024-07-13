function settingsLoader() {
    const settingsMenu = document.getElementById("settings");
    const settingsButton = document.getElementById("button-settings");

    settingsButton.addEventListener("click", event => {
        settingsMenu.style.display = settingsMenu.style.display == "flex" ? "none" : "flex";
    });

    document.addEventListener("keydown", (event) => {
        console.log(event.key);
    });

    if (localStorage.getItem("ide-theme") == null) {
        localStorage.setItem("ide-theme", "default");
    } else {
        setTheme(localStorage.getItem("ide-theme"))
    }
}
settingsLoader();

function setTheme(theme) {

    if (theme == null) {
        theme = document.getElementById("theme-change").value;
        localStorage.setItem("ide-theme", theme);
    }

    const linkTag = document.getElementById("theme");
    linkTag.setAttribute("href", `css/themes/${theme}.css`)
    console.log(`Theme switched to ${theme}`);
}
