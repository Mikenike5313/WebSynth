export default function Envelope(props) {
    function changeAttack(event) {
        props.attackSetter(parseFloat(event.target.value))
    }
    
    function changeDecay(event) {
        props.decaySetter(parseFloat(event.target.value))
    }
    
    function changeSustain(event) {
        props.sustainSetter(parseFloat(event.target.value))
    }
    
    function changeRelease(event) {
        props.releaseSetter(parseFloat(event.target.value))
    }

    return (
        <div>
            <label>
                Attack <input type="range" min="0.0" max="2.0" step="0.001"
                              defaultValue={props.attack.toString()} onChange={changeAttack}/>
            </label>
            <label>
                Decay <input type="range" min="0.0" max="2.0" step="0.001"
                             defaultValue={props.decay.toString()} onChange={changeDecay}/>
            </label>
            <label>
                Sustain <input type="range" min="0.001" max="1.0" step="0.001"
                               defaultValue={props.sustain.toString()} onChange={changeSustain}/>
            </label>
            <label>
                Release <input type="range" min="0.005" max="2.0" step="0.001"
                               defaultValue={props.release.toString()} onChange={changeRelease}/>
            </label>
        </div>
    )
}