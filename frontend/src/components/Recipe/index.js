import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BookAdd from '../BookAdd';
import RecipeEdit from '../RecipeEdit';
import styles from './Recipe.module.css';
import { removeRecipe } from '../../utils/bookUtil';
import { deleteRecipe } from '../../utils/recipeUtil';
import { useLocation } from '../../context/LocationProvider';


const Recipe = ({recipe, bookId, setChanged, changed, setRecipes}) => {
  const title = recipe.title;
  const directions = recipe.directions;
  const mainIngredient = recipe.mainIngredient;
  const ingredients = recipe.ingredients.split('\n');
  const [ show, setShow ] = useState(false);
  const [ addShow, setAddShow ] = useState(false);
  const { setMenuActive } = useLocation();



  useEffect(() => {
    // console.log(ingredients.split('\n'), 'RECIPE from recipe')
  }, [changed]);

  const handleEClick = () => {
    setMenuActive(true);
    setShow(true);
  }

  const handleAdd = () => {
    setMenuActive(true);
    setAddShow(true);
  }

  const handleRemove = () => {
    window.confirm(`Remove ${title.toUpperCase()} from book?`) &&
    removeRecipe({bookId, recipeId: recipe.id})
      .then(() => setChanged(!changed))
  }

  const handleDelete = () => {
    window.confirm(`Permenantly delete ${recipe.title}?`) &&
      deleteRecipe({ id: recipe.id })
        .then(() => setRecipes(prevState => prevState.filter(element => element !== recipe)))
  }

  return (
    <div className={styles.mainWrapper}>
      <RecipeEdit recipe={recipe} show={show} setShow={setShow} changed={changed} setChanged={setChanged}/>
      {addShow && <BookAdd setAddShow={setAddShow} recipe={recipe} />}
      <div className={styles.headContent}>
        <span className={styles.mainIngredient}>{mainIngredient}</span>
        <div className={styles.editWrapper}>
          <button className={styles.recipeButton} onClick={handleEClick}>
            <i className="far fa-edit fa-2x"></i>
          </button>
          {bookId &&
            <button className={styles.recipeButton} onClick={handleRemove}>
              <i className="fas fa-book-dead fa-2x"></i>
            </button>}
          <button className={styles.recipeButton} onClick={handleAdd}>
            <i className="fas fa-book-medical fa-2x"></i>
          </button>
          <button className={styles.recipeButton} onClick={handleDelete}>
            <i className="far fa-times-circle fa-2x"></i>
          </button>
        </div>
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
      <div className={styles.directionsWrapper}>
        <h3>Directions</h3>
        <p>{directions}</p>
      </div>
    </div>
  )
}

export default Recipe;
