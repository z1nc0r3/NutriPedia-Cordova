// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {

// }

let button = document.getElementById("theme-button");
button.addEventListener('click', toggleTheme);

if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
} else {
    setTheme("theme-light");
}

function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-light");
    } else {
        setTheme("theme-dark");
    }
}