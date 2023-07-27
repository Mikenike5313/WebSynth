'use client'

import styles from '@/styles/knobs.module.css'

function getTransformOrigin(elt) {
    let eltStyle = window.getComputedStyle(elt)
    let eltTOriginStrArr = eltStyle.getPropertyValue("transform-origin").split("px");
    let eltTopStrArr = eltStyle.getPropertyValue("top").split("px");
    let eltLeftStrArr = eltStyle.getPropertyValue("left").split("px");
    return [parseFloat(eltTOriginStrArr[0])+parseFloat(eltLeftStrArr[0]), parseFloat(eltTOriginStrArr[1]+parseFloat(eltTopStrArr[0]))];
}

function turnKnob(initials, elt, e) {
    let origin = getTransformOrigin(elt);
    let grabAngle = Math.atan2(initials.mx-origin[0], origin[1]-initials.my)*180/Math.PI;
    let moveAngle = Math.atan2(e.clientX-origin[0], origin[1]-e.clientY)*180/Math.PI;
    let angle = (moveAngle-grabAngle+initials.angle+540)%360 - 180;
    angle = (Math.abs(angle) > 135) ? 135*angle/Math.abs(angle) : angle;
    elt.style.transform = "rotate("+angle+"deg)"
}

function fiddle(evt) {
    let knobHead = evt.target.querySelector("."+styles.knobHeadTick);
    let initialAngle = knobHead.style.transform == "" ? 0 : parseFloat(knobHead.style.transform.match(/[+-]?[0-9]+[.]?[0-9]*/));
    let fiddleTurn = function(e) {turnKnob({angle:initialAngle, mx:evt.clientX, my:evt.clientY}, knobHead, e)};
    window.addEventListener("mousemove", fiddleTurn);
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", fiddleTurn);
    });
}

function getValue(knob) {
    let knobHead = knob.querySelector("."+styles.knobHeadTick);
    let rotation = knobHead.style.transform == "" ? 0 : parseFloat(knobHead.style.transform.match(/[+-]?[0-9]+[.]?[0-9]*/));
    return (rotation+135)/270;
}

export default function GainKnob() {
    return (
        <div className={styles.knob}>
            <div className={styles.knobHead} onMouseDown={fiddle}>
                <div className={styles.knobHeadTick}></div>
            </div>
        </div>
    )
}
