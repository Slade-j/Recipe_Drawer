import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLimitBooks } from '../../utils/bookUtil';
import { useParams, Link, useHistory } from 'react-router-dom';
import Recipe from '../Recipe';
import styles from '../RecipeDisplay/RecipeDisplay.module.css';
import header from '../../assets/recipe_backgroundSimple.jpg';
import BookCreate from '../BookCreate';
import BookMenu from '../BookMenu';
import { logout } from '../../store/session';




const BooksDisplay = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ recipes, setRecipes ] = useState([]);
  const [ offset, setOffset ] = useState(0);
  const [ show, setShow ] = useState(false);
  const [ changed, setChanged ] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
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

  const signout = () => {
    dispatch(logout())
  }

  const handleUpload = () => {
    history.push('/new-recipe')
  }

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      getLimitBooks({ offset, limit, id })
      .then(res => setRecipes(prevState => [...prevState, ...res]))
      .then(() =>  setOffset(prevState => {
        console.log(prevState, 'prevstate', prevState + 3, 'addition');
        return prevState + 3}))
    }
  }

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
              <Link
                id={styles.link}
                exact={true}
                to={'/recipe'}>
                All Recipes
                </Link>
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
            {show && <BookCreate user={user} setShow={setShow}/>}
          </div>
          <div className={styles.bookFlex}>
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
      </div>
    </div>
  )
}

export default BooksDisplay;
