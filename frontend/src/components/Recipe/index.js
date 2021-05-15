import React, { useEffect, useState } from 'react';
import RecipeEdit from '../RecipeEdit';
import styles from './Recipe.module.css';


const Recipe = ({recipe}) => {
  const title = recipe.title;
  const directions = recipe.directions;
  const ingredients = recipe.ingredients;
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    // console.log(ingredients.split('\n'), 'RECIPE from recipe')
  }, []);

  const handleEClick = () => {
    setShow(true);
  }

  return (
    <div className={styles.mainWrapper}>
      <RecipeEdit recipe={recipe} show={show} setShow={setShow} />
      <div className={'editWrapper'}>
        <button className={'editRecipe'} onClick={handleEClick}>E</button>
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
