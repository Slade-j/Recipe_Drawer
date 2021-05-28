import React, { useState } from 'react';
import styles from './Prompts.module.css';


const Prompts = ({ setEnablePrompts, setShowPrompts }) => {


  const gotItOne = () => {
    setShowPrompts(false);
  }

  const disablePrompts = () => {
    setEnablePrompts(false);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.introBubble}>
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
          <span>Or</span>
          <span>Create a recipe from scratch on the right!</span>
          <div className={styles.buttonWrapper}>
            <button className={styles.gotIt} onClick={gotItOne}>got it</button>
          </div>
        </div>
      </div>
      <div className={styles.editBubble}>
        <h3>edit</h3>
      </div>
      <div className={styles.highlightBubble}>
        <h3>highlight</h3>
      </div>
      <div className={styles.buttonsBubble}>
        <h3>setbuttons</h3>
      </div>
      <div className={styles.createBubble}>
        <h3>create</h3>
      </div>
    </div>
  )
}

export default Prompts;
