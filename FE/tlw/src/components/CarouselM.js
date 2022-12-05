/**
 * AxiosInstance 캡슐화
 * @author 복성범
 */


import React, { useEffect, useState } from "react";
import './CarouselM.scss'

const MAX_VISIBILITY = 1

const CarouselM = ({ children, searchCurrentSlide }) => {
    const [active, setActive] = useState(0);
    const count = React.Children.count(children);
    useEffect(() => {
        searchCurrentSlide(active)
    }, [active])

    return (
        <div className='carouselM'>
            {active > 0 && <div className="nav left"><i className="fa-sharp fa-solid fa-chevron-left" onClick={() => setActive(i => i - 1)}/></div>}
            {React.Children.map(children, (child, i) => (
                <div className='card-container' style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}>
                    {child}
                </div>
            ))}
            {active < count - 1 && <div className="nav right"><i onClick={() => setActive(i => i + 1)} className="fa-sharp fa-solid fa-chevron-right" /></div>}
        </div>
    );
};

export default CarouselM;