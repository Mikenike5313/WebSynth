'use client'

import styles from '@/styles/knobs.module.css'

function getTransformOrigin(elt) {
    let elt_style = window.getComputedStyle(elt)
    let elt_torigin_str_arr = elt_style.getPropertyValue("transform-origin").split("px");
    let elt_top_str_arr = elt_style.getPropertyValue("top").split("px");
    let elt_left_str_arr = elt_style.getPropertyValue("left").split("px");
    return [parseFloat(elt_torigin_str_arr[0])+parseFloat(elt_left_str_arr[0]), parseFloat(elt_torigin_str_arr[1]+parseFloat(elt_top_str_arr[0]))];
}

function turn(elt, e) {
    let tick = elt.querySelector("."+styles.tick);
    let origin = getTransformOrigin(tick);
    let angle = Math.atan2(e.clientX-origin[0], origin[1]-e.clientY)*180/Math.PI;
    angle = (Math.abs(angle) > 135) ? 135*angle/Math.abs(angle) : angle;
    tick.style.transform = "rotate("+angle+"deg)"
}

function fiddle(evt) {
    let fiddle_turn = function(e) {turn(evt.target, e)};
    window.addEventListener("mousemove", fiddle_turn);
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", fiddle_turn);
    });
}

export default function GainKnob() {
    return (
        <div className={styles.knob} onMouseDown={fiddle}>
            <div className={styles.tick}></div>
        </div>
    )
}
