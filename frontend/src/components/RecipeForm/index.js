import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createRecipe } from '../../utils/recipeUtil';
import * as sessionActions from '../../store/session';
import Prompts from '../Prompts';
import Uploader from '../Uploader';
import styles from './RecipeForm.module.css';
import { resetReview } from '../../store/recipe';
import { useLocation } from '../../context/LocationProvider';

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
  const [ mainIngredientCheck, setMainIngredientCheck ] = useState('');
  const [ mainIngredient, setMainIngredient ] = useState('');
  const [ showPrompts, setShowPrompts ] = useState(true);
  const [ triplePrompt, setTriplePrompt ] = useState(false);
  const { enablePrompts, setEnablePrompts } = useLocation();
  const [ createTrue, setCreateTrue ] = useState(false);
  const [ highLightTrue, setHighLightTrue ] = useState(true);
  const [ createShow, setCreateShow ] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const review = useSelector(state => state.recipe.review);
  const url = useSelector(state => state.recipe.url);
  const currentUser = useSelector(state => state.session.user)


  useEffect(() => {
    if (title && ingredients && instruction) {
      setIsDisabled(false);
      setCreateTrue(true);
      createShow && setShowPrompts(true);
    } else {
      setIsDisabled(true);
    }
  }, [title, ingredients, instruction])

  useEffect(()=> {
    if (title) {
      setTitleCheck(styles.titleGood);
    } else {
      setTitleCheck('');
    }
  }, [title])

  useEffect(()=> {
    if (ingredients) {
      setIngredientsCheck(styles.ingredientsGood);
    } else {
      setIngredientsCheck('');
    }
  }, [ingredients])

  useEffect(()=> {
    if (instruction) {
      setInstructionCheck(styles.discriptionGood);
    } else {
      setInstructionCheck('');
    }
  }, [instruction])

  useEffect(() => {
    if (mainIngredient) {
      setMainIngredientCheck(styles.mainIngredientGood);
    } else {
      setMainIngredientCheck('');
    }
  })

  useEffect(() => {
    if (!review) return;
    setAreaValue(review);
    setTriplePrompt(true);
    setShowPrompts(true);
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
    const data = {
      title,
      ingredients,
      mainIngredient,
      directions: instruction,
      originUrl: url,
      userId: currentUser.id
    };
    createRecipe(data)
      .then(() => dispatch(resetReview()))
      .then(() => history.push('/recipe'));
  }

  const handleCancel = () => {
    dispatch(resetReview())
    history.goBack()
  }

  const disablePrompts = () => {
    setEnablePrompts(!enablePrompts);
  }

  const handleAreaValue = (e) => {
    setAreaValue(e.target.value);
  }

  return (
    <div className={styles.mainWrapper}>
      {showPrompts && enablePrompts &&
        <Prompts
          triplePrompt={triplePrompt}
          setShowPrompts={setShowPrompts}
          setEnablePrompts={setEnablePrompts}
          setCreateTrue={setCreateTrue}
          createTrue={createTrue}
          setHighLightTrue={setHighLightTrue}
          highLightTrue={highLightTrue}
          setCreateShow={setCreateShow}
          createShow={createShow}
        />}
      <div className={styles.grid}>
        <div className={styles.header}>
          <div className={styles.headerFlex}>
          <button className={enablePrompts?styles.hintEnabled:styles.hintDisabled} onClick={disablePrompts}>
            <span className={styles.hintSpan}>Help: </span>
            {enablePrompts?'enabled':'disabled'}
          </button>
            <span className={styles.headerTitle}>
              Create a new Recipe
            </span>
            <button className={styles.cancel} onClick={handleCancel}>
            <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className={styles.formsWrapper}>
          <div className={styles.textWrapper}>
            <form className={styles.stageingForm}>
              {areaValue?
                <textarea
                  className={styles.textArea}
                  value={areaValue}
                  onChange={handleAreaValue}>
                  </textarea>
                  :
                <Uploader />}
              <div className={styles.setWrapper}>
                <button className={styles.titleButton} onClick={handleTitle}>Set Title</button>
                <button className={styles.ingredientButton} onClick={handleIngredients}>Set Ingredients</button>
                <button className={styles.instructionButton} onClick={handleDiscription}>Set Directions</button>
              </div>
            </form>
          </div>
          <div className={styles.submitWrapper}>
            <form className={styles.submitForm} onSubmit={handleSubmit}>
              <div className={`${styles.titleInput} ${titleCheck}`}>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inputTitle}
                    value={title} onChange={e => setTitle(e.target.value)}
                    placeholder='--Enter Or Set a Title--'/>
                </div>
              </div>
              <div className={`${styles.titleInput} ${mainIngredientCheck}`}>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inputMain}
                    value={mainIngredient}
                    onChange={e => setMainIngredient(e.target.value)}
                    placeholder='--Enter The Main Ingredient--'/>
                </div>
              </div>
              <div className={`${styles.ingredientInput} ${ingredientsCheck}`}>
                <div className={styles.ingredientTextWrapper}>
                  <textarea
                    className={styles.ingredient}
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    placeholder='--Enter Or Set The Ingredients--'/>
                </div>
              </div>
              <div className={`${styles.instructionInput} ${instructionCheck}`}>
                <div className={styles.instructionTextWrapper}>
                  <textarea
                    className={styles.directions}
                    value={instruction}
                    onChange={e => setInstruction(e.target.value)}
                    placeholder='--Enter Or Set The Directions--'/>
                </div>
              </div>
              <div className={styles.subButtonWrapper}>
                <button className={isDisabled?styles.disabled:styles.enabled} disabled={isDisabled}>Create Recipe</button>
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
