'use client'

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import styles from '@/styles/knobs.module.css'


const Knob = forwardRef((props, ref) => {
    let [val, setVal] = useState(0.5);
    let [turnInit, setTurnInit] = useState(null);
    const knobHead = useRef(null);

    useImperativeHandle(ref, () => ({
        getVal: () => {return val},
        setVal: (val01) => {if(Math.abs(val01-0.5)<=0.5) {setVal(val01);}}
    }), [val]);

    useEffect(() => {
        const getTransformOrigin = () => {
            let knobStyle = window.getComputedStyle(knobHead.current);
            let knobTransformOriginStrArr = knobStyle.getPropertyValue("transform-origin").split("px");
            let knobTopStrArr = knobStyle.getPropertyValue("top").split("px");
            let knobLeftStrArr = knobStyle.getPropertyValue("left").split("px");
            return [parseFloat(knobTransformOriginStrArr[0])+parseFloat(knobLeftStrArr[0]), parseFloat(knobTransformOriginStrArr[1]+parseFloat(knobTopStrArr[0]))];
        };
        const turn = (e) => {
            if (turnInit == null) {
                return;
            }
            let origin = getTransformOrigin();
            let grabAngle = Math.atan2(turnInit.mouseX-origin[0], origin[1]-turnInit.mouseY)*180/Math.PI;
            let moveAngle = Math.atan2(e.clientX-origin[0], origin[1]-e.clientY)*180/Math.PI;
            let angle = (moveAngle-grabAngle+turnInit.styleRotation+540)%360 - 180;
            angle = (Math.abs(angle) > 135) ? 135*angle/Math.abs(angle) : angle;
            setVal((angle+135)/270);
        };
        window.addEventListener("mousemove", turn);

        const release = () => {
            if (turnInit == null) {
                return;
            }
            turnInit = null;
        };
        window.addEventListener("mouseup", release);

        return () => {
            window.removeEventListener("mousemove", turn);
            window.removeEventListener("mouseup", release);
        };
    }, []);

    const knobMouseDown = (e) => {
        let initialAngle = knobHead.current.style["transform"] == "" ? 0 : parseFloat(knobHead.current.style["transform"].match(/[+-]?[0-9]+[.]?[0-9]*/));
        turnInit = {styleRotation:initialAngle, mouseX:e.clientX, mouseY:e.clientY};
    };

    return (
        <div className={styles.knob}>
            <div className={styles.knobHead} onMouseDown={knobMouseDown}>
                <div ref={knobHead} className={styles.knobHeadTick} style={{transform: "rotate("+(val*270-135)+"deg)"}}></div>
            </div>
        </div>
    )
});

export default Knob;