import React, {useCallback} from 'react'
import { ethers } from 'ethers'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { useContractSend } from '../../hooks/useContractWrite'
import { useContractCall } from '../../hooks/useContractRead'
import { useContractTrans } from '../../hooks/useContractTrans'
import { useEffect, useState } from 'react'
import { truuncateAddress } from '../../utils';



const WasteCard = ({id, setError, setLoading, clear, searchQuery}) => {
  
  

  // to get the address that is connect to the dapp
  const { address } = useAccount();

  // to read data from the contract 
  const {data: getWasteInfo} = useContractCall('getWasteInfo', [id], true)

  // send to inform the contract we are about to perform transaction
  const {writeAsync: wastePayment} = useContractSend('wastePayment', [Number(id)]);
  
  const [waste, setWaste] = useState(null)

  const {writeAsync: approve } = useContractTrans(
    waste?.wasteAmount?.toString() || "1"
  )
  
  const { openConnectModal } = useConnectModal();

  const getFormattedProduct = useCallback(() => {
    // return null if there not product to return
    if (!getWasteInfo) return null;

    setWaste({
      wassetWasteAdmin: getWasteInfo[0],
      producer: getWasteInfo[1],
      depositor: getWasteInfo[2],
      wasteType: getWasteInfo[3],
      collectionLocation: getWasteInfo[4],
      weight: Number(getWasteInfo[5]),
      isRecorded: Boolean(getWasteInfo[6]),
      isValidated: Boolean(getWasteInfo[7]),
      isPaid: Boolean(getWasteInfo[8]),
      wasteAmount: Number(getWasteInfo[9]),
      hospitalAdress: getWasteInfo[10]
    })
  }, [getWasteInfo])

  // we use the useEffect the waste management system state changes

  useEffect(() => {
    getFormattedProduct();
  }, [getFormattedProduct]);

  // function to hand the waste payment
  const handlePayment = async () => {
    if (!approve || !wastePayment) {
      throw ("Failed to make waste Payment")
    }
    //  approve wastepayment for the ERC20 cUSD token
    const approveTx = await approve();
    // await the transaction
    await approveTx
    setLoading("Approving...")

    // once we approve, we handle payment 
    const res = await wastePayment();
    // wait for the transaction to make by the wasste Admin
    await res
  }
  

  // send wastepayment when the transfer bottun is clicked
  const payment = async () => {
    setLoading("Approving...");
    clear();

    try {
      if(!address && openConnectModal) {
        openConnectModal();
        return
      }
      // messages to display during the process of the payments
      await toast.promise(handlePayment(), {
        pending: "Awaiting Payment",
        success: "Successfully Transfer Payment To Hospital. Kindly Visit the Hospital for health checkup",
        error: "You must be wasset Admin before You Can make Payment or Insufficient funds"
      })
    } catch (e) {
      console.log({ e });
      setError(e?.reason || e?.message || "Something happen. Try again later")
    }
  };

  if (!waste) return null;

  // convert price from wei to cUSD
  const convertWasteAmount = ethers.utils.formatEther(
    waste.wasteAmount.toString()
  )

  if (
    searchQuery != "" &&
    !waste.depositor
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase().trim())
  ) {
    return null;
  }
  

  return (
    <div className='max-w-md m-auto text-white bg-[#06102b] rounded-lg w-72 drop-shadow-2xl p-2'>
      
      {address == waste.wassetWasteAdmin ? (
        <>
          <div className=' pl-2'>
            <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste.producer)}</span></h1>
          </div>
          <div className='pl-2 text-center'>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste.depositor}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste.wasteType}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste.collectionLocation}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.weight}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.isPaid? "Yes Paid" : "Not paid"}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {convertWasteAmount}</span></p>
            <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste.hospitalAdress)}</span></p>
          </div>
          <div className=' flex justify-center items-center'>
            <button className=' bg-white py-2 px-2 rounded-lg font-medium text-blue-700 hover:text-white hover:bg-[#efae07] mt-5 mb-5' onClick={payment}>Transfer Payment</button>
          </div>
        </>
        ) : <>
            <div className=' pl-2'>
              <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste.producer)}</span></h1>
            </div>
            <div className='pl-2 text-center'>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste.depositor}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste.wasteType}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste.collectionLocation}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.weight}</span> </p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.isPaid? "Yes Paid" : "Not paid"}</span> </p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {convertWasteAmount}</span></p>
              <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste.hospitalAdress)}</span></p>
            </div>
        </>
      }
    </div>
  )
}

export default WasteCard