import React from 'react'

const Select = ({Optiona}) => {
  return (
    <div>
        <select>
           {Optiona.map((item,ind)=>{
            return(
                <option key={ind}>{item}</option>
            )
           })}
        </select>
    </div>
  )
}

export default Select