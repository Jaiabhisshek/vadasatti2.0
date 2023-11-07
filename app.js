let imgboxEl = document.getElementById("imgbox");
let ingredientsContext = document.getElementById("ingredientsContext");
let historybox = document.getElementById("historybox")
let searchbar = document.getElementById("searchbar")

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
    let randomimg=document.createElement("img");
    randomimg.src=data.meals[0].strMealThumb;
    randomimg.classList.add("random-food")
    imgboxEl.append(randomimg);

    let category= document.createElement("p");
    category.innerText="Category: " + data.meals[0].strCategory;
    category.classList.add("name-of-category")
    imgboxEl.append(category);

    let foodName= document.createElement("h2");
    foodName.innerText=data.meals[0].strMeal;
    foodName.classList.add("name-of-food")
    imgboxEl.append(foodName);

})

function createFood(data){
    for(let eachFood of data){
        let foodBox = document.createElement("div");
        historybox.append(foodBox);

        let foodimg=document.createElement("img");
        foodimg.src=eachFood.strMealThumb;
        foodimg.classList.add("foodsize")
        foodBox.append(foodimg);

        let dishName= document.createElement("p")
        dishName.innerText=eachFood.strMeal;
        dishName.classList.add("dish-name")
        foodBox.append(dishName);
    }
}

function searchFood(e){
    if(e.key==="Enter"){
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + searchbar.value)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            createFood(data.meals);
        })
    }
}

searchbar.addEventListener("keydown", searchFood);