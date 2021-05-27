import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookAdd.module.css';
import { addRecipe } from '../../utils/bookUtil';
import Checkbox from '../Checkbox';
import { bindActionCreators } from 'redux';

const BookAdd = ({ setAddShow, recipe }) => {
  const books = useSelector(state => state.books.allBooks);
  const [ subValue, setSubValue ] = useState([]);

  const handleClick = (e) => {
    e.target.className === styles.overlay && setAddShow(false);
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addRecipe({subValue, recipeId: recipe.id })
      .then(res => window.alert('success!'))
      .then(() => { setAddShow(false)})
  }

  return (
    <div className={styles.overlay} onClick={handleClick}>
      <form className={styles.submitForm} onSubmit={handleAddSubmit}>
        <h2 className={styles.select}>Select a book to add a recipe</h2>
        <div className={styles.checkboxWrapper}>
          {books.length > 0 ? books.map(book => (
            <div className={styles.checkboxFlexer}>
              <Checkbox setSubValue={setSubValue} book={book} />
              <label key={book.id + Math.random()}>
                <i class="fas fa-book"></i><span key={book.title}>{book.title}</span>
              </label>
            </div>
          )): <span key={'noBooks'}>There are no books</span>}
        </div>
        <div className={'confirmWrapper'}>
          <span className={'question'}>Add recipe to</span>
          <input className={'subVal'} value={subValue}/>
          <button className={'submit'}>Confrim</button>
        </div>
      </form>
    </div>
  )
}

export default BookAdd;
