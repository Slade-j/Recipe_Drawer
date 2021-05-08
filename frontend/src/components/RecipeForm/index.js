import React, { useState, useEffect } from 'react';

const RecipeForm = () => {
  const [ areaValue, setAreaValue ] = useState('');
  const [ hightLight, setHightLight ] = useState('');

  useEffect(() => {
    console.log(hightLight, "this is highlighted text")
  }, [hightLight])

  useEffect(() => {
    console.log(areaValue, "areaValue")
  }, [areaValue]);

  return (
    <div >
      <form onMouseUp={e => window.getSelection().toString() && setHightLight(window.getSelection().toString())}>
        <textarea value={areaValue} onChange={e => setAreaValue(e.target.value)} >
        </textarea>
      </form>
    </div>
  )
}

export default RecipeForm;
