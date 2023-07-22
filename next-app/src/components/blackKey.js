'use client'

import styles from '@/styles/keyboard.module.css'

export default function BlackKey() {
    return (
        <button className={styles.blackkey} onClick={() => alert('black key')}></button>
    )
}
