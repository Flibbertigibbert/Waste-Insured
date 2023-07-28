import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import './App.css'
import Cover from './pages/Cover'

function App() {

  return (
    <>
      <div>
        <ConnectButton />
        <Cover />
      </div>
    </>
  )
}

export default App
