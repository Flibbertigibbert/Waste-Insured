import React from 'react'
import AddWasteModal from './modals/AddWasteModal'
import SetCollectorModal from './modals/SetCollectorModal'

const SideBar = () => {
  return (
    <div className=' h-full w-60 fixed z-1 top-24 left-0 pl-5 bg-white border-2 overflow-x-hidden pt-20'>
        <h1 className=' text-3xl font-bold max-sm:text-xl text-blue-950 mr-5 my-6'>Dashboard</h1>
        <SetCollectorModal />
        <AddWasteModal />
    </div>
  )
}

export default SideBar
