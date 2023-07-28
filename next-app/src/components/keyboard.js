'use client'

import styles from '../styles/keyboard.module.css'

import { useEffect } from 'react'

const frequencies = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
}

const keymap = {
    'KeyA': 'C3', 'KeyW': 'C#3', 'KeyS': 'D3', 'KeyE': 'D#3', 'KeyD': 'E3',
    'KeyF': 'F3', 'KeyT': 'F#3', 'KeyG': 'G3', 'KeyY': 'G#3', 'KeyH': 'A3',
    'KeyU': 'A#3', 'KeyJ': 'B3', 'KeyK': 'C4', 'KeyO': 'C#4', 'KeyL': 'D4'
}

const oscillators = {}

export default function Keyboard({ audioContext }) {
    function startNote(note) {
        const node = audioContext.createOscillator()
        node.frequency.value = frequencies[note]
        oscillators[note] = node
        node.connect(audioContext.destination)
        node.start()
    }

    function stopNote(note) {
        oscillators[note]?.stop()
        delete oscillators[note]
    }

    function handleKeydown(event) {
        if (!event.repeat) {
            const note = keymap[event.code]

            if (note) {
                startNote(note)
            }
        }
    }

    function handleKeyup(event) {
        const note = keymap[event.code]

        if (note) {
            stopNote(note)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('keyup', handleKeyup)

        return function cleanup() {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('keyup', handleKeyup)
        }
    }, [])

    return (
        <div className={styles.keyboard}>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('C3')}
                    onMouseUp={() => stopNote('C3')}
                    onMouseLeave={() => stopNote('C3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('C3')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('C#3')}
                    onMouseUp={() => stopNote('C#3')}
                    onMouseLeave={() => stopNote('C#3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('C#3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('D3')}
                    onMouseUp={() => stopNote('D3')}
                    onMouseLeave={() => stopNote('D3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('D3')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('D#3')}
                    onMouseUp={() => stopNote('D#3')}
                    onMouseLeave={() => stopNote('D#3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('D#3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('E3')}
                    onMouseUp={() => stopNote('E3')}
                    onMouseLeave={() => stopNote('E3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('E3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('F3')}
                    onMouseUp={() => stopNote('F3')}
                    onMouseLeave={() => stopNote('F3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('F3')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('F#3')}
                    onMouseUp={() => stopNote('F#3')}
                    onMouseLeave={() => stopNote('F#3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('F#3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('G3')}
                    onMouseUp={() => stopNote('G3')}
                    onMouseLeave={() => stopNote('G3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('G3')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('G#3')}
                    onMouseUp={() => stopNote('G#3')}
                    onMouseLeave={() => stopNote('G#3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('G#3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('A3')}
                    onMouseUp={() => stopNote('A3')}
                    onMouseLeave={() => stopNote('A3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('A3')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('A#3')}
                    onMouseUp={() => stopNote('A#3')}
                    onMouseLeave={() => stopNote('A#3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('A#3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('B3')}
                    onMouseUp={() => stopNote('B3')}
                    onMouseLeave={() => stopNote('B3')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('B3')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('C4')}
                    onMouseUp={() => stopNote('C4')}
                    onMouseLeave={() => stopNote('C4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('C4')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('C#4')}
                    onMouseUp={() => stopNote('C#4')}
                    onMouseLeave={() => stopNote('C#4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('C#4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('D4')}
                    onMouseUp={() => stopNote('D4')}
                    onMouseLeave={() => stopNote('D4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('D4')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('D#4')}
                    onMouseUp={() => stopNote('D#4')}
                    onMouseLeave={() => stopNote('D#4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('D#4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('E4')}
                    onMouseUp={() => stopNote('E4')}
                    onMouseLeave={() => stopNote('E4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('E4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('F4')}
                    onMouseUp={() => stopNote('F4')}
                    onMouseLeave={() => stopNote('F4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('F4')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('F#4')}
                    onMouseUp={() => stopNote('F#4')}
                    onMouseLeave={() => stopNote('F#4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('F#4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('G4')}
                    onMouseUp={() => stopNote('G4')}
                    onMouseLeave={() => stopNote('G4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('G4')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('G#4')}
                    onMouseUp={() => stopNote('G#4')}
                    onMouseLeave={() => stopNote('G#4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('G#4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('A4')}
                    onMouseUp={() => stopNote('A4')}
                    onMouseLeave={() => stopNote('A4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('A4')
                        }
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={() => startNote('A#4')}
                    onMouseUp={() => stopNote('A#4')}
                    onMouseLeave={() => stopNote('A#4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('A#4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('B4')}
                    onMouseUp={() => stopNote('B4')}
                    onMouseLeave={() => stopNote('B4')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('B4')
                        }
                    }}>               
            </button>
            <button className={styles.whitekey}
                    onMouseDown={() => startNote('C5')}
                    onMouseUp={() => stopNote('C5')}
                    onMouseLeave={() => stopNote('C5')}
                    onMouseEnter={(event) => {
                        if (event.buttons == 1) {
                            startNote('C5')
                        }
                    }}>               
            </button>
        </div>
    )
}
