import React from "react"


  const HospitalFilter = ({ onSearch }) => {
    return (
      <div>
        <input type="text" onChange={(e) => onSearch(e.target.value)} placeholder="Search Waste Type" name="searchBar" id="searchBar" />
        <button>Search</button>
      </div>
    )
  }
  
  export default HospitalFilter