'use client'

import { useRef } from 'react'

import Knob from '@/components/knob'

export default function Home() {
  const gainKnob = useRef(null); //gainKnob.current.getVal();

  return (
    <main onMouseMove={()=>{console.log(gainKnob.current?.getVal())}}>
      <Knob ref={gainKnob}/>
    </main>
  )
}
