'use client'

import GainKnob from './gainknob'
import Keyboard from './keyboard'

const audioContext = new AudioContext()

const oscillators = {}
const gainNode = audioContext.createGain()
gainNode.gain.value = 0.5
gainNode.connect(audioContext.destination)

const frequencies = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
}

export function setGain(newValue) {
    gainNode.gain.value = newValue
}

export function startNote(note) {
    const node = audioContext.createOscillator()
    node.frequency.value = frequencies[note]
    oscillators[note] = node
    node.connect(gainNode)
    node.start()
}

export function stopNote(note) {
    oscillators[note]?.stop()
    delete oscillators[note]
}

export default function Synth() {
    return (
        <>
            <GainKnob/>
            <Keyboard/>
        </>
    )
}
