'use client'

import styles from '../styles/keyboard.module.css'
import { startNote, stopNote } from './synth'

export default function Key(props) {
    let className

    if (props.color === 'white') {
        className = styles.whitekey
    }
    else if (props.color === 'black') {
        className = styles.blackkey
    }

    return (
        <button className={className}
                onMouseDown={() => props.startNote(props.note)}
                onMouseUp={() => props.stopNote(props.note)}
                onMouseLeave={() => props.stopNote(props.note)}
                onMouseEnter={event => {
                    if (event.buttons === 1) {
                        props.startNote(props.note)
                    }
                }}>
        </button>
    )
}
