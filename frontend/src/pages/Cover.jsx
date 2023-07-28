import React from 'react'
import SideImg from '../assets/wastecan.png'

const Cover = () => {
  return (
    <div className=' flex flex-col'>
      <div className=''>
        <h1 className=' text-2xl font-bold'>Waste2Wealth</h1>
        <p>Waste2Wealth addresses environment waste pollution challenges with a unique business model that encourages responsible waste disposal while providing affordable access to comprehensive health insurance plans. This project has established a network of modern waste collection centers, aptly called "EcoHubs," strategically placed in various communities.</p>
      </div>
      <div>
        <img src={SideImg} alt="waste can" />
      </div>
    </div>
  )
}

export default Cover
