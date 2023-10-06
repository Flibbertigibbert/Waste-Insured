import React, {useState} from 'react'
import AddWasteModal from './modals/AddWasteModal'
import SetCollectorModal from './modals/SetCollectorModal';
import AddHospitalModal from './modals/AddHospitalModal';
import { FaBars, FaTimes } from "react-icons/fa";

const SideBar = () => {
    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(!toggle);
      };

  return (
    <div>
        <div className=' h-full w-60 max-md:w-0 max-sm:w-0 fixed z-10 top-24 left-0 pl-5 bg-white border-2 overflow-x-hidden pt-20 max-sm:hidden max-md:hidden'>
            <h1 className=' text-3xl font-bold max-sm:text-xl text-blue-950 mr-5 my-6'>Dashboard</h1>
            <SetCollectorModal />
            <AddWasteModal />
            <AddHospitalModal />
        </div>
    <div className="md:hidden  mt-3 ml-10">
    <h1 className=' text-3xl font-bold max-sm:text-xl text-blue-950 mr-5 my-6'>Dashboard</h1>
        <button className="text-dark" onClick={toggleMenu}>
                {toggle ? (
        <FaTimes className="text-2xl" />
             ) : (
            <FaBars className="text-2xl" />
            )}
       </button>
    </div>


      {toggle && (
        <div className="fixed z-20 top-0 bg-[#282e82] 
         right-0 bottom-0 left-0 flex flex-col 
         items-center gap-6 justify-center">
            <button
            className="text-white absolute top-4 right-4"
            onClick={toggleMenu}
            >
            <FaTimes className="text-2xl" />
            </button>
            <h1 className=' text-3xl font-bold max-sm:text-xl text-blue-950 mr-5 my-6'>Dashboard</h1>
            <SetCollectorModal />
            <AddWasteModal />
            <AddHospitalModal />
        </div>
      )}
    </div>
  )
}

export default SideBar;
