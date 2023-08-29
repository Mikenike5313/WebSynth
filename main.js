/* Helpers */
const getTransformOrigin = (elt) => {
    let sty = window.getComputedStyle(elt);
    let transformOriginStrArr = sty.getPropertyValue("transform-origin").split("px");
    let topStrArr = sty.getPropertyValue("top").split("px");
    let leftStrArr = sty.getPropertyValue("left").split("px");
    return [parseFloat(transformOriginStrArr[0])+parseFloat(leftStrArr[0]), parseFloat(transformOriginStrArr[1]+parseFloat(topStrArr[0]))];
};
/*         */


/* Gain Knob */
let gain = 0.5
let gainKnobTurning = false;
const gainKnobHead = document.querySelector("#gainKnobHead");

const turnGainKnob = (e) => {
    if (!gainKnobTurning) {
        return;
    }
    let origin = getTransformOrigin(gainKnobHead);
    let grabAngle = Math.atan2(e.clientX-e.movementX-origin[0], origin[1]-e.clientY+e.movementY)*180/Math.PI;
    let moveAngle = Math.atan2(e.clientX-origin[0], origin[1]-e.clientY)*180/Math.PI;
    let angle = (moveAngle-grabAngle+gain*270-135+540)%360 - 180;
    angle = (Math.abs(angle) > 135) ? 135*angle/Math.abs(angle) : angle;
    gainKnobHead.style.transform = "rotate("+angle+"deg)";
    gain = (angle+135)/270;
};
window.addEventListener("mousemove", turnGainKnob);

const releaseGainKnob = () => {
    gainKnobTurning = false;
};
window.addEventListener("mouseup", releaseGainKnob);

const knobMouseDown = (e) => {
    gainKnobTurning = true;
};
gainKnobHead.addEventListener("mousedown", knobMouseDown);
/*           */


/* Waveforms */
let waveform = "sine";
let waveformSelector = document.querySelector("#waveformSelector");
function handleWaveChange(event) {
    waveform = event.target.value;
}
waveformSelector.addEventListener("change", handleWaveChange);
/*           */


/* ADSR Envelope */
attack = 0.05;
attackSlider = document.querySelector("#attackSlider");
attackSlider.addEventListener("change", (evt)=>{attack=parseFloat(evt.target.value)});
decay = 0.25;
decaySlider = document.querySelector("#decaySlider");
decaySlider.addEventListener("change", (evt)=>{decay=parseFloat(evt.target.value)});
sustain = 0.6;
sustainSlider = document.querySelector("#sustainSlider");
sustainSlider.addEventListener("change", (evt)=>{sustain=parseFloat(evt.target.value)});
release = 2;
releaseSlider = document.querySelector("#releaseSlider");
releaseSlider.addEventListener("change", (evt)=>{release=parseFloat(evt.target.value)});
/*               */


/* Compressor */
threshold = -24;
thresholdSlider = document.querySelector("#thresholdSlider");
thresholdSlider.addEventListener("change", (evt) => 
    compressor.threshold.value = parseFloat(evt.target.value));
knee = -24;
kneeSlider = document.querySelector("#kneeSlider");
kneeSlider.addEventListener("change", (evt) => 
    compressor.knee.value = parseFloat(evt.target.value));
ratio = 12;
ratioSlider = document.querySelector("#ratioSlider");
ratioSlider.addEventListener("change", (evt) => 
    compressor.ratio.value = parseFloat(evt.target.value));
compressorAttack = 0.003;
compressorAttackSlider = document.querySelector("#compressorAttackSlider");
compressorAttackSlider.addEventListener("change", (evt) => 
    compressor.attack.value = parseFloat(evt.target.value));
compressorRelease = 0.25;
compressorReleaseSlider = document.querySelector("#compressorReleaseSlider");
compressorReleaseSlider.addEventListener("change", (evt) =>
    compressor.release.value = parseFloat(evt.target.value));
/*            */


/* Synth */
const frequencies = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94, 'C4': 261.63, 'C#4': 277.18, 'D4': 293.66,
    'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
    'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
};

const context = new AudioContext();

const compressor = context.createDynamicsCompressor();
compressor.connect(context.destination);

const gainMultiplier = 0.5;
const volume = context.createGain();
volume.gain.value = gainMultiplier*gain;
volume.connect(compressor);

const sources = {};

function startNote(note) {
    const osc = context.createOscillator();
    osc.frequency.value = frequencies[note];
    osc.type = waveform;

    const env = context.createGain();
    osc.connect(env).connect(volume);

    sources[note] = { oscillator: osc, envelope: env };

    const now = context.currentTime;
    env.gain.cancelScheduledValues(now);
    env.gain.setValueAtTime(0.001, now);
    env.gain.exponentialRampToValueAtTime(1.0, now + attack);
    env.gain.exponentialRampToValueAtTime(sustain, now + attack + decay);
    osc.start(now);
}

function stopNote(note) {
    if (!sources[note]) return;
    const osc = sources[note].oscillator;
    const env = sources[note].envelope;

    const now = context.currentTime;
    env.gain.cancelScheduledValues(now);
    env.gain.setValueAtTime(env.gain.value, now);
    env.gain.exponentialRampToValueAtTime(0.001, now + release);
    osc.stop(now + release);

    delete sources[note];
}

function handleSynthMousemove() {
    volume.gain.value = gainMultiplier*gain;
}
window.addEventListener("mousemove", handleSynthMousemove);
/*       */


/* Keyboard */
keys = document.querySelectorAll(".whitekey, .blackkey");
const keymap = {
    'KeyA': 'C3', 'KeyW': 'C#3', 'KeyS': 'D3', 'KeyE': 'D#3', 'KeyD': 'E3',
    'KeyF': 'F3', 'KeyT': 'F#3', 'KeyG': 'G3', 'KeyY': 'G#3', 'KeyH': 'A3',
    'KeyU': 'A#3', 'KeyJ': 'B3', 'KeyK': 'C4', 'KeyO': 'C#4', 'KeyL': 'D4',
    'KeyP': 'D#4', 'Semicolon': 'E4'
};
for (let i=0; i<keys.length;++i) {
    let key = keys[i];
    key.addEventListener("mousedown", ()=>{startNote(key.id);});
    key.addEventListener("mouseup", ()=>{stopNote(key.id);});
    key.addEventListener("mouseenter", (evt)=>{if (evt.buttons===1) {startNote(key.id);}});
    key.addEventListener("mouseleave", ()=>{stopNote(key.id);});
}
window.addEventListener('keydown', event => {
    if (!event.repeat) {
        const note = keymap[event.code];

        if (note) {
            startNote(note);
        }
    }
});

window.addEventListener('keyup', event => {
    const note = keymap[event.code];

    if (note) {
        stopNote(note);
    }
});
/*          */