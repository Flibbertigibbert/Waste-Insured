import React, { useState } from 'react';
import { IoAddCircleSharp, IoCloseCircle } from "react-icons/io5";

const AddWasteModal = () => {
  const [name, setName] = useState('')
  const [collectionLocation, setCollectionLocation] = useState('')
  const [weight, setWeight] = useState('')
  const [wasteAmount, setWasteAmount] = useState('')
  const [hospitalAddress, setHospitalAddress] = useState('')
  const [toggle, setToggle ] = useState(false)

  return (
    <div className='flex mb-10'>
        <button id='modalBioDate' type='button' data-bs-toggle="modalBioData" 
        data-bs-target='#modalCenter' className=' text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl' onClick={() => setToggle(true)}>
          Submit Waste
        </button>
          {toggle && (
            // w-[600px] rounded-2xl bg-slate-100 p-5
            <div id='modalBioData' className='flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6'>
              <div className='w-[600px] rounded-2xl bg-slate-100 p-5'>
                <form>
                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setName(e.target.value)} className='border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl' name='Name' id="Name" placeholder='Full Name' />
                      </div>

                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setCollectionLocation(e.target.value)} className=' border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl' name='collectionLocation' id="collectionLocation" placeholder='Hospital Location' />
                      </div>

                      <div className='mb-8'>
                          <input type="number" onChange={(e) => setWeight(e.target.value)} className=' border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl' name='wasteKg' id="wasteKg" placeholder='Waste Kg' />
                      </div>
                      <div className='mb-8'>
                          <input type="number" onChange={(e) => setWasteAmount(e.target.value)} className=' border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl' name='wasteAmount' id="wasteAmount" placeholder='Waste Amount' />
                      </div>
                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setHospitalAddress(e.target.value)} className=' border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl' name='hospitaladdress' id="hospitalAddress" placeholder='Hospital wallet Address' />
                      </div>
                      <div className=' flex justify-between'>
                        <button type='submit' className=' border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full' >
                          Recording Waste
                        </button>
                        <button type='button' onClick={() => setToggle(false)}><IoCloseCircle  size={30} color="#06102b"/></button>
                      </div>
                </form>
              </div>
            </div>
          )}

      </div>
  )
}

export default AddWasteModal
