import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLimitRecipes } from '../../utils/recipeUtil';
import { NavLink } from 'react-router-dom';
import Recipe from '../Recipe';
import styles from './RecipeDisplay.module.css';
import header from '../../assets/recipe_backgroundSimple.jpg';




const RecipeDisplay = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ recipes, setRecipes ] = useState([]);
  const [ offset, setOffset ] = useState(0);
  const user = useSelector(state => state.session.user);
  const limit = 4;

  useEffect(() => {
    if (!isLoading) return;
    getLimitRecipes({ offset, limit, userId: user.id })
      .then(res => setRecipes([...res]))
      .then(() => {
        setOffset(prevState => prevState + 4);
        setIsLoading(false)
      })
  }, [isLoading])

  useEffect(() => {
    if (!recipes.length) return;
    console.log(recipes, "RECIPES>>>>>>>>>>>")
  }, [recipes])

  // useEffect(() => {
  //   console.log(document., 'DOCUMENT!!!!!!!!!')
  //   console.log(window, "WINDOW>>>>>>>>>>>>>>>")
  // }, [])

// ********holding for elements*********************

// *************************************************
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.topSpacer}>
      <img className={styles.imger} src={header}></img>
      </div>
      <div className={styles.recipeNav}></div>
      <div className={styles.header}></div>
      <div className={styles.scrollFlexer}>
        <div className={styles.books} />
        <div className={styles.scroller} >
        {recipes.length > 0 && recipes.map(recipe => (
          <Recipe recipe={recipe} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeDisplay;
