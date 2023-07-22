'use client'

import styles from "@/styles/keyboard.module.css"

export default function WhiteKey() {
    return (
        <button className={styles.whitekey} onClick={() => alert('white key')}></button>
    )
}
