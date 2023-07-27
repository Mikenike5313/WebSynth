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
    console.log(angle);
    angle = (Math.abs(angle) > 135) ? 135*angle/Math.abs(angle) : angle;
    elt.style.transform = "rotate("+angle+"deg)"
}

function fiddle(evt) {
    let knob = evt.target.querySelector("."+styles.tick);
    let initialAngle = knob.style.transform == "" ? 0 : parseFloat(knob.style.transform.match(/[+-]?[0-9]+[.]?[0-9]*/));
    let fiddleTurn = function(e) {turnKnob({angle:initialAngle, mx:evt.clientX, my:evt.clientY}, knob, e)};
    window.addEventListener("mousemove", fiddleTurn);
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", fiddleTurn);
    });
}

export default function GainKnob() {
    return (
        <div className={styles.knob} onMouseDown={fiddle}>
            <div className={styles.tick}></div>
        </div>
    )
}
