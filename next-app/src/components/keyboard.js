'use client'

import { useEffect } from 'react'
import styles from '../styles/keyboard.module.css'
import Key from './key'

const keymap = {
    'KeyA': 'C3', 'KeyW': 'C#3', 'KeyS': 'D3', 'KeyE': 'D#3', 'KeyD': 'E3',
    'KeyF': 'F3', 'KeyT': 'F#3', 'KeyG': 'G3', 'KeyY': 'G#3', 'KeyH': 'A3',
    'KeyU': 'A#3', 'KeyJ': 'B3', 'KeyK': 'C4', 'KeyO': 'C#4', 'KeyL': 'D4'
}

export default function Keyboard(props) {

    useEffect(() => {
        window.addEventListener('keydown', event => {
            if (!event.repeat) {
                const note = keymap[event.code]
        
                if (note) {
                    props.startNote(note)
                }
            }
        })
        
        window.addEventListener('keyup', event => {
            const note = keymap[event.code]
        
            if (note) {
                props.stopNote(note)
            }
        })
    });

    return (
        <div className={styles.keyboard}>
            <Key color='white' note={'C3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'C#3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'D3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'D#3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'E3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'F3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'F#3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'G3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'G#3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'A3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'A#3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'B3'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'C4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'C#4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'D4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'D#4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'E4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'F4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'F#4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'G4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'G#4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'A4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='black' note={'A#4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'B4'} startNote={props.startNote} stopNote={props.stopNote}/>
            <Key color='white' note={'C5'} startNote={props.startNote} stopNote={props.stopNote}/>
        </div>
    )
}
