import React from 'react'

const Filter = ({searchTerm, handleSearchTerm}) => {
  return (
    <div>filter shown with <input value={searchTerm} onChange={handleSearchTerm}/><br/></div>
    )
}

export default Filter
