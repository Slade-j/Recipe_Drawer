import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchReview } from '../../store/recipe';

const MainHeader = () => {
  const [ recipeFile, setRecipeFile ] = useState('');
  const dispatch = useDispatch();

  const handleNewRecipe = (e) => {
    setRecipeFile(e.target.files[0]);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    dispatch(fetchReview(recipeFile));
  }

  return (
    <div className={'mainWrapper'}>
      <form className={'uploadForm'} onSubmit={handleUpload}>
        <label
          htmlFor='file'
          className={'uploadSelector'}>
          Choose recipe from file
          </label>
        <input
          id='file'
          name='file'
          className={'uploader'}

          onChange={handleNewRecipe}
          type='file' />
          <button className={'uploadButton'}>Submit</button>
      </form>
    </div>
  )
}

export default MainHeader;
