import React, { useState } from 'react';
import styles from './Prompts.module.css';


const Prompts = ({
  setEnablePrompts,
  setShowPrompts,
  triplePrompt,
  createTrue,
  setHighLightTrue,
  highLightTrue,
  createShow,
  setCreateShow}) => {
  const [ editTrue, setEditTrue ] = useState(false);
  const [ buttonsTrue, setButtonsTrue ] = useState(false);


  const gotItOne = () => {
    setShowPrompts(false);
  }

  const disablePrompts = () => {
    setEnablePrompts(false);
  }

  const gotItTwo = () => {
    setHighLightTrue(false);
    setButtonsTrue(true);
  }

  const gotItThree = () => {
    setButtonsTrue(false);
    setEditTrue(true);
  }

  const gotItFour = () => {
    setEditTrue(false);
    setShowPrompts(false);
  }

  const gotItFive = () => {
    setCreateShow(false);
    setShowPrompts(false);
  }

  return (
    <div className={styles.overlay}>
      {!triplePrompt && <div className={styles.introBubble}>
        <div className={styles.promptsFlexer}>
          <button className={styles.prompts} onClick={disablePrompts}>
            <i className="fas fa-ban"></i>
            <span className={styles.disable}>disable prompts</span>
          </button>
        </div>
        <div className={styles.textWrapper}>
          <h4>Welcome!</h4>
          <span>
            Choose a recipe you would like to
            upload on the left
          </span>
          <span>Or, create a recipe from scratch on the right!</span>
          <div className={styles.buttonWrapper}>
            <button className={styles.gotIt} onClick={gotItOne}>got it</button>
          </div>
        </div>
      </div>}
      {triplePrompt && highLightTrue && <div className={styles.highlightBubble}>
        <div className={styles.promptsFlexer}>
          <button className={styles.prompts} onClick={disablePrompts}>
            <i className="fas fa-ban"></i>
            <span className={styles.disable}>disable prompts</span>
          </button>
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.lightSpan}>Now high-light either the title, the ingredients, or the directions . . .</span>
          <div className={styles.buttonWrapper}>
            <button className={styles.gotIt} onClick={gotItTwo}>ok</button>
          </div>
        </div>
      </div>}
      {triplePrompt && buttonsTrue && <div className={styles.buttonsBubble}>
        <div className={styles.promptsFlexer}>
          <button className={styles.prompts} onClick={disablePrompts}>
            <i className="fas fa-ban"></i>
            <span className={styles.disable}>disable prompts</span>
          </button>
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.buttonSpan}>After you have high-lighted an element, click on the corresponding button to set it in the creation form.</span>
          <div className={styles.buttonWrapper}>
            <button className={styles.gotIt} onClick={gotItThree}>ok</button>
          </div>
        </div>
      </div>}
      {triplePrompt && editTrue && <div className={styles.editBubble}>
        <div className={styles.promptsFlexer}>
          <button className={styles.prompts} onClick={disablePrompts}>
            <i className="fas fa-ban"></i>
            <span className={styles.disable}>disable prompts</span>
          </button>
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.editSpan}>You can edit your recipe anytime!</span>
          <span className={styles.editSpan}>Make edits before or after setting content into the form</span>
          <div className={styles.buttonWrapper}>
            <button className={styles.gotIt} onClick={gotItFour}>got it</button>
          </div>
        </div>
      </div>}
      {createTrue && createShow && <div className={styles.createBubble}>
        <div className={styles.promptsFlexer}>
          <button className={styles.prompts} onClick={disablePrompts}>
            <i className="fas fa-ban"></i>
            <span className={styles.disable}>disable prompts</span>
          </button>
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.createSpan}>Once your recipe is how you like, just click the 'Create Recipe' button. Cheers!</span>
          <div className={styles.buttonWrapper}>
            <button className={styles.gotIt} onClick={gotItFive}>got it</button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Prompts;
