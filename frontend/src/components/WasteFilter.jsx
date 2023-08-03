import React from 'react'

const WasteFilter = ({ onSearch }) => {
  return (
    <div>
        <input type="text" onChange={(e) => onSearch(e.target.value)} placeholder="Enter the name of the records" name="searchBar" id="searchBar" />
    </div>
  )
}

export default WasteFilter