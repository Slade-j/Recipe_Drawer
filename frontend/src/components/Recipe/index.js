import React, { useEffect, useState } from 'react';
import styles from './Recipe.module.css';


const Recipe = ({recipe}) => {
  const title = recipe.title;
  const directions = recipe.directions;
  const ingredients = recipe.ingredients;

  useEffect(() => {
    console.log(recipe, 'RECIPE from recipe')
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <div className={'editWrapper'}>
        <button className={'editRecipe'}>E</button>
      </div>
      <div className={'titleWrapper'}>
        <span className={'titleHolder'}>{recipe.title}</span>
      </div>
      <div className={'ingredientsWrapper'}>
        <p>{recipe.ingredients}</p>
      </div>
      <div className={'directionsWrapper'}>
        <p>{recipe.directions}</p>
      </div>
    </div>
  )
}

export default Recipe;
