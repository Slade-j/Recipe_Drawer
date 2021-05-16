import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const BookMenu = () => {
  const userBooks = useSelector(state => state.books.allBooks);
  const [ show, setShow ] = useState(false);

  const handleCreate = (e) => {

  }

  // **************holding elements*****************
  // <i className="fas fa-book fa-2x"></i>
  // ***********************************************

  return (
    <div className={'mainWrapper'}>
      <div className={'header'}>
        <span className={'books'}>Recipe Books</span>
        <button className={'createBook'} onClick={handleCreate}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className={'collections'}>
        {userBooks && userBooks.map(book => (
          <div key={Math.random() + book.title} className={'navWrapper'}>
            <NavLink key={book.title} to={`/recipe/${book.id}`} exact={true}>
              <span key={book.title + Math.random()} className={'title'}>
              {book.title}
              </span>
            </NavLink>
            <button className={'deleteBook'} key={Math.random() + book.id}>
              <i key={Math.random() + Math.random()} className="far fa-times-circle"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookMenu;
