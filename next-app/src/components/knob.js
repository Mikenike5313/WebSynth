'use client'

import { useState, useEffect, useRef } from 'react'

import styles from '@/styles/knobs.module.css'


export default function Knob(props) {
    let [turning, setTurning] = useState(false);
    const knobHead = useRef(null);

    useEffect(() => {
        const getTransformOrigin = () => {
            let knobStyle = window.getComputedStyle(knobHead.current);
            let knobTransformOriginStrArr = knobStyle.getPropertyValue("transform-origin").split("px");
            let knobTopStrArr = knobStyle.getPropertyValue("top").split("px");
            let knobLeftStrArr = knobStyle.getPropertyValue("left").split("px");
            return [parseFloat(knobTransformOriginStrArr[0])+parseFloat(knobLeftStrArr[0]), parseFloat(knobTransformOriginStrArr[1]+parseFloat(knobTopStrArr[0]))];
        };
        const turn = (e) => {
            if (!turning) {
                return;
            }
            let origin = getTransformOrigin();
            let grabAngle = Math.atan2(e.clientX-e.movementX-origin[0], origin[1]-e.clientY+e.movementY)*180/Math.PI;
            let moveAngle = Math.atan2(e.clientX-origin[0], origin[1]-e.clientY)*180/Math.PI;
            let angle = (moveAngle-grabAngle+props.param*270-135+540)%360 - 180;
            angle = (Math.abs(angle) > 135) ? 135*angle/Math.abs(angle) : angle;
            props.paramSetter((angle+135)/270);
        };
        window.addEventListener("mousemove", turn);

        const release = () => {
            setTurning(false);
        };
        window.addEventListener("mouseup", release);

        return () => {
            window.removeEventListener("mousemove", turn);
            window.removeEventListener("mouseup", release);
        };
    }, [turning, props.param]);

    const knobMouseDown = (e) => {
        setTurning(true);
    };

    return (
        <div className={styles.knob}>
            <div className={styles.knobHead} onMouseDown={knobMouseDown}>
                <div ref={knobHead} className={styles.knobHeadTick} style={{transform: "rotate("+(props.param*270-135)+"deg)"}}></div>
            </div>
        </div>
    )
}
