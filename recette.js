const boutton=document.getElementById("btn")
const resultat =document.getElementById("results")

boutton.addEventListener("click",async function(e){

 e.preventDefault()

 const input=document.getElementById("search-input")
const recette=input.value.trim()
input.value=""

const url=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recette}`)
const data =await url.json()
console.log(data);

try{
     if(recette.length===0){
    alert("Please enter a recipe ")
    return
}
// vide le contenu du body
 resultat.innerHTML=""
     if(!data.meals){
            alert("No recipe found.")
            return
        }
    for(let i=0; i<data.meals.length;i++){
// creation des elements
const card=document.createElement("div")
const imgContainer = document.createElement("div")
const img=document.createElement("img")
const nom=document.createElement("p")
const lienRecette=document.createElement("a")
img.src=data.meals[i].strMealThumb
lienRecette.href =`recette.html?id=${data.meals[i].idMeal}` //url en fonction de l'id
const boutonAjout = document.createElement("button")
nom.innerText=(data.meals[i].strMeal)
boutonAjout.innerHTML = '<i class="fa-solid fa-heart fa-2xl"></i>'

// attribution des classes pour manipuler le css
img.classList.add("image")
lienRecette.classList.add("lienRecette")
card.classList.add("card")
lienRecette.innerText=("View the recipe")
boutonAjout.classList.add("btn-favori")
imgContainer.classList.add("image-container");

// insertion
imgContainer.appendChild(img)
card.appendChild(imgContainer)
card.appendChild(nom)
card.appendChild(lienRecette)
card.appendChild(boutonAjout)
resultat.appendChild(card)

    }
}catch(error){
resultat.innerHTML = "<p>Error loading data.</p>"
}
})
