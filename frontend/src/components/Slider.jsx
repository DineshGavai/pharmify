import React, { useEffect, useState } from "react"
import IconButton from "./Button/IconButton.jsx"
import { useRef } from "react"

const Slider = ({ slides = [], className }) => {

    const trackRef = useRef()
    const slidesRef = useRef([])
    const leftBtnRef = useRef()
    const rightBtnRef = useRef()

    const [i, setI] = useState(0);

    useEffect(() => {
        let { width } = slidesRef.current[i].getBoundingClientRect();

        trackRef.current.style.transform = `translateX(-${(i * width) + 16}px)`;
    }, [i]);



    return (
        <section className={`slider ${className} ${i == 0 ? "first-slide" : ""}`}>
            <div
                className="track"
                ref={trackRef}
            >
                {slides.map((slide, index) => (
                    <div
                        className="slide"
                        key={index}
                        ref={(elem) => { slidesRef.current[index] = elem }}
                    >
                        {slide}
                    </div>
                ))}
            </div>

            <IconButton
                iconName={"arrow_left"}
                className="slider-arrow-btns left"
                ref={leftBtnRef}
                disabled={!(i > 0)}
                onClick={() => setI(i - 1)}
            />

            <IconButton
                iconName="arrow_right"
                className="slider-arrow-btns right"
                ref={rightBtnRef}
                disabled={!(i < slidesRef.current.length - 1)}
                onClick={() => setI(i + 1)}
            />

        </section>
    )
}
export default Slider