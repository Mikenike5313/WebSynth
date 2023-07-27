'use client'

import { useEffect } from 'react'

import styles from '@/styles/keyboard.module.css'

export default function Keyboard() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();

    const oscillators = {}

    const frequencies = {
        'C3': 130.81,
        'C#3': 138.59,
        'D3': 146.83,
        'D#3': 155.56,
        'E3': 164.81,
        'F3': 174.61,
        'F#3': 185.00,
        'G3': 196.00,
        'G#3': 207.65,
        'A3': 220.00,
        'A#3': 233.08,
        'B3': 246.94,
        'C4': 261.63,
        'C#4': 277.18,
        'D4': 293.66,
        'D#4': 311.13,
        'E4': 329.63,
        'F4': 349.23,
        'F#4': 369.99,
        'G4': 392.00,
        'G#4': 415.30,
        'A4': 440.00,
        'A#4': 466.16,
        'B4': 493.88,
        'C5': 523.25
    }

    const startNote = (note) => {
        const node = context.createOscillator()
        node.frequency.value = frequencies[note]

        oscillators[note] = node
        node.connect(context.destination)
        node.start()
    }

    const stopNote = (note) => {
        const node = oscillators[note]

        node?.stop()
        delete oscillators[note]
    }

    useEffect(() => {
        const keydownHandler = (e) => {
            if (e.repeat) {
                return
            }

            switch (e.code) {
                case 'KeyA':
                    startNote('C3')
                    break

                case 'KeyW':
                    startNote('C#3')
                    break
                
                case 'KeyS':
                    startNote('D3')
                    break

                case 'KeyE':
                    startNote('D#3')
                    break

                case 'KeyD':
                    startNote('E3')
                    break

                case 'KeyF':
                    startNote('F3')
                    break

                case 'KeyT':
                    startNote('F#3')
                    break
                
                case 'KeyG':
                    startNote('G3')
                    break

                case 'KeyY':
                    startNote('G#3')
                    break

                case 'KeyH':
                    startNote('A3')
                    break

                case 'KeyU':
                    startNote('A#3')
                    break

                case 'KeyJ':
                    startNote('B3')
                    break
                
                case 'KeyK':
                    startNote('C4')
                    break

                case 'KeyO':
                    startNote('C#4')
                    break

                case 'KeyL':
                    startNote('D4')
                    break
            }
        }

        const keyupHandler = (e) => {
            console.log(`keyup: ${e.key}`)

            switch (e.code) {
                case 'KeyA':
                    stopNote('C3')
                    break

                case 'KeyW':
                    stopNote('C#3')
                    break
                
                case 'KeyS':
                    stopNote('D3')
                    break

                case 'KeyE':
                    stopNote('D#3')
                    break

                case 'KeyD':
                    stopNote('E3')
                    break

                case 'KeyF':
                    stopNote('F3')
                    break

                case 'KeyT':
                    stopNote('F#3')
                    break
                
                case 'KeyG':
                    stopNote('G3')
                    break

                case 'KeyY':
                    stopNote('G#3')
                    break

                case 'KeyH':
                    stopNote('A3')
                    break

                case 'KeyU':
                    stopNote('A#3')
                    break

                case 'KeyJ':
                    stopNote('B3')
                    break
                
                case 'KeyK':
                    stopNote('C4')
                    break

                case 'KeyO':
                    stopNote('C#4')
                    break

                case 'KeyL':
                    stopNote('D4')
                    break
            }
        }

        document.addEventListener('keydown', keydownHandler)
        document.addEventListener('keyup', keyupHandler)

        return function cleanup() {
            document.removeEventListener('keydown', keydownHandler)
            document.removeEventListener('keyup', keyupHandler)
        }
    }, [])

    return (
        <div className={styles.keyboard}
             onKeyDown={(e) => {
                console.log(e)
             }}>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('C3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('C3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('C3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('C3')
                    }}>               
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('C#3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('C#3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('C#3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('C#3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('D3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('D3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('D3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('D3')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('D#3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('D#3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('D#3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('D#3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('E3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('E3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('E3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('E3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('F3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('F3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('F3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('F3')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('F#3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('F#3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('F#3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('F#3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('G3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('G3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('G3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('G3')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('G#3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('G#3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('G#3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('G#3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('A3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('A3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('A3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('A3')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('A#3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('A#3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('A#3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('A#3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('B3')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('B3')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('B3')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('B3')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('C4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('C4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('C4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('C4')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('C#4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('C#4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('C#4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('C#4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('D4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('D4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('D4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('D4')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('D#4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('D#4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('D#4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('D#4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('E4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('E4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('E4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('E4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('F4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('F4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('F4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('F4')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('F#4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('F#4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('F#4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('F#4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('G4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('G4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('G4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('G4')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('G#4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('G#4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('G#4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('G#4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('A4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('A4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('A4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('A4')
                    }}>
            </button>
            <button className={styles.blackkey}
                    onMouseDown={(e) => {
                        startNote('A#4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('A#4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('A#4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('A#4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('B4')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('B4')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('B4')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('B4')
                    }}>
            </button>
            <button className={styles.whitekey}
                    onMouseDown={(e) => {
                        startNote('C5')
                    }}

                    onMouseEnter={(e) => {
                        if (e.buttons == 1) {
                            startNote('C5')
                        }
                    }}

                    onMouseUp={(e) => {
                        stopNote('C5')
                    }}

                    onMouseLeave={(e) =>{
                        stopNote('C5')
                    }}>
            </button>
        </div>
    )
}
