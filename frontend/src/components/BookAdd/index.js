import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookAdd.module.css';
import { addRecipe } from '../../utils/bookUtil';

const BookAdd = ({ setAddShow, recipe }) => {
  const books = useSelector(state => state.books.allBooks);
  const [ subValue, setSubValue ] = useState('');

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
        <div className={styles.grid}>
          {books.length > 0 ? books.map(book => (
            <label htmlFor={book.id} key={book.id + Math.random()}>
            <i className="far fa-edit fa-2x"></i>{book.title}
              <input
                id={book.id}
                key={book.title}
                className={'bookInput'}
                value={book.id}
                onClick={e => setSubValue(e.target.value)}/>
            </label>
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
