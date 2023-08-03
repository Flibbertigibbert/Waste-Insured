import React, { useState } from 'react';
import {  IoCloseCircle } from "react-icons/io5";
import { useContractSend } from '../../hooks/useContractWrite';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import ERC20 from '../../abi/erc20InstacnceAbi.json'

const AddWasteModal = () => {
  const [name, setName] = useState('')
  const [wasteType, setWasteType] = useState('')
  const [collectionLocation, setCollectionLocation] = useState('')
  const [weight, setWeight] = useState('')
  const [wasteAmount, setWasteAmount] = useState('')
  const [hospitalAddress, setHospitalAddress] = useState('')
  // to open the modal state
  const [toggle, setToggle ] = useState(false)
  const [loading, setLoading] = useState('')

  // to check if the form is filled
  const isFormFilled = name && wasteType && collectionLocation && weight && wasteAmount && hospitalAddress 

  // clear the form when the form is filed 
  const handleClear = () => {
    setName('');
    setWasteType('')
    setCollectionLocation('')
    setWeight('');
    setWasteAmount('');
    setHospitalAddress('');
  }

  const [ debouncedName ] = useDebounce(name,500)
  const [ debouncedWasteType ] = useDebounce(wasteType,500)
  const [ debouncedCollectionLocation] = useDebounce(collectionLocation,500)
  const [ debounceWeight ] = useDebounce(weight,500)
  const [ debounceWasteAmount ] = useDebounce(wasteAmount,500)
  const [ debounceHospitalAddress ] = useDebounce(hospitalAddress,500)

  // function to write to the contract
  const {writeAsync : recordWaste } = useContractSend('recordWaste', [
    debouncedName,
    debouncedWasteType,
    debouncedCollectionLocation,
    debounceWeight,
    debounceWasteAmount,
    debounceHospitalAddress
  ])

  // handle the redcord waste 

  const handleRecordWaste = async () => {
    if(!recordWaste) {
      throw "Failed To Record Waste"
    }
    setLoading("Record.....")
    if(!isFormFilled) throw new Error("Please fill the correct details")
    

    const transactTx = await recordWaste();
    setLoading("Waiting For Confirmation")

    await transactTx
    setToggle(false);
    handleClear()
  }

  const addwaste = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(handleRecordWaste(), {
        pending: "Recording waste",
        success: "Waste Recorded",
        error: "Error Recording Waste"
      })
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something Went wrong. Try record waste")
    }
  }


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
                <form onSubmit={addwaste}>
                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setName(e.target.value)} className='border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl' name='wasteType' id="wasteType" placeholder='Depositor Full Name' />
                      </div>
                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setWasteType(e.target.value)} className='border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl' name='wasteType' id="wasteType" placeholder='WasteType' />
                      </div>

                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setCollectionLocation(e.target.value)} className=' border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl' name='collectionLocation' id="collectionLocation" placeholder='Hospital Location' />
                      </div>

                      <div className='mb-8'>
                          <input type="number" onChange={(e) => setWeight(e.target.value)} className=' border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl' name='wasteKg' id="wasteKg" placeholder='Waste Kg' />
                      </div>
                      <div className='mb-8'>
                          <input type="number" onChange={(e) => setWasteAmount(e.target.value)} className=' border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl' name='wasteAmount' id="wasteAmount" placeholder='Waste Amount' />
                      </div>
                      <div className='mb-8'>
                          <input type="text" onChange={(e) => setHospitalAddress(e.target.value)} className=' border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl' name='hospitaladdress' id="hospitalAddress" placeholder='Hospital wallet Address' />
                      </div>
                      <div className=' flex justify-between'>
                        <button type='submit' className=' border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full' disabled={!!loading || !isFormFilled || !recordWaste} >
                          {loading ? loading : 'Recording Waste'}
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

// "address" : "0x0452F805d508DDBbE95Da610b507033fa6807a77",