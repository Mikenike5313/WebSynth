'use client'

import Keyboard from "./keyboard"

const audioContext = new AudioContext()

export default function Synth() {
    return (
        <Keyboard audioContext={audioContext} />
    )
}
