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

    if (button.classList.contains('light-icon') && themeName == 'theme-dark') {
        button.classList.toggle('light-icon');
        button.classList.toggle('dark-icon');
    } else if (button.classList.contains('dark-icon') && themeName == 'theme-light') {
        button.classList.toggle('light-icon');
        button.classList.toggle('dark-icon');
    }

}

function toggleTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-light");
    } else {
        setTheme("theme-dark");
    }
}