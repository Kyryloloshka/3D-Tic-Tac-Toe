import Model3d from '@/components/Model3d'
import TopBarControlsReplay from '@/components/TopBarControlsReplay'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col min-h-full flex-auto'>
      <TopBarControlsReplay/>
      <Model3d/>
    </div>
  )
}

export default page