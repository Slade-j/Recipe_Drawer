import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLimitRecipes } from '../../utils/recipeUtil';



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

  return (
    <div className={'mainWrapper'}>
      <div className={'header'}></div>
      <div className={'scrollFlexer'}>
        <div className={'books'} />
        <div className={'scroller'} >
        {recipes.length > 0 && recipes.map(recipe => (
          <div key={recipe.title}>{recipe.title}</div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeDisplay;
