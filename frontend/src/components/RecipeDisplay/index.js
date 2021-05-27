import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLimitRecipes } from '../../utils/recipeUtil';
import Recipe from '../Recipe';
import styles from './RecipeDisplay.module.css';
import header from '../../assets/recipe_backgroundSimple.jpg';
import BookCreate from '../BookCreate';
import BookMenu from '../BookMenu';
import { logout } from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';




const RecipeDisplay = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ recipes, setRecipes ] = useState([]);
  const [ offset, setOffset ] = useState(0);
  const [ show, setShow ] = useState(false);
  const [ location, setLocation ] = useState('');
  const [ changed, setChanged ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const limit = 3;

  useEffect(() => {
    if (!isLoading) return;
    getLimitRecipes({ offset, limit, userId: user.id })
      .then(res => setRecipes([...res]))
      .then(() => {
        setOffset(prevState => prevState + 3);
        setIsLoading(false)
      })
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return;
    getLimitRecipes({ offset: 0, limit, userId: user.id })
    .then(res => setRecipes([...res]))
    .then(() => {
      setOffset(prevState => prevState + 3);
      setIsLoading(false)
    })
  }, [changed])

  useEffect(() => {
    if (!recipes.length) return;
  }, [recipes])

  const signout = () => {
    dispatch(logout())
  }

  const handleUpload = () => {
    history.push('/new-recipe')
  }

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      getLimitRecipes({ offset, limit, userId: user.id })
      .then(res => setRecipes(prevState => [...prevState, ...res]))
      .then(() =>  setOffset(prevState => {
        console.log(prevState, 'prevstate', prevState + 3, 'addition');
        return prevState + 3}))
    }
  }

// ********holding for elements*********************
  // <i class="fas fa-sign-out-alt"></i>
// *************************************************

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.headWrapper}>
        <div className={styles.topSpacer}>
          <img className={styles.imger} src={header}></img>
        </div>
        <div className={styles.recipeNav}>
          <div className={styles.leftWrapper}>
            <h2 className={styles.title}>Recipe Drawer</h2>
            <span>{' | '}</span>
            <div className={'uploadWrapper'}>
              <button className={'uploader'} onClick={handleUpload}>Upload Recipe</button>
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <div className={'linkWrapper'}>
              <NavLink
                exact={true}
                to={'/recipe'}
                activeClassName={styles.selected}>
                All Recipes
                </NavLink>
            </div>
            <div className={'logoutWrapper'}>
              <button className={'logout'} onClick={signout}>Signout</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scrollFlexer} onScroll={handleScroll}>
        <div className={styles.flexer}>
          <div className={styles.header}>
          </div>
          <div className={styles.bookFlex}>
            <div className={styles.books}>
              <BookMenu setShow={setShow} setLocation={setLocation}/>
            </div>
            <div className={styles.scroller} >
              {recipes.length > 0 && recipes.map(recipe => (
                <Recipe
                key={recipe.title}
                recipe={recipe}
                changed={changed}
                setRecipes={setRecipes}
                setChanged={setChanged}/>
              ))}
            </div>
            <div className={styles.location}>
                <h1 className={styles.locationText}>All Recipes</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDisplay;
