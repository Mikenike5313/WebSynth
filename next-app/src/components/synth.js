'use client'

import { useRef, useState, useEffect } from 'react'

import Knob      from './knob'
import Waveforms from './waveforms'
import Envelope  from './envelope'
import Keyboard  from './keyboard'

const frequencies = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
}

export default function Synth() {
    let context = useRef(null);

    let gainNode = useRef(null);
    let [gain, setGain] = useState(0.5);

    let [attack, setAttack] = useState(0.05)
    let [decay, setDecay] = useState(0.25)
    let [sustain, setSustain] = useState(0.6)
    let [release, setRelease] = useState(2)

    let [waveform, setWaveform] = useState("sine")

    let sources = useRef({});


    function handleMouseMove() {
        gainNode.current.gain.value = gain
    }

    function startNote(note) {
        const osc = context.current.createOscillator()
        osc.frequency.value = frequencies[note]
        osc.type = waveform
    
        const env = context.current.createGain()
        osc.connect(env).connect(gainNode.current)
    
        sources.current[note] = { oscillator: osc, envelope: env }
    
        const now = context.current.currentTime
        env.gain.cancelScheduledValues(now)
        env.gain.setValueAtTime(0.001, now)
        env.gain.exponentialRampToValueAtTime(1.0, now + attack)
        env.gain.exponentialRampToValueAtTime(sustain, now + attack + decay)
        osc.start(now)
    }

    function stopNote(note) {
        if(!sources.current[note]) return;
        const osc = sources.current[note].oscillator
        const env = sources.current[note].envelope
    
        const now = context.current.currentTime
        env?.gain.cancelScheduledValues(now)
        env?.gain.setValueAtTime(env.gain.value, now)
        env?.gain.exponentialRampToValueAtTime(0.001, now + release)
        osc?.stop(now + release)
    
        delete sources.current[note]
    }

    useEffect(() => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context.current = new AudioContext()

        gainNode.current = context.current.createGain()
        gainNode.current.gain.value = gain
        gainNode.current.connect(context.current.destination)
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)

        return function cleanup() {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [gain])

    return (
        <>
            <Knob param={gain} paramSetter={setGain}/>
            <Waveforms waveformSetter={setWaveform}/>
            <Envelope attack={attack} attackSetter={setAttack} decay={decay} decaySetter={setDecay} sustain={sustain} sustainSetter={setSustain} release={release} releaseSetter={setRelease}/>
            <Keyboard startNote={startNote} stopNote={stopNote}/>
        </>
    )
}
