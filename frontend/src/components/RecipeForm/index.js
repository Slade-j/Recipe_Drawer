import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createRecipe } from '../../utils/recipeUtil';
import * as sessionActions from '../../store/session';
import Uploader from '../Uploader';
import styles, {
  titleGood,
  ingredientsGood,
  discriptionGood,
  enabled,
  submitWrapper,
  submitForm,
  setWrapper,
  textArea,
  titleButton,
  ingredientButton,
  instructionButton,
  titleInput,
  ingredientInput,
  instructionInput,
  inputWrapper,
  subButtonWrapper,
  disabled,
  ingredientTextWrapper,
  instructionTextWrapper, } from './RecipeForm.module.css';
import { resetReview } from '../../store/recipe';

const RecipeForm = () => {
  // const [ loaded, setLoaded ] = useState(false);
  const [ areaValue, setAreaValue ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ ingredients, setIngredients ] = useState('');
  const [ instruction, setInstruction ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ titleCheck, setTitleCheck ] = useState('');
  const [ ingredientsCheck, setIngredientsCheck ] = useState('');
  const [ instructionCheck, setInstructionCheck ] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const review = useSelector(state => state.recipe.review);
  const url = useSelector(state => state.recipe.url);
  const currentUser = useSelector(state => state.session.user)


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
    // if (!review) return;
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
    console.log(window.getSelection().toString().split('\n'), "DID THIS WORK")
    window.getSelection().toString() && setIngredients(window.getSelection().toString())
  }

  const handleDiscription = e => {
    e.preventDefault();
    window.getSelection().toString() && setInstruction(window.getSelection().toString())
  }

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      title,
      ingredients,
      directions: instruction,
      originUrl: url,
      userId: currentUser.id
    };
    createRecipe(data)
      .then(() => dispatch(resetReview()))
      .then(() => history.push('/recipe'));
  }

  const handleCancel = () => {
    history.goBack();
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.grid}>
        <div className={styles.header}>
          <div className={styles.headerFlex}>
            <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
            <span className={styles.headerTitle}>
              Create a new Recipe!
            </span>
            <button className={styles.hintHider}>Disable prompts</button>
          </div>
        </div>
        <div className={styles.formsWrapper}>
          <div className={styles.textWrapper}>
            <form className={styles.stageingForm}>
              {areaValue?
                <textarea
                  className={textArea}
                  value={areaValue}
                  onChange={e => setAreaValue(e.target.value)}>
                  </textarea>
                  :
                <Uploader />}
              <div className={styles.setWrapper}>
                <button className={styles.titleButton} onClick={handleTitle}>Set Title</button>
                <button className={styles.ingredientButton} onClick={handleIngredients}>Set Ingredients</button>
                <button className={styles.instructionButton} onClick={handleDiscription}>Set Discription</button>
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
                  <textarea id={'ingredient'} value={ingredients} onChange={e => setIngredients(e.target.value)} />
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
