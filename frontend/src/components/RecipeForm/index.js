import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
  submitWrapper,
  stageingForm,
  submitForm,
  setWrapper,
  headerFlex,
  textArea,
  titleButton,
  ingredientButton,
  instructionButton,
  grid,
  headSpacer,
  titleInput,
  ingredientInput,
  instructionInput,
  inputWrapper, } from './RecipeForm.module.css';

const RecipeForm = () => {
  const [ areaValue, setAreaValue ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ ingredients, setIngredients ] = useState('');
  const [ discription, setDiscription ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ titleCheck, setTitleCheck ] = useState('');
  const [ ingredientsCheck, setIngredientsCheck ] = useState('');
  const [ discriptionCheck, setDiscriptionCheck ] = useState('');
//   const currentUser = useSelector(state => state.session.user)

//   if (!currentUser) return (
//     <Redirect to='/' />
// );

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
      <div className={grid}>
        <div className={header}>
          <div className={headerFlex}>
            <div className={headSpacer} />
            <div className={statusContainer}>
              <div className={`${status} ${titleCheck}`}>
              </div>
              <div className={'titlePrompt'}>
                <p className={'prompts'}>
                  Select a title or enter a new one.
                </p>
              </div>
            </div>
            <div className={statusContainer}>
              <div className={`${status} ${ingredientsCheck}`}>
              </div>
              <div className={'ingredientsPrompt'}></div>
            </div>
            <div className={statusContainer}>
              <div className={`${status} ${discriptionCheck}`}>
              </div>
              <div className={'instructionsPrompt'}></div>
            </div>
          </div>
        </div>
        <div className={formsWrapper}>
          <div className={textWrapper}>
            <form className={stageingForm}>
              <textarea
                className={textArea}
                value={areaValue}
                onChange={e => setAreaValue(e.target.value)}>
                </textarea>
              <div className={setWrapper}>
                <button className={titleButton} onClick={handleTitle}>Set Title</button>
                <button className={ingredientButton} onClick={handleIngredients}>Set Ingredients</button>
                <button className={instructionButton} onClick={handleDiscription}>Set Discription</button>
              </div>
            </form>
          </div>
          <div className={submitWrapper}>
            <form className={submitForm}>
              <div className={titleInput}>
                <div className={`${status} ${titleCheck}`} />
                <div className={inputWrapper}>
                  <input value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
              </div>
              <div className={ingredientInput}>
                <div className={`${status} ${ingredientsCheck}`} />
                <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} />
              </div>
              <div className={instructionInput}>
                <div className={`${status} ${discriptionCheck}`} />
                <textarea value={discription} onChange={e => setDiscription(e.target.value)} />
              </div>
              <div className={'subButtonWrapper'}>
                <button className={isDisabled?'disabled':enabled} disabled={isDisabled}>Create Recipe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeForm;

//********for mouse button up event and captureing highleted text***********
// const [ hightLight, setHightLight ] = useState('');
// onMouseUp={e => window.getSelection().toString() && setHightLight(window.getSelection().toString())}
