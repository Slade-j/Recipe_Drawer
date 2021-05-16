import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './BookCreate.module.css';
import { createBook } from '../../utils/bookUtil';
import { useHistory } from 'react-router-dom';

const BookCreate = ({ user, setShow }) => {
  const [ title, setTitle ] = useState('');
  // const [ recipes, setRecipes ] = useState([]);
  const [ isDisabled, setIsDisabled ] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (title) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title])


  const handleCreate = (e) => {
    e.preventDefault();
    createBook({ title, userId: user.id })
      .then(book => history.push(`/recipe/${book.newBook.id}`));

  }

  const handleCancel = (e) => {
    e.stopPropagation();
    setShow(false);
  }

  const handleClick = (e) => {
    e.target.className === styles.overlay && setShow(false);
  }

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <form className={styles.submitForm} onSubmit={handleCreate}>
        <div className={'cancelWrapper'}>
          <button className={'canceler'} onClick={handleCancel}>Cancel</button>
        </div>
        <div className={'inputWrapper'}>
          <input value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div className={'subButtonWrapper'}>
          <button className={'addRecipes'} onClick={handleCancel}>Add Recipes</button>
          <div className={'or'}><span>OR</span></div>
          <button className={'create'} disabled={isDisabled}>Create Book Now</button>
        </div>
      </form>
    </div>
  )
}

export default BookCreate;
