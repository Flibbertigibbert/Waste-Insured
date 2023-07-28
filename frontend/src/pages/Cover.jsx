import React from 'react'
import SideImg from '../assets/wastecan.png'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import WasteLogo from '../assets/wasteisureLogo.png'

const Cover = () => {
  return (
    <div className=' flex flex-col justify-center items-center max-sm:flex-row'>
        <div className=" w-24 h-24 mb-10">
            <img src={WasteLogo} alt="WasteInsured" className=" w-full h-full" />
        </div>
        <div className='flex flex-row'>
            <div className=''>
                <h1 className=' text-3xl font-bold max-sm:text-xl text-blue-950 mr-5'>Welcome To Waste2Wealth</h1>
                <div className=' w-96 mt-10'>
                <p className=' text-base font-medium mt-5 text-blue-950 ml-5'>Waste2Wealth addresses environment waste pollution challenges with a unique business model that encourages responsible waste disposal while providing affordable access to comprehensive health insurance plans. This project has established a network of modern waste collection centers, aptly called "EcoHubs," strategically placed in various communities.</p>
                </div>
            </div>
            <div className=' w-80'>
                <img src={SideImg} alt="waste can" className='' />
            </div>
        </div>
        <div>
            <ConnectButton />
        </div>
    </div>
  )
}

export default Cover
