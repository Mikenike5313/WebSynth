'use client'


export default function Waveforms(props) {
    function handleChange(event) {
        props.waveformSetter(event.target.value)
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