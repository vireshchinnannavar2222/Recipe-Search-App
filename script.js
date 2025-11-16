const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

// Search on button click
searchBtn.addEventListener('click', searchRecipes);

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

async function searchRecipes() {
    const dishName = searchInput.value.trim();
    
    if (!dishName) {
        alert('Please enter a dish name');
        return;
    }
    
    // Show loading
    resultsDiv.innerHTML = '<div class="loading">Searching for recipes...</div>';
    
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
        const data = await response.json();
        
        displayRecipes(data.meals);
    } catch (error) {
        resultsDiv.innerHTML = '<div class="no-results">Error fetching recipes. Please try again.</div>';
        console.error('Error:', error);
    }
}

function displayRecipes(meals) {
    resultsDiv.innerHTML = '';
    
    if (!meals) {
        resultsDiv.innerHTML = '<div class="no-results">No recipes found. Try another dish!</div>';
        return;
    }
    
    meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        
        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="recipe-info">
                <h3>${meal.strMeal}</h3>
                <span class="category">${meal.strCategory}</span>
                <span class="area">${meal.strArea}</span>
                <div class="instructions">
                    <strong>Instructions:</strong><br>
                    ${meal.strInstructions}
                </div>
            </div>
        `;
        
        resultsDiv.appendChild(recipeCard);
    });
}
