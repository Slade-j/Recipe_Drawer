import React, { useState } from 'react';

const Checkbox = ({ book, setSubValue }) => {
  const [ checked, setChecked ] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    e.target.checked ? setSubValue(prevState => [...prevState, e.target.value]):
      setSubValue(prevState => prevState.filter(el => el !== e.target.value));
  }

  return (
    <input type={'checkbox'} value={book.id} checked={checked} onChange={handleChange} />
  )
}

export default Checkbox;
