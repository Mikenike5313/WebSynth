'use client'

import { useState, useEffect } from 'react'
import Knob from './knob'
import Waveforms from './waveforms'
import Keyboard from './keyboard'

const audioContext = new AudioContext()

const env = audioContext.createGain();
let [a,d,s,r] = [0.1,0.1,0.7,0.5];

const oscillators = {}

const gainNode = audioContext.createGain()
gainNode.gain.value = 0.5
gainNode.connect(audioContext.destination)

var waveform = 'sine'

const frequencies = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
}

export function setWaveform(newValue) {
    waveform = newValue
}

export function startNote(note) {
    const node = audioContext.createOscillator()
    node.frequency.value = frequencies[note]
    node.type = waveform
    oscillators[note] = node

    let t = audioContext.currentTime;
    env.gain.cancelScheduledValues(t);
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(1, t + a);
    env.gain.linearRampToValueAtTime(s, t + a + d);

    node.connect(env).connect(gainNode)
    node.start()
}

export function stopNote(note) {
    env.gain.linearRampToValueAtTime(0, audioContext.currentTime + a + d + r);
    //oscillators[note]?.stop()
    delete oscillators[note]
}

export default function Synth() {
    let [gain, setGain] = useState(gainNode.gain.value);

    const handleMouseMove = (e) => {
        gainNode.gain.value = gain
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        return function cleanup() {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [gain])

    return (
        <>
            <Knob param={gain} paramSetter={setGain}/>
            <Waveforms/>
            <Keyboard/>
        </>
    )
}
