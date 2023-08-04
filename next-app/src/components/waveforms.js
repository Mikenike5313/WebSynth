'use client'

import { setWaveform } from "./synth"

export default function Waveforms() {
    function handleChange(event) {
        setWaveform(event.target.value)
    }

    return (
        <>
            <label htmlFor="waveform-select">Waveform</label>
            <select id="waveform-select" defaultValue="sine" onChange={handleChange}>
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
                <option value="sawtooth">Sawtooth</option>
            </select>
        </>
    )
}