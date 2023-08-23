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