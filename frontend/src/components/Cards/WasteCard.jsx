import React from 'react'

//   wasteType: string,
//   collectionLocation: string,
//   weight: string,
//   wasteAmount: string
//   hospitalAdress: string

const WasteCard = () => {
  return (
    <div className='max-w-md m-auto text-white bg-[#06102b] rounded-lg w-72 drop-shadow-2xl p-2'>
      <div className=' pl-2'>
        <h1 className=' '><span className='text-xl font-bold text-blue-700'>Collector Address</span><br/> 0x12245677777777</h1>
      </div>
      <div className='pl-2'>
        <p className=' text-lg font-medium pt-2'>Waste Type: </p>
        <p className=' text-lg font-medium pt-2'>Weight: </p>
        <p className=' text-lg font-medium pt-3'>Waste Amount: </p>
        <p className=' text-lg font-medium p-1'>Hopital Choice Address: </p>
        <p>Date</p>
      </div>
      <div className=' flex justify-center items-center'>
        <button className=' bg-white py-2 px-2 rounded-lg font-medium text-blue-700 hover:text-white hover:bg-[#efae07] mt-5 mb-5'>Transfer Payment</button>
      </div>
    </div>
  )
}

export default WasteCard