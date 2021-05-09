import React, { useState, useEffect } from 'react';
import {
  mainWrapper,
  header,
  statusContainer,
  status,
  titleGood,
  ingredientsGood,
  discriptionGood,
  enabled,
  formsWrapper,
  textWrapper,
  stageing, } from './RecipeForm.module.css';

const RecipeForm = () => {
  const [ areaValue, setAreaValue ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ ingredients, setIngredients ] = useState('');
  const [ discription, setDiscription ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ titleCheck, setTitleCheck ] = useState('');
  const [ ingredientsCheck, setIngredientsCheck ] = useState('');
  const [ discriptionCheck, setDiscriptionCheck ] = useState('');

  useEffect(() => {
    if (title && ingredients && discription) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [title, ingredients, discription])

  useEffect(()=> {
    if (title) {
      setTitleCheck(titleGood);
    } else {
      setTitleCheck('');
    }
  }, [title])

  useEffect(()=> {
    if (ingredients) {
      setIngredientsCheck(ingredientsGood);
    } else {
      setIngredientsCheck('');
    }
  }, [ingredients])

  useEffect(()=> {
    if (discription) {
      setDiscriptionCheck(discriptionGood);
    } else {
      setDiscriptionCheck('');
    }
  }, [discription])


  const handleTitle = e => {
    e.preventDefault();
    window.getSelection().toString() && setTitle(window.getSelection().toString())
  }

  const handleIngredients = e => {
    e.preventDefault();
    window.getSelection().toString() && setIngredients(window.getSelection().toString())
  }

  const handleDiscription = e => {
    e.preventDefault();
    window.getSelection().toString() && setDiscription(window.getSelection().toString())
  }

  return (
    <div className={mainWrapper}>
     <div className={header}>
        <div className={statusContainer}>
          <div className={`${status} ${titleCheck}`}>
          </div>
          <div className={'instructions'}></div>
        </div>
        <div className={statusContainer}>
          <div className={`${status} ${ingredientsCheck}`}>
          </div>
          <div className={'instructions'}></div>
        </div>
        <div className={statusContainer}>
          <div className={`${status} ${discriptionCheck}`}>
          </div>
          <div className={'instructions'}></div>
        </div>
      </div>
      <div className={formsWrapper}>
        <div className={textWrapper}>
          <form className={stageing}>
            <textarea value={areaValue} onChange={e => setAreaValue(e.target.value)} ></textarea>
            <button className={'textButton'} onClick={handleTitle}>Set Title</button>
            <button className={'textButton'} onClick={handleIngredients}>Set Ingredients</button>
            <button className={'textButton'} onClick={handleDiscription}>Set Discription</button>
          </form>
        </div>
        <div className={'submitWrapper'}>
          <form>
            <div className={'titleStatus'}>
              <input value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div className={'ingredientStatus'}>
              <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} />
            </div>
            <div className={'discriptionStatus'}>
              <textarea value={discription} onChange={e => setDiscription(e.target.value)} />
            </div>
            <div className={'subButtonWrapper'}>
              <button className={isDisabled?'disabled':enabled} disabled={isDisabled}>Create Recipe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RecipeForm;

//********for mouse button up event and captureing highleted text***********
// const [ hightLight, setHightLight ] = useState('');
// onMouseUp={e => window.getSelection().toString() && setHightLight(window.getSelection().toString())}
