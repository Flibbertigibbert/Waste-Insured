import React, {useState, useEffect } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import {useContractSend } from '../../hooks/useContractWrite'
import { toast } from'react-toastify'
import { useDebounce } from 'use-debounce'
import ERC20 from '../../abi/erc20InstacnceAbi.json' 

import { useAccount, useBalance} from 'wagmi'

const SetCollectorModal = () => {
    const [toggle, setToggle] = useState(false)
    const [collector, setCollector] = useState('')
    const [loading, setLoading] = useState('')
    const [displayBalnce, setDisplayBalnce] = useState(false)

    // check if the form is fill
    const isFormFilled = collector

    // to clear the form after
    const clearForm = () => {
      setCollector('')
    }

    const [ deBounceCollector ] = useDebounce(collector, 500)
    
    // write to the contract
    const { writeAsync: assignProducer } = useContractSend('assignProducer', [
      deBounceCollector
    ])

    const handleAssignProducer = async () => {
      if(!assignProducer) {
        throw "Failed To Assign Collector"
      }
      setLoading('Assigning......')
      if(!isFormFilled) throw new Error("Please enter the correct collector wallet address");

      const transTx = await assignProducer();
      setLoading("Waiting for confirmation....")
      await transTx

      setToggle(false)
      clearForm()
      
    }

    const addCollector = async (e) => {
      e.preventDefault();
      try {
        await toast.promise(handleAssignProducer(), {
          pending: "Assigning collectore",
          success: "Successfully assign collector",
          error:"Error assigning producer, please check the wallet address and try again."
        })
      } catch (e) {
        console.log({e});
        toast.error(e?.message || "Something went wrong. Try Again later. Contact for help")
      }
    }
    
    const { address, isConnected} = useAccount();
    const { data: cUSDBalance} = useBalance({
        address,
        token: ERC20.address
    });
    
    useEffect(() => {
        if(isConnected && cUSDBalance) {
            setDisplayBalnce(true)
            return;
        }
        setDisplayBalnce(false)
    }, [cUSDBalance, isConnected])
    
  return (
    <div className=' flex bg-white rounded-xl mb-6'>
            <button id='modalBioDate' type='button' data-bs-toggle="modalBioData" 
            data-bs-target='#modalCenter' className=' text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl' onClick={() => setToggle(true)}>
                Add Collector
            </button>
        {toggle && (
            <div className='flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6'>
               <div className=' w-[600px] rounded-2xl bg-slate-100 p-5'>
                  <h1 className=' text-[#131825] mt-5 font-bold max-md:text-white max-sm:text-white' >Your Must Be wasste Admin Before You Assign Collector</h1>
                <form onSubmit={addCollector}>
                  <input type="text" onChange={(e) => setCollector(e.target.value)} name="Wastecollector" id="wasteCollector"  className=' mt-5 py-4 px-6 w-full rounded-full text-black border-2 border-[#EFAE07]' placeholder='Enter Collector Address'/>
                  <div className=' flex justify-between mt-5'>
                  <button type='submit' className=' border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full' disabled={!!loading || !isFormFilled || !assignProducer} >
                      {loading ? loading : "Assigning Collector"}
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