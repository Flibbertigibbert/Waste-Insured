import React from 'react'

const WasteFilter = ({ onSearch }) => {
  return (
    <div className='flex justify-center '>
        <input type="text" className='border-[#EFAE07] border-2 rounded-3xl py-2 px-5' onChange={(e) => onSearch(e.target.value)} placeholder="Search Records" name="searchBar" id="searchBar" />
    </div>
  )
}

export default WasteFilter