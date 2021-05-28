import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './BookCreate.module.css';
// import { createBook } from '../../utils/bookUtil';
import { createBook } from '../../store/books';
import { useHistory } from 'react-router-dom';
import { useLocation } from '../../context/LocationProvider';

const BookCreate = ({ user, setShow }) => {
  const [ title, setTitle ] = useState('');
  // const [ recipes, setRecipes ] = useState([]);
  const [ isDisabled, setIsDisabled ] = useState(true);
  const { setMenuActive } = useLocation();
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
    dispatch(createBook({ title, userId: user.id }))
      .then(() => setShow(false))
      // .then(book => history.push(`/${book.newBook.id}`));

  }

  const handleCancel = (e) => {
    e.stopPropagation();
    setShow(false);
    setMenuActive(false);
  }

  const handleClick = (e) => {
    if (e.target.className === styles.overlay) {
      setShow(false);
      setMenuActive(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.mainWrapper}>
        <div className={styles.cancelWrapper}>
          <button className={styles.canceler} onClick={handleCancel}>
          <i class="fas fa-times"></i>
          </button>
        </div>
        <form className={styles.submitForm} onSubmit={handleCreate}>
          <div className={styles.inputWrapper}>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Enter New Book Title' />
          </div>
          <div className={styles.subButtonWrapper}>
            <button className={styles.addRecipes} onClick={handleCancel}>Add Recipes</button>
            <div className={styles.or}><span>OR</span></div>
            <button className={styles.create} disabled={isDisabled}>Create Book Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookCreate;
