import React, { useEffect, useState } from 'react';
import styles from './RecipeEdit.module.css';

const RecipeEdit = ({recipe, setShow, show}) => {
  const [ title, setTitle ] = useState(recipe.title);

  // refactor default value once mainIngredient option is included in
  // recipe creation
  const [ mainIngredient, setMainIngredient ] = useState(
    recipe.mainIngredient?recipe.mainIngredient:''
    );

  const [ ingredients, setIngredients ] = useState(recipe.ingredients);
  const [ directions, setDirections ] = useState(recipe.directions);
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ display, setDisplay ] = useState('');

  useEffect(() => {
    show?setDisplay(styles.overlay):setDisplay(styles.invisable);
  }, [show])

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopImediatePropigation();
    const data = { title, mainIngredient, ingredients, directions };
    // editRecipe(data).then(() => setShow(false));
  }

  const handleClick = (e) => {
    e.target.className === styles.overlay && setShow(false);
  }

// *****************holding for elements***************
// <div className={'editWrapper'}>
// <div className={'inputWrapper'}>
// <div className={'ingredientInput'}>
// <div className={'directionsInput'}>
// ****************************************************

  return (
    <div className={display} onClick={handleClick}>
      <form className={styles.submitForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input value={title} onChange={e => setTitle(e.target.value)}></input>
        </div>
        <div className={styles.inputWrapper}>
          <input value={mainIngredient} onChange={e => setMainIngredient(e.target.value)}></input>
        </div>
        <div className={styles.ingredientsWrapper}>
          <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} />
        </div>
        <div className={styles.directionsWrapper}>
          <textarea value={directions} onChange={e => setDirections(e.target.value)} />
        </div>
        <div className={'subButtonWrapper'}>
          <button className={isDisabled?'disabled':'enabled'} disabled={isDisabled}>Edit Recipe</button>
        </div>
      </form>
    </div>
  )
}

export default RecipeEdit;
