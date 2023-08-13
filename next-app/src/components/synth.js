'use client'

import { useState, useEffect } from 'react'

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

const context = new AudioContext()

const volume = context.createGain()
volume.gain.value = 0.5
volume.connect(context.destination)

const sources = {}

let waveform = 'sine'
let [attack, decay, sustain, release] = [0.05, 0.25, 0.6, 2]

export function setWaveform(newValue) {
    waveform = newValue
}

export function setAttack(newValue) {
    attack = newValue
}

export function setDecay(newValue) {
    decay = newValue
}

export function setSustain(newValue) {
    sustain = newValue
}

export function setRelease(newValue) {
    release = newValue
}

export function startNote(note) {
    const osc = context.createOscillator()
    osc.frequency.value = frequencies[note]
    osc.type = waveform

    const env = context.createGain()
    osc.connect(env).connect(volume)

    sources[note] = { oscillator: osc, envelope: env }

    const now = context.currentTime
    env.gain.cancelScheduledValues(now)
    env.gain.setValueAtTime(0.001, now)
    env.gain.exponentialRampToValueAtTime(1.0, now + attack)
    env.gain.exponentialRampToValueAtTime(sustain, now + attack + decay)
    osc.start(now)
}

export function stopNote(note) {
    const osc = sources[note].oscillator
    const env = sources[note].envelope

    const now = context.currentTime
    env.gain.cancelScheduledValues(now)
    env.gain.setValueAtTime(env.gain.value, now)
    env.gain.exponentialRampToValueAtTime(0.001, now + release)
    osc.stop(now + release)

    delete sources[note]
}

export default function Synth() {
    let [gain, setGain] = useState(volume.gain.value);

    function handleMouseMove() {
        volume.gain.value = gain
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)

        return function cleanup() {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [gain])

    return (
        <>
            <Knob param={gain} paramSetter={setGain}/>
            <Waveforms/>
            <Envelope attack={attack} decay={decay} sustain={sustain} release={release}/>
            <Keyboard/>
        </>
    )
}
