import { useState } from 'react'

import { setAttack, setDecay, setSustain, setRelease } from './synth'

function changeAttack(event) {
    setAttack(parseFloat(event.target.value))
}

function changeDecay(event) {
    setDecay(parseFloat(event.target.value))
}

function changeSustain(event) {
    setSustain(parseFloat(event.target.value))
}

function changeRelease(event) {
    setRelease(parseFloat(event.target.value))
}

export default function Envelope({ attack, decay, sustain, release }) {
    return (
        <div>
            <label>
                Attack <input type="range" min="0.0" max="2.0" step="0.001"
                              defaultValue={attack.toString()} onChange={changeAttack}/>
            </label>
            <label>
                Decay <input type="range" min="0.0" max="2.0" step="0.001"
                             defaultValue={decay.toString()} onChange={changeDecay}/>
            </label>
            <label>
                Sustain <input type="range" min="0.001" max="1.0" step="0.001"
                               defaultValue={sustain.toString()} onChange={changeSustain}/>
            </label>
            <label>
                Release <input type="range" min="0.005" max="2.0" step="0.001"
                               defaultValue={release.toString()} onChange={changeRelease}/>
            </label>
        </div>
    )
}