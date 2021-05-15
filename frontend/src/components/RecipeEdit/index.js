import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    const data = { title, mainIngredient, ingredients, directions };
    // editRecipe(data).then(() => setShow(false));
  }

  const handleClick = (e) => {
    e.target.className === styles.overlay && setShow(false);
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);

    if (e.target.value !== recipe.title) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handleMainIngredient = (e) => {
    setMainIngredient(e.target.value);
    console.log(!e.target.value, recipe.mainIngredient, "COMPARE")

    if (e.target.value !== recipe.mainIngredient) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handleIngredients = (e) => {
    setIngredients(e.target.value);

    if (e.target.value !== recipe.ingredients) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handleDirections = (e) => {
    setDirections(e.target.value);

    if (e.target.value !== recipe.directions) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(false);

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
          <input value={title} onChange={handleTitle}></input>
        </div>
        <div className={styles.inputWrapper}>
          <input value={mainIngredient} onChange={handleMainIngredient}></input>
        </div>
        <div className={styles.ingredientsWrapper}>
          <textarea value={ingredients} onChange={handleIngredients} />
        </div>
        <div className={styles.directionsWrapper}>
          <textarea value={directions} onChange={handleDirections} />
        </div>
        <div className={styles.subButtonWrapper}>
        <button className={styles.canceler} onClick={handleCancel}>Cancel</button>
        <button className={styles.editer} disabled={isDisabled}>Edit Recipe</button>
        </div>
      </form>
    </div>
  )
}

export default RecipeEdit;
