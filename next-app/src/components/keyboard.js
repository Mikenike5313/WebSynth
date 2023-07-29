'use client'

import { startNote, stopNote } from './synth'
import styles from '../styles/keyboard.module.css'
import Key from './key'

const keymap = {
    'KeyA': 'C3', 'KeyW': 'C#3', 'KeyS': 'D3', 'KeyE': 'D#3', 'KeyD': 'E3',
    'KeyF': 'F3', 'KeyT': 'F#3', 'KeyG': 'G3', 'KeyY': 'G#3', 'KeyH': 'A3',
    'KeyU': 'A#3', 'KeyJ': 'B3', 'KeyK': 'C4', 'KeyO': 'C#4', 'KeyL': 'D4'
}

document.addEventListener('keydown', event => {
    if (!event.repeat) {
        const note = keymap[event.code]

        if (note) {
            startNote(note)
        }
    }
})

document.addEventListener('keyup', event => {
    const note = keymap[event.code]

    if (note) {
        stopNote(note)
    }
})

export default function Keyboard() {
    return (
        <div className={styles.keyboard}>
            <Key color='white' note={'C3'}/>
            <Key color='black' note={'C#3'}/>
            <Key color='white' note={'D3'}/>
            <Key color='black' note={'D#3'}/>
            <Key color='white' note={'E3'}/>
            <Key color='white' note={'F3'}/>
            <Key color='black' note={'F#3'}/>
            <Key color='white' note={'G3'}/>
            <Key color='black' note={'G#3'}/>
            <Key color='white' note={'A3'}/>
            <Key color='black' note={'A#3'}/>
            <Key color='white' note={'B3'}/>
            <Key color='white' note={'C4'}/>
            <Key color='black' note={'C#4'}/>
            <Key color='white' note={'D4'}/>
            <Key color='black' note={'D#4'}/>
            <Key color='white' note={'E4'}/>
            <Key color='white' note={'F4'}/>
            <Key color='black' note={'F#4'}/>
            <Key color='white' note={'G4'}/>
            <Key color='black' note={'G#4'}/>
            <Key color='white' note={'A4'}/>
            <Key color='black' note={'A#4'}/>
            <Key color='white' note={'B4'}/>
            <Key color='white' note={'C5'}/>
        </div>
    )
}
