import React, {useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";

const SetCollectorModal = () => {
    const [toggle, setToggle] = useState(false)
    const [Collector, setCollector] = useState('')
  return (
    <div className=' flex bg-white rounded-xl mb-6'>
            <button id='modalBioDate' type='button' data-bs-toggle="modalBioData" 
            data-bs-target='#modalCenter' className=' text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl' onClick={() => setToggle(true)}>
                Add Collector
            </button>
        {toggle && (
            <div className='flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6'>
               <div className=' w-[600px] rounded-2xl bg-slate-100 p-5'>
                <form>
                  <h1 className=' text-[#131825] mt-5 font-bold max-md:text-white max-sm:text-white' >Your Must Be wasste Admin Before You Assign Collector</h1>
                  <input type="text" onChange={(e) => setCollector(e.target.value)} name="Wastecollector" id="wasteCollector"  className=' mt-5 py-4 px-6 w-full rounded-full text-black border-2 border-[#EFAE07]' placeholder='Enter Collector Address'/>
                  <div className=' flex justify-between mt-5'>
                  <button type='submit' className=' border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full' >
                      Adding Collector
                  </button>
                  <button type='button' className='' onClick={() => setToggle(false)}><IoCloseCircle  size={30} color="#efae07"/></button>
                  </div>
                </form>
               </div>
            </div>
        )}        
    </div>
  )
}

export default SetCollectorModal