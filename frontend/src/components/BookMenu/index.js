import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useLocation } from '../../context/LocationProvider';
import { deleteBook } from '../../store/books';
import BookCreate from '../BookCreate';
import styles from './BookMenu.module.css';

const BookMenu = ({ currentId, setLocation }) => {
  const userBooks = useSelector(state => state.books.allBooks);
  const user = useSelector(state => state.session.user);
  const [ show, setShow ] = useState(false);
  const { setMenuActive } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();


  const handleCreate = (e) => {
    setShow(true);
    setMenuActive(true);
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
      <div className={styles.collections}>
        {show && <BookCreate user={user} setShow={setShow}/>}
        {userBooks && userBooks.map(book => (
          <div key={Math.random() + book.title} className={styles.navWrapper}>
            <NavLink className={styles.nav} key={book.title} to={`/${book.id}`} exact={true} activeClassName={styles.activeNav} onClick={e => setLocation(book.title)}>
              <span key={book.title + Math.random()} className={styles.title}>
              {book.title}
              </span>
            </NavLink>
            <button className={styles.deleteBook} key={Math.random() + book.id} onClick={() => handleDelete(book.id, book.title)}>
            <i key={Math.random() + Math.random()} className="fas fa-minus"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookMenu;
