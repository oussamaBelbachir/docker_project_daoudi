import React from 'react'
import "./Dropdown.styles.scss";

function Dropdown({items}) {
  return (
    <div className='dropdown'>
        {
            items.map(el => <div>{el.title}</div>)
        }
    </div>
  )
}

export default Dropdown