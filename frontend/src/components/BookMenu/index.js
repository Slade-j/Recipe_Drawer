import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteBook } from '../../store/books';
import styles from './BookMenu.module.css';

const BookMenu = ({ setShow, currentId }) => {
  const userBooks = useSelector(state => state.books.allBooks);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const handleCreate = (e) => {
    setShow(true);
  }

  const handleDelete = (bookId, title) => {
    window.confirm(`Delete ${title}?`) &&
    dispatch(deleteBook({ bookId, userId: user.id}))
      .then(() => {
        if (Number(currentId) === Number(bookId)) {
          history.push('/recipe');
        }
      })
  }

  // **************holding elements*****************
  // <i className="fas fa-book fa-2x"></i>
  // ***********************************************

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <span className={styles.books}>Recipe Books</span>
        <button className={styles.createBook} onClick={handleCreate}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className={'collections'}>
        {userBooks && userBooks.map(book => (
          <div key={Math.random() + book.title} className={'navWrapper'}>
            <NavLink key={book.title} to={`/${book.id}`} exact={true}>
              <span key={book.title + Math.random()} className={'title'}>
              {book.title}
              </span>
            </NavLink>
            <button className={'deleteBook'} key={Math.random() + book.id} onClick={() => handleDelete(book.id, book.title)}>
              <i key={Math.random() + Math.random()} className="far fa-times-circle"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookMenu;
