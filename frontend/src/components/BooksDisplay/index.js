import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLimitRecipes } from '../../utils/recipeUtil';
import { getLimitBooks } from '../../utils/bookUtil';
import { useParams, useRouteMatch } from 'react-router-dom';
import Recipe from '../Recipe';
import styles from '../RecipeDisplay/RecipeDisplay.module.css';
import header from '../../assets/recipe_backgroundSimple.jpg';
import BookCreate from '../BookCreate';
import BookMenu from '../BookMenu';




const BooksDisplay = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ recipes, setRecipes ] = useState([]);
  const [ offset, setOffset ] = useState(0);
  const [ show, setShow ] = useState(false);
  const [ changed, setChanged ] = useState(false);
  const user = useSelector(state => state.session.user);
  const id = useParams().bookid;
  const limit = 4;

  useEffect(() => {
    if (!isLoading) return;
      getLimitBooks({ offset, limit, id })
        .then(res => setRecipes([...res.Recipes]))
        .then(() => {
          setOffset(prevState => prevState + 4);
          setIsLoading(false)
        })
  }, [isLoading])

  useEffect(() => {
    if (!recipes.length) return;
  }, [recipes])

  useEffect (() => {
    setOffset(0)
    setIsLoading(true);
  }, [id])

  useEffect(() => {
    if (isLoading) return;
    getLimitBooks({ offset: 0, limit, id })
    .then(res => setRecipes([...res.Recipes]))
    .then(() => {
      setOffset(prevState => prevState + 4);
      setIsLoading(false)
    })
  }, [changed])

  const handleAdd = () => {
    console.log('clicked')
  }

  // useEffect(() => {
  //   console.log(document., 'DOCUMENT!!!!!!!!!')
  //   console.log(window, "WINDOW>>>>>>>>>>>>>>>")
  // }, [])

// ********holding for elements*********************
// <button className={'addRecipe'} onClick={handleAdd}>
//             Add a recipe
//           </button>
// *************************************************
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.headWrapper}>
        <div className={styles.topSpacer}>
          <img className={styles.imger} src={header}></img>
        </div>
        <div className={styles.recipeNav}></div>
        <div className={styles.header}>
          {show && <BookCreate user={user} setShow={setShow}/>}
        </div>
      </div>
      <div className={styles.scrollFlexer}>
        <div className={styles.books}>
          <BookMenu setShow={setShow} currentId={id}/>
        </div>
        <div className={styles.scroller} >
          {recipes.length > 0 && recipes.map(recipe => (
            <Recipe
            key={recipe.title}
            recipe={recipe}
            bookId={id}
            changed={changed}
            setChanged={setChanged}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BooksDisplay;
