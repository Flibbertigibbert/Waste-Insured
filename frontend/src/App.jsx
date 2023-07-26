import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        WasteInsured
        <ConnectButton />
      </div>
    </>
  )
}

export default App
