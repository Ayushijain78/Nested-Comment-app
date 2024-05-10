import React from 'react'

const Action = ({type, onclick}) => {
  return (
    <div className='action' onClick={onclick}>
      {type}
    </div>
  )
}

export default Action
