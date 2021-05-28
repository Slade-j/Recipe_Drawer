import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookAdd.module.css';
import { addRecipe } from '../../utils/bookUtil';
import Checkbox from '../Checkbox';
import { useLocation } from '../../context/LocationProvider';

const BookAdd = ({ setAddShow, recipe }) => {
  const books = useSelector(state => state.books.allBooks);
  const [ subValue, setSubValue ] = useState([]);
  const { setMenuActive } = useLocation();

  const handleClick = (e) => {
    if (e.target.className === styles.overlay) {
      setAddShow(false);
      setMenuActive(false);
    }
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addRecipe({subValue, recipeId: recipe.id })
      .then(res => window.alert('success!'))
      .then(() => { setAddShow(false)})
  }

  // <h4 className={'question'}>Add recipe to:</h4>

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <form className={styles.submitForm} onSubmit={handleAddSubmit}>
        <h2 className={styles.select}>Select a book to add a recipe</h2>
        <div className={styles.formFlexer}>
          <div className={styles.checkboxWrapper}>
            {books.length > 0 ? books.map(book => (
              <div key={'thisKey' + book.title} className={styles.checkboxFlexer}>
                <Checkbox setSubValue={setSubValue} book={book} />
                <label key={book.id + Math.random()}>
                  <i
                    key={'fafa' + book.title}
                    className={subValue.includes(book.id.toString())? `fas fa-book ${styles.activeI}`: 'fas fa-book'}>
                    </i>
                    <span key={book.title}>{book.title}</span>
                </label>
              </div>
            )): <span key={'noBooks'}>There are no books</span>}
          </div>
          <div className={styles.confirmWrapper}>
            <div className={subValue.length > 0 ? `${styles.bookList} ${styles.activeList}`: styles.bookList}>
              {subValue.length > 0 && subValue.map(elem => {
                const book = books.find(book => parseInt(elem) === book.id)
                return <span key={'unique' + book.title}>{book.title}</span>
              })}
            </div>
            <button disabled={!subValue.length} className={styles.submit}>{subValue.length > 1? 'Add to books': 'Add to book'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BookAdd;
