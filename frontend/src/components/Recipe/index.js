import React, { useEffect, useState } from 'react';
import BookAdd from '../BookAdd';
import RecipeEdit from '../RecipeEdit';
import styles from './Recipe.module.css';
import { removeRecipe } from '../../utils/bookUtil';


const Recipe = ({recipe, bookId, setChanged, changed}) => {
  const title = recipe.title;
  const directions = recipe.directions;
  const ingredients = recipe.ingredients.split('\n');
  const [ show, setShow ] = useState(false);
  const [ addShow, setAddShow ] = useState(false);


  useEffect(() => {
    // console.log(ingredients.split('\n'), 'RECIPE from recipe')
    console.log(changed, 'inrecipeeffect')
  }, [changed]);

  const handleEClick = () => {
    setShow(true);
  }

  const handleAdd = () => {
    setAddShow(true);
  }

  const handleRemove = () => {
    window.confirm(`Remove ${title.toUpperCase()} from book?`) &&
    removeRecipe({bookId, recipeId: recipe.id})
      .then(() => console.log(changed, 'changed in remove'))
      .then(() => setChanged(!changed))
      .then(() => console.log(changed, 'changed in remove2'))
  }

  return (
    <div className={styles.mainWrapper}>
      <RecipeEdit recipe={recipe} show={show} setShow={setShow} />
      {addShow && <BookAdd setAddShow={setAddShow} recipe={recipe} />}
      <div className={styles.editWrapper}>
        <button className={styles.editRecipe} onClick={handleEClick}>
          <i className="far fa-edit fa-2x"></i>
        </button>
        {bookId &&
          <button className={styles.removeBook} onClick={handleRemove}>
            <i className="fas fa-book-dead fa-2x"></i>
          </button>}
        <button className={styles.addBook} onClick={handleAdd}>
          <i className="fas fa-book-medical fa-2x"></i>
        </button>
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.titleHolder}>{title.toUpperCase()}</h1>
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
