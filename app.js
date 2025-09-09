"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const foodForm = document.getElementById('food-form');
    const foodNameInput = document.getElementById('food-name');
    const caloriesInput = document.getElementById('calories');
    const foodList = document.getElementById('food-list');
    const totalCaloriesSpan = document.getElementById('total-calories');
    const resetButton = document.getElementById('reset-button');

    let foods = JSON.parse(localStorage.getItem('foods')) || [];

    const saveFoods = () => {
        localStorage.setItem('foods', JSON.stringify(foods));
    };

    const renderFoods = () => {
        foodList.innerHTML = '';
        let totalCalories = 0;
        foods.forEach((food, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${food.name} (${food.calories} kcal)</span>
                <button class="delete-btn" data-index="${index}">&times;</button>
            `;
            foodList.appendChild(li);
            totalCalories += food.calories;
        });
        totalCaloriesSpan.textContent = totalCalories;
    };

    foodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = foodNameInput.value.trim();
        const calories = parseInt(caloriesInput.value, 10);

        if (name && !isNaN(calories) && calories >= 0) {
            foods.push({ name, calories });
            saveFoods();
            renderFoods();
            foodForm.reset();
            foodNameInput.focus();
        }
    });

    foodList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            foods.splice(index, 1);
            saveFoods();
            renderFoods();
        }
    });
    
    resetButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar todos los alimentos?')) {
            foods = [];
            saveFoods();
            renderFoods();
        }
    });

    renderFoods();
});