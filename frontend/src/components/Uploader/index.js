import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchReview } from '../../store/recipe';
import styles from './Uploader.module.css';

const Uploader = () => {
  const [ recipeFile, setRecipeFile ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const dispatch = useDispatch();

  const handleNewRecipe = (e) => {
    setRecipeFile(e.target.files[0]);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    dispatch(fetchReview(recipeFile));
    setIsLoading(true)
  }

  useEffect (() => {
    if (!recipeFile) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [recipeFile])

  return (
    <div className={styles.mainWrapper}>
      {isLoading? <div className={styles.isLoading}><h1>Loading...</h1></div>:
        <div className={styles.uploadForm}>
          <label
            htmlFor='file'
            className={styles.uploadSelector}>{recipeFile ? "Change selection":
            'Choose recipe from file'}
            </label>
          <input
            id='file'
            name='file'
            className={styles.uploader}
            onChange={handleNewRecipe}
          type='file' />
          {recipeFile &&
            <div className={styles.previewer}>
              <img className={styles.imger}src={URL.createObjectURL(recipeFile)} />
            </div>}
          <button disabled={isDisabled} onClick={handleUpload} className={styles.uploadButton}>Submit</button>
        </div>}
    </div>
  )
}

export default Uploader;
