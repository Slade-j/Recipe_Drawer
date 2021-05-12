import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createRecipe } from '../../utils/recipeUtil';
import Uploader from '../Uploader';
import {
  mainWrapper,
  header,
  // statusContainer,
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
  // headSpacer,
  titleInput,
  ingredientInput,
  instructionInput,
  inputWrapper,
  headerTitle,
  hintHider,
  cancel,
  subButtonWrapper,
  disabled,
  ingredientTextWrapper,
  instructionTextWrapper, } from './RecipeForm.module.css';

const RecipeForm = () => {
  const [ areaValue, setAreaValue ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ ingredients, setIngredients ] = useState('');
  const [ instruction, setInstruction ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ titleCheck, setTitleCheck ] = useState('');
  const [ ingredientsCheck, setIngredientsCheck ] = useState('');
  const [ instructionCheck, setInstructionCheck ] = useState('');
  const history = useHistory();
  const review = useSelector(state => state.recipe.review);
//   const currentUser = useSelector(state => state.session.user)

//   if (!currentUser) return (
//     <Redirect to='/' />
// );

  useEffect(() => {
    if (title && ingredients && instruction) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [title, ingredients, instruction])

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
    if (instruction) {
      setInstructionCheck(discriptionGood);
    } else {
      setInstructionCheck('');
    }
  }, [instruction])

  useEffect(() => {
    if (!review) return;
    setAreaValue(review);
  }, [review])

  // <div className={`${status} ${discriptionCheck}`} />
  // <div className={`${status} ${ingredientsCheck}`} />
  // <div className={`${status} ${titleCheck}`} />


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
    window.getSelection().toString() && setInstruction(window.getSelection().toString())
  }

  const handleSubmit = e => {
    e.preventDefault();
    const data = { title, ingredients, instruction };
    createRecipe(data).then(() => history.push('/'));
  }

  return (
    <div className={mainWrapper}>
      <div className={grid}>
        <div className={header}>
          <div className={headerFlex}>
            <button className={cancel}>Cancel</button>
            <span className={headerTitle}>
              Create a new Recipe!
            </span>
            <button className={hintHider}>Disable prompts</button>
          </div>
        </div>
        <div className={formsWrapper}>
          <div className={textWrapper}>
            <form className={stageingForm}>
              {areaValue !== ''?
                <textarea
                  className={textArea}
                  value={areaValue}
                  onChange={e => setAreaValue(e.target.value)}>
                  </textarea>
                  :
                <Uploader />}
              <div className={setWrapper}>
                <button className={titleButton} onClick={handleTitle}>Set Title</button>
                <button className={ingredientButton} onClick={handleIngredients}>Set Ingredients</button>
                <button className={instructionButton} onClick={handleDiscription}>Set Discription</button>
              </div>
            </form>
          </div>
          <div className={submitWrapper}>
            <form className={submitForm} onSubmit={handleSubmit}>
              <div className={`${titleInput} ${titleCheck}`}>
                <div className={inputWrapper}>
                  <input value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
              </div>
              <div className={`${ingredientInput} ${ingredientsCheck}`}>
                <div className={ingredientTextWrapper}>
                  <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} />
                </div>
              </div>
              <div className={`${instructionInput} ${instructionCheck}`}>
                <div className={instructionTextWrapper}>
                  <textarea value={instruction} onChange={e => setInstruction(e.target.value)} />
                </div>
              </div>
              <div className={subButtonWrapper}>
                <button className={isDisabled?disabled:enabled} disabled={isDisabled}>Create Recipe</button>
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
