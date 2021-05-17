import React, { useEffect, useState } from 'react';
import BookAdd from '../BookAdd';
import RecipeEdit from '../RecipeEdit';
import styles from './Recipe.module.css';


const Recipe = ({recipe}) => {
  const title = recipe.title;
  const directions = recipe.directions;
  const ingredients = recipe.ingredients.split('\n');
  const [ show, setShow ] = useState(false);
  const [ addShow, setAddShow ] = useState(false);


  useEffect(() => {
    // console.log(ingredients.split('\n'), 'RECIPE from recipe')
  }, []);

  const handleEClick = () => {
    setShow(true);
  }

  const handleAdd = () => {
    setAddShow(true);
  }

  return (
    <div className={styles.mainWrapper}>
      <RecipeEdit recipe={recipe} show={show} setShow={setShow} />
      {addShow && <BookAdd setAddShow={setAddShow} recipe={recipe} />}
      <div className={styles.editWrapper}>
        <button className={styles.editRecipe} onClick={handleEClick}>
          <i className="far fa-edit fa-2x"></i>
        </button>
        <button className={styles.addBook} onClick={handleAdd}>
          <i className="fas fa-book fa-2x"></i>
        </button>
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.titleHolder}>{recipe.title}</h1>
      </div>
      <div className={styles.ingredientsWrapper}>
        <h3>Ingredients</h3>
        <ul className={styles.ingredientsList}>
          {ingredients.map(ingredient => (
            <li key={ingredient + Math.random()}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className={'directionsWrapper'}>
        <p>{recipe.directions}</p>
      </div>
    </div>
  )
}

export default Recipe;
