'use client'

import styles from '../styles/keyboard.module.css'
import { startNote, stopNote } from './synth'

export default function Key({ color, note }) {
    let className

    if (color === 'white') {
        className = styles.whitekey
    }
    else if (color === 'black') {
        className = styles.blackkey
    }

    return (
        <button className={className}
                onMouseDown={() => startNote(note)}
                onMouseUp={() => stopNote(note)}
                onMouseLeave={() => stopNote(note)}
                onMouseEnter={event => {
                    if (event.buttons === 1) {
                        startNote(note)
                    }
                }}>
        </button>
    )
}
