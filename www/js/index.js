// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {

// }

var theme_toggler = document.getElementById("theme-button");
var search_button = document.getElementById("search-button");
var result = document.getElementById("result");
var error = document.getElementById("error");
var error_message = document.getElementById("error-message");

theme_toggler.addEventListener("click", toggleTheme);
search_button.addEventListener("click", performSearch);

document.addEventListener("food_not_found_error", () => {
    error_message.innerHTML = "Food or Drink not found.";
    console.log('log');
    toast();
});
document.addEventListener("empty_search_bar_error", () => {
    error_message.innerHTML = "Query is empty";
    toast();
});

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

function performSearch() {
    let input = document.getElementById("search-bar").value;

    const settings = {
        async: true,
        crossDomain: true,
        url: "https://calorieninjas.p.rapidapi.com/v1/nutrition?query=tomato",
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "7795701e29msh045cee6ff0afd4ep1560b9jsn3ebc3aa4fb6a",
            "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
        },
    };

    if (input == "") {
        document.dispatchEvent(new Event("empty_search_bar_error"));
    } else {
        settings.url = `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${input}`;
        $.ajax(settings).done(function (response) {
            console.log(response);
            // $('.result').html(JSON.stringify(response));
            processResponse(response);
        });
    }
}

function processResponse(response) {
    let element = "";
    let object = response["items"][0];

    if (object == null) {
        document.dispatchEvent(new Event("food_not_found_error"));
        return;
    }

    for (var [key, value] of Object.entries(object)) {
        if (key != "name") {
            element += `
            <div class="item d-flex float-right justify-content-between align-items-center">
                <span id="name">${key}</span>
                <span id="amount">${value}</span>
            </div>`;
        }
    }

    console.log(element);
    $(".result").html(element);

    result.style.height = "550px";
}

function toast() {
    error.style.opacity = "1";

    setTimeout(() => {
        error.style.opacity = "0";
    }, 2500);
}


/* 
<div class="item d-flex float-right justify-content-between align-items-center">
                        <span id="name">Protein</span>
                        <span id="amount">3.4g</span>
                    </div>


{
    "items": [
        {
            "sugar_g": 10.3,
            "fiber_g": 2.4,
            "serving_size_g": 100,
            "sodium_mg": 1,
            "name": "apple",
            "potassium_mg": 11,
            "fat_saturated_g": 0,
            "fat_total_g": 0.2,
            "calories": 53,
            "cholesterol_mg": 0,
            "protein_g": 0.3,
            "carbohydrates_total_g": 14.1
        }
    ]
}
*/
