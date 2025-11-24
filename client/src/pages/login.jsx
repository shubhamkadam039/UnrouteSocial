import React from 'react'
import { assets } from '../assets/assets'

const Login = () => {
  console.log('bg:', assets.bgImage)
  console.log('logo:', assets.logo)

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      {/* Background Image */}
      <img
        src={assets.bgImage}
        alt="Background"
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      />

      {/* Left side : Branding */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
        <img src={assets.UnrouteLogo} alt="Logo" className="w-28 h-auto" />
      </div>
    </div>
  )
}

export default Login
